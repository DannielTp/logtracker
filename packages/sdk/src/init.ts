import { setConfig, LogTrackerConfig } from './state'

export function initLogTracker(config: LogTrackerConfig) {
  setConfig(config)
}
