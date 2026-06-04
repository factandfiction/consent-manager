// src/lib/geo.ts
function getCountryFromHeaders(headers) {
  const vercel = headers.get("x-vercel-ip-country");
  if (vercel) return vercel.toUpperCase();
  const cf = headers.get("cf-ipcountry");
  if (cf && cf !== "XX") return cf.toUpperCase();
  const netlify = headers.get("x-country");
  if (netlify) return netlify.toUpperCase();
  return null;
}
function shouldShowBanner(country, geoCountries) {
  if (geoCountries.length === 0) return true;
  if (country === null) return true;
  return geoCountries.includes(country);
}
async function getVisitorCountry() {
  try {
    const { headers } = await import("next/headers");
    const headersList = await headers();
    return getCountryFromHeaders(headersList);
  } catch (e) {
    return null;
  }
}

// src/lib/cn.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
export {
  EU_COUNTRIES,
  getCountryFromHeaders,
  getVisitorCountry,
  shouldShowBanner
};
//# sourceMappingURL=server.mjs.map