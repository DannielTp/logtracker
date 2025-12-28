import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common'
import { ErrorEventSchema } from '@logtracker/shared'
import { errorQueue } from '../queue/error.queue'
import { ProjectKeyGuard } from 'guards/project-key.guard'

@Controller('event')
export class EventController {
    constructor() {}

    @Post()
    @HttpCode(202)
    @UseGuards(ProjectKeyGuard)
    async ingest(@Body() body: unknown) {
        const parsed = ErrorEventSchema.safeParse(body)

        if (!parsed.success) {
            return 'Invalid payload'
        }

        await errorQueue.add('error-event', parsed.data)
        return 'Accepted'
    }
}
