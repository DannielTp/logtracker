import { Injectable } from '@nestjs/common'
import type { ErrorEvent } from '@logtracker/shared'
import { AppDataSource } from '../db/data-source.js'
import { Project } from '../db/entities/project.entity.js'
import { ErrorGroup } from '../db/entities/error-group.entity.js'
import { ErrorEventEntity } from '../db/entities/error-event.entity.js'

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
      project = await projectRepo.save({
        name: event.projectKey,
        apiKey: event.projectKey,
      })
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
