import { Injectable } from '@nestjs/common'
import { ErrorEventEntity, ErrorGroup, Project } from '@logtracker/shared'
import type { ErrorEvent } from '@logtracker/core'
import { AppDataSource } from '../db/data-source.js'

@Injectable()
export class ErrorService {
    async handle(event: ErrorEvent) {
        const projectRepo = AppDataSource.getRepository(Project)
        const groupRepo = AppDataSource.getRepository(ErrorGroup)
        const eventRepo = AppDataSource.getRepository(ErrorEventEntity)

        /* ---------- PROJECT ---------- */

        let project = await projectRepo.findOne({
            where: { apiKey: event.projectKey },
        })

        if (!project) {
            throw new Error('Project not found')
        }

        /* ---------- GROUP ---------- */

        const fingerprint = `${event.error.type ?? 'Error'}|${event.error.message}`

        let group = await groupRepo.findOne({
            where: {
                project: { id: project.id },
                fingerprint,
            },
        })

        if (!group) {
            group = await groupRepo.save({
                project,
                fingerprint,
                message: event.error.message,
                type: event.error.type,
                count: 1,
            })
        } else {
            group.count += 1
            await groupRepo.save(group)
        }

        /* ---------- EVENT ---------- */

        await eventRepo.save({
            project,
            errorGroup: group,
            environment: event.environment,
            service: event.service,
            timestamp: event.timestamp || new Date().toISOString(),
            payload: event,
        })

        console.log(`🧩 Error grouped → ${group.id}`)
    }
}
