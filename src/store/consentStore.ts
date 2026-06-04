"use client";

import { useSyncExternalStore } from "react";
import type {
  ConsentCategory,
  ConsentConfig,
  ConsentPreferences,
  ConsentRecord,
} from "../types";
import { resolveConfig } from "../lib/defaults";
import {
  buildConsentRecord,
  isConsentFresh,
  readConsentRecord,
  writeConsentRecord,
} from "../lib/storage";
import {
  initDataLayer,
  pushConsentEvent,
  setConsentDefault,
  updateConsent,
} from "../lib/gtm";
import { auditConsent } from "../lib/audit";

// ─── State shape ──────────────────────────────────────────────────────────────

interface ConsentState {
  record: ConsentRecord | null;
  loaded: boolean;
  showBanner: boolean;
  showModal: boolean;
  config: ReturnType<typeof resolveConfig> | null;
}

// ─── Module-level store ───────────────────────────────────────────────────────
// State lives outside React's tree — no provider needed.

let state: ConsentState = {
  record: null,
  loaded: false,
  showBanner: false,
  showModal: false,
  config: null,
};

const listeners = new Set<() => void>();

function setState(next: Partial<ConsentState>) {
  state = { ...state, ...next };
  listeners.forEach((l) => l());
}

function getState() {
  return state;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useConsentStore() {
  return useSyncExternalStore(subscribe, getState, getState);
}

// ─── Actions ──────────────────────────────────────────────────────────────────

export function init(rawConfig: ConsentConfig, geoAllowed: boolean) {
  if (state.loaded) return;
  const config = resolveConfig(rawConfig);

  initDataLayer();
  setConsentDefault(config.waitForUpdate);

  const existing = readConsentRecord(config.cookieName);
  const fresh = isConsentFresh(
    existing,
    config.policyVersion,
    config.cookieMaxAgeDays,
  );

  if (fresh && existing) {
    updateConsent(existing.preferences);
    setState({ record: existing, config, loaded: true, showBanner: false });
  } else if (geoAllowed) {
    // EU visitor with no valid record — show banner, leave signals denied until they choose
    setState({ config, loaded: true, showBanner: true });
  } else {
    // Visitor not subject to consent requirements — grant all configured signals immediately
    updateConsent({
      necessary: true,
      analytics: config.categories.includes("analytics"),
      marketing: config.categories.includes("marketing"),
      personalisation: config.categories.includes("personalisation"),
    });
    setState({ config, loaded: true, showBanner: false });
  }
}

export function acceptAll() {
  const { config } = state;
  if (!config) return;
  const prefs: ConsentPreferences = {
    necessary: true,
    analytics: config.categories.includes("analytics"),
    marketing: config.categories.includes("marketing"),
    personalisation: config.categories.includes("personalisation"),
  };
  const record = persist(prefs, "accept_all", config);
  pushConsentEvent("consent_accepted", prefs);
  setState({ record, showBanner: false, showModal: false });
}

export function rejectAll() {
  const { config } = state;
  if (!config) return;
  const prefs: ConsentPreferences = {
    necessary: true,
    analytics: false,
    marketing: false,
    personalisation: false,
  };
  const record = persist(prefs, "reject_all", config);
  pushConsentEvent("consent_rejected", prefs);
  setState({ record, showBanner: false, showModal: false });
}

export function saveCustom(partial: Omit<ConsentPreferences, "necessary">) {
  const { config } = state;
  if (!config) return;
  const prefs: ConsentPreferences = { necessary: true, ...partial };
  const record = persist(prefs, "custom", config);
  pushConsentEvent("consent_customised", prefs);
  setState({ record, showBanner: false, showModal: false });
}

export function openModal() {
  setState({ showModal: true });
}

export function closeModal() {
  setState({ showModal: false });
}

export function isGranted(category: ConsentCategory): boolean {
  return state.record?.preferences[category] === true;
}

// ─── Internal persist helper ──────────────────────────────────────────────────

function persist(
  preferences: ConsentPreferences,
  method: ConsentRecord["method"],
  config: ReturnType<typeof resolveConfig>,
): ConsentRecord {
  const record = buildConsentRecord(preferences, method, config.policyVersion);
  writeConsentRecord(
    record,
    config.cookieName,
    config.cookieMaxAgeDays,
    config.cookieDomain || undefined,
  );
  updateConsent(preferences);
  if (config.auditEndpoint) {
    void auditConsent(record, config.auditEndpoint);
  }
  return record;
}
