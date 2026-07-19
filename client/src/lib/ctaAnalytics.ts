export type CtaEventType = "instagram_order" | "wholesale_email";
export type CtaPlacement = "hero" | "wholesale_section" | "closing";

function getAnonymousReferrer() {
  if (!document.referrer) return null;

  try {
    const referrer = new URL(document.referrer);
    return `${referrer.origin}${referrer.pathname}`.slice(0, 500);
  } catch {
    return null;
  }
}

export function trackCtaClick(eventType: CtaEventType, placement: CtaPlacement) {
  const search = new URLSearchParams(window.location.search);
  const payload = {
    eventType,
    placement,
    pagePath: window.location.pathname.slice(0, 200),
    referrer: getAnonymousReferrer(),
    utmSource: search.get("utm_source")?.slice(0, 100) || null,
    utmMedium: search.get("utm_medium")?.slice(0, 100) || null,
    utmCampaign: search.get("utm_campaign")?.slice(0, 100) || null,
  };

  void fetch("/api/analytics/cta-click", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    credentials: "same-origin",
    keepalive: true,
  }).catch(() => undefined);
}
