"use client";

import React from "react";
import { ConsentBanner } from "./ConsentBanner";
import { PreferencesModal } from "./PreferencesModal";
import { GTMScript } from "./GTMScript";

/**
 * Renders all consent UI components as a single client island.
 * Used internally — not needed if you're placing components individually.
 */
export function ConsentUI() {
  return (
    <>
      <GTMScript />
      <ConsentBanner />
      <PreferencesModal />
    </>
  );
}
