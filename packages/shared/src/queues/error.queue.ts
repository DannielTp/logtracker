import { Queue } from 'bullmq'
import { redisConnection } from './redis'

export const ERROR_QUEUE_NAME = 'logtracker-errors'
export const errorQueue = new Queue(ERROR_QUEUE_NAME, {
    connection: redisConnection,
})
