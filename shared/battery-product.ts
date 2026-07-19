export const BATTERY_PRICE_USD = 60;
export const BATTERY_PAGE_URL = "https://battlesbudz.com/battery";
export const BATTERY_IMAGE_URL = "https://battlesbudz.com/media/battles-budz-dual-cart-battery-open.jpg";

export const batteryProductStructuredData = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Battles Budz Dual-Cart Battery",
  description:
    "A dual 510-thread cartridge battery with independent or simultaneous cartridge use, three temperature modes, preheat, inhale activation, and pass-through charging.",
  image: BATTERY_IMAGE_URL,
  category: "510-thread cartridge battery",
  brand: { "@type": "Brand", name: "Battles Budz" },
  offers: {
    "@type": "Offer",
    url: BATTERY_PAGE_URL,
    price: BATTERY_PRICE_USD.toFixed(2),
    priceCurrency: "USD",
    seller: { "@type": "Organization", name: "Battles Budz LLC" },
  },
};
