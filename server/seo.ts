import { BATTERY_IMAGE_URL, BATTERY_PAGE_URL, batteryProductStructuredData } from "@shared/battery-product";
import { productUpdateProducts } from "@shared/product-updates";

const SITE_URL = "https://battlesbudz.com";

type RouteMetadata = {
  title: string;
  description: string;
  canonicalUrl: string;
  ogType: string;
  ogImage?: string;
  structuredData?: object;
};

const routeMetadata: Record<string, RouteMetadata> = {
  "/battery": {
    title: "Dual-Cart Battery | Battles Budz",
    description:
      "Explore the $60 Battles Budz dual-cart 510-thread battery and request personal-purchase availability or wholesale details.",
    canonicalUrl: BATTERY_PAGE_URL,
    ogType: "product",
    ogImage: BATTERY_IMAGE_URL,
    structuredData: batteryProductStructuredData,
  },
  "/shop": {
    title: "Veteran-Owned Apparel | Battles Budz",
    description:
      "Shop Battles Budz tees, hoodies, long sleeves, and tanks. Free U.S. shipping on orders of $50 or more.",
    canonicalUrl: `${SITE_URL}/shop`,
    ogType: "website",
    ogImage: `${SITE_URL}/media/battles-budz-full-chest-tee.jpg`,
  },
};

for (const product of Object.values(productUpdateProducts)) {
  routeMetadata[`/products/${product.slug}`] = {
    title: `${product.name} | Battles Budz`,
    description: product.heading,
    canonicalUrl: `${SITE_URL}/products/${product.slug}`,
    ogType: "website",
  };
}

function escapeAttribute(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  } as Record<string, string>)[character] ?? character);
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function upsertMeta(html: string, attribute: "name" | "property", key: string, content: string) {
  const pattern = new RegExp(`<meta\\s+${attribute}=["']${escapeRegExp(key)}["'][^>]*>`, "i");
  const tag = `<meta ${attribute}="${key}" content="${escapeAttribute(content)}">`;
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
}

function upsertCanonical(html: string, canonicalUrl: string) {
  const pattern = /<link\s+rel=["']canonical["'][^>]*>/i;
  const tag = `<link rel="canonical" href="${escapeAttribute(canonicalUrl)}">`;
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
}

export function injectRouteMetadata(html: string, requestUrl: string) {
  const pathname = new URL(requestUrl, SITE_URL).pathname.replace(/\/$/, "") || "/";
  const metadata = routeMetadata[pathname];
  if (!metadata) return html;

  let page = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeAttribute(metadata.title)}</title>`);
  page = upsertMeta(page, "name", "description", metadata.description);
  page = upsertMeta(page, "property", "og:title", metadata.title);
  page = upsertMeta(page, "property", "og:description", metadata.description);
  page = upsertMeta(page, "property", "og:type", metadata.ogType);
  page = upsertMeta(page, "name", "twitter:title", metadata.title);
  page = upsertMeta(page, "name", "twitter:description", metadata.description);
  page = upsertCanonical(page, metadata.canonicalUrl);

  if (metadata.ogImage) {
    page = upsertMeta(page, "property", "og:image", metadata.ogImage);
    page = upsertMeta(page, "name", "twitter:image", metadata.ogImage);
    page = upsertMeta(page, "name", "twitter:card", "summary_large_image");
  }

  if (metadata.structuredData) {
    const json = JSON.stringify(metadata.structuredData).replace(/</g, "\\u003c");
    page = page.replace(
      "</head>",
      `    <script type="application/ld+json" data-seo-head="true">${json}</script>\n  </head>`,
    );
  }

  return page;
}
