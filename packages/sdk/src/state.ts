export interface LogTrackerConfig {
  dsn: string
  projectKey: string
  environment: string
  service: string
  release?: string
}

let config: LogTrackerConfig | null = null

export function setConfig(newConfig: LogTrackerConfig) {
  config = newConfig
}

export function getConfig(): LogTrackerConfig | null {
  return config
}
