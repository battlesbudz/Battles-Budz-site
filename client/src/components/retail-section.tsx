import { ArrowUpRight, BatteryCharging, Bell, LockKeyhole, Mail, ShoppingBag } from "lucide-react";
import cosmicChewzImg from "@assets/20240228_223118_1752399041772.png";
import freedomFogImg from "@assets/file_0000000084c86230b8826b578af0fa18_1752398828783.png";
import cannabisFlower1 from "@assets/Screenshot_20250713_025017_Gallery_1752389462073.jpg";
import battleBrewImg from "@assets/file_00000000a95c61f9a7846b7990b6738f_1752399026270.png";

const shopUrl = "https://shop.battlesbudz.com/";
const teeUrl = "https://shop.battlesbudz.com/products/battles-budz-usa-t-shirt";
const hoodieUrl = "https://shop.battlesbudz.com/products/battles-budz-heavy-blend-hoodie";
const longSleeveUrl = "https://shop.battlesbudz.com/products/battles-budz-crest-long-sleeve";
const tankUrl = "https://shop.battlesbudz.com/products/mens-tank-top";
const batteryWholesaleHref =
  "mailto:battlesbudz@gmail.com?subject=Battles%20Budz%20Dual%20Cart%20Battery%20Wholesale%20Inquiry";

type AvailableProduct = {
  title: string;
  price: string;
  description: string;
  href?: string;
  cta: string;
  visual: "tee" | "hoodie" | "long-sleeve" | "battery";
};

type ComingProduct = {
  title: string;
  description: string;
  image: string;
};

function HoodiePreview() {
  return (
    <div className="relative mx-auto h-52 w-44" aria-label="Battles Budz hoodie preview">
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
    <div className="relative mx-auto h-52 w-52" aria-label="Battles Budz long sleeve preview">
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

  if (type === "long-sleeve") {
    return <LongSleevePreview />;
  }

  return (
    <video
      className="h-full w-full object-cover"
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      poster="/media/battles-budz-dual-cart-battery-poster.jpg"
    >
      <source src="/media/battles-budz-dual-cart-battery-loop.mp4" type="video/mp4" />
    </video>
  );
}

function AvailableCard({ product }: { product: AvailableProduct }) {
  const href = product.href || batteryWholesaleHref;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-yellow-300/25 bg-zinc-950 shadow-xl shadow-black transition hover:-translate-y-1 hover:border-yellow-300/70">
      <div className="flex h-72 items-center justify-center border-b border-white/10 bg-black p-5">
        <ProductVisual type={product.visual} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-yellow-300">{product.price}</p>
        <h3 className="mt-2 text-2xl font-black uppercase tracking-[-0.04em] text-white">{product.title}</h3>
        <p className="mt-3 flex-1 leading-7 text-zinc-400">{product.description}</p>
        <a
          href={href}
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
    {
      title: "Dual-Cart Battery",
      price: "$60 | Limited first batch",
      description: "Dual-cart battery accessory with Battles Budz branding. For retail availability or bulk orders, contact the Battles Budz team.",
      cta: "Battery inquiries",
      visual: "battery",
    },
  ];

  const comingProducts: ComingProduct[] = [
    {
      title: "Heirloom Flower",
      description: "Small-batch flower selected for aroma, structure, and a clean finish.",
      image: cannabisFlower1,
    },
    {
      title: "Battle Brew",
      description: "Signature infused tea concept built around bold flavor and Battles Budz branding.",
      image: battleBrewImg,
    },
    {
      title: "Cosmic Chewz",
      description: "Edible concept shaped around precise portions and bright flavors.",
      image: cosmicChewzImg,
    },
    {
      title: "Freedom Fog Vapes",
      description: "Vape line concept designed around premium extracts and a bold visual identity.",
      image: freedomFogImg,
    },
  ];

  return (
    <section id="retail" className="bg-black py-20 text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="inline-flex items-center gap-2 border border-yellow-300/40 bg-yellow-300/10 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-yellow-200">
            <ShoppingBag className="h-4 w-4" /> Available online now
          </p>
          <h2 className="mt-5 text-4xl font-black uppercase leading-none tracking-[-0.06em] sm:text-6xl">
            Current <span className="text-battles-gold">Drops</span>
          </h2>
          <p className="mt-5 text-lg leading-8 text-zinc-300">
            Shop official Battles Budz apparel and accessories today. Cannabis products are reserved for the licensed
            Buffalo retail launch.
          </p>
          <a
            href={shopUrl}
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-battles-gold px-7 py-4 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:bg-yellow-300"
          >
            Shop the full store <ArrowUpRight className="h-5 w-5" />
          </a>
        </div>

        <div id="shop" className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {availableProducts.map((product) => (
            <AvailableCard key={product.title} product={product} />
          ))}
        </div>

        <div id="dual-cart-battery" className="mt-16 rounded-3xl border border-yellow-300/25 bg-zinc-950 p-6 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
              <video
                className="aspect-video h-full w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                poster="/media/battles-budz-dual-cart-battery-poster.jpg"
              >
                <source src="/media/battles-budz-dual-cart-battery-loop.mp4" type="video/mp4" />
              </video>
            </div>
            <div>
              <p className="inline-flex items-center gap-2 border border-yellow-300/40 bg-yellow-300/10 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-yellow-200">
                <BatteryCharging className="h-4 w-4" /> Battery accessory
              </p>
              <h3 className="mt-5 text-4xl font-black uppercase leading-none tracking-[-0.05em] text-white">
                Dual-cart battery.
              </h3>
              <p className="mt-4 text-lg font-bold text-battles-gold">$60. Limited first batch available.</p>
              <p className="mt-4 leading-8 text-zinc-300">
                The Battles Budz dual-cart battery is a branded accessory for customers who want a compact device built
                for two cartridges. Retail availability updates and wholesale requests are coordinated directly by email.
              </p>
              <div className="mt-7 flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={() => document.getElementById("newsletter")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-battles-gold px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:bg-yellow-300"
                >
                  Battery updates <Bell className="h-4 w-4" />
                </button>
                <a
                  href={batteryWholesaleHref}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-yellow-300 px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-yellow-200 transition hover:bg-yellow-300 hover:text-black"
                >
                  Wholesale pricing <Mail className="h-4 w-4" />
                </a>
              </div>
              <p className="mt-5 text-sm text-zinc-500">
                Dispensaries and retailers can email battlesbudz@gmail.com for wholesale pricing. Bulk fulfillment
                timelines vary by order size.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 rounded-3xl border border-white/10 bg-zinc-950/70 p-6 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 border border-yellow-300/40 bg-yellow-300/10 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-yellow-200">
                <LockKeyhole className="h-4 w-4" /> Future cannabis menu
              </p>
              <h3 className="mt-5 text-3xl font-black uppercase leading-none tracking-[-0.05em] text-white sm:text-5xl">
                Buffalo launch lineup.
              </h3>
            </div>
            <p className="max-w-xl leading-7 text-zinc-400">
              These products represent the Battles Budz menu direction for the Buffalo retail launch. Availability,
              pricing, and final product details will be published when retail service begins.
            </p>
          </div>

          <div className="mt-9 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {comingProducts.map((product) => (
              <article key={product.title} className="overflow-hidden rounded-2xl border border-white/10 bg-black">
                <div className="flex h-44 items-center justify-center border-b border-white/10 bg-zinc-950 p-4">
                  <img src={product.image} alt="" className="h-full w-full object-contain" />
                </div>
                <div className="p-5">
                  <h4 className="text-xl font-black uppercase tracking-[-0.04em] text-white">{product.title}</h4>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">{product.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
