import { Router, Response } from 'express'
import * as errorsService from './errors.service'
import {
    projectAccessGuard,
    AuthenticatedRequest,
} from '../guards/project-access.guard'

export const errorsRouter: Router = Router()
errorsRouter.use(projectAccessGuard)

errorsRouter.get(
    '/projects/:projectKey',
    async (req: AuthenticatedRequest, res: Response) => {
        try {
            const groups = await errorsService.listGroups(req.project!)
            res.json(groups)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    },
)

errorsRouter.get(
    '/groups/:groupId',
    async (req: AuthenticatedRequest, res: Response) => {
        try {
            const groupDetail = await errorsService.getGroupDetail(
                req.project!,
                req.params.groupId,
            )
            res.json(groupDetail)
        } catch (error: any) {
            if (error.name === 'NotFoundError') {
                return res.status(404).json({ message: error.message })
            }
            if (error.name === 'ForbiddenError') {
                return res.status(403).json({ message: error.message })
            }
            res.status(500).json({ message: 'Internal server error' })
        }
    },
)

errorsRouter.get(
    '/groups/:groupId/events',
    async (req: AuthenticatedRequest, res: Response) => {
        try {
            const limit = Number(req.query.limit) || 20
            const offset = Number(req.query.offset) || 0

            const events = await errorsService.listGroupEvents(
                req.project!,
                req.params.groupId,
                limit,
                offset,
            )
            res.json(events)
        } catch (error: any) {
            if (error.name === 'NotFoundError') {
                return res.status(404).json({ message: error.message })
            }
            if (error.name === 'ForbiddenError') {
                return res.status(403).json({ message: error.message })
            }
            res.status(500).json({ message: 'Internal server error' })
        }
    },
)
