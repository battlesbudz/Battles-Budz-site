import { useState } from "react";
import { ArrowLeft, Menu, X } from "lucide-react";
import { Link } from "wouter";
import OcmComplianceNotice from "@/components/ocm-compliance-notice";
import SEOHead from "@/components/seo/SEOHead";
import { getCanonicalUrl } from "@/utils/seo";

const purchaseHref =
  "mailto:battlesbudz@gmail.com?subject=I%20want%20to%20order%20a%20Battles%20Budz%20Dual-Cart%20Battery";
const wholesaleHref =
  "mailto:battlesbudz@gmail.com?subject=Battles%20Budz%20Dual-Cart%20Battery%20Wholesale%20Inquiry";

const displayFont = {
  fontFamily: 'Impact, "Arial Black", Arial, sans-serif',
};

const contentWidth =
  "mx-auto w-full max-w-[1244px] px-8 max-[900px]:max-w-[756px] max-[900px]:px-[18px]";
const eyebrowClass =
  "inline-flex items-center gap-[10px] border border-[rgba(255,220,18,.45)] bg-[rgba(255,220,18,.10)] px-[14px] py-[10px] text-xs font-black uppercase tracking-[.16em] text-[#fff080]";
const buttonClass =
  "inline-flex min-h-[54px] items-center justify-center border border-[#ffdc12] px-6 text-[13px] font-black uppercase tracking-[.12em] transition-colors";

const navigationLinks = [
  { label: "Apparel", href: "/shop" },
  { label: "Dual-Cart Battery", href: "/battery" },
  { label: "Coming Soon", href: "/coming-soon" },
  { label: "Our Story", href: "/our-story" },
  { label: "Contact", href: "#contact", external: true },
];

function BatteryNavigation() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative flex h-[82px] items-center border-b border-[rgba(255,220,18,.28)] bg-[rgba(0,0,0,.94)]">
      <div className={`${contentWidth} flex items-center justify-between`}>
        <a href="/" aria-label="Battles Budz home">
          <img
            src="/media/battles-budz-logo-cropped.png"
            alt="Battles Budz USA"
            className="block h-auto w-[142px]"
          />
        </a>

        <nav className="hidden items-center gap-[34px] min-[901px]:flex" aria-label="Primary navigation">
          {navigationLinks.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-black uppercase tracking-[.13em] text-[#ddd] transition-colors hover:text-[#ffdc12]"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                aria-current={link.href === "/battery" ? "page" : undefined}
                className={`text-xs font-black uppercase tracking-[.13em] transition-colors hover:text-[#ffdc12] ${
                  link.href === "/battery" ? "text-[#ffdc12]" : "text-[#ddd]"
                }`}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="border border-[rgba(255,220,18,.45)] p-2 text-[#ffdc12] min-[901px]:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="battery-mobile-navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <nav
          id="battery-mobile-navigation"
          className="absolute left-1/2 top-[82px] z-50 w-full max-w-[1440px] -translate-x-1/2 border-b border-[rgba(255,220,18,.28)] bg-black px-[18px] py-4 min-[901px]:hidden"
          aria-label="Mobile navigation"
        >
          {navigationLinks.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block border-b border-white/10 py-4 text-sm font-black uppercase tracking-[.13em] text-[#ddd] hover:text-[#ffdc12]"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={link.href === "/battery" ? "page" : undefined}
                className={`block border-b border-white/10 py-4 text-sm font-black uppercase tracking-[.13em] hover:text-[#ffdc12] ${
                  link.href === "/battery" ? "text-[#ffdc12]" : "text-[#ddd]"
                }`}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>
      ) : null}
    </header>
  );
}

