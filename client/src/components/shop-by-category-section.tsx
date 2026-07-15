import { ArrowRight, Clock, ShoppingBag } from "lucide-react";
import { Link } from "wouter";

type CategoryStatus = "coming-soon" | "available";

interface ShopCategory {
  name: string;
  description: string;
  href: string;
  status: CategoryStatus;
  cta: string;
}

const categories: ShopCategory[] = [
  {
    name: "Pre-rolls",
    description: "Cannabis pre-rolls will be available after retail launch.",
    href: "/coming-soon",
    status: "coming-soon",
    cta: "Coming soon",
  },
  {
    name: "Edibles",
    description: "Gummies, infused bites, and edible drops are planned for retail.",
    href: "/coming-soon",
    status: "coming-soon",
    cta: "Coming soon",
  },
  {
    name: "Vapes",
    description: "Cannabis vape products will launch only after final retail clearance.",
    href: "/coming-soon",
    status: "coming-soon",
    cta: "Coming soon",
  },
  {
    name: "Flower",
    description: "Flower will be part of the cannabis menu when retail goes live.",
    href: "/coming-soon",
    status: "coming-soon",
    cta: "Coming soon",
  },
  {
    name: "Accessories",
    description: "Shop the Battles Budz dual-cart battery and accessory updates.",
    href: "/battery",
    status: "available",
    cta: "View accessories",
  },
  {
    name: "Concentrates",
    description: "Extracts and concentrates are planned for the retail menu.",
    href: "/coming-soon",
    status: "coming-soon",
    cta: "Coming soon",
  },
  {
    name: "Merchandise",
    description: "Shop Battles Budz apparel and official brand merch.",
    href: "/shop",
    status: "available",
    cta: "Shop merch",
  },
];

export default function ShopByCategorySection() {
  return (
    <section className="border-b border-yellow-300/20 bg-black px-5 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 border border-yellow-300/40 bg-yellow-300/10 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-yellow-200">
              <ShoppingBag className="h-4 w-4" /> Shop by category
            </p>
            <h2 className="mt-5 max-w-3xl text-4xl font-black uppercase leading-none tracking-[-0.06em] sm:text-5xl">
              Find what is ready now.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-zinc-300">
            Apparel and accessories are available now. Cannabis categories are coming after retail launch.
          </p>
        </div>
        <p className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
          Swipe or scroll categories
        </p>

        <div
          className="mt-5 flex snap-x gap-4 overflow-x-auto pb-5 [scrollbar-color:rgba(250,204,21,0.75)_rgba(39,39,42,0.9)]"
          aria-label="Shop Battles Budz categories"
        >
          {categories.map((category) => {
            const isComingSoon = category.status === "coming-soon";

            return (
              <Link
                key={category.name}
                href={category.href}
                className="group flex min-h-72 min-w-[78vw] snap-start flex-col justify-between rounded-2xl border border-yellow-300/20 bg-zinc-950 p-6 transition hover:-translate-y-1 hover:border-yellow-300/60 hover:bg-zinc-900 sm:min-w-[22rem]"
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.16em] ${
                        isComingSoon
                          ? "border-zinc-600 bg-zinc-900 text-zinc-300"
                          : "border-yellow-300/50 bg-yellow-300/15 text-yellow-200"
                      }`}
                    >
                      {isComingSoon ? <Clock className="h-3.5 w-3.5" /> : <ShoppingBag className="h-3.5 w-3.5" />}
                      {isComingSoon ? "Coming soon" : "Available now"}
                    </span>
                    <ArrowRight className="h-5 w-5 text-yellow-300 transition group-hover:translate-x-1" />
                  </div>
                  <h3 className="mt-8 text-4xl font-black uppercase leading-none tracking-[-0.06em]">
                    {category.name}
                  </h3>
                  <p className="mt-5 leading-7 text-zinc-400">{category.description}</p>
                </div>

                <span
                  className={`mt-8 inline-flex items-center justify-center rounded-lg px-5 py-3 text-xs font-black uppercase tracking-[0.14em] transition ${
                    isComingSoon
                      ? "border border-zinc-700 text-zinc-300 group-hover:border-yellow-300/60 group-hover:text-yellow-200"
                      : "bg-battles-gold text-black group-hover:bg-yellow-300"
                  }`}
                >
                  {category.cta}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
