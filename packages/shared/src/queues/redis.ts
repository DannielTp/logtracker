import { Redis } from 'ioredis'

export function createRedisConnection(config?: { host: string; port: number }) {
    return new Redis({
        host: config?.host || '127.0.0.1',
        port: config?.port || 6379,
        maxRetriesPerRequest: null,
    })
}
