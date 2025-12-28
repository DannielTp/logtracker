import { ExpressAdapter } from '@bull-board/express'
import { createBullBoard } from '@bull-board/api'
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter'
import { NestApplication } from '@nestjs/core'
import { errorDlqQueue, errorQueue } from '@logtracker/shared'

export function setupBullBoard(app: NestApplication) {
    const serverAdapter = new ExpressAdapter()
    serverAdapter.setBasePath('/admin/queues')

    createBullBoard({
        queues: [
            new BullMQAdapter(errorQueue),
            new BullMQAdapter(errorDlqQueue),
        ],
        serverAdapter,
    })

    app.use('/admin/queues', serverAdapter.getRouter())
}
