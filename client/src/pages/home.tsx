import {
  ArrowDown,
  ArrowUpRight,
  BatteryCharging,
  Clock3,
  LockKeyhole,
  Mail,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Sun,
} from "lucide-react";
import type { ReactNode } from "react";
import Navigation from "@/components/navigation";
import NewsletterSection from "@/components/newsletter-section";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo/SEOHead";
import { getCanonicalUrl, getOrganizationSchema } from "@/utils/seo";
import logoPath from "@assets/BattlesBudz_Logo_1752301078028.png";

const shopUrl = "https://shop.battlesbudz.com/";
const teeUrl = "https://shop.battlesbudz.com/products/battles-budz-usa-t-shirt";
const hoodieUrl = "https://shop.battlesbudz.com/products/battles-budz-heavy-blend-hoodie";
const longSleeveUrl = "https://shop.battlesbudz.com/products/battles-budz-crest-long-sleeve";
const tankUrl = "https://shop.battlesbudz.com/products/mens-tank-top";
const wholesaleEmailHref =
  "mailto:battlesbudz@gmail.com?subject=Battles%20Budz%20Dual%20Cart%20Battery%20Wholesale%20Inquiry";

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

type ProductCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  href?: string;
  onClick?: () => void;
  badge?: string;
  visual: ReactNode;
};

function ProductCard({ eyebrow, title, description, cta, href, onClick, badge, visual }: ProductCardProps) {
  const actionClass =
    "mt-5 inline-flex items-center justify-center gap-2 border border-yellow-300 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-yellow-200 transition hover:bg-yellow-300 hover:text-black";

  return (
    <article className="group grid min-h-full grid-cols-[112px_1fr] gap-5 rounded-lg border border-yellow-300/25 bg-black/70 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] transition hover:border-yellow-300/70 sm:grid-cols-[150px_1fr]">
      <div className="flex min-h-32 items-center justify-center overflow-hidden rounded-md border border-white/10 bg-zinc-950">
        {visual}
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-yellow-300">{eyebrow}</p>
          {badge ? <span className="border border-yellow-300/40 px-2 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-yellow-100">{badge}</span> : null}
        </div>
        <h3 className="mt-2 text-2xl font-black uppercase leading-none tracking-[-0.03em] text-white sm:text-3xl">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-zinc-400">{description}</p>
        {href ? (
          <a href={href} className={actionClass}>
            {cta} <ArrowUpRight className="h-4 w-4" />
          </a>
        ) : (
          <button onClick={onClick} className={actionClass}>
            {cta} <ArrowDown className="h-4 w-4" />
          </button>
        )}
      </div>
    </article>
  );
}

function GoldLabel({ children }: { children: ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 border border-yellow-300/40 bg-yellow-300/10 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-yellow-200">
      {children}
    </p>
  );
}

function HoodieMock({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`relative mx-auto ${compact ? "h-28 w-24" : "h-56 w-44"}`} aria-label="Black Battles Budz hoodie mockup">
      <div className="absolute left-1/2 top-0 h-8 w-20 -translate-x-1/2 rounded-t-full border border-zinc-700 bg-zinc-900" />
      <div className="absolute inset-x-4 top-5 h-16 rounded-t-[42px] border border-zinc-700 bg-zinc-900" />
      <div className="absolute inset-x-2 bottom-0 top-12 rounded-b-lg rounded-t-[30px] border border-zinc-700 bg-zinc-950 shadow-inner shadow-black" />
      <div className="absolute left-5 top-10 h-24 w-5 -rotate-12 rounded-full border border-zinc-700 bg-zinc-950" />
      <div className="absolute right-5 top-10 h-24 w-5 rotate-12 rounded-full border border-zinc-700 bg-zinc-950" />
      <img src={logoPath} alt="" className={`absolute ${compact ? "left-9 top-11 w-9" : "left-16 top-20 w-14"} h-auto`} />
      {!compact ? <div className="absolute bottom-8 left-1/2 h-10 w-24 -translate-x-1/2 rounded-t-lg border border-zinc-700 bg-black/60" /> : null}
    </div>
  );
}

function LongSleeveMock() {
  return (
    <div className="relative h-36 w-40" aria-label="Black Battles Budz long sleeve mockup">
      <div className="absolute left-1/2 top-2 h-8 w-28 -translate-x-1/2 rounded-t-full border border-zinc-700 bg-zinc-950" />
      <div className="absolute left-10 top-8 h-24 w-20 rounded-b-md border border-zinc-700 bg-black" />
      <div className="absolute left-3 top-10 h-24 w-5 -rotate-12 rounded-full border border-zinc-700 bg-black" />
      <div className="absolute right-3 top-10 h-24 w-5 rotate-12 rounded-full border border-zinc-700 bg-black" />
      <img src={logoPath} alt="" className="absolute left-1/2 top-12 w-16 -translate-x-1/2" />
    </div>
  );
}

