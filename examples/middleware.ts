import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  getCountryFromHeaders,
  shouldShowBanner,
  EU_COUNTRIES,
} from "@factandfiction/consent-manager";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Detect visitor country and pass it to the client via a response header.
  // The ConsentProvider reads this from a meta tag you inject in layout.tsx.
  const country = getCountryFromHeaders(request.headers);
  const show = shouldShowBanner(country, EU_COUNTRIES);

  response.headers.set("x-consent-required", show ? "1" : "0");

  return response;
}

export const config = {
  // Run on all routes except static assets and Next internals
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
