// @ts-nocheck
// No 'use client' — this stays a server component
import {
  ConsentManager,
  getVisitorCountry,
} from "@factandfiction/consent-manager";
import type { ConsentConfig } from "@factandfiction/consent-manager";

const consentConfig: ConsentConfig = {
  gtmId: process.env.NEXT_PUBLIC_GTM_ID!,
  policyVersion: "2025-01",
  auditEndpoint: "/api/consent-audit",
  copy: {
    bannerTitle: "Your privacy, your choice",
  },
  theme: {
    primaryBg: "#1a1a1a",
    radius: "10px",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
