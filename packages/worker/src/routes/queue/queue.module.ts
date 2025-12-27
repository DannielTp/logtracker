import { Module } from '@nestjs/common'
import { ErrorProcessor } from './error.processor'
import { ErrorService } from './error.service'

@Module({
  providers: [ErrorProcessor, ErrorService],
})
export class QueueModule {}
