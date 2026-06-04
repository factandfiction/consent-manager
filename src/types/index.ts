// ─── Consent Categories ───────────────────────────────────────────────────────

export type ConsentCategory = "analytics" | "marketing" | "personalisation";

/**
 * The full set of configurable categories, in display order.
 */
export const ALL_CATEGORIES: ConsentCategory[] = [
  "analytics",
  "marketing",
  "personalisation",
];

export interface ConsentPreferences {
  necessary: true; // always granted, not configurable
  analytics: boolean;
  marketing: boolean;
  personalisation: boolean;
}

export type ConsentMethod = "accept_all" | "reject_all" | "custom";

// ─── Consent Record (persisted) ───────────────────────────────────────────────

export interface ConsentRecord {
  version: string; // ties to your cookie policy version, e.g. "2024-01"
  timestamp: string; // ISO 8601
  preferences: ConsentPreferences;
  method: ConsentMethod;
  userAgent?: string;
}

// ─── GTM Consent Mode v2 signals ─────────────────────────────────────────────

export type ConsentSignal = "granted" | "denied";

export interface GTMConsentState {
  analytics_storage: ConsentSignal;
  ad_storage: ConsentSignal;
  ad_user_data: ConsentSignal;
  ad_personalization: ConsentSignal;
  functionality_storage: ConsentSignal;
  personalization_storage: ConsentSignal;
}

// ─── Package Configuration ────────────────────────────────────────────────────

export interface ConsentConfig {
  /**
   * Your GTM container ID, e.g. "GTM-XXXXXXX"
   */
  gtmId: string;

  /**
   * Cookie policy version string. Bump this to trigger re-consent.
   * e.g. "2024-01"
   */
  policyVersion: string;

  /**
   * Name of the cookie used to store consent. Default: "consent_preferences"
   */
  cookieName?: string;

  /**
   * Cookie max-age in days. Default: 365 (12 months, GDPR max recommended)
   */
  cookieMaxAgeDays?: number;

  /**
   * Cookie domain, e.g. ".yourdomain.com" for cross-subdomain.
   * Omit to default to current domain.
   */
  cookieDomain?: string;

  /**
   * Only show the banner to users in these ISO 3166-1 alpha-2 country codes.
   * Reads from the `cf-ipcountry` or `x-vercel-ip-country` header.
   * Leave empty to show to everyone.
   * e.g. ['GB', 'DE', 'FR', 'NL', ...all EU/EEA]
   */
  geoCountries?: string[];

  /**
   * Milliseconds GTM waits after a denied default before firing tags in
   * modelled mode. Default: 500
   */
  waitForUpdate?: number;

  /**
   * Optional: POST consent records to this URL for server-side audit logging.
   * Your API route receives a ConsentRecord body.
   */
  auditEndpoint?: string;

  /**
   * Which consent categories to show in the preferences modal.
   * Any category omitted here will never be shown to the user and will always
   * be stored as `false` (denied) — including when "Accept all" is clicked.
   *
   * Default: all three categories — ['analytics', 'marketing', 'personalisation']
   *
   * @example
   * // Only ask about analytics — hide marketing and personalisation entirely
   * categories: ['analytics']
   */
  categories?: ConsentCategory[];

  /**
   * UI copy overrides — all optional, sensible defaults provided.
   */
  copy?: Partial<ConsentCopy>;

  /**
   * Tailwind class overrides for every visual element.
   * Layout, positioning, z-index, and animations are not affected.
   * Any slot you omit keeps its default styling.
   *
   * @example
   * classNames: {
   *   banner: "rounded-2xl bg-zinc-900 border-zinc-700 p-6 shadow-2xl",
   *   acceptButton: "bg-indigo-600 text-white rounded-lg px-4 py-2 text-xs font-medium hover:bg-indigo-500",
   * }
   */
  classNames?: Partial<ConsentClassNames>;
}

// ─── UI Copy ─────────────────────────────────────────────────────────────────

export interface ConsentCopy {
  bannerTitle: string;
  bannerDescription: string;
  acceptAll: string;
  rejectAll: string;
  managePreferences: string;
  modalTitle: string;
  savePreferences: string;
  cookieSettingsLabel: string;
  categories: {
    necessary: CategoryCopy;
    analytics: CategoryCopy;
    marketing: CategoryCopy;
    personalisation: CategoryCopy;
  };
}

export interface CategoryCopy {
  label: string;
  description: string;
}

// ─── Class name slots ─────────────────────────────────────────────────────────
// Each slot replaces the default Tailwind classes for that element.
// Structural classes (fixed, flex, z-index, overflow, animations) are always
// applied on top and cannot be overridden through this interface.

export interface ConsentClassNames {
  // ── Banner ──────────────────────────────────────────────────────────────────
  /** Banner card — bg, border, shadow, padding, rounded corners. */
  banner?: string;
  /** Banner title text. */
  bannerTitle?: string;
  /** Banner body/description text. */
  bannerDescription?: string;

  // ── Modal ───────────────────────────────────────────────────────────────────
  /** Full-screen backdrop — background color / opacity. */
  overlay?: string;
  /** Modal panel — bg, max-width, padding, rounded corners. */
  modal?: string;
  /** Modal title text. */
  modalTitle?: string;
  /** Modal close (✕) button. */
  closeButton?: string;

  // ── Categories ──────────────────────────────────────────────────────────────
  /** Each category row — border, padding. */
  categoryRow?: string;
  /** Category name label. */
  categoryLabel?: string;
  /** Category description text. */
  categoryDescription?: string;
  /** "Always on" badge shown next to the necessary category. */
  alwaysOnBadge?: string;

  // ── Toggle ──────────────────────────────────────────────────────────────────
  /** Toggle track — background colors for on/off states. */
  toggleTrack?: string;
  /** Toggle thumb — the sliding handle. */
  toggleThumb?: string;

  // ── Buttons ─────────────────────────────────────────────────────────────────
  // /** "Base" — used for all buttons (except close). */
  baseButton?: string;
  /** "Accept all" — used in both the banner and the modal footer. */
  acceptButton?: string;
  /** "Reject all" — used in both the banner and the modal footer. */
  rejectButton?: string;
  /** "Manage preferences" link inside the banner. */
  manageButton?: string;
  /** "Save preferences" button in the modal footer. */
  saveButton?: string;
}

// ─── Context value ────────────────────────────────────────────────────────────

export interface ConsentContextValue {
  /** Current saved preferences, or null if no consent given yet */
  record: ConsentRecord | null;
  /** True after consent has been loaded from the cookie */
  loaded: boolean;
  /** True if the banner should be shown */
  showBanner: boolean;
  /** True if the preferences modal is open */
  showModal: boolean;
  /** Accept all categories */
  acceptAll: () => void;
  /** Reject all non-essential categories */
  rejectAll: () => void;
  /** Save a custom set of preferences */
  saveCustom: (prefs: Omit<ConsentPreferences, "necessary">) => void;
  /** Open the preferences modal */
  openModal: () => void;
  /** Close the preferences modal */
  closeModal: () => void;
  /** Convenience: check if a category is currently granted */
  isGranted: (category: ConsentCategory) => boolean;
  /** The resolved config for this instance */
  config: import('../lib/defaults').ResolvedConfig;
}
