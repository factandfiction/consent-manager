"use client";
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  ConsentBanner: () => ConsentBanner,
  ConsentManager: () => ConsentManager,
  GTMScript: () => GTMScript,
  PreferencesModal: () => PreferencesModal,
  useConsent: () => useConsent
});
module.exports = __toCommonJS(src_exports);

// src/components/ConsentManager.tsx
var import_react3 = require("react");

// src/store/consentStore.ts
var import_react = require("react");

// src/types/index.ts
var ALL_CATEGORIES = [
  "analytics",
  "marketing",
  "personalisation"
];

// src/lib/cn.ts
var import_clsx = require("clsx");
var import_tailwind_merge = require("tailwind-merge");
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.clsx)(inputs));
}

// src/lib/defaults.ts
var EU_COUNTRIES = [
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
  "GB"
];
var DEFAULT_COPY = {
  bannerTitle: "We use cookies",
  bannerDescription: "We use cookies and similar technologies to improve your experience, analyse traffic, and serve personalised content. You can manage your preferences at any time.",
  acceptAll: "Accept all",
  rejectAll: "Reject all",
  managePreferences: "Manage preferences",
  modalTitle: "Cookie preferences",
  savePreferences: "Save preferences",
  cookieSettingsLabel: "Cookie settings",
  categories: {
    necessary: {
      label: "Strictly necessary",
      description: "These cookies are required for the website to function and cannot be switched off. They are usually set in response to actions you take, such as setting privacy preferences or logging in."
    },
    analytics: {
      label: "Analytics",
      description: "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. They help us improve our site."
    },
    marketing: {
      label: "Marketing",
      description: "These cookies are used to track visitors across websites to display relevant advertisements. They are set by advertising partners and help build a profile of your interests."
    },
    personalisation: {
      label: "Personalisation",
      description: "These cookies allow the website to remember choices you make and provide enhanced, personalised features such as remembering your language or region."
    }
  }
};
var DEFAULT_CLASSNAMES = {
  // Banner
  banner: "rounded-xl border border-neutral-200 bg-white p-5 shadow-lg dark:border-neutral-700 dark:bg-neutral-900",
  bannerTitle: "mb-1.5 text-sm font-semibold text-neutral-900 dark:text-neutral-50",
  bannerDescription: "mb-4 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400",
  // Modal
  overlay: "bg-black/45",
  modal: "rounded-t-xl sm:rounded-xl bg-white dark:bg-neutral-900 p-6",
  modalTitle: "text-base font-semibold text-neutral-900 dark:text-neutral-50",
  closeButton: "rounded-md p-1 text-xl leading-none text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300 transition-colors",
  // Categories
  categoryRow: "border-t border-neutral-200 dark:border-neutral-700 py-4",
  categoryLabel: "text-sm font-medium text-neutral-900 dark:text-neutral-50",
  categoryDescription: "text-xs leading-relaxed text-neutral-500 dark:text-neutral-400",
  alwaysOnBadge: "rounded-full px-2 py-0.5 text-[11px] bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400",
  // Toggle
  toggleTrack: "absolute inset-0 rounded-full transition-colors duration-200 bg-neutral-300 peer-checked:bg-neutral-900 dark:bg-neutral-600 dark:peer-checked:bg-white peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
  toggleThumb: "absolute left-0.5 top-0.5 h-[18px] w-[18px] rounded-full bg-white shadow-sm transition-transform duration-200 peer-checked:translate-x-4 dark:peer-checked:bg-neutral-900",
  // Buttons
  baseButton: "inline-flex items-center justify-center rounded-lg px-4 py-2 text-xs font-medium transition-opacity hover:opacity-80",
  acceptButton: "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900",
  rejectButton: "border border-neutral-300 text-neutral-900 dark:border-neutral-600 dark:text-neutral-100",
  manageButton: "px-1 py-2 text-neutral-400 hover:opacity-80 dark:text-neutral-500",
  saveButton: "border border-neutral-300 text-neutral-900 dark:border-neutral-600 dark:text-neutral-100"
};
function resolveConfig(config) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o;
  return {
    gtmId: config.gtmId,
    policyVersion: config.policyVersion,
    cookieName: (_a = config.cookieName) != null ? _a : "consent_preferences",
    cookieMaxAgeDays: (_b = config.cookieMaxAgeDays) != null ? _b : 365,
    cookieDomain: (_c = config.cookieDomain) != null ? _c : "",
    geoCountries: (_d = config.geoCountries) != null ? _d : EU_COUNTRIES,
    waitForUpdate: (_e = config.waitForUpdate) != null ? _e : 500,
    auditEndpoint: (_f = config.auditEndpoint) != null ? _f : "",
    copy: __spreadProps(__spreadValues(__spreadValues({}, DEFAULT_COPY), config.copy), {
      categories: {
        necessary: __spreadValues(__spreadValues({}, DEFAULT_COPY.categories.necessary), (_h = (_g = config.copy) == null ? void 0 : _g.categories) == null ? void 0 : _h.necessary),
        analytics: __spreadValues(__spreadValues({}, DEFAULT_COPY.categories.analytics), (_j = (_i = config.copy) == null ? void 0 : _i.categories) == null ? void 0 : _j.analytics),
        marketing: __spreadValues(__spreadValues({}, DEFAULT_COPY.categories.marketing), (_l = (_k = config.copy) == null ? void 0 : _k.categories) == null ? void 0 : _l.marketing),
        personalisation: __spreadValues(__spreadValues({}, DEFAULT_COPY.categories.personalisation), (_n = (_m = config.copy) == null ? void 0 : _m.categories) == null ? void 0 : _n.personalisation)
      }
    }),
    classNames: Object.keys(DEFAULT_CLASSNAMES).reduce((acc, key) => {
      var _a2;
      acc[key] = cn(DEFAULT_CLASSNAMES[key], (_a2 = config.classNames) == null ? void 0 : _a2[key]);
      return acc;
    }, {}),
    categories: (_o = config.categories) != null ? _o : ALL_CATEGORIES
  };
}

