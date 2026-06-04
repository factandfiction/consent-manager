/**
 * Geo-detection helpers for Next.js middleware.
 *
 * Reads the country from Vercel's or Cloudflare's injected headers.
 * Use this in middleware.ts to conditionally set a header that the
 * ConsentProvider reads client-side via a meta tag or cookie.
 */

/**
 * Extract the visitor's country code from request headers.
 * Returns null if the header isn't present (e.g. local dev).
 */
export function getCountryFromHeaders(
  headers: Headers
): string | null {
  // Vercel
  const vercel = headers.get('x-vercel-ip-country')
  if (vercel) return vercel.toUpperCase()

  // Cloudflare
  const cf = headers.get('cf-ipcountry')
  if (cf && cf !== 'XX') return cf.toUpperCase()

  // Netlify
  const netlify = headers.get('x-country')
  if (netlify) return netlify.toUpperCase()

  return null
}

/**
 * Returns true if the visitor should see the consent banner
 * based on their country and the configured geo-targeting list.
 *
 * If geoCountries is empty, always returns true (show to everyone).
 * If country is null (can't detect), defaults to showing the banner.
 */
export function shouldShowBanner(
  country: string | null,
  geoCountries: string[]
): boolean {
  if (geoCountries.length === 0) return true
  if (country === null) return true // safe default
  return geoCountries.includes(country)
}


/**
 * Server-side helper for Next.js App Router layouts.
 * Reads the visitor's country from the incoming request headers using
 * Next.js's `headers()` function. Returns null in environments where
 * the header isn't present (local dev without a proxy, non-Next contexts).
 *
 * @example
 * // app/layout.tsx
 * import { ConsentManager, getVisitorCountry } from '@your-org/next-consent'
 * const country = await getVisitorCountry()
 * return <ConsentManager config={consentConfig} country={country} />
 */
export async function getVisitorCountry(): Promise<string | null> {
  try {
    // Dynamic import keeps 'next/headers' out of the client bundle entirely.
    // This function should only ever be called from server components.
    const { headers } = await import('next/headers')
    const headersList = await headers()
    return getCountryFromHeaders(headersList)
  } catch {
    // Falls back gracefully if called outside Next.js or in a non-server context
    return null
  }
}
