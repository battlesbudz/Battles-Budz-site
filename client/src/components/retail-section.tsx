import { ArrowUpRight, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import { Link } from "wouter";

function storefrontUrl(path: string, content: string) {
  const params = new URLSearchParams({
    utm_source: "battlesbudz.com",
    utm_medium: "referral",
    utm_campaign: "apparel",
    utm_content: content,
  });
  return `https://shop.battlesbudz.com${path}?${params.toString()}`;
}

const shopAllUrl = storefrontUrl("/", "shop_all");
const teeUrl = storefrontUrl("/products/battles-budz-usa-t-shirt", "full_chest_tee");
const hoodieUrl = storefrontUrl("/products/battles-budz-heavy-blend-hoodie", "heavy_blend_hoodie");
const longSleeveUrl = storefrontUrl("/products/battles-budz-crest-long-sleeve", "crest_long_sleeve");
const tankUrl = storefrontUrl("/products/mens-tank-top", "mens_tank_top");
const hoodieImageUrl =
  "https://cdn.shopify.com/s/files/1/0808/6719/7155/files/unisex-heavy-blend-hoodie-black-front-6a55be2f35bdb.jpg?v=1784004153";
const longSleeveImageUrl =
  "https://cdn.shopify.com/s/files/1/0808/6719/7155/files/unisex-long-sleeve-shirt-black-front-6a55bca332418.png?v=1784003758";
const tankImageUrl =
  "https://cdn.shopify.com/s/files/1/0808/6719/7155/files/mens-staple-tank-top-black-front-6a55c0ec687d2.jpg?v=1784004860";

type AvailableProduct = {
  title: string;
  price: string;
  description: string;
  href: string;
  cta: string;
  imageSrc: string;
  imageAlt: string;
};

function ProductVisual({ product }: { product: AvailableProduct }) {
  return <img src={product.imageSrc} alt={product.imageAlt} className="h-full w-full object-contain" loading="lazy" decoding="async" />;
}

function AvailableCard({ product }: { product: AvailableProduct }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-yellow-300/25 bg-zinc-950 shadow-xl shadow-black transition hover:-translate-y-1 hover:border-yellow-300/70">
      <div className="flex h-72 items-center justify-center border-b border-white/10 bg-black p-5">
        <ProductVisual product={product} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-yellow-300">{product.price}</p>
        <h2 className="mt-2 text-2xl font-black uppercase tracking-[-0.04em] text-white">{product.title}</h2>
        <p className="mt-3 flex-1 leading-7 text-zinc-400">{product.description}</p>
        <a
          href={product.href}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg border border-yellow-300 px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-yellow-200 transition hover:bg-yellow-300 hover:text-black"
        >
          {product.cta} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export default function RetailSection() {
  const availableProducts: AvailableProduct[] = [
    {
      title: "Full-Chest Tee",
      price: "$25 | S-XL",
      description: "Signature black tee with the oversized yellow Battles Budz USA logo across the chest.",
      href: teeUrl,
      cta: "Shop T-shirts",
      imageSrc: "/media/battles-budz-full-chest-tee.jpg",
      imageAlt: "Battles Budz full-chest tee",
    },
    {
      title: "Heavy Blend Hoodie",
      price: "$60 | Free shipping",
      description: "Heavy blend black hoodie with the yellow Battles Budz crest on the upper-left chest. U.S. shipping included.",
      href: hoodieUrl,
      cta: "Shop hoodies",
      imageSrc: hoodieImageUrl,
      imageAlt: "Battles Budz heavy blend hoodie",
    },
    {
      title: "Long Sleeve",
      price: "$35 | S-4XL",
      description: "Black long sleeve with clean Battles Budz branding and an easy everyday fit.",
      href: longSleeveUrl,
      cta: "Shop long sleeves",
      imageSrc: longSleeveImageUrl,
      imageAlt: "Battles Budz crest long sleeve",
    },
    {
      title: "Tank Top",
      price: "$25 | XS-2XL",
      description: "Sleeveless black logo tank made for warm weather, workouts, and summer events.",
      href: tankUrl,
      cta: "Shop tank tops",
      imageSrc: tankImageUrl,
      imageAlt: "Battles Budz tank top",
    },
  ];

  return (
    <section id="retail" className="bg-black py-20 text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">Wear the mission</p>
          <h1 className="mt-5 text-4xl font-black uppercase leading-none tracking-[-0.06em] sm:text-6xl">
            Battles Budz apparel.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
            Back a veteran-owned Buffalo brand before the dispensary opens. Every piece ships through the Battles Budz apparel store.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={shopAllUrl}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-yellow-300 px-6 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:bg-yellow-200"
            >
              Shop all apparel <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link
              href="/shipping-returns"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/25 px-6 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:border-yellow-300 hover:text-yellow-200"
            >
              Shipping and returns
            </Link>
          </div>
        </div>

        <div className="mt-12 grid overflow-hidden rounded-2xl border border-yellow-300/25 bg-zinc-950 md:grid-cols-3">
          <div className="p-6 md:border-r md:border-white/10">
            <Truck className="h-6 w-6 text-yellow-300" aria-hidden="true" />
            <p className="mt-3 font-black uppercase tracking-[0.08em]">Free U.S. shipping at $50+</p>
            <p className="mt-2 text-sm leading-6 text-zinc-400">Choose any two pieces shown here and your order reaches the free-shipping threshold.</p>
          </div>
          <div className="border-t border-white/10 p-6 md:border-r md:border-t-0">
            <PackageCheck className="h-6 w-6 text-yellow-300" aria-hidden="true" />
            <p className="mt-3 font-black uppercase tracking-[0.08em]">30-day refund requests</p>
            <p className="mt-2 text-sm leading-6 text-zinc-400">Contact Battles Budz within the published policy window if the purchase is not the right fit.</p>
          </div>
          <div className="border-t border-white/10 p-6 md:border-t-0">
            <ShieldCheck className="h-6 w-6 text-yellow-300" aria-hidden="true" />
            <p className="mt-3 font-black uppercase tracking-[0.08em]">30-day size exchanges</p>
            <p className="mt-2 text-sm leading-6 text-zinc-400">The current policy covers apparel size exchanges, including return postage for the original item.</p>
          </div>
        </div>

        <div id="shop" className="mt-14 grid gap-7 md:grid-cols-2 xl:grid-cols-4">
          {availableProducts.map((product) => (
            <AvailableCard key={product.title} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
