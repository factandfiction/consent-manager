import type { ConsentPreferences, GTMConsentState } from '../types'

// ─── dataLayer initialisation ─────────────────────────────────────────────────

export function initDataLayer(): void {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer ?? []
}

export function gtag(...args: unknown[]): void {
  if (typeof window === 'undefined') return
  initDataLayer()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(window.dataLayer as any[]).push(arguments)
}

// ─── Consent Mode v2 signals ──────────────────────────────────────────────────

/**
 * Must be called BEFORE GTM loads.
 * Sets all non-essential signals to 'denied' as the safe default.
 */
export function setConsentDefault(waitForUpdate: number): void {
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    functionality_storage: 'granted',
    personalization_storage: 'denied',
    wait_for_update: waitForUpdate,
  } satisfies GTMConsentState & { wait_for_update: number })
}

/**
 * Called after the user makes a consent choice.
 * Maps our category model to GTM's signal names.
 */
export function updateConsent(prefs: ConsentPreferences): void {
  gtag('consent', 'update', {
    analytics_storage: prefs.analytics ? 'granted' : 'denied',
    ad_storage: prefs.marketing ? 'granted' : 'denied',
    ad_user_data: prefs.marketing ? 'granted' : 'denied',
    ad_personalization: prefs.personalisation ? 'granted' : 'denied',
    functionality_storage: 'granted',
    personalization_storage: prefs.personalisation ? 'granted' : 'denied',
  } satisfies GTMConsentState)
}

/**
 * Push a custom GTM event — useful for tracking the consent interaction itself.
 * Uses dataLayer.push directly (not gtag) because this is a plain event object,
 * not a gtag command — gtag() wraps args in an Arguments object which GTM
 * interprets as a command, not a data event.
 */
export function pushConsentEvent(
  event: 'consent_accepted' | 'consent_rejected' | 'consent_customised',
  preferences: ConsentPreferences
): void {
  if (typeof window === 'undefined') return
  initDataLayer()
  window.dataLayer.push({
    event,
    consent_analytics: preferences.analytics,
    consent_marketing: preferences.marketing,
    consent_personalisation: preferences.personalisation,
  })
}

// ─── Global type augmentation ─────────────────────────────────────────────────

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}
