import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common'
import { errorQueue } from '@logtracker/shared'
import { ErrorEventSchema } from '@logtracker/core'
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

        await errorQueue.add('error-event', parsed.data, {
            attempts: 5,
            backoff: {
                type: 'exponential',
                delay: 1000,
            },
            removeOnComplete: true,
            removeOnFail: false,
        })

        return 'Accepted'
    }
}
