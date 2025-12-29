import express, { type Express } from 'express'
import { setupBullBoard } from './bull-board/bull-board'
import { basicAuth } from './auth/basic-auth.middleware'
import { errorsRouter } from './errors/errors.controller'
import { AppDataSource } from './db/data-source'

export function createApp(): Express {
    const app = express()

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header(
            'Access-Control-Allow-Methods',
            'GET,PUT,POST,DELETE,OPTIONS',
        )
        res.header(
            'Access-Control-Allow-Headers',
            'Content-Type, Authorization, x-project-key',
        )
        if (req.method === 'OPTIONS') {
            return res.sendStatus(200)
        }
        next()
    })

    // Parse JSON bodies
    app.use(express.json())

    // Initialize database connection
    AppDataSource.initialize()
        .then(() => {
            console.log('📊 Database connected')
        })
        .catch((error) => console.log('❌ Database connection error:', error))

    // Setup Bull Board with basic auth
    app.use(basicAuth)
    setupBullBoard(app)

    // Setup errors API routes
    app.use('/errors', errorsRouter)

    return app
}
