import * as react_jsx_runtime from 'react/jsx-runtime';

type ConsentCategory = "analytics" | "marketing" | "personalisation";
interface ConsentPreferences {
    necessary: true;
    analytics: boolean;
    marketing: boolean;
    personalisation: boolean;
}
type ConsentMethod = "accept_all" | "reject_all" | "custom";
interface ConsentRecord {
    version: string;
    timestamp: string;
    preferences: ConsentPreferences;
    method: ConsentMethod;
    userAgent?: string;
}
interface ConsentConfig {
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
interface ConsentCopy {
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
interface CategoryCopy {
    label: string;
    description: string;
}
interface ConsentClassNames {
    /** Banner card — bg, border, shadow, padding, rounded corners. */
    banner?: string;
    /** Banner title text. */
    bannerTitle?: string;
    /** Banner body/description text. */
    bannerDescription?: string;
    /** Full-screen backdrop — background color / opacity. */
    overlay?: string;
    /** Modal panel — bg, max-width, padding, rounded corners. */
    modal?: string;
    /** Modal title text. */
    modalTitle?: string;
    /** Modal close (✕) button. */
    closeButton?: string;
    /** Each category row — border, padding. */
    categoryRow?: string;
    /** Category name label. */
    categoryLabel?: string;
    /** Category description text. */
    categoryDescription?: string;
    /** "Always on" badge shown next to the necessary category. */
    alwaysOnBadge?: string;
    /** Toggle track — background colors for on/off states. */
    toggleTrack?: string;
    /** Toggle thumb — the sliding handle. */
    toggleThumb?: string;
    /** "Accept all" — used in both the banner and the modal footer. */
    acceptButton?: string;
    /** "Reject all" — used in both the banner and the modal footer. */
    rejectButton?: string;
    /** "Manage preferences" link inside the banner. */
    manageButton?: string;
    /** "Save preferences" button in the modal footer. */
    saveButton?: string;
}

interface ConsentManagerProps {
    config: ConsentConfig;
    country?: string | null;
}
declare function ConsentManager({ config, country }: ConsentManagerProps): react_jsx_runtime.JSX.Element;

declare function ConsentBanner(): react_jsx_runtime.JSX.Element | null;

declare function PreferencesModal(): react_jsx_runtime.JSX.Element | null;

declare function ConsentButton(): react_jsx_runtime.JSX.Element | null;

declare function GTMScript(): react_jsx_runtime.JSX.Element | null;

type ResolvedConfig = Omit<Required<ConsentConfig>, "copy" | "classNames"> & {
    copy: ConsentCopy;
    classNames: Required<ConsentClassNames>;
    categories: ConsentCategory[];
};

declare function acceptAll(): void;
declare function rejectAll(): void;
declare function saveCustom(partial: Omit<ConsentPreferences, "necessary">): void;
declare function openModal(): void;
declare function closeModal(): void;
declare function isGranted(category: ConsentCategory): boolean;

/**
 * Access consent state and actions from any client component.
 * No provider needed — backed by a plain module-level store with
 * React's built-in useSyncExternalStore.
 *
 * @example
 * const { isGranted, openModal } = useConsent()
 * if (!isGranted('marketing')) return <Placeholder />
 */
declare function useConsent(): {
    record: ConsentRecord | null;
    loaded: boolean;
    showBanner: boolean;
    showModal: boolean;
    config: ResolvedConfig | null;
    acceptAll: typeof acceptAll;
    rejectAll: typeof rejectAll;
    saveCustom: typeof saveCustom;
    openModal: typeof openModal;
    closeModal: typeof closeModal;
    isGranted: typeof isGranted;
};

export { ConsentBanner, ConsentButton, type ConsentCategory, type ConsentClassNames, type ConsentConfig, type ConsentCopy, ConsentManager, type ConsentMethod, type ConsentPreferences, type ConsentRecord, GTMScript, PreferencesModal, useConsent };
