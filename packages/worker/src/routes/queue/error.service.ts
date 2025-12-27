import { Injectable } from '@nestjs/common'
import type { ErrorEvent } from '@logtracker/shared'

@Injectable()
export class ErrorService {
  async handle(event: ErrorEvent) {
    console.log('📥 Error event processed:')
    console.log(JSON.stringify(event, null, 2))
  }
}
