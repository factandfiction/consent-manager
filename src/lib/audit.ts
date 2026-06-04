import type { ConsentRecord } from '../types'

/**
 * Optionally POST the consent record to your audit endpoint.
 * Fire-and-forget — failures are silently swallowed so they never
 * block or affect the consent UX.
 */
export async function auditConsent(
  record: ConsentRecord,
  endpoint: string
): Promise<void> {
  if (!endpoint) return
  try {
    await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
      // keepalive ensures the request completes even if the user navigates away
      keepalive: true,
    })
  } catch {
    // Never throw — audit logging must never break consent UX
  }
}
