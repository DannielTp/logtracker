import { Worker } from 'bullmq'
import { Injectable, OnModuleInit } from '@nestjs/common'
import type { ErrorEvent } from '@logtracker/shared'
import { ErrorService } from './error.service'
import { redisConnection } from './redis'

@Injectable()
export class ErrorProcessor implements OnModuleInit {
  constructor(private readonly errorService: ErrorService) {}

  onModuleInit() {
    new Worker<ErrorEvent>(
      'logtracker-errors',
      async (job) => {
        await this.errorService.handle(job.data)
      },
      {
        connection: redisConnection,
      },
    )
  }
}
