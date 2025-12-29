import 'dotenv/config'
import { createApp } from './app'
import { AppDataSource } from './db/data-source'

const PORT = process.env.PORT || 4003

const app = createApp()

app.listen(PORT, async () => {
    await AppDataSource.initialize()
    console.log(`🔐 Admin API running on http://localhost:${PORT}/admin/queues`)
})
