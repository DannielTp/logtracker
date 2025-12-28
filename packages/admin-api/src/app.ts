import express, { type Express } from 'express'
import { setupBullBoard } from './bull-board/bull-board'
import { basicAuth } from './auth/basic-auth.middleware'

export function createApp(): Express {
    const app = express()

    app.use(basicAuth)
    setupBullBoard(app)

    return app
}
