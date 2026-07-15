import { ArrowLeft, BatteryCharging, Mail, PackageCheck, Store, Truck } from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo/SEOHead";
import { getCanonicalUrl } from "@/utils/seo";

const purchaseHref =
  "mailto:battlesbudz@gmail.com?subject=I%20want%20to%20order%20a%20Battles%20Budz%20Dual-Cart%20Battery";
const wholesaleHref =
  "mailto:battlesbudz@gmail.com?subject=Battles%20Budz%20Dual-Cart%20Battery%20Wholesale%20Inquiry";

export default function BatteryPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead
        title="Dual-Cart Battery | Battles Budz"
        description="Learn about the Battles Budz dual-cart battery, retail purchase requests, and wholesale inquiries."
        canonicalUrl={getCanonicalUrl("/battery")}
      />
      <Navigation />

      <main className="pt-24">
        <section className="relative overflow-hidden border-b border-yellow-300/20 bg-black px-5 py-16 sm:px-6 lg:px-8">
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_top_right,rgba(250,204,21,0.42),transparent_32%),linear-gradient(rgba(250,204,21,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(250,204,21,0.08)_1px,transparent_1px)] [background-size:100%_100%,54px_54px,54px_54px]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <div>
              <Link
                href="/"
                className="mb-8 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.14em] text-yellow-300 transition hover:text-yellow-100"
              >
                <ArrowLeft className="h-5 w-5" />
                Back to home
              </Link>
              <p className="inline-flex items-center gap-2 border border-yellow-300/40 bg-yellow-300/10 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-yellow-200">
                <BatteryCharging className="h-4 w-4" /> Battles Budz Dual-Cart Battery
              </p>
              <h1 className="mt-6 text-5xl font-black uppercase leading-none tracking-[-0.06em] sm:text-7xl">
                Dual-Cart <span className="text-battles-gold">Battery</span>.
              </h1>
              <p className="mt-5 text-xl font-bold text-battles-gold">$60. Limited first batch available.</p>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
                The Battles Budz dual-cart battery is a branded empty dual-cart device built for customers who want a
                compact device for two compatible cartridges. No cannabis products are included.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href={purchaseHref}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-battles-gold px-7 py-4 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:bg-yellow-300"
                >
                  Email to purchase <Mail className="h-5 w-5" />
                </a>
                <a
                  href={wholesaleHref}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-yellow-300 px-7 py-4 text-sm font-black uppercase tracking-[0.14em] text-yellow-200 transition hover:bg-yellow-300 hover:text-black"
                >
                  Email for wholesale <Store className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-yellow-300/25 bg-zinc-950 p-3 shadow-2xl shadow-yellow-950/40">
              <video
                className="aspect-video w-full rounded-2xl object-cover"
                autoPlay
                loop
                muted
                playsInline
                poster="/media/battles-budz-dual-cart-battery-poster.jpg"
              >
                <source src="/media/battles-budz-dual-cart-battery-loop.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </section>

        <section className="bg-zinc-950 px-5 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-yellow-300/20 bg-black p-7">
              <Mail className="h-8 w-8 text-yellow-300" />
              <h2 className="mt-5 text-2xl font-black uppercase tracking-[-0.04em]">How to order</h2>
              <p className="mt-3 leading-7 text-zinc-400">
                Email Battles Budz with the quantity you want. We will confirm availability, send an invoice, and arrange
                payment and shipping directly.
              </p>
            </article>
            <article className="rounded-2xl border border-yellow-300/20 bg-black p-7">
              <PackageCheck className="h-8 w-8 text-yellow-300" />
              <h2 className="mt-5 text-2xl font-black uppercase tracking-[-0.04em]">Replacement support</h2>
              <p className="mt-3 leading-7 text-zinc-400">
                If a dual-cart battery arrives defective or stops working, send a photo or video showing the issue and we will
                arrange a replacement.
              </p>
            </article>
            <article className="rounded-2xl border border-yellow-300/20 bg-black p-7">
              <Truck className="h-8 w-8 text-yellow-300" />
              <h2 className="mt-5 text-2xl font-black uppercase tracking-[-0.04em]">Wholesale</h2>
              <p className="mt-3 leading-7 text-zinc-400">
                Dispensaries and retailers can email for wholesale pricing. Larger orders may require additional
                fulfillment time based on quantity.
              </p>
            </article>
          </div>
        </section>

        <section className="bg-black px-5 py-16 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-3xl border border-yellow-300/25 bg-zinc-950 p-8">
            <h2 className="text-3xl font-black uppercase leading-none tracking-[-0.05em] sm:text-4xl">
              Ready to order?
            </h2>
            <p className="mt-4 leading-7 text-zinc-300">
              Email us and include your name, quantity, and shipping city/state. We will reply with the next step.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href={purchaseHref}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-battles-gold px-7 py-4 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:bg-yellow-300"
              >
                Email to purchase <Mail className="h-5 w-5" />
              </a>
              <a
                href={wholesaleHref}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-yellow-300 px-7 py-4 text-sm font-black uppercase tracking-[0.14em] text-yellow-200 transition hover:bg-yellow-300 hover:text-black"
              >
                Email for wholesale <Store className="h-5 w-5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
