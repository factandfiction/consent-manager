# @factandfiction/consent-manager

GDPR-compliant cookie consent for Next.js with Google Tag Manager Consent Mode v2. Built for the RSC-first world — no context provider, no forced client boundaries.

## Features

- **Single component integration** — one `<ConsentManager />` in your layout, everything else is automatic
- **No provider wrapper** — consent state lives in a Zustand module-level store; your layout stays a server component
- **GTM Consent Mode v2** — correct signal sequencing (default denied → update on choice)
- **GDPR compliant** — balanced UI, easy withdrawal, 12-month expiry, audit logging
- **Geo-targeting** — banner suppressed outside EU/UK automatically via `getVisitorCountry()`
- **Re-consent** — version-stamped records, banner re-appears on policy change
- **Themeable** — Tailwind class overrides per element, full copy overrides

---

## Installation

```bash
npm install git+https://github.com/darksymm/consent-manager.git
```

### Tailwind CSS setup

This package ships its TypeScript source so Tailwind can scan the raw `.tsx` files directly — compiled output is unreliable for class detection. Add a `@source` directive pointing at the `src/` directory:

```css
/* app/globals.css */
@import "tailwindcss";
@source "../node_modules/@factandfiction/consent-manager/src";
```

> **Path is relative to your CSS file.** The example above assumes `globals.css` sits directly inside `app/` (Next.js App Router default). If yours is at `src/app/globals.css`, use `../../node_modules/...` instead.

---

## Quickstart (App Router)

### 1. Add to your root layout

```tsx
// app/layout.tsx — no 'use client', stays a server component
import { ConsentManager } from "@factandfiction/consent-manager";
import { getVisitorCountry } from "@factandfiction/consent-manager/server";
import type { ConsentConfig } from "@factandfiction/consent-manager";

const consentConfig: ConsentConfig = {
  gtmId: "GTM-XXXXXXX",
  policyVersion: "2025-01",
};

export default async function RootLayout({ children }) {
  const country = await getVisitorCountry();

  return (
    <html lang="en">
      <body>
        <ConsentManager config={consentConfig} country={country} />
        {children}
      </body>
    </html>
  );
}
```

That's it. `{children}` is never wrapped — it stays fully server-rendered. `ConsentManager` is a single client island that handles everything: GTM initialisation, consent defaults, the banner, the preferences modal, and the floating settings button.

---

## How it works

```
app/layout.tsx
  getVisitorCountry()     ← server: reads Vercel/Cloudflare/Netlify country header
  <ConsentManager />      ← client island: init + GTM defaults + full UI
  {children}              ← untouched, fully server-rendered
```

Geo-detection happens on the server. The country string is passed to `ConsentManager`, which internally decides whether to show the banner — EU/UK visitors see it, everyone else doesn't. No geo logic leaks into your layout.

Consent state lives in a Zustand store at module level. Any `'use client'` component anywhere in the tree can call `useConsent()` with no provider required.

---

## ConsentConfig

| Option             | Type                         | Default               | Description                                                                                                                                                   |
| ------------------ | ---------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `gtmId`            | `string`                     | required              | GTM container ID, e.g. `GTM-XXXXXXX`                                                                                                                          |
| `policyVersion`    | `string`                     | required              | Bump this string to trigger re-consent across all users                                                                                                       |
| `cookieName`       | `string`                     | `consent_preferences` | Name of the stored cookie                                                                                                                                     |
| `cookieMaxAgeDays` | `number`                     | `365`                 | Cookie lifetime in days (GDPR max recommended)                                                                                                                |
| `cookieDomain`     | `string`                     | current domain        | Set to `.yourdomain.com` for cross-subdomain sharing                                                                                                          |
| `geoCountries`     | `string[]`                   | EU + UK               | ISO 3166-1 alpha-2 codes that see the banner. Defaults to all EU/EEA + GB.                                                                                    |
| `waitForUpdate`    | `number`                     | `500`                 | ms GTM waits before firing tags in denied state                                                                                                               |
| `auditEndpoint`    | `string`                     | —                     | URL to POST consent records for server-side audit logging                                                                                                     |
| `categories`       | `ConsentCategory[]`          | all three             | Which categories to show in the modal. Omitted categories are always stored as `false` (denied), including when "Accept all" is clicked. e.g. `['analytics']` |
| `copy`             | `Partial<ConsentCopy>`       | see defaults          | Override any UI string                                                                                                                                        |
| `classNames`       | `Partial<ConsentClassNames>` | see defaults          | Tailwind class overrides merged into the default styles via `tailwind-merge`. Only pass what you want to change.                                              |

