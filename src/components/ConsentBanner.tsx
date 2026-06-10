"use client";

import {
  useConsentStore,
  acceptAll,
  rejectAll,
  openModal,
} from "../store/consentStore";
import { cn } from "./styles";

export function ConsentBanner() {
  const { showBanner, config } = useConsentStore();

  if (!showBanner || !config) return null;

  const { copy, classNames } = config;

  return (
    <div
      role="region"
      aria-label={copy.bannerTitle}
      className={cn(
        "fixed bottom-3 right-3 ml-3 mt-3 md:bottom-6 md:right-6 md:ml-6 md:mt-6 z-[9999] max-w-[38ch]",
        "animate-in fade-in slide-in-from-bottom-3 duration-200",
        classNames.banner,
      )}
    >
      <p className={classNames.bannerTitle}>{copy.bannerTitle}</p>
      <p className={classNames.bannerDescription}>{copy.bannerDescription}</p>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={acceptAll}
          className={cn([classNames.baseButton, classNames.acceptButton])}
        >
          {copy.acceptAll}
        </button>
        <button
          onClick={rejectAll}
          className={cn([classNames.baseButton, classNames.rejectButton])}
        >
          {copy.rejectAll}
        </button>
        <button
          onClick={openModal}
          className={cn([classNames.baseButton, classNames.manageButton])}
        >
          {copy.managePreferences}
        </button>
      </div>
    </div>
  );
}
