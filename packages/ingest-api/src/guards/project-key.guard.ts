import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { ProjectService } from 'routes/projects/project.service'

@Injectable()
export class ProjectKeyGuard implements CanActivate {
    constructor(private readonly projectService: ProjectService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const { projectKey } = request.body ?? {}

        if (!projectKey) {
            throw new UnauthorizedException('Missing projectKey')
        }

        const exists = await this.projectService.existsByApiKey(projectKey)

        if (!exists) {
            throw new UnauthorizedException('Invalid projectKey')
        }

        return true
    }
}
