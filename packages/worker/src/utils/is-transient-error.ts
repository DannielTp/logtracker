export function isTransientError(error: unknown): boolean {
    if (!(error instanceof Error)) return false

    const message = error.message.toLowerCase()

    return (
        message.includes('timeout') ||
        message.includes('deadlock') ||
        message.includes('connection') ||
        message.includes('could not connect') ||
        message.includes('econnrefused')
    )
}
