import { ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "wouter";
import { shopCategories } from "@/data/shopCategories";

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
          {shopCategories.map((category) => {
            const isConcentrates = category.name === "Concentrates";

            return (
              <Link
                key={category.name}
                href={category.href}
                className={`group relative flex min-h-44 snap-start flex-col justify-between overflow-hidden rounded-xl border border-yellow-300/20 bg-zinc-950 p-4 transition hover:-translate-y-1 hover:border-yellow-300/60 ${
                  isConcentrates ? "min-w-[13.25rem] sm:min-w-[15rem]" : "min-w-[11.25rem] sm:min-w-[14rem]"
                }`}
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.28), rgba(0, 0, 0, 0.86)), url(${category.imageUrl})`,
                  backgroundPosition: category.imagePosition ?? "center",
                  backgroundSize: "cover",
                }}
              >
                <div className="absolute inset-0 bg-yellow-300/0 transition group-hover:bg-yellow-300/10" />
                <div className="relative">
                  <div className="flex justify-end">
                    <ArrowRight className="h-4 w-4 shrink-0 text-yellow-200 drop-shadow transition group-hover:translate-x-1" />
                  </div>
                  <h3
                    className={`mt-16 font-black uppercase leading-none tracking-[-0.05em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] ${
                      isConcentrates ? "text-[1.2rem] sm:text-[1.45rem]" : "text-2xl sm:text-3xl"
                    }`}
                  >
                    {category.name}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
