import { Queue } from 'bullmq'
import { createRedisConnection } from './redis'

export const ERROR_DLQ_QUEUE_NAME = 'logtracker-errors-dlq'
export const errorDlqQueue = new Queue(ERROR_DLQ_QUEUE_NAME, {
    connection: createRedisConnection(),
})
