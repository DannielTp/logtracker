import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { EventModule } from 'routes/event/event.module'
import { ErrorsModule } from 'routes/errors/errors.module'

@Module({
    imports: [EventModule, ErrorsModule],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
