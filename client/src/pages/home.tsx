import { ArrowDown, ArrowUpRight, Mail, ShieldCheck, Sparkles } from "lucide-react";
import Navigation from "@/components/navigation";
import NewsletterSection from "@/components/newsletter-section";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo/SEOHead";
import { getCanonicalUrl, getOrganizationSchema } from "@/utils/seo";
import logoPath from "@assets/BattlesBudz_Logo_1752301078028.png";

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#090909] text-white">
      <SEOHead
        title="Battles Budz | Opening Soon in Buffalo, NY"
        description="Battles Budz is a veteran-owned cannabis microbusiness opening soon in Buffalo, New York. Get updates on our opening and current drops."
        keywords={["Battles Budz", "Buffalo cannabis microbusiness", "veteran owned", "Buffalo opening soon", "cannabis accessories", "Battles Budz apparel"]}
        canonicalUrl={getCanonicalUrl("/")}
        structuredData={getOrganizationSchema()}
      />
      <Navigation />

      <main>
        <section className="relative isolate overflow-hidden border-b border-yellow-400/15 pt-28 sm:pt-36">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_20%,rgba(250,204,21,0.18),transparent_30%),radial-gradient(circle_at_12%_75%,rgba(234,179,8,0.1),transparent_32%)]" />
          <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-20 lg:grid-cols-[1.2fr_.8fr] lg:items-end lg:px-8 lg:pb-28">
            <div>
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-400/40 bg-yellow-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-yellow-300">
                <Sparkles className="h-3.5 w-3.5" /> Buffalo, New York &middot; Opening soon
              </p>
              <h1 className="max-w-4xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
                Built for <span className="text-yellow-300">the wait.</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-zinc-300 sm:text-xl">
                Battles Budz is a veteran-owned cannabis microbusiness preparing to open in Buffalo. While we wait for final OCM clearance, follow the build and stay close to the first drops.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button onClick={() => scrollTo("available-now")} className="inline-flex items-center justify-center gap-2 rounded-full bg-yellow-300 px-6 py-3.5 font-bold text-black transition hover:bg-yellow-200">
                  See what&apos;s available <ArrowDown className="h-4 w-4" />
                </button>
                <button onClick={() => scrollTo("newsletter")} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3.5 font-semibold text-white transition hover:border-yellow-300 hover:text-yellow-200">
                  Get Buffalo updates <Mail className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md rounded-[2rem] border border-yellow-300/30 bg-zinc-950 p-8 shadow-2xl shadow-yellow-400/10">
              <div className="absolute inset-x-8 top-0 h-px bg-yellow-200" />
              <img src={logoPath} alt="Battles Budz USA" className="mx-auto h-auto w-52" />
              <div className="mt-10 border-t border-white/10 pt-6">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-yellow-300">The status</p>
                <p className="mt-3 text-2xl font-bold">Retail is on the way.</p>
                <p className="mt-3 leading-7 text-zinc-400">We&apos;re waiting for the final go-ahead from the New York Office of Cannabis Management before opening the Buffalo retail experience.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="available-now" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-yellow-300">Available now</p>
              <h2 className="mt-3 text-4xl font-black uppercase tracking-[-0.04em] sm:text-5xl">Support the build.</h2>
            </div>
            <p className="max-w-md text-zinc-400">Current drops are designed to carry the brand now, before the doors open in Buffalo.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <article className="rounded-3xl border border-white/10 bg-zinc-900 p-7 transition hover:border-yellow-300/50">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-yellow-300">Merchandise</p>
              <h3 className="mt-4 text-3xl font-bold">The first drop</h3>
              <p className="mt-3 max-w-lg leading-7 text-zinc-400">Black Battles Budz tees and future hoodie drops are being prepared for online ordering. Join the list to catch the release.</p>
              <button onClick={() => scrollTo("newsletter")} className="mt-7 inline-flex items-center gap-2 font-bold text-yellow-300 hover:text-yellow-200">Get launch updates <ArrowUpRight className="h-4 w-4" /></button>
            </article>
            <article className="rounded-3xl border border-yellow-300/25 bg-gradient-to-br from-yellow-300/15 to-zinc-950 p-7">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-yellow-200">Accessories</p>
              <h3 className="mt-4 text-3xl font-bold">Built for the rotation</h3>
              <p className="mt-3 max-w-lg leading-7 text-zinc-300">Our accessories collection is part of the opening-era release. Watch for product details, drops, and wholesale availability.</p>
              <a href="mailto:battlesbudz@gmail.com?subject=Battles%20Budz%20Wholesale%20Inquiry" className="mt-7 inline-flex items-center gap-2 font-bold text-yellow-200 hover:text-white">Wholesale inquiry <ArrowUpRight className="h-4 w-4" /></a>
            </article>
          </div>
        </section>

        <section id="about" className="border-y border-white/10 bg-zinc-950">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-yellow-300">The brand</p>
              <h2 className="mt-3 text-4xl font-black uppercase tracking-[-0.04em] sm:text-5xl">Made to show up.</h2>
            </div>
            <div className="space-y-6 text-lg leading-8 text-zinc-300">
              <p>Battles Budz is building a disciplined, community-minded cannabis brand for Buffalo. We believe the work before opening matters: showing up, building trust, and making products people want to stand behind.</p>
              <p>Our retail cannabis experience will open only after final authorization. Until then, this is where to follow the journey, shop the first drops, and connect with the team.</p>
              <div className="flex items-center gap-3 rounded-2xl border border-yellow-300/20 bg-yellow-300/5 p-5 text-base text-zinc-200"><ShieldCheck className="h-6 w-6 shrink-0 text-yellow-300" /> Adult-oriented brand. Retail cannabis coming only after final OCM clearance.</div>
            </div>
          </div>
        </section>

        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
