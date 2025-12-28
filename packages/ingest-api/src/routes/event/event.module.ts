import { Module } from '@nestjs/common'
import { EventController } from './event.controller'
import { ProjectModule } from 'routes/projects/project.module'
import { ProjectKeyGuard } from 'guards/project-key.guard'

@Module({
    imports: [ProjectModule],
    controllers: [EventController],
    providers: [ProjectKeyGuard],
})
export class EventModule {}
