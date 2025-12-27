import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ErrorEventSchema } from '@logtracker/shared';
import { errorQueue } from '../queue/error.queue'

@Controller()
export class EventController {
    constructor() {}

    @Post()
    @HttpCode(202)
    async ingest(@Body() body: unknown) {
        const parsed = ErrorEventSchema.safeParse(body);

        if (!parsed.success) {
            return;
        }

		await errorQueue.add('error-event', parsed.data);
        return;
    }
}
