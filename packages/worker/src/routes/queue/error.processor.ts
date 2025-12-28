import { Worker } from 'bullmq'
import { Injectable, OnModuleInit } from '@nestjs/common'
import type { ErrorEvent } from '@logtracker/shared'
import { ErrorService } from './error.service'
import { redisConnection } from './redis'
import { isTransientError } from '../../utils/is-transient-error'

@Injectable()
export class ErrorProcessor implements OnModuleInit {
    constructor(private readonly errorService: ErrorService) {}

    onModuleInit() {
        new Worker<ErrorEvent>(
            'logtracker-errors',
            async (job) => {
                await this.errorService.handle(job.data).catch((err) => {
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

                    return
                })
            },
            {
                connection: redisConnection,
            },
        )
    }
}
