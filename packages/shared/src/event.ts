export interface ErrorPayload {
  message: string
  stack?: string
  type?: string
}

export interface ErrorContext {
  userId?: string
  tags?: Record<string, string>
  extra?: Record<string, unknown>
}

export interface ErrorEvent {
  id: string
  projectId: string
  environment: string
  service: string
  timestamp: string
  error: ErrorPayload
  context?: ErrorContext
}
