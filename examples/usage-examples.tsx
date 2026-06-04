"use client";

/**
 * Examples of using the useConsent hook in your own client components.
 *
 * Because consent state lives in a Zustand store (not React context),
 * useConsent() works in any 'use client' component regardless of where
 * it sits in the tree — no provider ancestor needed.
 */

import { useConsent } from "@factandfiction/consent-manager";

// ─── Pattern 1: Push events to GTM's dataLayer ───────────────────────────────

export function useDataLayer() {
  function push(event: string, data: Record<string, unknown> = {}) {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...data });
  }
  return { push };
}

// ─── Pattern 2: Consent-gated inline embeds ──────────────────────────────────
// The one case where checking consent in React IS appropriate: inline embeds
// like YouTube iframes or Google Maps that render directly in your JSX.
// Tracking pixels and analytics scripts always go through GTM — not here.

export function ConsentGatedEmbed({
  src,
  category,
  placeholder = "Accept cookies to view this content.",
}: {
  src: string;
  category: "analytics" | "marketing" | "personalisation";
  placeholder?: string;
}) {
  const { isGranted, openModal } = useConsent();

  if (!isGranted(category)) {
    return (
      <div
        style={{
          padding: "2rem",
          textAlign: "center",
          border: "1px dashed #ccc",
          borderRadius: 8,
          color: "#666",
          fontSize: 14,
        }}
      >
        <p style={{ margin: "0 0 12px" }}>{placeholder}</p>
        <button
          onClick={openModal}
          style={{
            padding: "8px 16px",
            cursor: "pointer",
            borderRadius: 6,
            border: "1px solid #999",
            background: "none",
            fontSize: 13,
          }}
        >
          Manage cookie preferences
        </button>
      </div>
    );
  }

  return (
    <iframe
      src={src}
      style={{ width: "100%", border: "none" }}
      allowFullScreen
    />
  );
}

// ─── Pattern 3: Footer cookie settings link ───────────────────────────────────

export function CookieSettingsLink() {
  const { openModal } = useConsent();

  return (
    <button
      onClick={openModal}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        color: "inherit",
        fontSize: "inherit",
        textDecoration: "underline",
      }}
    >
      Cookie settings
    </button>
  );
}

// ─── Pattern 4: Read the raw consent record ───────────────────────────────────

export function ConsentDebugPanel() {
  const { record, loaded } = useConsent();

  if (!loaded) return <p>Loading consent state…</p>;
  if (!record) return <p>No consent recorded yet.</p>;

  return (
    <dl style={{ fontSize: 13, lineHeight: 1.6 }}>
      <dt>Policy version</dt>
      <dd>{record.version}</dd>
      <dt>Consented at</dt>
      <dd>{new Date(record.timestamp).toLocaleString()}</dd>
      <dt>Method</dt>
      <dd>{record.method}</dd>
      <dt>Analytics</dt>
      <dd>{record.preferences.analytics ? "Granted" : "Denied"}</dd>
      <dt>Marketing</dt>
      <dd>{record.preferences.marketing ? "Granted" : "Denied"}</dd>
      <dt>Personalisation</dt>
      <dd>{record.preferences.personalisation ? "Granted" : "Denied"}</dd>
    </dl>
  );
}
