// ─── Primary component ────────────────────────────────────────────────────────
export { ConsentManager } from "./components/ConsentManager";

// ─── Individual components (for custom composition) ───────────────────────────
export { ConsentBanner } from "./components/ConsentBanner";
export { PreferencesModal } from "./components/PreferencesModal";

export { GTMScript } from "./components/GTMScript";

// ─── Hook ─────────────────────────────────────────────────────────────────────
export { useConsent } from "./hooks/useConsent";

// ─── Types ────────────────────────────────────────────────────────────────────
export type {
  ConsentConfig,
  ConsentPreferences,
  ConsentRecord,
  ConsentCategory,
  ConsentMethod,
  ConsentClassNames,
  ConsentCopy,
} from "./types";