---

## useConsent hook

Available in any `'use client'` component — no provider needed.

```tsx
const {
  record, // ConsentRecord | null — the full stored consent record
  loaded, // true once consent has been read from the cookie
  isGranted, // (category: 'analytics' | 'marketing' | 'personalisation') => boolean
  openModal, // () => void — programmatically open the preferences modal
  acceptAll, // () => void
  rejectAll, // () => void
  saveCustom, // (prefs: { analytics, marketing, personalisation }) => void
} = useConsent();
```

---

## Components

| Component              | Description                                                                                              |
| ---------------------- | -------------------------------------------------------------------------------------------------------- |
| `<ConsentManager />`   | **The one you need.** Initialises the store, sets GTM Consent Mode v2 defaults, and renders the full UI. |
| `<ConsentBanner />`    | Banner only — for custom composition.                                                                    |
| `<PreferencesModal />` | Preferences modal only.                                                                                  |
| `<ConsentButton />`    | Floating "Cookie settings" button only.                                                                  |
| `<GTMScript />`        | GTM script loader only.                                                                                  |

---

## Customising the UI

### Categories

By default all three consent categories — `analytics`, `marketing`, and `personalisation` — are shown in the preferences modal. Use the `categories` option to restrict this to only the categories your site actually uses. Any category you omit is permanently stored as `false` (denied) and is never shown to the user, including when "Accept all" is clicked.

```tsx
const consentConfig: ConsentConfig = {
  gtmId: "GTM-XXXXXXX",
  policyVersion: "2025-01",
  // Only ask about analytics — marketing and personalisation are hidden and always denied
  categories: ["analytics"],
};
```

GTM Consent Mode v2 signals for omitted categories will always fire as `denied`, which is the correct GDPR-safe default.

### Class name slots

Every visual element has a named slot in `classNames`. Classes you provide are merged into the defaults using `tailwind-merge`, so conflicting utilities are resolved automatically and everything you don't mention is left unchanged. Only pass what you want to override.

Structural classes (fixed positioning, z-index, flex layout, overflow, animations) are always applied and cannot be affected.

```tsx
const consentConfig: ConsentConfig = {
  gtmId: "GTM-XXXXXXX",
  policyVersion: "2025-01",
  classNames: {
    // Swap background and border colours — all other banner styles are kept
    banner: "bg-zinc-900 border-zinc-700",

    // Change the accept button to indigo — size, layout, and hover styles are kept
    acceptButton: "bg-indigo-600 dark:bg-indigo-600 dark:text-white",

    // Swap the toggle active colour
    toggleTrack: "peer-checked:bg-indigo-600 dark:peer-checked:bg-indigo-600",
  },
};
```

All slots and what they control:

| Slot                  | Element                                                    |
| --------------------- | ---------------------------------------------------------- |
| `banner`              | Banner card — bg, border, shadow, padding, rounded corners |
| `bannerTitle`         | Banner title text                                          |
| `bannerDescription`   | Banner body text                                           |
| `overlay`             | Modal full-screen backdrop                                 |
| `modal`               | Modal panel — bg, max-width, padding, rounded corners      |
| `modalTitle`          | Modal title text                                           |
| `closeButton`         | Modal ✕ close button                                       |
| `categoryRow`         | Each category row — border, padding                        |
| `categoryLabel`       | Category name text                                         |
| `categoryDescription` | Category description text                                  |
| `alwaysOnBadge`       | "Always on" badge next to necessary cookies                |
| `toggleTrack`         | Toggle background — off/on state colors                    |
| `toggleThumb`         | Toggle sliding handle                                      |
| `acceptButton`        | "Accept all" — banner **and** modal footer                 |
| `rejectButton`        | "Reject all" — banner **and** modal footer                 |
| `manageButton`        | "Manage preferences" link in banner                        |
| `saveButton`          | "Save preferences" in modal footer                         |

### Copy

```tsx
copy: {
  bannerTitle: 'Your privacy, your choice',
  bannerDescription: 'We use cookies to improve your experience.',
  acceptAll: 'Accept all',
  rejectAll: 'Reject all',
  managePreferences: 'Manage preferences',
  // All fields are optional — unset fields use the defaults
}
```

