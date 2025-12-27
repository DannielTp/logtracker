import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    @Get('health')
    getHealth() {
        return {
            status: 'ok',
            timestamp: Date.now().toString(),
            uptime: process.uptime().toString(),
        };
    }
}
