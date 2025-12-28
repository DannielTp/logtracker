import { getConfig } from './state'
import { sendEvent } from './transport'
import type { ErrorEvent } from '@logtracker/core'

export function captureError(
    error: unknown,
    context?: Record<string, unknown>,
) {
    try {
        const config = getConfig()
        if (!config) return

        const err =
            error instanceof Error
                ? error
                : new Error(typeof error === 'string' ? error : 'Unknown error')

        const event: ErrorEvent = {
            projectKey: config.projectKey,
            environment: config.environment,
            service: config.service,
            timestamp: new Date().toISOString(),
            error: {
                message: err.message,
                stack: err.stack,
                type: err.name,
            },
            context,
        }

        sendEvent(config.dsn, event)
    } catch {
        // fail silently
    }
}
