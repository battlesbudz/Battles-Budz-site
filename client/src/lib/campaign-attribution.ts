export type CampaignAttribution = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  referrer?: string;
};

const STORAGE_KEY = "battlesBudzFirstTouchAttribution";

function clean(value: string | null, max: number) {
  const trimmed = value?.trim();
  return trimmed ? trimmed.slice(0, max) : undefined;
}

function currentAttribution(): CampaignAttribution {
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: clean(params.get("utm_source"), 100),
    utmMedium: clean(params.get("utm_medium"), 100),
    utmCampaign: clean(params.get("utm_campaign"), 100),
    utmContent: clean(params.get("utm_content"), 100),
    referrer: clean(document.referrer, 300),
  };
}

function hasAttribution(source: CampaignAttribution) {
  return Object.values(source).some(Boolean);
}

function readStoredAttribution() {
  try {
    const value = window.sessionStorage.getItem(STORAGE_KEY);
    if (!value) return undefined;
    const parsed = JSON.parse(value) as Record<string, unknown>;
    if (!parsed || typeof parsed !== "object") return undefined;

    const source: CampaignAttribution = {
      utmSource: typeof parsed.utmSource === "string" ? clean(parsed.utmSource, 100) : undefined,
      utmMedium: typeof parsed.utmMedium === "string" ? clean(parsed.utmMedium, 100) : undefined,
      utmCampaign: typeof parsed.utmCampaign === "string" ? clean(parsed.utmCampaign, 100) : undefined,
      utmContent: typeof parsed.utmContent === "string" ? clean(parsed.utmContent, 100) : undefined,
      referrer: typeof parsed.referrer === "string" ? clean(parsed.referrer, 300) : undefined,
    };
    return hasAttribution(source) ? source : undefined;
  } catch {
    return undefined;
  }
}

export function captureCampaignAttribution() {
  if (typeof window === "undefined") return {};

  const stored = readStoredAttribution();
  if (stored) return stored;

  const source = currentAttribution();
  if (hasAttribution(source)) {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(source));
    } catch {
      // Storage can be unavailable in privacy modes; the current request still receives attribution.
    }
  }

  return source;
}

export function getCampaignAttribution() {
  return readStoredAttribution() ?? captureCampaignAttribution();
}