function SunglassesMock() {
  return (
    <div className="relative h-28 w-40" aria-label="Battles Budz sunglasses coming soon mockup">
      <div className="absolute left-2 top-10 h-10 w-14 rounded-full border-4 border-yellow-300 bg-black" />
      <div className="absolute right-2 top-10 h-10 w-14 rounded-full border-4 border-yellow-300 bg-black" />
      <div className="absolute left-1/2 top-14 h-2 w-10 -translate-x-1/2 bg-yellow-300" />
      <div className="absolute left-0 top-12 h-1 w-10 -rotate-12 bg-yellow-300" />
      <div className="absolute right-0 top-12 h-1 w-10 rotate-12 bg-yellow-300" />
    </div>
  );
}

function HeroShowcase() {
  return (
    <div className="relative min-h-[500px] overflow-hidden rounded-lg border border-yellow-300/25 bg-[url('/media/battles-budz-dual-cart-battery-poster.jpg')] bg-cover bg-center p-4 shadow-2xl shadow-black md:min-h-[560px]">
      <div className="absolute inset-0 bg-black/80" />
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(250,204,21,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(250,204,21,0.12)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="relative grid h-full min-h-[468px] grid-cols-1 items-end gap-4 md:grid-cols-[0.92fr_1.08fr]">
        <div className="space-y-4">
          <div className="rounded-lg border border-yellow-300/30 bg-black/80 p-4">
            <video
              className="mx-auto aspect-[9/16] max-h-[360px] w-full rounded-md object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/media/battles-budz-dual-cart-battery-poster.jpg"
              aria-describedby="battery-video-description"
            >
              <source src="/media/battles-budz-dual-cart-battery-loop.mp4" type="video/mp4" />
              Your browser does not support the product video.
            </video>
          </div>
          <p id="battery-video-description" className="sr-only">
            A looping product video showing the Battles Budz Dual Cart Battery opening and closing.
          </p>
        </div>
        <div className="grid gap-4">
          <div className="rounded-lg border border-white/10 bg-black/80 p-4">
            <HoodieMock />
          </div>
          <div className="rounded-lg border border-white/10 bg-black/80 p-4">
            <img src="/media/battles-budz-full-chest-tee.jpg" alt="Battles Budz black T-shirt with yellow full chest logo" className="mx-auto max-h-60 w-full object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <SEOHead
        title="Battles Budz | Opening Soon in Buffalo, NY"
        description="Battles Budz is a veteran-owned cannabis microbusiness opening soon in Buffalo, New York. Shop current apparel drops and follow the road to launch."
        keywords={[
          "Battles Budz",
          "Buffalo cannabis microbusiness",
          "veteran owned cannabis brand",
          "Battles Budz apparel",
          "Battles Budz hoodie",
          "dual cart battery",
        ]}
        canonicalUrl={getCanonicalUrl("/")}
        structuredData={getOrganizationSchema()}
      />
      <Navigation />

      <main>
        <section className="relative isolate border-b border-yellow-300/25 pt-24">
          <div className="absolute inset-0 -z-10 bg-[#050505]" />
          <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-10 pt-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:px-8 lg:pb-0">
            <div className="py-8 lg:py-16">
              <GoldLabel>
                <Sparkles className="h-4 w-4" /> Buffalo retail launch - coming soon
              </GoldLabel>
              <h1 className="mt-7 max-w-2xl text-6xl font-black uppercase leading-[0.78] tracking-[-0.08em] text-zinc-100 sm:text-7xl lg:text-8xl">
                Built for the wait.
              </h1>
              <p className="mt-6 max-w-xl text-lg font-semibold leading-8 text-zinc-200">
                Battles Budz is opening soon in Buffalo, New York. Until the final OCM go-ahead lands, merch and brand accessories keep the movement alive.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={shopUrl} className="inline-flex items-center justify-center gap-2 bg-yellow-300 px-7 py-4 text-base font-black uppercase tracking-[0.1em] text-black transition hover:bg-yellow-200">
                  Shop the drop <ShoppingBag className="h-5 w-5" />
                </a>
                <button
                  onClick={() => scrollTo("newsletter")}
                  className="inline-flex items-center justify-center gap-2 border border-yellow-300 px-7 py-4 text-base font-black uppercase tracking-[0.1em] text-yellow-200 transition hover:bg-yellow-300 hover:text-black"
                >
                  Get Buffalo updates <Mail className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-2xl font-black text-yellow-300">21+</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-zinc-400">Age gated</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-2xl font-black text-yellow-300">Buffalo</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-zinc-400">No public address yet</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-2xl font-black text-yellow-300">Now</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-zinc-400">Apparel online</p>
                </div>
              </div>
            </div>
            <HeroShowcase />
          </div>
          <div className="border-y border-yellow-900 bg-yellow-300 px-5 py-3 text-center text-sm font-black uppercase tracking-[0.32em] text-black sm:text-base">
            Buffalo retail launch - coming soon
          </div>
        </section>

        <section id="shop" className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <GoldLabel>
                <PackageCheck className="h-4 w-4" /> Available online now
              </GoldLabel>
              <h2 className="mt-5 max-w-3xl text-4xl font-black uppercase leading-none tracking-[-0.05em] sm:text-6xl">
                The shop is the front door.
              </h2>
            </div>
            <p className="max-w-md text-base leading-7 text-zinc-400">
              Every card below either goes straight to the Shopify product or explains the next step. No scavenger hunt, no dead ends.
            </p>
          </div>

          <div id="available-now" className="mt-10 grid gap-4 lg:grid-cols-3">
            <ProductCard
              eyebrow="$25 - S to XL"
              title="Full-chest tee"
              description="Black tee with the yellow Battles Budz USA logo across the chest."
              cta="Shop T-shirts"
              href={teeUrl}
              visual={<img src="/media/battles-budz-full-chest-tee.jpg" alt="" className="h-full max-h-36 w-full object-contain" />}
            />
            <ProductCard
              eyebrow="$60 - free shipping"
              title="Heavy blend hoodie"
              description="Print-on-demand hoodie with the Battles Budz crest on the upper left chest."
              cta="Shop hoodies"
              href={hoodieUrl}
              visual={<HoodieMock compact />}
            />
            <ProductCard
              eyebrow="$60 - retail accessory"
              title="Dual-cart battery"
              description="About 50 on hand. Customer checkout is being finalized; wholesale inquiries are open."
              cta="See battery"
              onClick={() => scrollTo("dual-cart-battery")}
              visual={
                <video className="h-36 w-full object-cover" autoPlay loop muted playsInline preload="metadata" poster="/media/battles-budz-dual-cart-battery-poster.jpg">
                  <source src="/media/battles-budz-dual-cart-battery-loop.mp4" type="video/mp4" />
                </video>
              }
            />
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <ProductCard
              eyebrow="Apparel"
              title="Long sleeve"
              description="Black long sleeve with the Battles Budz crest, ready through Shopify."
              cta="Shop long sleeve"
              href={longSleeveUrl}
              visual={<LongSleeveMock />}
            />
            <ProductCard
              eyebrow="Apparel"
              title="Tank top"
              description="A warm-weather logo piece for the first Battles Budz apparel run."
              cta="Shop tank tops"
              href={tankUrl}
              visual={<img src="/media/battles-budz-full-chest-tee.jpg" alt="" className="h-full max-h-36 w-full object-contain" />}
            />
            <ProductCard
              eyebrow="Preview"
              title="Sunglasses"
              description="A future accessories drop. Keeping this visible without pretending it is ready to ship."
              cta="Get drop updates"
              badge="Coming soon"
              onClick={() => scrollTo("newsletter")}
              visual={<SunglassesMock />}
            />
          </div>
        </section>

        <section id="dual-cart-battery" className="border-y border-yellow-300/20 bg-zinc-950">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-8">
            <div className="overflow-hidden rounded-lg border border-yellow-300/30 bg-black p-4 shadow-2xl shadow-yellow-300/5">
              <video
                className="mx-auto aspect-[9/16] max-h-[720px] w-full rounded-md object-cover"
                autoPlay
                loop
                muted
                playsInline
                controls
                preload="metadata"
                poster="/media/battles-budz-dual-cart-battery-poster.jpg"
              >
                <source src="/media/battles-budz-dual-cart-battery-loop.mp4" type="video/mp4" />
                Your browser does not support the product video.
              </video>
            </div>
            <div>
              <GoldLabel>
                <BatteryCharging className="h-4 w-4" /> Battles Budz accessory drop
              </GoldLabel>
              <h2 className="mt-5 max-w-2xl text-5xl font-black uppercase leading-none tracking-[-0.06em] sm:text-6xl">
                Dual-cart battery.
              </h2>
              <p className="mt-5 text-2xl font-black text-yellow-300">$60. About 50 on hand.</p>
              <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-300">
                The battery is a branded empty device accessory. We are keeping it visible because it is a real product, while separating it from the Shopify apparel flow until checkout is fully ready for that category.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
                  <Clock3 className="h-6 w-6 text-yellow-300" />
                  <p className="mt-4 font-black uppercase tracking-[0.08em] text-white">Retail status</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">Online customer checkout is next in line after payment setup.</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
                  <Store className="h-6 w-6 text-yellow-300" />
                  <p className="mt-4 font-black uppercase tracking-[0.08em] text-white">Wholesale</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">Dispensaries and retailers can ask for pricing now.</p>
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => scrollTo("newsletter")}
                  className="inline-flex items-center justify-center gap-2 bg-yellow-300 px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-yellow-200"
                >
                  Get battery updates <Mail className="h-5 w-5" />
                </button>
                <a
                  href={wholesaleEmailHref}
                  className="inline-flex items-center justify-center gap-2 border border-yellow-300 px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-yellow-200 transition hover:bg-yellow-300 hover:text-black"
                >
                  Wholesale pricing <ArrowUpRight className="h-5 w-5" />
                </a>
              </div>
              <p className="mt-5 text-sm leading-6 text-zinc-500">
                Are you a dispensary or retailer? Email battlesbudz@gmail.com for professional wholesale pricing. Wholesale fulfillment may take up to one month.
              </p>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
          <div>
            <GoldLabel>
              <ShieldCheck className="h-4 w-4" /> Who we are
            </GoldLabel>
            <h2 className="mt-5 text-5xl font-black uppercase leading-none tracking-[-0.06em] sm:text-6xl">
              A Buffalo cannabis brand with work ethic.
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-8 text-zinc-300">
            <p>
              Battles Budz is a veteran-owned cannabis microbusiness preparing to open in Buffalo. The public retail launch is not live yet because we are waiting on the Office of Cannabis Management to give the full go-ahead.
            </p>
            <p>
              That waiting period does not mean the brand goes quiet. It means we build in public: apparel first, accessories next, then the full adult-use retail experience when the state process clears.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-yellow-300/20 bg-yellow-300/5 p-5">
                <ShoppingBag className="h-6 w-6 text-yellow-300" />
                <p className="mt-4 font-black uppercase tracking-[0.08em] text-white">Buy now</p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">Apparel through the Battles Budz Shopify store.</p>
              </div>
              <div className="rounded-lg border border-yellow-300/20 bg-yellow-300/5 p-5">
                <BatteryCharging className="h-6 w-6 text-yellow-300" />
                <p className="mt-4 font-black uppercase tracking-[0.08em] text-white">Next up</p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">Dual-cart battery checkout and wholesale flow.</p>
              </div>
              <div className="rounded-lg border border-yellow-300/20 bg-yellow-300/5 p-5">
                <Sun className="h-6 w-6 text-yellow-300" />
                <p className="mt-4 font-black uppercase tracking-[0.08em] text-white">Coming soon</p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">Sunglasses and more brand gear.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="policies" className="border-y border-yellow-300/20 bg-zinc-950">
          <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <GoldLabel>
                  <PackageCheck className="h-4 w-4" /> Customer policy snapshot
                </GoldLabel>
                <h2 className="mt-5 max-w-3xl text-4xl font-black uppercase leading-none tracking-[-0.05em] sm:text-6xl">
                  Clear terms before checkout.
                </h2>
              </div>
              <a
                href="/shipping-returns"
                className="inline-flex items-center justify-center gap-2 border border-yellow-300 px-6 py-3 text-sm font-black uppercase tracking-[0.12em] text-yellow-200 transition hover:bg-yellow-300 hover:text-black"
              >
                Read full policy <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-white/10 bg-black p-5">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-yellow-300">Shipping</p>
                <p className="mt-3 text-sm leading-6 text-zinc-400">$8.99 under $50. Free shipping at $50+. Self-fulfilled items are intended to ship within two business days.</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-black p-5">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-yellow-300">Refunds</p>
                <p className="mt-3 text-sm leading-6 text-zinc-400">30-day refund option. Customer pays return postage for standard returns.</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-black p-5">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-yellow-300">Exchanges</p>
                <p className="mt-3 text-sm leading-6 text-zinc-400">30-day apparel size exchanges, even if worn. Battles Budz pays return postage; customer pays $9 replacement shipping.</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-black p-5">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-yellow-300">Batteries</p>
                <p className="mt-3 text-sm leading-6 text-zinc-400">If a battery does not work, send a photo or video and we will send a replacement.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-16 lg:px-8">
          <div className="rounded-lg border border-yellow-300/25 bg-black p-6 text-center sm:p-8">
            <LockKeyhole className="mx-auto h-7 w-7 text-yellow-300" />
            <p className="mt-4 text-sm font-black uppercase tracking-[0.28em] text-yellow-300">Cannabis menu - coming soon</p>
            <p className="mx-auto mt-3 max-w-2xl text-zinc-400">
              Cannabis product menus will appear only after the Buffalo retail launch is fully cleared. For now, shop the apparel drop and join the update list.
            </p>
          </div>
        </section>

        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
