import { createApp } from './app'

const PORT = process.env.PORT || 4003

const app = createApp()

app.listen(PORT, () => {
    console.log(`🔐 Admin API running on http://localhost:${PORT}/admin/queues`)
})
