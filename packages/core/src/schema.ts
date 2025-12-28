import { z } from 'zod'

export const ErrorPayloadSchema = z.object({
  message: z.string(),
  stack: z.string().optional(),
  type: z.string().optional(),
})

export const ErrorContextSchema = z.object({
  userId: z.string().optional(),
  tags: z.record(z.string(), z.string()).optional(),
  extra: z.record(z.string(), z.unknown()).optional(),
})

export const ErrorEventSchema = z.object({
  projectKey: z.string(),
  environment: z.string(),
  service: z.string(),
  timestamp: z.string().optional(),
  error: ErrorPayloadSchema,
  context: ErrorContextSchema.optional(),
})
