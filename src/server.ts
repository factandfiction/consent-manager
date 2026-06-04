// ─── Server-only entry point ──────────────────────────────────────────────────
// Import this from '@factandfiction/consent-manager/server' in Server Components.
// Do NOT import from this path in Client Components.

export {
  getVisitorCountry,
  getCountryFromHeaders,
  shouldShowBanner,
} from "./lib/geo";

export { EU_COUNTRIES } from "./lib/defaults";

export type {
  ConsentConfig,
  ConsentPreferences,
  ConsentRecord,
  ConsentCategory,
  ConsentMethod,
  ConsentClassNames,
  ConsentCopy,
} from "./types";
