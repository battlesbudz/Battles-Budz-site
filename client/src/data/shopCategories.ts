export interface ShopCategory {
  name: string;
  href: string;
  imageUrl: string;
  imagePosition?: string;
}

export const shopCategories: ShopCategory[] = [
  {
    name: "Apparel",
    href: "/shop",
    imageUrl: "/media/battles-budz-full-chest-tee.jpg",
  },
  {
    name: "Dual-Cart Battery",
    href: "/battery",
    imageUrl: "/media/battles-budz-dual-cart-battery-poster.jpg",
  },
  {
    name: "Vapes",
    href: "/products/freedom-fog-vapes",
    imageUrl: "/media/category-vapes.jpg",
    imagePosition: "center",
  },
  {
    name: "Flower",
    href: "/products/battles-budz-flower",
    imageUrl: "/media/category-flower.jpg",
    imagePosition: "center",
  },
  {
    name: "Pre-rolls",
    href: "/products/pre-rolls",
    imageUrl: "/media/category-pre-rolls.jpg",
    imagePosition: "center",
  },
  {
    name: "Edibles",
    href: "/products/edibles",
    imageUrl: "/media/category-edibles.jpg",
    imagePosition: "center",
  },
  {
    name: "Concentrates",
    href: "/products/concentrates",
    imageUrl: "/media/category-concentrates.jpg",
    imagePosition: "center",
  },
];
