export { Project } from './entities/project.entity'
export { ErrorGroup } from './entities/error-group.entity'
export { ErrorEventEntity } from './entities/error-event.entity'

export { ERROR_QUEUE_NAME } from './queues/error.queue'
export { errorQueue } from './queues/error.queue'

export { ERROR_DLQ_QUEUE_NAME } from './queues/dlq.queue'
export { errorDlqQueue } from './queues/dlq.queue'

export { createRedisConnection } from './queues/redis'
