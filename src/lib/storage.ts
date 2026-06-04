import type {
  ConsentRecord,
  ConsentPreferences,
  ConsentMethod,
} from "../types";

// ─── Cookie helpers ───────────────────────────────────────────────────────────

export function setCookie(
  name: string,
  value: string,
  maxAgeDays: number,
  domain?: string,
): void {
  if (typeof document === "undefined") return;
  const maxAge = maxAgeDays * 24 * 60 * 60;
  const domainStr = domain ? `; domain=${domain}` : "";
  const secureStr = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/; SameSite=Lax${secureStr}${domainStr}`;
}

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function deleteCookie(name: string, domain?: string): void {
  if (typeof document === "undefined") return;
  const domainStr = domain ? `; domain=${domain}` : "";
  document.cookie = `${name}=; max-age=0; path=/${domainStr}`;
}

// ─── Consent record persistence ──────────────────────────────────────────────

export function readConsentRecord(cookieName: string): ConsentRecord | null {
  const raw = getCookie(cookieName);
  if (!raw) return null;
  try {
    const record = JSON.parse(raw) as ConsentRecord;
    // Basic validation
    if (!record.version || !record.timestamp || !record.preferences)
      return null;
    return record;
  } catch {
    return null;
  }
}

export function writeConsentRecord(
  record: ConsentRecord,
  cookieName: string,
  maxAgeDays: number,
  domain?: string,
): void {
  setCookie(cookieName, JSON.stringify(record), maxAgeDays, domain);
}

export function clearConsentRecord(cookieName: string, domain?: string): void {
  deleteCookie(cookieName, domain);
}

// ─── Build a consent record ───────────────────────────────────────────────────

export function buildConsentRecord(
  preferences: ConsentPreferences,
  method: ConsentMethod,
  policyVersion: string,
): ConsentRecord {
  return {
    version: policyVersion,
    timestamp: new Date().toISOString(),
    preferences,
    method,
    userAgent:
      typeof navigator !== "undefined" ? navigator.userAgent : undefined,
  };
}

// ─── Check if existing record is still valid for current policy ───────────────

export function isConsentFresh(
  record: ConsentRecord | null,
  policyVersion: string,
  maxAgeDays: number,
): boolean {
  if (!record) return false;
  // Policy version changed → must re-consent
  if (record.version !== policyVersion) return false;
  // Consent older than maxAgeDays → must re-consent
  const ageMs = Date.now() - new Date(record.timestamp).getTime();
  const maxAgeMs = maxAgeDays * 24 * 60 * 60 * 1000;
  return ageMs < maxAgeMs;
}