function BatteryFooter() {
  return (
    <footer id="contact" className="border-t border-[rgba(255,220,18,.28)] bg-black">
      <OcmComplianceNotice />
      <div className={`${contentWidth} grid gap-[50px] py-14 min-[901px]:grid-cols-2`}>
        <div>
          <img
            src="/media/battles-budz-logo-cropped.png"
            alt="Battles Budz USA"
            className="h-auto w-40"
          />
          <p className="mt-4 max-w-[470px] leading-[1.7] text-[#aaa]">
            Battles Budz is a veteran-owned cannabis microbusiness coming to Buffalo, New York.
          </p>
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[.16em] text-[#ffdc12]">Contact</p>
          <a
            href="mailto:battlesbudz@gmail.com"
            className="mt-4 inline-block leading-[1.7] text-[#aaa] transition-colors hover:text-[#ffdc12]"
          >
            battlesbudz@gmail.com
          </a>
          <div className="mt-5 grid grid-cols-2 gap-x-[30px] gap-y-3 text-[13px] text-[#aaa]">
            <Link href="/shop" className="hover:text-[#ffdc12]">
              Apparel
            </Link>
            <Link href="/battery" className="hover:text-[#ffdc12]">
              Dual-Cart Battery
            </Link>
            <Link href="/coming-soon" className="hover:text-[#ffdc12]">
              Coming Soon Products
            </Link>
            <Link href="/our-story" className="hover:text-[#ffdc12]">
              Our Story
            </Link>
            <Link href="/shipping-returns" className="hover:text-[#ffdc12]">
              Shipping and Returns
            </Link>
            <Link href="/privacy-policy" className="hover:text-[#ffdc12]">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-[#171717] px-[22px] py-[22px] text-center text-xs text-[#777]">
        © 2026 Battles Budz LLC. Buffalo, New York. Opening soon.
      </div>
    </footer>
  );
}

export default function BatteryPage() {
  return (
    <div
      className="min-h-screen bg-[#181818] text-[#f7f7f2]"
      style={{ fontFamily: "Inter, Arial, Helvetica, sans-serif" }}
    >
      <SEOHead
        title="Dual-Cart Battery | Battles Budz"
        description="Order the Battles Budz dual-cart battery or contact Battles Budz for wholesale pricing."
        canonicalUrl={getCanonicalUrl("/battery")}
      />
      <div
        className="mx-auto w-full max-w-[1440px] overflow-hidden bg-[#050505] shadow-[0_0_70px_rgba(0,0,0,.7)]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      >
        <BatteryNavigation />
        <main
          id="main-content"
        >
          <section className="relative overflow-hidden border-b border-[rgba(255,220,18,.28)] pb-24 pt-[88px] max-[900px]:pt-[54px]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 80% 30%, rgba(255,220,18,.20), transparent 30%), radial-gradient(circle at 10% 110%, rgba(255,220,18,.10), transparent 42%)",
              }}
            />

            <div
              className={`${contentWidth} relative grid items-center gap-16 min-[901px]:grid-cols-[1.05fr_.95fr]`}
            >
              <div>
                <Link
                  href="/"
                  className="mb-[30px] inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.16em] text-[#fff080] transition-colors hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Back to Home
                </Link>

                <div>
                  <span className={eyebrowClass}>
                    <span
                      aria-hidden="true"
                      className="h-[7px] w-[7px] rounded-full bg-[#ffdc12] shadow-[0_0_14px_#ffdc12]"
                    />
                    Battles Budz Dual-Cart Battery
                  </span>
                </div>

                <h1
                  className="mb-[18px] mt-[26px] max-w-[760px] text-[clamp(58px,6vw,92px)] font-black uppercase leading-[.94] tracking-[-.025em] max-[900px]:text-[58px]"
                  style={displayFont}
                >
                  Two carts.
                  <br />
                  <span className="text-[#ffdc12]">Either or both.</span>
                  <br />
                  You decide.
                </h1>

                <p className="mb-[22px] text-[40px] font-black text-[#ffdc12]">$60</p>
                <p className="max-w-[680px] text-xl leading-[1.65] text-[#d0d0d0]">
                  Load two compatible 510-thread cartridges into one compact battery. Choose either cart individually,
                  switch whenever you want, or draw from both together for a completely different flavor and experience.
                </p>

                <div className="mt-8 flex flex-wrap gap-[14px]">
                  <a
                    href={purchaseHref}
                    className={`${buttonClass} bg-[#ffdc12] text-[#070707] hover:bg-[#fff080]`}
                  >
                    Email to Order
                  </a>
                  <a
                    href={wholesaleHref}
                    className={`${buttonClass} bg-transparent text-[#fff080] hover:bg-[#ffdc12] hover:text-[#070707]`}
                  >
                    Wholesale Pricing
                  </a>
                </div>
              </div>

              <div className="relative grid min-h-[610px] place-items-center overflow-hidden border border-[rgba(255,220,18,.28)] bg-[#050505] max-[900px]:min-h-[520px]">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,220,18,.14),transparent_48%)]"
                />
                <span
                  aria-hidden="true"
                  className="absolute h-px w-[360px] -rotate-[36deg] bg-gradient-to-r from-transparent via-[#ffdc12] to-transparent opacity-35"
                />
                <span
                  aria-hidden="true"
                  className="absolute h-px w-[360px] rotate-[36deg] bg-gradient-to-r from-transparent via-[#ffdc12] to-transparent opacity-35"
                />
                <img
                  src="/media/battles-budz-dual-cart-battery-poster.jpg"
                  alt="Battles Budz dual-cart battery"
                  className="relative z-10 h-[540px] w-[min(78%,390px)] object-cover object-center shadow-[0_20px_80px_rgba(0,0,0,.72)] [filter:contrast(1.08)_saturate(.82)] max-[900px]:h-[460px]"
                />
              </div>
            </div>
          </section>

          <section className="border-b border-[rgba(255,220,18,.16)] bg-[#080808] py-[100px] max-[900px]:py-[72px]">
            <div className={`${contentWidth} grid items-start gap-[70px] min-[901px]:grid-cols-[.8fr_1.2fr]`}>
              <div>
                <span className={eyebrowClass}>
                  <span
                    aria-hidden="true"
                    className="h-[7px] w-[7px] rounded-full bg-[#ffdc12] shadow-[0_0_14px_#ffdc12]"
                  />
                  Why It Exists
                </span>
                <h2
                  className="mb-[26px] mt-6 text-[clamp(48px,5.3vw,78px)] font-black uppercase leading-[.97] tracking-[-.025em]"
                  style={displayFont}
                >
                  I spent years <span className="text-[#ffdc12]">looking for this.</span>
                </h2>
              </div>

              <div>
                <p className="mb-[21px] text-[21px] leading-[1.72] text-[#cecece]">
                  I wanted one battery that could hold two flavors without making me carry two devices. One cart when I
                  wanted it. The other when I felt like switching. Both together when I wanted to create something new.
                </p>
                <p className="mb-[21px] text-[21px] leading-[1.72] text-[#f7f7f2]">
                  I couldn’t find the experience I wanted, so that search became the Battles Budz Dual-Cart Battery.
                </p>

                <div
                  aria-hidden="true"
                  className="relative min-h-[430px] overflow-hidden border border-[rgba(255,220,18,.28)] bg-[#050505]"
                >
                  <div
                    className="absolute -inset-7 scale-[1.08] bg-cover bg-center [filter:blur(22px)_brightness(.28)_saturate(.75)]"
                    style={{ backgroundImage: "url('/media/battles-budz-dual-cart-battery-open.jpg')" }}
                  />
                  <img
                    src="/media/battles-budz-dual-cart-battery-open.jpg"
                    alt=""
                    className="relative z-10 block h-[430px] w-full object-contain [filter:contrast(1.06)_saturate(.9)]"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="border-b border-[rgba(255,220,18,.16)] bg-[#050505] py-[100px] max-[900px]:py-[72px]">
            <div className={contentWidth}>
              <div className="relative overflow-hidden border border-[rgba(255,220,18,.28)] bg-[linear-gradient(100deg,rgba(255,220,18,.11),transparent_55%)] bg-[#0d0d0d] p-[54px] max-[900px]:px-[26px] max-[900px]:py-[34px]">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-[30px] top-[-46px] text-[300px] leading-none text-[rgba(255,220,18,.06)]"
                  style={displayFont}
                >
                  3
                </span>
                <h2
                  className="relative z-10 mb-[26px] mt-6 max-w-[800px] text-[clamp(48px,5.3vw,78px)] font-black uppercase leading-[.97] tracking-[-.025em]"
                  style={displayFont}
                >
                  Built around the way <span className="text-[#ffdc12]">I actually use it.</span>
                </h2>
                <p className="relative z-10 max-w-[900px] text-[22px] leading-[1.75] text-[#d2d2d2]">
                  Every feature came from how I wanted the battery to work. I wanted control when I wanted it and
                  convenience when I didn’t. Three temperature modes let you choose the heat. Hold the button for a
                  manual draw, or simply inhale and let the battery activate on its own. Preheat gets it ready before you
                  pull, and pass-through charging means you can keep using it while it is plugged in.
                </p>
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden border-b border-[rgba(255,220,18,.16)] bg-[#ffdc12] py-[100px] text-[#050505] max-[900px]:py-[72px]">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-[120px] -right-[30px] text-[420px] leading-none text-[rgba(0,0,0,.055)]"
              style={displayFont}
            >
              BB
            </span>
            <div className={`${contentWidth} relative z-10`}>
              <span className="inline-flex items-center gap-[10px] border border-[rgba(0,0,0,.45)] bg-[rgba(0,0,0,.08)] px-[14px] py-[10px] text-xs font-black uppercase tracking-[.16em] text-[#050505]">
                <span aria-hidden="true" className="h-[7px] w-[7px] rounded-full bg-[#050505]" />
                For Dispensaries
              </span>
              <h2
                className="mb-[26px] mt-6 max-w-[850px] text-[clamp(48px,5.3vw,78px)] font-black uppercase leading-[.97] tracking-[-.025em]"
                style={displayFont}
              >
                Give customers a reason to buy two.
              </h2>
              <p className="mb-[21px] max-w-[840px] text-[21px] leading-[1.7]">
                Add a veteran-owned cannabis microbusiness brand to your shelves and give customers a reason to buy two
                carts at once.
              </p>
              <p className="mb-[21px] max-w-[840px] text-[21px] leading-[1.7]">
                Offer a complete package: two compatible carts plus one Battles Budz Dual-Cart Battery, sold together as
                one bundle. Customers can enjoy either cart individually—or both together—from the same device.
              </p>
              <a
                href={wholesaleHref}
                className={`${buttonClass} relative z-10 mt-4 border-[#050505] bg-[#050505] text-[#ffdc12] hover:bg-white hover:text-[#050505] focus-visible:outline-[#050505]`}
              >
                Email for Wholesale Pricing
              </a>
            </div>
          </section>

          <section className="border-b border-[rgba(255,220,18,.16)] bg-[#050505] py-24 text-center max-[900px]:py-[72px]">
            <div className={`${contentWidth}`}>
              <div className="border border-[rgba(255,220,18,.28)] bg-[#0c0c0c] px-[30px] py-16">
                <span className={eyebrowClass}>
                  <span
                    aria-hidden="true"
                    className="h-[7px] w-[7px] rounded-full bg-[#ffdc12] shadow-[0_0_14px_#ffdc12]"
                  />
                  Battles Budz Dual-Cart Battery
                </span>
                <h2
                  className="mx-auto mb-[26px] mt-6 max-w-[900px] text-[clamp(48px,5.3vw,78px)] font-black uppercase leading-[.97] tracking-[-.025em]"
                  style={displayFont}
                >
                  Stop choosing <span className="text-[#ffdc12]">between carts.</span>
                </h2>
                <p className="mb-[6px] text-lg text-[#d4d4d4]">Battles Budz Dual-Cart Battery</p>
                <p className="mb-6 text-4xl font-black text-[#ffdc12]">$60</p>
                <a
                  href={purchaseHref}
                  className={`${buttonClass} bg-[#ffdc12] text-[#070707] hover:bg-[#fff080]`}
                >
                  Email to Order
                </a>
                <p className="mt-[22px] text-xs font-black uppercase tracking-[.16em] text-[#fff080]">
                  30-Day Money-Back or Replacement Guarantee
                </p>
              </div>
            </div>
          </section>
        </main>

        <BatteryFooter />
      </div>
    </div>
  );
}
