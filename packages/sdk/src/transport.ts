import type { ErrorEvent } from '@logtracker/shared'

export function sendEvent(dsn: string, event: ErrorEvent) {
  fetch(`${dsn}/event`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(event),
  }).catch(() => {
    // ignorar errores de red
  })
}
