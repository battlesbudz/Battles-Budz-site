import {
  ArrowDown,
  ArrowUpRight,
  BatteryCharging,
  Bell,
  CheckCircle2,
  Clock3,
  LockKeyhole,
  Mail,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
} from "lucide-react";
import type { ReactNode } from "react";
import Navigation from "@/components/navigation";
import NewsletterSection from "@/components/newsletter-section";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo/SEOHead";
import { getCanonicalUrl, getOrganizationSchema } from "@/utils/seo";

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

function GoldLabel({ children }: { children: ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 border border-yellow-300/45 bg-yellow-300/10 px-3 py-2 text-[0.68rem] font-black uppercase tracking-[0.22em] text-yellow-200">
      {children}
    </p>
  );
}

function PrimaryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center gap-2 bg-yellow-300 px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-black shadow-[0_0_28px_rgba(250,204,21,0.2)] transition hover:bg-yellow-200 sm:px-8"
    >
      {children}
    </a>
  );
}

function SecondaryButton({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 border border-yellow-300 px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-yellow-200 transition hover:bg-yellow-300 hover:text-black sm:px-8"
    >
      {children}
    </button>
  );
}

function HoodieSilhouette({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`relative mx-auto ${compact ? "h-32 w-28" : "h-56 w-48"}`} aria-label="Black Battles Budz hoodie preview">
      <div className="absolute left-1/2 top-0 h-9 w-20 -translate-x-1/2 rounded-t-full border border-zinc-700 bg-zinc-900" />
      <div className="absolute inset-x-5 top-6 h-20 rounded-t-[42px] border border-zinc-700 bg-zinc-900" />
      <div className="absolute inset-x-3 bottom-0 top-14 rounded-b-lg rounded-t-[34px] border border-zinc-700 bg-zinc-950 shadow-inner shadow-black" />
      <div className="absolute left-3 top-12 h-28 w-6 -rotate-12 rounded-full border border-zinc-700 bg-zinc-950" />
      <div className="absolute right-3 top-12 h-28 w-6 rotate-12 rounded-full border border-zinc-700 bg-zinc-950" />
      <img
        src="/media/battles-budz-logo-cropped.png"
        alt=""
        className={`absolute ${compact ? "left-10 top-14 w-10" : "left-16 top-[5.5rem] w-16"} h-auto opacity-95`}
      />
      {!compact ? <div className="absolute bottom-8 left-1/2 h-11 w-28 -translate-x-1/2 rounded-t-lg border border-zinc-800 bg-black/70" /> : null}
    </div>
  );
}