---

## Composing the UI manually

If you need to suppress a component or render pieces in different locations, import them individually. You'll need to call `useConsentStore().init()` yourself in this case:

```tsx
// app/layout.tsx
import {
  GTMScript,
  ConsentBanner,
  PreferencesModal,
} from "@factandfiction/consent-manager";
// ConsentButton is omitted — a custom one lives in the footer
```

```tsx
// components/Footer.tsx — custom cookie settings link
"use client";
import { useConsent } from "@factandfiction/consent-manager";

export function Footer() {
  const { openModal } = useConsent();
  return (
    <footer>
      <button onClick={openModal}>Cookie settings</button>
    </footer>
  );
}
```

---

## Audit logging

Pass `auditEndpoint: '/api/consent-audit'` in your config, then create the API route. Each consent action POSTs a record containing version, timestamp, preferences, method, and user agent.

```ts
// app/api/consent-audit/route.ts
import { NextResponse } from "next/server";
import type { ConsentRecord } from "@factandfiction/consent-manager";

export async function POST(request: Request) {
  const record = (await request.json()) as ConsentRecord;
  await db.consentAudit.create({ data: record });
  return NextResponse.json({ ok: true }, { status: 201 });
}
```

---

## Re-consent

Bump `policyVersion` in your config whenever your cookie policy materially changes:

```ts
policyVersion: '2025-01'  →  policyVersion: '2025-06'
```

Any stored record with a mismatched version is treated as stale and the banner re-appears on the user's next visit.

---

## Google Tag Manager setup

This library implements GTM Consent Mode v2 and handles all signal sequencing automatically. You still need to configure GTM to respect those signals.

### 1. Enable Consent Mode in your GTM container

1. Open your GTM container and go to **Admin → Container Settings**.
2. Under **Additional Settings**, enable **Consent Overview** (the shield icon).
3. Click **Save**.

### 2. Set consent defaults on your tags

For every tag that fires analytics, advertising, or personalisation data:

1. Open the tag, expand **Consent Settings** (the shield icon at the bottom of the tag editor).
2. Select **Require additional consent for tag to fire**.
3. Tick the relevant consent type(s):
   - Analytics tags (GA4, etc.) → `analytics_storage`
   - Advertising/remarketing tags → `ad_storage` + `ad_user_data` + `ad_personalization`
   - Personalisation tags → `functionality_storage` (mapped from `personalisation` in this library)
4. Save and publish.

Tags without these settings will fire unconditionally — **you must configure consent checks on each tag yourself**.

### 3. Consent Mode signal mapping

This library pushes the following `gtag('consent', 'update', …)` signals to the `dataLayer`. Map your tag consent checks to the GTM built-in consent types accordingly:

| Consent category  | GTM consent type(s) updated                        |
| ----------------- | -------------------------------------------------- |
| `analytics`       | `analytics_storage`                                |
| `marketing`       | `ad_storage`, `ad_user_data`, `ad_personalization` |
| `personalisation` | `functionality_storage`                            |
| (always)          | `security_storage` → `granted`                     |

Defaults (`denied`) are pushed before GTM loads so no tag fires before the user has chosen.

### 4. Verify in GTM Preview

1. Click **Preview** in GTM and navigate to your site.
2. Open the **Consent** tab in the Tag Assistant panel.
3. Confirm that on page load all relevant consent types show **Denied (Default)**.
4. Accept cookies on the banner — confirm the types update to **Granted**.
5. Reject all — confirm they return to **Denied**.

### 5. Google tags (GA4 / Google Ads)

If you use GA4 or Google Ads via GTM, also enable **Consent Mode** in your Google tag configuration:

- In your GA4 Configuration tag, under **Consent Settings**, set the tag to **No additional consent required** — GA4 reads `analytics_storage` automatically when Consent Mode is active at the container level.
- For Google Ads Conversion tags, set **Consent type** to `ad_storage` + `ad_user_data`.

> **Tip:** Use the [Google Tag Assistant](https://tagassistant.google.com/) browser extension alongside GTM Preview to confirm that GA4 and Ads tags are firing (or withholding) correctly based on consent state.

---

## Publishing

```bash
npm run build
npm publish
```
