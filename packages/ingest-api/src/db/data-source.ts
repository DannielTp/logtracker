import 'reflect-metadata'

import { DataSource } from 'typeorm'
import { ErrorEventEntity, ErrorGroup, Project } from '@logtracker/shared'

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'logtracker',
    password: process.env.DB_PASSWORD || 'logtracker',
    database: process.env.DB_NAME || 'logtracker',

    synchronize: true,
    logging: false,

    entities: [Project, ErrorEventEntity, ErrorGroup],
})
