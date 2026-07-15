import { ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "wouter";

interface ShopCategory {
  name: string;
  href: string;
}

const categories: ShopCategory[] = [
  {
    name: "Merchandise",
    href: "/shop",
  },
  {
    name: "Dual-Cart Battery",
    href: "/battery",
  },
  {
    name: "Vapes",
    href: "/coming-soon",
  },
  {
    name: "Flower",
    href: "/coming-soon",
  },
  {
    name: "Pre-rolls",
    href: "/coming-soon",
  },
  {
    name: "Edibles",
    href: "/coming-soon",
  },
  {
    name: "Concentrates",
    href: "/coming-soon",
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
              Explore the lineup.
            </h2>
          </div>
        </div>

        <div
          className="mt-10 flex snap-x gap-4 overflow-x-auto pb-5 [scrollbar-color:rgba(250,204,21,0.75)_rgba(39,39,42,0.9)]"
          aria-label="Shop Battles Budz categories"
        >
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group flex min-h-44 min-w-[11.25rem] snap-start flex-col justify-between rounded-xl border border-yellow-300/20 bg-zinc-950 p-4 transition hover:-translate-y-1 hover:border-yellow-300/60 hover:bg-zinc-900 sm:min-w-[14rem]"
            >
              <div>
                <div className="flex justify-end">
                  <ArrowRight className="h-4 w-4 shrink-0 text-yellow-300 transition group-hover:translate-x-1" />
                </div>
                <h3 className="mt-7 text-2xl font-black uppercase leading-none tracking-[-0.05em] sm:text-3xl">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