// src/lib/storage.ts
function setCookie(name, value, maxAgeDays, domain) {
  if (typeof document === "undefined") return;
  const maxAge = maxAgeDays * 24 * 60 * 60;
  const domainStr = domain ? `; domain=${domain}` : "";
  const secureStr = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/; SameSite=Lax${secureStr}${domainStr}`;
}
function getCookie(name) {
  if (typeof document === "undefined") return null;
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}
function readConsentRecord(cookieName) {
  const raw = getCookie(cookieName);
  if (!raw) return null;
  try {
    const record = JSON.parse(raw);
    if (!record.version || !record.timestamp || !record.preferences)
      return null;
    return record;
  } catch (e) {
    return null;
  }
}
function writeConsentRecord(record, cookieName, maxAgeDays, domain) {
  setCookie(cookieName, JSON.stringify(record), maxAgeDays, domain);
}
function buildConsentRecord(preferences, method, policyVersion) {
  return {
    version: policyVersion,
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    preferences,
    method,
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : void 0
  };
}
function isConsentFresh(record, policyVersion, maxAgeDays) {
  if (!record) return false;
  if (record.version !== policyVersion) return false;
  const ageMs = Date.now() - new Date(record.timestamp).getTime();
  const maxAgeMs = maxAgeDays * 24 * 60 * 60 * 1e3;
  return ageMs < maxAgeMs;
}

// src/lib/gtm.ts
function initDataLayer() {
  var _a;
  if (typeof window === "undefined") return;
  window.dataLayer = (_a = window.dataLayer) != null ? _a : [];
}
function gtag(...args) {
  if (typeof window === "undefined") return;
  initDataLayer();
  window.dataLayer.push(arguments);
}
function setConsentDefault(waitForUpdate) {
  gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    functionality_storage: "granted",
    personalization_storage: "denied",
    wait_for_update: waitForUpdate
  });
}
function updateConsent(prefs) {
  gtag("consent", "update", {
    analytics_storage: prefs.analytics ? "granted" : "denied",
    ad_storage: prefs.marketing ? "granted" : "denied",
    ad_user_data: prefs.marketing ? "granted" : "denied",
    ad_personalization: prefs.personalisation ? "granted" : "denied",
    functionality_storage: "granted",
    personalization_storage: prefs.personalisation ? "granted" : "denied"
  });
}
function pushConsentEvent(event, preferences) {
  if (typeof window === "undefined") return;
  initDataLayer();
  window.dataLayer.push({
    event,
    consent_analytics: preferences.analytics,
    consent_marketing: preferences.marketing,
    consent_personalisation: preferences.personalisation
  });
}
var ANALYTICS_COOKIE_PATTERNS = [/^_ga/, /^_gid$/, /^_gat/, /^_gcl_/];
var MARKETING_COOKIE_PATTERNS = [/^_gcl_aw$/, /^_gcl_dc$/, /^_gcl_gb$/, /^IDE$/, /^DSID$/];
function deleteCookieOnAllPaths(name) {
  const domains = [location.hostname, "." + location.hostname, "." + location.hostname.replace(/^www\./, "")];
  for (const domain of domains) {
    for (const path of ["/", "/"]) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}; domain=${domain}`;
    }
  }
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}
function deleteConsentCookies(prefs) {
  if (typeof window === "undefined") return;
  const patterns = [];
  if (!prefs.analytics) patterns.push(...ANALYTICS_COOKIE_PATTERNS);
  if (!prefs.marketing) patterns.push(...MARKETING_COOKIE_PATTERNS);
  if (patterns.length === 0) return;
  document.cookie.split(";").forEach((c) => {
    const name = c.trim().split("=")[0];
    if (patterns.some((p) => p.test(name))) {
      deleteCookieOnAllPaths(name);
    }
  });
}

