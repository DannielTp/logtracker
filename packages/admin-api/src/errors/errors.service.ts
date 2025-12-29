import { AppDataSource } from '../db/data-source'
import { ErrorEventEntity, ErrorGroup, Project } from '@logtracker/shared'

export class NotFoundError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'NotFoundError'
    }
}

export class ForbiddenError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'ForbiddenError'
    }
}

export async function listGroups(project: Project) {
    const groupRepo = AppDataSource.getRepository(ErrorGroup)

    const groups = await groupRepo.find({
        where: { project: { id: project.id } },
        order: { lastSeen: 'DESC' },
        take: 50,
    })

    return groups.map((g) => ({
        id: g.id,
        message: g.message,
        type: g.type,
        count: g.count,
        firstSeen: g.firstSeen,
        lastSeen: g.lastSeen,
    }))
}

export async function getGroupDetail(project: any, groupId: string) {
    const groupRepo = AppDataSource.getRepository(ErrorGroup)

    const group = await groupRepo.findOne({
        where: { id: groupId },
        relations: ['project'],
    })

    if (!group) {
        throw new NotFoundError('Error group not found')
    }

    if (group.project.id !== project.id) {
        throw new ForbiddenError('Group does not belong to this project')
    }

    return {
        id: group.id,
        message: group.message,
        type: group.type,
        count: group.count,
        firstSeen: group.firstSeen,
        lastSeen: group.lastSeen,
    }
}

export async function listGroupEvents(
    project: any,
    groupId: string,
    limit = 20,
    offset = 0,
) {
    const groupRepo = AppDataSource.getRepository(ErrorGroup)
    const eventRepo = AppDataSource.getRepository(ErrorEventEntity)

    const group = await groupRepo.findOne({
        where: { id: groupId },
        relations: ['project'],
    })

    if (!group) {
        throw new NotFoundError('Error group not found')
    }

    if (group.project.id !== project.id) {
        throw new ForbiddenError('Group does not belong to this project')
    }

    const events = await eventRepo.find({
        where: { errorGroup: { id: group.id } },
        order: { createdAt: 'DESC' },
        take: limit,
        skip: offset,
    })

    return events.map((e) => ({
        id: e.id,
        timestamp: e.timestamp,
        environment: e.environment,
        service: e.service,
        payload: e.payload,
        createdAt: e.createdAt,
    }))
}
