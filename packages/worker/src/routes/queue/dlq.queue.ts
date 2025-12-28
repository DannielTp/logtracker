import { Queue } from 'bullmq'
import { redisConnection } from './redis'

export const dlqQueue = new Queue('logtracker-errors-dlq', {
    connection: redisConnection,
})