// src/lib/audit.ts
async function auditConsent(record, endpoint) {
  if (!endpoint) return;
  try {
    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
      // keepalive ensures the request completes even if the user navigates away
      keepalive: true
    });
  } catch (e) {
  }
}

// src/store/consentStore.ts
var state = {
  record: null,
  loaded: false,
  showBanner: false,
  showModal: false,
  config: null
};
var listeners = /* @__PURE__ */ new Set();
function setState(next) {
  state = __spreadValues(__spreadValues({}, state), next);
  listeners.forEach((l) => l());
}
function getState() {
  return state;
}
function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
function useConsentStore() {
  return (0, import_react.useSyncExternalStore)(subscribe, getState, getState);
}
function init(rawConfig, geoAllowed) {
  if (state.loaded) return;
  const config = resolveConfig(rawConfig);
  initDataLayer();
  setConsentDefault(config.waitForUpdate);
  const existing = readConsentRecord(config.cookieName);
  const fresh = isConsentFresh(
    existing,
    config.policyVersion,
    config.cookieMaxAgeDays
  );
  if (fresh && existing) {
    updateConsent(existing.preferences);
    setState({ record: existing, config, loaded: true, showBanner: false });
  } else if (geoAllowed) {
    setState({ config, loaded: true, showBanner: true });
  } else {
    updateConsent({
      necessary: true,
      analytics: config.categories.includes("analytics"),
      marketing: config.categories.includes("marketing"),
      personalisation: config.categories.includes("personalisation")
    });
    setState({ config, loaded: true, showBanner: false });
  }
}
function acceptAll() {
  const { config } = state;
  if (!config) return;
  const prefs = {
    necessary: true,
    analytics: config.categories.includes("analytics"),
    marketing: config.categories.includes("marketing"),
    personalisation: config.categories.includes("personalisation")
  };
  const record = persist(prefs, "accept_all", config);
  pushConsentEvent("consent_accepted", prefs);
  setState({ record, showBanner: false, showModal: false });
}
function rejectAll() {
  const { config } = state;
  if (!config) return;
  const prefs = {
    necessary: true,
    analytics: false,
    marketing: false,
    personalisation: false
  };
  const record = persist(prefs, "reject_all", config);
  deleteConsentCookies(prefs);
  pushConsentEvent("consent_rejected", prefs);
  setState({ record, showBanner: false, showModal: false });
}
function saveCustom(partial) {
  const { config } = state;
  if (!config) return;
  const prefs = __spreadValues({ necessary: true }, partial);
  const record = persist(prefs, "custom", config);
  deleteConsentCookies(prefs);
  pushConsentEvent("consent_customised", prefs);
  setState({ record, showBanner: false, showModal: false });
}
function openModal() {
  setState({ showModal: true });
}
function closeModal() {
  setState({ showModal: false });
}
function isGranted(category) {
  var _a;
  return ((_a = state.record) == null ? void 0 : _a.preferences[category]) === true;
}
function persist(preferences, method, config) {
  const record = buildConsentRecord(preferences, method, config.policyVersion);
  writeConsentRecord(
    record,
    config.cookieName,
    config.cookieMaxAgeDays,
    config.cookieDomain || void 0
  );
  updateConsent(preferences);
  if (config.auditEndpoint) {
    void auditConsent(record, config.auditEndpoint);
  }
  return record;
}

