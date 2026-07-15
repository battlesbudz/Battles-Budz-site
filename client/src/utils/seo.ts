export const SITE_CONFIG = {
  name: "Battles Budz",
  tagline: "Opening Soon in Buffalo",
  description: "Battles Budz is a veteran-owned cannabis microbusiness coming to Buffalo, New York. Shop apparel and sign up for retail launch updates.",
  url: import.meta.env.VITE_SITE_URL || "https://battlesbudz.com",
  businessName: "Battles Budz LLC",
  location: { city: "Buffalo", state: "NY" },
  contact: { email: "battlesbudz@gmail.com" },
  social: { instagram: "https://instagram.com/battles_budz" },
};

export function getCanonicalUrl(path = ""): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_CONFIG.url}${cleanPath}`;
}

export function getPageTitle(pageTitle?: string): string {
  return pageTitle ? `${pageTitle} | ${SITE_CONFIG.name}` : `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`;
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.businessName,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    email: SITE_CONFIG.contact.email,
    areaServed: { "@type": "City", name: "Buffalo" },
    sameAs: [SITE_CONFIG.social.instagram],
  };
}

export function getLocalBusinessSchema() {
  return getOrganizationSchema();
}

export function getProductSchema(product: { name: string; description: string; price: string; category: string; imageUrl?: string; inStock: boolean }) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: product.category,
    image: product.imageUrl || `${SITE_CONFIG.url}/default-product.jpg`,
    brand: { "@type": "Brand", name: SITE_CONFIG.name },
    offers: { "@type": "Offer", price: product.price, priceCurrency: "USD", availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock" },
  };
}

export function getBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: breadcrumbs.map((crumb, index) => ({ "@type": "ListItem", position: index + 1, name: crumb.name, item: crumb.url })) };
}

export const CANNABIS_KEYWORDS = {
  home: ["Battles Budz", "Buffalo cannabis microbusiness", "Buffalo opening soon", "veteran owned cannabis business"],
  shop: ["Battles Budz apparel", "cannabis accessories"],
  education: ["cannabis education", "responsible cannabis use"],
  community: ["Buffalo cannabis community", "cannabis culture"],
  investors: ["cannabis investment opportunities", "cannabis business investment"],
};
