import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { ProjectService } from 'routes/projects/project.service'

@Injectable()
export class ProjectAccessGuard implements CanActivate {
    constructor(private readonly projectService: ProjectService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()

        const apiKey = request.headers['x-project-key']

        if (!apiKey) {
            throw new UnauthorizedException('Missing API key')
        }

        const project = await this.projectService.findByApiKey(apiKey)

        if (!project) {
            throw new UnauthorizedException('Invalid API key')
        }

        request.project = project

        return true
    }
}
