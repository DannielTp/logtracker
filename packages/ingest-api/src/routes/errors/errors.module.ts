import { Module } from '@nestjs/common'
import { ErrorsController } from './errors.controller'
import { ErrorsService } from './errors.service'
import { ProjectModule } from '../projects/project.module'
import { ProjectAccessGuard } from 'guards/project-access.guard'

@Module({
    imports: [ProjectModule],
    controllers: [ErrorsController],
    providers: [ErrorsService, ProjectAccessGuard],
})
export class ErrorsModule {}
