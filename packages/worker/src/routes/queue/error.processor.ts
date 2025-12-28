import { Worker } from 'bullmq'
import { Injectable, OnModuleInit } from '@nestjs/common'
import { errorDlqQueue, redisConnection } from '@logtracker/shared'
import type { ErrorEvent } from '@logtracker/core'
import { ErrorService } from './error.service'
import { isTransientError } from '../../utils/is-transient-error'

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

                    await errorDlqQueue.add('error-event-dlq', {
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
