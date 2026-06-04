'use client'

import { useConsentStore } from '../store/consentStore'
import * as actions from '../store/consentStore'

/**
 * Access consent state and actions from any client component.
 * No provider needed — backed by a plain module-level store with
 * React's built-in useSyncExternalStore.
 *
 * @example
 * const { isGranted, openModal } = useConsent()
 * if (!isGranted('marketing')) return <Placeholder />
 */
export function useConsent() {
  const { record, loaded, showBanner, showModal, config } = useConsentStore()

  return {
    record,
    loaded,
    showBanner,
    showModal,
    config,
    acceptAll:  actions.acceptAll,
    rejectAll:  actions.rejectAll,
    saveCustom: actions.saveCustom,
    openModal:  actions.openModal,
    closeModal: actions.closeModal,
    isGranted:  actions.isGranted,
  }
}