function ProductVisual({ kind }: { kind: "tee" | "hoodie" | "battery" | "long-sleeve" | "tank" }) {
  if (kind === "tee" || kind === "tank") {
    return <img src="/media/battles-budz-full-chest-tee.jpg" alt="" className="h-full w-full object-contain" />;
  }

  if (kind === "battery") {
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

  if (kind === "hoodie") {
    return <HoodieSilhouette compact />;
  }

  return (
    <div className="relative h-32 w-36" aria-label="Black Battles Budz long sleeve preview">
      <div className="absolute left-1/2 top-2 h-8 w-28 -translate-x-1/2 rounded-t-full border border-zinc-700 bg-zinc-950" />
      <div className="absolute left-10 top-8 h-24 w-20 rounded-b-md border border-zinc-700 bg-black" />
      <div className="absolute left-3 top-10 h-24 w-5 -rotate-12 rounded-full border border-zinc-700 bg-black" />
      <div className="absolute right-3 top-10 h-24 w-5 rotate-12 rounded-full border border-zinc-700 bg-black" />
      <img src="/media/battles-budz-logo-cropped.png" alt="" className="absolute left-1/2 top-12 w-16 -translate-x-1/2" />
    </div>
  );
}

type ProductCardProps = {
  href?: string;
  onClick?: () => void;
  kind: "tee" | "hoodie" | "battery" | "long-sleeve" | "tank";
  eyebrow: string;
  title: string;
  copy: string;
  cta: string;
};

function ProductCard({ href, onClick, kind, eyebrow, title, copy, cta }: ProductCardProps) {
  const actionClass =
    "mt-5 inline-flex items-center justify-center gap-2 border border-yellow-300/75 px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-yellow-200 transition hover:bg-yellow-300 hover:text-black";

  return (
    <article className="group grid min-h-full grid-cols-[104px_1fr] gap-4 border border-yellow-300/25 bg-black/80 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.035)] transition hover:-translate-y-0.5 hover:border-yellow-300/70 sm:grid-cols-[138px_1fr]">
      <div className="flex h-32 items-center justify-center overflow-hidden border border-white/10 bg-zinc-950">
        <ProductVisual kind={kind} />
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-yellow-300">{eyebrow}</p>
        <h3 className="mt-2 text-2xl font-black uppercase leading-none tracking-[-0.04em] text-white">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-zinc-400">{copy}</p>
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

function HeroStage() {
  return (
    <div className="relative min-h-[520px] overflow-hidden border border-yellow-300/25 bg-black shadow-2xl shadow-yellow-300/5 lg:min-h-[620px]">
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(250,204,21,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(250,204,21,0.12)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_35%,rgba(250,204,21,0.18),transparent_34%),radial-gradient(circle_at_78%_20%,rgba(255,255,255,0.08),transparent_28%)]" />

      <div className="relative grid min-h-[520px] gap-5 p-4 sm:p-6 lg:min-h-[620px] lg:grid-cols-[1.08fr_.92fr]">
        <div className="relative flex min-h-[430px] items-center justify-center overflow-hidden bg-zinc-950">
          <img
            src="/media/battles-budz-logo-cropped.png"
            alt=""
            className="absolute left-1/2 top-1/2 w-[115%] -translate-x-1/2 -translate-y-1/2 opacity-[0.08]"
          />
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black to-transparent" />
          <video
            className="relative z-10 aspect-[9/16] max-h-[520px] w-auto rounded-[1.5rem] border border-white/10 object-cover shadow-2xl shadow-black"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/media/battles-budz-dual-cart-battery-poster.jpg"
            aria-describedby="battery-video-description"
          >
            <source src="/media/battles-budz-dual-cart-battery-loop.mp4" type="video/mp4" />
          </video>
          <p id="battery-video-description" className="sr-only">
            A looping product video showing the Battles Budz Dual Cart Battery.
          </p>
          <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between border border-yellow-300/30 bg-black/75 px-4 py-3 backdrop-blur">
            <span className="text-xs font-black uppercase tracking-[0.18em] text-yellow-200">Dual-cart battery</span>
            <span className="text-xs font-black uppercase tracking-[0.18em] text-white">$60</span>
          </div>
        </div>

        <div className="grid gap-5">
          <div className="relative flex min-h-64 items-center justify-center overflow-hidden bg-zinc-950 p-5">
            <img
              src="/media/battles-budz-full-chest-tee.jpg"
              alt="Battles Budz black T-shirt with yellow full chest logo"
              className="max-h-72 w-full object-contain"
            />
            <div className="absolute bottom-4 left-4 right-4 border border-yellow-300/30 bg-black/80 px-4 py-3">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-yellow-200">Full-chest tee • $25</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="flex min-h-52 flex-col items-center justify-center bg-zinc-950 p-4">
              <HoodieSilhouette compact />
              <p className="mt-3 text-center text-xs font-black uppercase tracking-[0.16em] text-yellow-200">Hoodie • $60</p>
            </div>
            <div className="flex min-h-52 flex-col justify-between border border-yellow-300/25 bg-yellow-300 p-5 text-black">
              <p className="text-xs font-black uppercase tracking-[0.18em]">Shop live now</p>
              <p className="text-3xl font-black uppercase leading-none tracking-[-0.06em]">Apparel first. Buffalo next.</p>
              <ShoppingBag className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickLinkCard({
  href,
  label,
  title,
  children,
}: {
  href?: string;
  label: string;
  title: string;
  children: ReactNode;
}) {
  const content = (
    <>
      <span className="text-[0.68rem] font-black uppercase tracking-[0.22em] text-yellow-300">{label}</span>
      <span className="mt-2 block text-2xl font-black uppercase leading-none tracking-[-0.04em] text-white">{title}</span>
      <span className="mt-4 flex h-28 items-center justify-center overflow-hidden bg-zinc-950">{children}</span>
    </>
  );

  return href ? (
    <a href={href} className="group border border-yellow-300/35 bg-black p-4 transition hover:-translate-y-0.5 hover:border-yellow-300">
      {content}
    </a>
  ) : (
    <button
      onClick={() => scrollTo("dual-cart-battery")}
      className="group border border-yellow-300/35 bg-black p-4 text-left transition hover:-translate-y-0.5 hover:border-yellow-300"
    >
      {content}
    </button>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <SEOHead
        title="Battles Budz | Opening Soon in Buffalo, NY"
        description="Battles Budz is a veteran-owned cannabis microbusiness opening soon in Buffalo, New York. Shop apparel now and follow the road to launch."
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
        <section className="relative isolate overflow-hidden border-b border-yellow-300/25 pt-20">
          <div className="absolute inset-0 -z-10 bg-[#050505]" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,rgba(250,204,21,0.16),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.08),transparent_25%)]" />

          <div className="mx-auto grid max-w-7xl gap-8 px-5 pb-8 pt-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:px-8 lg:pb-12">
            <div className="py-4 lg:py-12">
              <GoldLabel>
                <Sparkles className="h-4 w-4" /> Buffalo retail launch - coming soon
              </GoldLabel>
              <h1 className="mt-7 max-w-3xl text-[clamp(4.2rem,13vw,9.5rem)] font-black uppercase leading-[0.78] tracking-[-0.09em] text-zinc-100">
                Built for the wait.
              </h1>
              <p className="mt-7 max-w-xl text-lg font-semibold leading-8 text-zinc-200">
                Battles Budz is a Buffalo cannabis microbusiness waiting on final OCM clearance. The retail doors are not open yet, but the brand is live: apparel is ready now, battery updates are open, and the launch list starts here.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <PrimaryLink href={shopUrl}>
                  Shop the drop <ShoppingBag className="h-5 w-5" />
                </PrimaryLink>
                <SecondaryButton onClick={() => scrollTo("newsletter")}>
                  Get Buffalo updates <Mail className="h-5 w-5" />
                </SecondaryButton>
              </div>
              <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
                <div className="border border-white/10 bg-white/[0.035] p-4">
                  <p className="text-2xl font-black text-yellow-300">21+</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-zinc-400">Adult audience</p>
                </div>
                <div className="border border-white/10 bg-white/[0.035] p-4">
                  <p className="text-2xl font-black text-yellow-300">Buffalo</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-zinc-400">Opening soon</p>
                </div>
                <div className="border border-white/10 bg-white/[0.035] p-4">
                  <p className="text-2xl font-black text-yellow-300">Now</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-zinc-400">Merch online</p>
                </div>
              </div>
            </div>

            <HeroStage />
          </div>

          <div className="border-y border-yellow-900 bg-yellow-300 px-5 py-3 text-center text-sm font-black uppercase tracking-[0.32em] text-black sm:text-base">
            Buffalo retail launch - coming soon
          </div>

          <div className="mx-auto grid max-w-7xl gap-4 px-5 py-5 lg:grid-cols-3 lg:px-8">
            <QuickLinkCard href={teeUrl} label="$25 • S-XL" title="Full-chest tee">
              <img src="/media/battles-budz-full-chest-tee.jpg" alt="" className="h-full w-full object-contain" />
            </QuickLinkCard>
            <QuickLinkCard href={hoodieUrl} label="$60 • free shipping" title="Heavy blend hoodie">
              <HoodieSilhouette compact />
            </QuickLinkCard>
            <QuickLinkCard label="$60 • accessory" title="Dual-cart battery">
              <ProductVisual kind="battery" />
            </QuickLinkCard>
          </div>
        </section>

        <section id="shop" className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <GoldLabel>
                <PackageCheck className="h-4 w-4" /> Available online now
              </GoldLabel>
              <h2 className="mt-5 max-w-3xl text-4xl font-black uppercase leading-none tracking-[-0.05em] sm:text-6xl">
                Merch that is ready to order.
              </h2>
            </div>
            <p className="max-w-md text-base leading-7 text-zinc-400">
              The Shopify store is the checkout home for apparel. Every button in this section goes to a live product page.
            </p>
          </div>

          <div id="available-now" className="mt-10 grid gap-4 lg:grid-cols-2">
            <ProductCard
              eyebrow="$25 • S-XL"
              title="Full-chest tee"
              copy="Black tee with the yellow Battles Budz USA logo across the chest."
              cta="Shop T-shirts"
              href={teeUrl}
              kind="tee"
            />
            <ProductCard
              eyebrow="$60 • free U.S. shipping"
              title="Heavy blend hoodie"
              copy="Made-to-order black hoodie with the Battles Budz crest on the upper-left chest."
              cta="Shop hoodies"
              href={hoodieUrl}
              kind="hoodie"
            />
            <ProductCard
              eyebrow="$35 • S-4XL"
              title="Crest long sleeve"
              copy="Black long sleeve with Battles Budz branding, available through Shopify."
              cta="Shop long sleeve"
              href={longSleeveUrl}
              kind="long-sleeve"
            />
            <ProductCard
              eyebrow="$25 • XS-2XL"
              title="Logo tank top"
              copy="A warm-weather logo piece for the first Battles Budz apparel run."
              cta="Shop tank tops"
              href={tankUrl}
              kind="tank"
            />
          </div>
        </section>

        <section id="dual-cart-battery" className="border-y border-yellow-300/20 bg-zinc-950">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
            <div className="relative overflow-hidden border border-yellow-300/30 bg-black p-4 shadow-2xl shadow-yellow-300/5">
              <img
                src="/media/battles-budz-logo-cropped.png"
                alt=""
                className="absolute left-1/2 top-1/2 w-[130%] -translate-x-1/2 -translate-y-1/2 opacity-[0.07]"
              />
              <video
                className="relative mx-auto aspect-[9/16] max-h-[680px] w-full max-w-sm object-cover shadow-2xl shadow-black"
                autoPlay
                loop
                muted
                playsInline
                controls
                preload="metadata"
                poster="/media/battles-budz-dual-cart-battery-poster.jpg"
              >
                <source src="/media/battles-budz-dual-cart-battery-loop.mp4" type="video/mp4" />
              </video>
            </div>
            <div>
              <GoldLabel>
                <BatteryCharging className="h-4 w-4" /> Accessory spotlight
              </GoldLabel>
              <h2 className="mt-5 max-w-2xl text-5xl font-black uppercase leading-none tracking-[-0.06em] sm:text-6xl">
                Dual-cart battery.
              </h2>
              <p className="mt-5 text-2xl font-black text-yellow-300">$60 retail. About 50 units on hand.</p>
              <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-300">
                The Battles Budz dual-cart battery is real inventory and a core accessory for the brand. Retail checkout is being handled separately from apparel so the buying experience stays clean; wholesale conversations are open now.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="border border-white/10 bg-white/[0.035] p-5">
                  <Clock3 className="h-6 w-6 text-yellow-300" />
                  <p className="mt-4 font-black uppercase tracking-[0.08em] text-white">Retail status</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">Customer checkout will open after the battery payment path is ready.</p>
                </div>
                <div className="border border-white/10 bg-white/[0.035] p-5">
                  <Store className="h-6 w-6 text-yellow-300" />
                  <p className="mt-4 font-black uppercase tracking-[0.08em] text-white">Wholesale</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">Dispensaries and retailers can request pricing now.</p>
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <SecondaryButton onClick={() => scrollTo("newsletter")}>
                  Get battery updates <Mail className="h-5 w-5" />
                </SecondaryButton>
                <PrimaryLink href={wholesaleEmailHref}>
                  Wholesale pricing <ArrowUpRight className="h-5 w-5" />
                </PrimaryLink>
              </div>
              <p className="mt-5 text-sm leading-6 text-zinc-500">
                Are you a dispensary or retailer? Email battlesbudz@gmail.com for professional wholesale pricing. Wholesale fulfillment may take up to one month.
              </p>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <GoldLabel>
              <ShieldCheck className="h-4 w-4" /> Our story
            </GoldLabel>
            <h2 className="mt-5 text-5xl font-black uppercase leading-none tracking-[-0.06em] sm:text-6xl">
              Buffalo is the next chapter.
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-8 text-zinc-300">
            <p>
              Battles Budz is a veteran-owned cannabis microbusiness preparing to open in Buffalo. Cannabis products will not be listed until the final state clearance is in place.
            </p>
            <p>
              In the meantime, this site has a simple job: show people who we are, make the current merch easy to buy, and keep future customers updated while the retail launch moves forward.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="border border-yellow-300/20 bg-yellow-300/5 p-5">
                <ShoppingBag className="h-6 w-6 text-yellow-300" />
                <p className="mt-4 font-black uppercase tracking-[0.08em] text-white">Buy today</p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">Apparel through the Battles Budz Shopify store.</p>
              </div>
              <div className="border border-yellow-300/20 bg-yellow-300/5 p-5">
                <BatteryCharging className="h-6 w-6 text-yellow-300" />
                <p className="mt-4 font-black uppercase tracking-[0.08em] text-white">Next up</p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">Battery retail checkout and wholesale follow-up.</p>
              </div>
              <div className="border border-yellow-300/20 bg-yellow-300/5 p-5">
                <Bell className="h-6 w-6 text-yellow-300" />
                <p className="mt-4 font-black uppercase tracking-[0.08em] text-white">Future gear</p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">Sunglasses and accessories will be announced after samples and fulfillment are locked.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="policies" className="border-y border-yellow-300/20 bg-zinc-950">
          <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <GoldLabel>
                  <CheckCircle2 className="h-4 w-4" /> Before checkout
                </GoldLabel>
                <h2 className="mt-5 max-w-3xl text-4xl font-black uppercase leading-none tracking-[-0.05em] sm:text-6xl">
                  Clear terms. No guesswork.
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
              <div className="border border-white/10 bg-black p-5">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-yellow-300">Shipping</p>
                <p className="mt-3 text-sm leading-6 text-zinc-400">$8.99 under $50. Free shipping at $50+. Self-fulfilled items are intended to ship within two business days.</p>
              </div>
              <div className="border border-white/10 bg-black p-5">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-yellow-300">Refunds</p>
                <p className="mt-3 text-sm leading-6 text-zinc-400">30-day refund option. Customer pays return postage for standard returns.</p>
              </div>
              <div className="border border-white/10 bg-black p-5">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-yellow-300">Exchanges</p>
                <p className="mt-3 text-sm leading-6 text-zinc-400">30-day apparel size exchanges, even if worn. Battles Budz pays return postage; customer pays $9 replacement shipping.</p>
              </div>
              <div className="border border-white/10 bg-black p-5">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-yellow-300">Batteries</p>
                <p className="mt-3 text-sm leading-6 text-zinc-400">If a battery does not work, send a photo or video and we will send a replacement.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="border border-yellow-300/25 bg-black p-8 text-center">
            <LockKeyhole className="mx-auto h-7 w-7 text-yellow-300" />
            <p className="mt-4 text-sm font-black uppercase tracking-[0.28em] text-yellow-300">Cannabis menu - coming soon</p>
            <p className="mx-auto mt-3 max-w-2xl text-zinc-400">
              The cannabis menu will appear only after the Buffalo retail launch is fully cleared. Until then, shop the merch drop and join the update list.
            </p>
          </div>
        </section>

        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
