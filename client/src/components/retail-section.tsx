import { ArrowUpRight } from "lucide-react";

const teeUrl = "https://shop.battlesbudz.com/products/battles-budz-usa-t-shirt";
const hoodieUrl = "https://shop.battlesbudz.com/products/battles-budz-heavy-blend-hoodie";
const longSleeveUrl = "https://shop.battlesbudz.com/products/battles-budz-crest-long-sleeve";
const tankUrl = "https://shop.battlesbudz.com/products/mens-tank-top";

type AvailableProduct = {
  title: string;
  price: string;
  description: string;
  href: string;
  cta: string;
  visual: "tee" | "hoodie" | "long-sleeve";
};

function HoodiePreview() {
  return (
    <div className="relative mx-auto h-52 w-44" role="img" aria-label="Battles Budz hoodie preview">
      <div className="absolute left-1/2 top-0 h-10 w-24 -translate-x-1/2 rounded-t-full border border-zinc-700 bg-zinc-900" />
      <div className="absolute inset-x-4 top-8 h-24 rounded-t-[44px] border border-zinc-700 bg-zinc-900" />
      <div className="absolute inset-x-2 bottom-0 top-16 rounded-b-xl rounded-t-[34px] border border-zinc-700 bg-zinc-950 shadow-inner shadow-black" />
      <div className="absolute left-2 top-14 h-28 w-7 -rotate-12 rounded-full border border-zinc-700 bg-zinc-950" />
      <div className="absolute right-2 top-14 h-28 w-7 rotate-12 rounded-full border border-zinc-700 bg-zinc-950" />
      <img src="/media/battles-budz-logo-cropped.png" alt="" className="absolute left-[4.6rem] top-[5.2rem] w-14" />
      <div className="absolute bottom-8 left-1/2 h-12 w-28 -translate-x-1/2 rounded-t-lg border border-zinc-800 bg-black/70" />
    </div>
  );
}

function LongSleevePreview() {
  return (
    <div className="relative mx-auto h-52 w-52" role="img" aria-label="Battles Budz long sleeve preview">
      <div className="absolute left-1/2 top-4 h-12 w-32 -translate-x-1/2 rounded-t-full border border-zinc-700 bg-zinc-950" />
      <div className="absolute left-1/2 top-14 h-32 w-24 -translate-x-1/2 rounded-b-lg border border-zinc-700 bg-black" />
      <div className="absolute left-8 top-16 h-32 w-7 -rotate-12 rounded-full border border-zinc-700 bg-black" />
      <div className="absolute right-8 top-16 h-32 w-7 rotate-12 rounded-full border border-zinc-700 bg-black" />
      <img src="/media/battles-budz-logo-cropped.png" alt="" className="absolute left-1/2 top-[6.5rem] w-20 -translate-x-1/2" />
    </div>
  );
}

function ProductVisual({ type }: { type: AvailableProduct["visual"] }) {
  if (type === "tee") {
    return <img src="/media/battles-budz-full-chest-tee.jpg" alt="" className="h-full w-full object-contain" />;
  }

  if (type === "hoodie") {
    return <HoodiePreview />;
  }

  return <LongSleevePreview />;
}

function AvailableCard({ product }: { product: AvailableProduct }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-yellow-300/25 bg-zinc-950 shadow-xl shadow-black transition hover:-translate-y-1 hover:border-yellow-300/70">
      <div className="flex h-72 items-center justify-center border-b border-white/10 bg-black p-5">
        <ProductVisual type={product.visual} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-yellow-300">{product.price}</p>
        <h2 className="mt-2 text-2xl font-black uppercase tracking-[-0.04em] text-white">{product.title}</h2>
        <p className="mt-3 flex-1 leading-7 text-zinc-400">{product.description}</p>
        <a
          href={product.href}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg border border-yellow-300 px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-yellow-200 transition hover:bg-yellow-300 hover:text-black"
        >
          {product.cta} <ArrowUpRight className="h-4 w-4" />
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
      visual: "tee",
    },
    {
      title: "Heavy Blend Hoodie",
      price: "$60 | Free shipping",
      description: "Heavy blend black hoodie with the yellow Battles Budz crest on the upper-left chest. U.S. shipping included.",
      href: hoodieUrl,
      cta: "Shop hoodies",
      visual: "hoodie",
    },
    {
      title: "Long Sleeve",
      price: "$35 | S-4XL",
      description: "Black long sleeve with clean Battles Budz branding and an easy everyday fit.",
      href: longSleeveUrl,
      cta: "Shop long sleeves",
      visual: "long-sleeve",
    },
    {
      title: "Tank Top",
      price: "$25 | XS-2XL",
      description: "Sleeveless black logo tank made for warm weather, workouts, and summer events.",
      href: tankUrl,
      cta: "Shop tank tops",
      visual: "tee",
    },
  ];

  return (
    <section id="retail" className="bg-black py-20 text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mt-5 text-4xl font-black uppercase leading-none tracking-[-0.06em] sm:text-6xl">
            Apparel.
          </h1>
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
