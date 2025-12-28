import { Injectable } from '@nestjs/common'
import { AppDataSource } from '../../db/data-source'
import { Project } from '@logtracker/shared'

@Injectable()
export class ProjectService {
    async existsByApiKey(apiKey: string): Promise<boolean> {
        const repo = AppDataSource.getRepository(Project)
        return (await repo.count({ where: { apiKey } })) > 0
    }
}
