import { ALL_CATEGORIES } from "../types";
import type {
  ConsentCategory,
  ConsentClassNames,
  ConsentConfig,
  ConsentCopy,
} from "../types";
import { cn } from "./cn";

// ─── Resolved config type ─────────────────────────────────────────────────────

export type ResolvedConfig = Omit<
  Required<ConsentConfig>,
  "copy" | "classNames"
> & {
  copy: ConsentCopy;
  classNames: Required<ConsentClassNames>;
  categories: ConsentCategory[];
};

// ─── EU/EEA + UK country codes ────────────────────────────────────────────────

export const EU_COUNTRIES = [
  "AT",
  "BE",
  "BG",
  "CY",
  "CZ",
  "DE",
  "DK",
  "EE",
  "ES",
  "FI",
  "FR",
  "GR",
  "HR",
  "HU",
  "IE",
  "IT",
  "LT",
  "LU",
  "LV",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SE",
  "SI",
  "SK",
  // EEA
  "IS",
  "LI",
  "NO",
  // UK
  "GB",
];

// ─── Default copy ─────────────────────────────────────────────────────────────

export const DEFAULT_COPY: ConsentCopy = {
  bannerTitle: "We use cookies",
  bannerDescription:
    "We use cookies and similar technologies to improve your experience, analyse traffic, and serve personalised content. You can manage your preferences at any time.",
  acceptAll: "Accept all",
  rejectAll: "Reject all",
  managePreferences: "Manage preferences",
  modalTitle: "Cookie preferences",
  savePreferences: "Save preferences",
  cookieSettingsLabel: "Cookie settings",
  categories: {
    necessary: {
      label: "Strictly necessary",
      description:
        "These cookies are required for the website to function and cannot be switched off. They are usually set in response to actions you take, such as setting privacy preferences or logging in.",
    },
    analytics: {
      label: "Analytics",
      description:
        "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. They help us improve our site.",
    },
    marketing: {
      label: "Marketing",
      description:
        "These cookies are used to track visitors across websites to display relevant advertisements. They are set by advertising partners and help build a profile of your interests.",
    },
    personalisation: {
      label: "Personalisation",
      description:
        "These cookies allow the website to remember choices you make and provide enhanced, personalised features such as remembering your language or region.",
    },
  },
};

// ─── Default class names ──────────────────────────────────────────────────────

export const DEFAULT_CLASSNAMES: Required<ConsentClassNames> = {
  // Banner
  banner:
    "rounded-xl border border-neutral-200 bg-white p-5 shadow-lg dark:border-neutral-700 dark:bg-neutral-900",
  bannerTitle:
    "mb-1.5 text-sm font-semibold text-neutral-900 dark:text-neutral-50",
  bannerDescription:
    "mb-4 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400",

  // Modal
  overlay: "bg-black/45",
  modal: "max-w-lg rounded-t-xl sm:rounded-xl bg-white dark:bg-neutral-900 p-6",
  modalTitle: "text-base font-semibold text-neutral-900 dark:text-neutral-50",
  closeButton:
    "rounded-md p-1 text-xl leading-none text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300 transition-colors",

  // Categories
  categoryRow: "border-t border-neutral-200 dark:border-neutral-700 py-4",
  categoryLabel: "text-sm font-medium text-neutral-900 dark:text-neutral-50",
  categoryDescription:
    "text-xs leading-relaxed text-neutral-500 dark:text-neutral-400",
  alwaysOnBadge:
    "rounded-full px-2 py-0.5 text-[11px] bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400",

  // Toggle
  toggleTrack:
    "absolute inset-0 rounded-full transition-colors duration-200 bg-neutral-300 peer-checked:bg-neutral-900 dark:bg-neutral-600 dark:peer-checked:bg-white peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
  toggleThumb:
    "absolute left-0.5 top-0.5 h-[18px] w-[18px] rounded-full bg-white shadow-sm transition-transform duration-200 peer-checked:translate-x-4 dark:peer-checked:bg-neutral-900",

  // Buttons
  baseButton:
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-xs font-medium transition-opacity hover:opacity-80",
  acceptButton: "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900",
  rejectButton:
    "border border-neutral-300 text-neutral-900 dark:border-neutral-600 dark:text-neutral-100",
  manageButton:
    "px-1 py-2 text-neutral-400 hover:opacity-80 dark:text-neutral-500",
  saveButton:
    "border border-neutral-300 text-neutral-900 dark:border-neutral-600 dark:text-neutral-100",
};

// ─── Resolve config with defaults ─────────────────────────────────────────────

export function resolveConfig(config: ConsentConfig): ResolvedConfig {
  return {
    gtmId: config.gtmId,
    policyVersion: config.policyVersion,
    cookieName: config.cookieName ?? "consent_preferences",
    cookieMaxAgeDays: config.cookieMaxAgeDays ?? 365,
    cookieDomain: config.cookieDomain ?? "",
    geoCountries: config.geoCountries ?? EU_COUNTRIES,
    waitForUpdate: config.waitForUpdate ?? 500,
    auditEndpoint: config.auditEndpoint ?? "",
    copy: {
      ...DEFAULT_COPY,
      ...config.copy,
      categories: {
        necessary: { ...DEFAULT_COPY.categories.necessary, ...config.copy?.categories?.necessary },
        analytics: { ...DEFAULT_COPY.categories.analytics, ...config.copy?.categories?.analytics },
        marketing: { ...DEFAULT_COPY.categories.marketing, ...config.copy?.categories?.marketing },
        personalisation: { ...DEFAULT_COPY.categories.personalisation, ...config.copy?.categories?.personalisation },
      },
    },
    classNames: (
      Object.keys(DEFAULT_CLASSNAMES) as (keyof ConsentClassNames)[]
    ).reduce((acc, key) => {
      acc[key] = cn(DEFAULT_CLASSNAMES[key], config.classNames?.[key]);
      return acc;
    }, {} as Required<ConsentClassNames>),
    categories: config.categories ?? ALL_CATEGORIES,
  };
}
