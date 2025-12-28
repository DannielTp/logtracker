import { Worker } from 'bullmq'
import { Injectable, OnModuleInit } from '@nestjs/common'
import type { ErrorEvent } from '@logtracker/shared'
import { ErrorService } from './error.service'
import { redisConnection } from './redis'
import { isTransientError } from '../../utils/is-transient-error'
import { dlqQueue } from './dlq.queue'

@Injectable()
export class ErrorProcessor implements OnModuleInit {
    constructor(private readonly errorService: ErrorService) {}

    onModuleInit() {
        new Worker<ErrorEvent>(
            'logtracker-errors',
            async (job) => {
                await this.errorService.handle(job.data).catch(async (err) => {
                    const attempt = job.attemptsMade + 1
                    const max = job.opts.attempts ?? 1

                    if (isTransientError(err) && attempt < max) {
                        console.warn(
                            `🔁 Retry ${attempt}/${max} for job ${job.id}: ${err.message}`,
                        )
                        throw err
                    }

                    console.error(
                        `❌ Fatal error for job ${job.id}: ${err.message}`,
                    )

                    await dlqQueue.add('error-event-dlq', {
                        originalJobId: job.id,
                        data: job.data,
                        error: err.message,
                        attempts: attempt,
                        failedAt: new Date().toISOString(),
                    })

                    return
                })
            },
            {
                connection: redisConnection,
            },
        )
    }
}
