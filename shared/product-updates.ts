export const productUpdateSlugs = [
  "freedom-fog-vapes",
  "battles-budz-flower",
  "heirloom-flower",
  "pre-rolls",
  "edibles",
  "cosmic-chewz",
  "concentrates",
  "battle-brew",
] as const;

export type ProductUpdateSlug = typeof productUpdateSlugs[number];

export const productUpdateProducts: Record<ProductUpdateSlug, {
  slug: ProductUpdateSlug;
  name: string;
  heading: string;
}> = {
  "freedom-fog-vapes": {
    slug: "freedom-fog-vapes",
    name: "Freedom Fog Vapes",
    heading: "Be first to know when Freedom Fog Vapes drop.",
  },
  "battles-budz-flower": {
    slug: "battles-budz-flower",
    name: "Battles Budz Flower",
    heading: "Be first to know when Battles Budz Flower drops.",
  },
  "heirloom-flower": {
    slug: "heirloom-flower",
    name: "Heirloom Flower",
    heading: "Be first to know when Heirloom Flower drops.",
  },
  "pre-rolls": {
    slug: "pre-rolls",
    name: "Pre-rolls",
    heading: "Be first to know when Pre-rolls drop.",
  },
  edibles: {
    slug: "edibles",
    name: "Edibles",
    heading: "Be first to know when Edibles drop.",
  },
  "cosmic-chewz": {
    slug: "cosmic-chewz",
    name: "Cosmic Chewz",
    heading: "Be first to know when Cosmic Chewz drop.",
  },
  concentrates: {
    slug: "concentrates",
    name: "Concentrates",
    heading: "Be first to know when Concentrates drop.",
  },
  "battle-brew": {
    slug: "battle-brew",
    name: "Battle Brew",
    heading: "Be first to know when Battle Brew drops.",
  },
};
