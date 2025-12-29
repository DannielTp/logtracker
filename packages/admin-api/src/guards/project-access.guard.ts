import { Request, Response, NextFunction } from 'express'
import { AppDataSource } from '../db/data-source'
import { Project } from '@logtracker/shared'

export interface AuthenticatedRequest extends Request {
    project?: Project
}

export async function projectAccessGuard(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
) {
    const apiKey = req.headers['x-project-key'] as string

    if (!apiKey) {
        return res.status(401).json({ message: 'Missing API key' })
    }

    const projectRepo = AppDataSource.getRepository(Project)
    const project = await projectRepo.findOne({ where: { apiKey } })

    if (!project) {
        return res.status(401).json({ message: 'Invalid API key' })
    }

    req.project = project

    next()
}