// src/lib/geo.ts
function shouldShowBanner(country, geoCountries) {
  if (geoCountries.length === 0) return true;
  if (country === null) return true;
  return geoCountries.includes(country);
}

// src/components/GTMScript.tsx
var import_script = __toESM(require("next/script"));
var import_jsx_runtime = require("react/jsx-runtime");
function GTMScript() {
  const { config } = useConsentStore();
  if (!(config == null ? void 0 : config.gtmId)) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_script.default,
    {
      id: "gtm-script",
      strategy: "afterInteractive",
      dangerouslySetInnerHTML: {
        __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${config.gtmId}');
        `.trim()
      }
    }
  );
}

// src/components/ConsentBanner.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function ConsentBanner() {
  const { showBanner, config } = useConsentStore();
  if (!showBanner || !config) return null;
  const { copy, classNames } = config;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    "div",
    {
      role: "region",
      "aria-label": copy.bannerTitle,
      className: cn(
        "fixed bottom-3 right-3 ml-3 mt-3 md:bottom-6 md:right-6 md:ml-6 md:mt-6 z-[9999] max-w-[54ch]",
        "animate-in fade-in slide-in-from-bottom-3 duration-200",
        classNames.banner
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: classNames.bannerTitle, children: copy.bannerTitle }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: classNames.bannerDescription, children: copy.bannerDescription }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex flex-wrap gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "button",
            {
              onClick: acceptAll,
              className: cn([classNames.baseButton, classNames.acceptButton]),
              children: copy.acceptAll
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "button",
            {
              onClick: rejectAll,
              className: cn([classNames.baseButton, classNames.rejectButton]),
              children: copy.rejectAll
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "button",
            {
              onClick: openModal,
              className: cn([classNames.baseButton, classNames.manageButton]),
              children: copy.managePreferences
            }
          )
        ] })
      ]
    }
  );
}

// src/components/PreferencesModal.tsx
var import_react2 = require("react");
var import_jsx_runtime3 = require("react/jsx-runtime");
function PreferencesModal() {
  const { showModal, record, config } = useConsentStore();
  const [prefs, setPrefs] = (0, import_react2.useState)({
    analytics: false,
    marketing: false,
    personalisation: false
  });
  (0, import_react2.useEffect)(() => {
    if (record) {
      setPrefs({
        analytics: record.preferences.analytics,
        marketing: record.preferences.marketing,
        personalisation: record.preferences.personalisation
      });
    }
  }, [record, showModal]);
  (0, import_react2.useEffect)(() => {
    if (!showModal) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showModal]);
  if (!showModal || !config) return null;
  const { copy, classNames } = config;
  const toggle = (key) => setPrefs((p) => __spreadProps(__spreadValues({}, p), { [key]: !p[key] }));
  const categories = [
    { key: "analytics", copy: copy.categories.analytics },
    { key: "marketing", copy: copy.categories.marketing },
    { key: "personalisation", copy: copy.categories.personalisation }
  ].filter(({ key }) => config.categories.includes(key));
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    "div",
    {
      className: cn(
        "fixed inset-0 z-[10000] flex items-end justify-center sm:items-center",
        "animate-in fade-in duration-200",
        classNames.overlay
      ),
      onClick: (e) => {
        if (e.target === e.currentTarget) closeModal();
      },
      role: "dialog",
      "aria-modal": "true",
      "aria-label": copy.modalTitle,
      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
        "div",
        {
          className: cn(
            "w-full max-w-[64ch] max-h-[90vh] overflow-y-auto",
            "animate-in slide-in-from-bottom-4 duration-200",
            classNames.modal
          ),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center justify-between mb-5", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h2", { className: classNames.modalTitle, children: copy.modalTitle }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "button",
                {
                  onClick: closeModal,
                  "aria-label": "Close",
                  className: classNames.closeButton,
                  children: "\u2715"
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: classNames.categoryRow, children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center justify-between mb-1.5", children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: classNames.categoryLabel, children: copy.categories.necessary.label }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: classNames.alwaysOnBadge, children: "Always on" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: classNames.categoryDescription, children: copy.categories.necessary.description })
            ] }),
            categories.map(({ key, copy: catCopy }) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: classNames.categoryRow, children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center justify-between mb-1.5", children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: classNames.categoryLabel, children: catCopy.label }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("label", { className: "relative inline-flex h-6 w-10 flex-shrink-0 cursor-pointer items-center", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "input",
                    {
                      type: "checkbox",
                      className: "peer sr-only",
                      checked: prefs[key],
                      onChange: () => toggle(key),
                      "aria-label": `${catCopy.label} cookies`
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: classNames.toggleTrack }),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: classNames.toggleThumb })
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: classNames.categoryDescription, children: catCopy.description })
            ] }, key)),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "mt-5 flex flex-wrap justify-end gap-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "button",
                {
                  onClick: rejectAll,
                  className: cn([classNames.baseButton, classNames.rejectButton]),
                  children: copy.rejectAll
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "button",
                {
                  onClick: () => saveCustom(prefs),
                  className: cn([classNames.baseButton, classNames.saveButton]),
                  children: copy.savePreferences
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "button",
                {
                  onClick: acceptAll,
                  className: cn([classNames.baseButton, classNames.acceptButton]),
                  children: copy.acceptAll
                }
              )
            ] })
          ]
        }
      )
    }
  );
}

// src/components/ConsentManager.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
function ConsentManager({ config, country }) {
  var _a;
  const geoAllowed = shouldShowBanner(
    country != null ? country : null,
    (_a = config.geoCountries) != null ? _a : EU_COUNTRIES
  );
  (0, import_react3.useEffect)(() => {
    init(config, geoAllowed);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(GTMScript, {}),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ConsentBanner, {}),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(PreferencesModal, {})
  ] });
}

// src/hooks/useConsent.ts
function useConsent() {
  const { record, loaded, showBanner, showModal, config } = useConsentStore();
  return {
    record,
    loaded,
    showBanner,
    showModal,
    config,
    acceptAll,
    rejectAll,
    saveCustom,
    openModal,
    closeModal,
    isGranted
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ConsentBanner,
  ConsentManager,
  GTMScript,
  PreferencesModal,
  useConsent
});
//# sourceMappingURL=index.js.map