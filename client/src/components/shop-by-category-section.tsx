import { ArrowRight, Clock, ShoppingBag } from "lucide-react";
import { Link } from "wouter";

type CategoryStatus = "coming-soon" | "available";

interface ShopCategory {
  name: string;
  href: string;
  status: CategoryStatus;
  cta: string;
}

const categories: ShopCategory[] = [
  {
    name: "Pre-rolls",
    href: "/coming-soon",
    status: "coming-soon",
    cta: "Coming soon",
  },
  {
    name: "Edibles",
    href: "/coming-soon",
    status: "coming-soon",
    cta: "Coming soon",
  },
  {
    name: "Vapes",
    href: "/coming-soon",
    status: "coming-soon",
    cta: "Coming soon",
  },
  {
    name: "Flower",
    href: "/coming-soon",
    status: "coming-soon",
    cta: "Coming soon",
  },
  {
    name: "Accessories",
    href: "/battery",
    status: "available",
    cta: "View accessories",
  },
  {
    name: "Concentrates",
    href: "/coming-soon",
    status: "coming-soon",
    cta: "Coming soon",
  },
  {
    name: "Merchandise",
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
                className="group flex min-h-44 min-w-[11.25rem] snap-start flex-col justify-between rounded-xl border border-yellow-300/20 bg-zinc-950 p-4 transition hover:-translate-y-1 hover:border-yellow-300/60 hover:bg-zinc-900 sm:min-w-[14rem]"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[0.58rem] font-black uppercase tracking-[0.13em] ${
                        isComingSoon
                          ? "border-zinc-600 bg-zinc-900 text-zinc-300"
                          : "border-yellow-300/50 bg-yellow-300/15 text-yellow-200"
                      }`}
                    >
                      {isComingSoon ? <Clock className="h-3 w-3" /> : <ShoppingBag className="h-3 w-3" />}
                      {isComingSoon ? "Coming soon" : "Available now"}
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-yellow-300 transition group-hover:translate-x-1" />
                  </div>
                  <h3 className="mt-7 text-2xl font-black uppercase leading-none tracking-[-0.05em] sm:text-3xl">
                    {category.name}
                  </h3>
                </div>

                <span
                  className={`mt-7 inline-flex items-center justify-center rounded-lg px-3 py-2 text-[0.65rem] font-black uppercase tracking-[0.12em] transition ${
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
