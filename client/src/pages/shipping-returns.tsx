import { ArrowLeft, BatteryCharging, PackageCheck, RefreshCcw, ShieldCheck, Truck } from "lucide-react";
import { Link } from "wouter";
import SEOHead from "@/components/seo/SEOHead";
import { getCanonicalUrl } from "@/utils/seo";

const shopShippingPolicyUrl = "https://shop.battlesbudz.com/policies/shipping-policy";
const shopRefundPolicyUrl = "https://shop.battlesbudz.com/policies/refund-policy";

export default function ShippingReturns() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead
        title="Shipping, Returns, and Exchanges | Battles Budz"
        description="Battles Budz shipping, refund, exchange, and product replacement terms for current merch and accessories."
        canonicalUrl={getCanonicalUrl("/shipping-returns")}
      />

      <main className="mx-auto max-w-5xl px-5 py-12 lg:px-8">
        <Link href="/">
          <button className="mb-8 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.14em] text-yellow-300 transition hover:text-yellow-100">
            <ArrowLeft className="h-5 w-5" />
            Back to home
          </button>
        </Link>

        <p className="inline-flex items-center gap-2 border border-yellow-300/40 bg-yellow-300/10 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-yellow-200">
          <ShieldCheck className="h-4 w-4" /> Customer policies
        </p>
        <h1 className="mt-6 max-w-4xl text-5xl font-black uppercase leading-none tracking-[-0.06em] text-white sm:text-7xl">
          Shipping, returns, and exchanges.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
          These are the customer-facing terms for Battles Budz merch and accessories while we prepare for the Buffalo retail launch. Shopify checkout may also show product-specific fulfillment timing for print-on-demand apparel.
        </p>

        <section className="mt-12 grid gap-4 md:grid-cols-2">
          <article className="rounded-lg border border-yellow-300/20 bg-zinc-950 p-6">
            <Truck className="h-7 w-7 text-yellow-300" />
            <h2 className="mt-5 text-2xl font-black uppercase tracking-[-0.03em] text-white">Shipping</h2>
            <ul className="mt-4 space-y-3 text-zinc-300">
              <li>U.S. shipping only for now.</li>
              <li>$8.99 shipping on orders under $50.</li>
              <li>Free shipping on orders of $50 or more.</li>
              <li>Self-fulfilled items are intended to ship within two business days.</li>
              <li>Print-on-demand apparel may follow the provider's production timeline shown in Shopify.</li>
            </ul>
            <a href={shopShippingPolicyUrl} className="mt-6 inline-flex items-center text-sm font-black uppercase tracking-[0.12em] text-yellow-300 hover:text-yellow-100">
              View Shopify shipping policy
            </a>
          </article>

          <article className="rounded-lg border border-yellow-300/20 bg-zinc-950 p-6">
            <RefreshCcw className="h-7 w-7 text-yellow-300" />
            <h2 className="mt-5 text-2xl font-black uppercase tracking-[-0.03em] text-white">Refunds</h2>
            <ul className="mt-4 space-y-3 text-zinc-300">
              <li>Refund requests are accepted within 30 days.</li>
              <li>If you genuinely hate it, we do not want to force you to keep it.</li>
              <li>For standard refunds, the customer pays return postage.</li>
              <li>Items should be sent back before the refund is completed unless support says otherwise.</li>
            </ul>
            <a href={shopRefundPolicyUrl} className="mt-6 inline-flex items-center text-sm font-black uppercase tracking-[0.12em] text-yellow-300 hover:text-yellow-100">
              View Shopify refund policy
            </a>
          </article>

          <article className="rounded-lg border border-yellow-300/20 bg-zinc-950 p-6">
            <PackageCheck className="h-7 w-7 text-yellow-300" />
            <h2 className="mt-5 text-2xl font-black uppercase tracking-[-0.03em] text-white">Size exchanges</h2>
            <ul className="mt-4 space-y-3 text-zinc-300">
              <li>Apparel size exchanges are accepted within 30 days.</li>
              <li>Worn items are still eligible for a size exchange.</li>
              <li>Battles Budz pays the return postage for the original item.</li>
              <li>The customer pays $9 for us to ship the replacement.</li>
            </ul>
          </article>

          <article className="rounded-lg border border-yellow-300/20 bg-zinc-950 p-6">
            <BatteryCharging className="h-7 w-7 text-yellow-300" />
            <h2 className="mt-5 text-2xl font-black uppercase tracking-[-0.03em] text-white">Battery replacements</h2>
            <ul className="mt-4 space-y-3 text-zinc-300">
              <li>If a Battles Budz battery arrives defective or stops working, send a photo or video showing the issue.</li>
              <li>Once support can see the problem, we send a replacement without a long back-and-forth.</li>
              <li>Battery customer checkout will open only after the payment/provider path is ready.</li>
            </ul>
          </article>
        </section>

        <section className="mt-8 rounded-lg border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-black uppercase tracking-[0.08em] text-yellow-300">Support contact</h2>
          <p className="mt-3 leading-7 text-zinc-300">
            For shipping, returns, exchanges, battery replacements, or wholesale questions, email{" "}
            <a href="mailto:battlesbudz@gmail.com" className="font-bold text-yellow-300 hover:text-yellow-100">
              battlesbudz@gmail.com
            </a>
            .
          </p>
        </section>
      </main>
    </div>
  );
}
