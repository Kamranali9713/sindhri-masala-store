/**
 * Reusable fallback logic for social icons.
 * If the platform's own URL exists, use it.
 * Otherwise fall back to the site's default URL so the icon never dead-ends.
 */
export function getSocialLink(socialUrl, siteUrl) {
  if (socialUrl && socialUrl.trim().length > 0) {
    return socialUrl;
  }
  return siteUrl || '#';
}
