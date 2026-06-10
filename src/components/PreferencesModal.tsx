"use client";

import React, { useEffect, useState } from "react";
import {
  useConsentStore,
  acceptAll,
  rejectAll,
  saveCustom,
  closeModal,
} from "../store/consentStore";
import { cn } from "./styles";
import type { ConsentPreferences } from "../types";

export function PreferencesModal() {
  const { showModal, record, config } = useConsentStore();

  const [prefs, setPrefs] = useState<Omit<ConsentPreferences, "necessary">>({
    analytics: false,
    marketing: false,
    personalisation: false,
  });

  useEffect(() => {
    if (record) {
      setPrefs({
        analytics: record.preferences.analytics,
        marketing: record.preferences.marketing,
        personalisation: record.preferences.personalisation,
      });
    }
  }, [record, showModal]);

  useEffect(() => {
    if (!showModal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showModal]);

  if (!showModal || !config) return null;

  const { copy, classNames } = config;
  const toggle = (key: keyof typeof prefs) =>
    setPrefs((p) => ({ ...p, [key]: !p[key] }));

  const categories: Array<{
    key: keyof typeof prefs;
    copy: typeof copy.categories.analytics;
  }> = (
    [
      { key: "analytics", copy: copy.categories.analytics },
      { key: "marketing", copy: copy.categories.marketing },
      { key: "personalisation", copy: copy.categories.personalisation },
    ] as const
  ).filter(({ key }) => config.categories.includes(key));

  return (
    <div
      className={cn(
        "fixed inset-0 z-[10000] flex items-end justify-center sm:items-center",
        "animate-in fade-in duration-200",
        classNames.overlay,
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={copy.modalTitle}
    >
      <div
        className={cn(
          "w-full max-w-[64ch] max-h-[90vh] overflow-y-auto",
          "animate-in slide-in-from-bottom-4 duration-200",
          classNames.modal,
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className={classNames.modalTitle}>{copy.modalTitle}</h2>
          <button
            onClick={closeModal}
            aria-label="Close"
            className={classNames.closeButton}
          >
            ✕
          </button>
        </div>

        {/* Necessary — always on */}
        <div className={classNames.categoryRow}>
          <div className="flex items-center justify-between mb-1.5">
            <span className={classNames.categoryLabel}>
              {copy.categories.necessary.label}
            </span>
            <span className={classNames.alwaysOnBadge}>Always on</span>
          </div>
          <p className={classNames.categoryDescription}>
            {copy.categories.necessary.description}
          </p>
        </div>

        {/* Configurable categories */}
        {categories.map(({ key, copy: catCopy }) => (
          <div key={key} className={classNames.categoryRow}>
            <div className="flex items-center justify-between mb-1.5">
              <span className={classNames.categoryLabel}>{catCopy.label}</span>

              {/* Toggle */}
              <label className="relative inline-flex h-6 w-10 flex-shrink-0 cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={prefs[key]}
                  onChange={() => toggle(key)}
                  aria-label={`${catCopy.label} cookies`}
                />
                <span className={classNames.toggleTrack} />
                <span className={classNames.toggleThumb} />
              </label>
            </div>
            <p className={classNames.categoryDescription}>
              {catCopy.description}
            </p>
          </div>
        ))}

        {/* Footer */}
        <div className="mt-5 flex flex-wrap justify-end gap-2">
          <button
            onClick={rejectAll}
            className={cn([classNames.baseButton, classNames.rejectButton])}
          >
            {copy.rejectAll}
          </button>
          <button
            onClick={() => saveCustom(prefs)}
            className={cn([classNames.baseButton, classNames.saveButton])}
          >
            {copy.savePreferences}
          </button>
          <button
            onClick={acceptAll}
            className={cn([classNames.baseButton, classNames.acceptButton])}
          >
            {copy.acceptAll}
          </button>
        </div>
      </div>
    </div>
  );
}
