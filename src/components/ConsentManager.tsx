"use client";

import React, { useEffect } from "react";
import type { ConsentConfig } from "../types";
import { init } from "../store/consentStore";
import { shouldShowBanner } from "../lib/geo";
import { EU_COUNTRIES } from "../lib/defaults";
import { GTMScript } from "./GTMScript";
import { ConsentBanner } from "./ConsentBanner";
import { PreferencesModal } from "./PreferencesModal";

interface ConsentManagerProps {
  config: ConsentConfig;
  country?: string | null;
}

export function ConsentManager({ config, country }: ConsentManagerProps) {
  const geoAllowed = shouldShowBanner(
    country ?? null,
    config.geoCountries ?? EU_COUNTRIES,
  );

  useEffect(() => {
    init(config, geoAllowed);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <GTMScript />
      <ConsentBanner />
      <PreferencesModal />
    </>
  );
}
