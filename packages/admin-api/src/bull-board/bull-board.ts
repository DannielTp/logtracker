import { createBullBoard } from '@bull-board/api'
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter'
import { ExpressAdapter } from '@bull-board/express'

import { errorQueue, errorDlqQueue } from '@logtracker/shared'

export function setupBullBoard(app: any) {
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
