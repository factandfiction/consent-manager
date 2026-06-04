"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/server.ts
var server_exports = {};
__export(server_exports, {
  EU_COUNTRIES: () => EU_COUNTRIES,
  getCountryFromHeaders: () => getCountryFromHeaders,
  getVisitorCountry: () => getVisitorCountry,
  shouldShowBanner: () => shouldShowBanner
});
module.exports = __toCommonJS(server_exports);

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
var import_clsx = require("clsx");
var import_tailwind_merge = require("tailwind-merge");

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EU_COUNTRIES,
  getCountryFromHeaders,
  getVisitorCountry,
  shouldShowBanner
});
//# sourceMappingURL=server.js.map