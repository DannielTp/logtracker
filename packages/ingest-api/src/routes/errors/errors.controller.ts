import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common'
import { ErrorsService } from './errors.service'
import { ProjectAccessGuard } from 'guards/project-access.guard'

@Controller('errors')
@UseGuards(ProjectAccessGuard)
export class ErrorsController {
    constructor(private readonly errorsService: ErrorsService) {}

    @Get('projects/:projectKey')
    async listGroups(@Req() req: any) {
        return this.errorsService.listGroups(req.project)
    }

    @Get('groups/:groupId')
    async getGroupDetail(@Req() req: any, @Param('groupId') groupId: string) {
        return this.errorsService.getGroupDetail(req.project, groupId)
    }

    @Get('groups/:groupId/events')
    async listGroupEvents(
        @Req() req: any,
        @Param('groupId') groupId: string,
        @Query('limit') limit = '20',
        @Query('offset') offset = '0',
    ) {
        return this.errorsService.listGroupEvents(
            req.project,
            groupId,
            Number(limit),
            Number(offset),
        )
    }
}
