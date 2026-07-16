
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import SEOHead from "@/components/seo/SEOHead";
import { getCanonicalUrl } from "@/utils/seo";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-battles-black text-white">
      <SEOHead
        title="Terms of Service | Battles Budz"
        description="Review the terms for using the Battles Budz website and receiving product and opening updates."
        canonicalUrl={getCanonicalUrl("/terms-of-service")}
      />
      <main id="main-content" className="mx-auto max-w-4xl px-4 pb-12 pt-32">
        <Link href="/" className="mb-8 inline-flex items-center text-battles-gold transition-colors hover:text-yellow-400">
          <ArrowLeft className="mr-2 h-5 w-5" aria-hidden="true" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-playfair font-bold text-battles-gold mb-8">Terms of Service</h1>
        
        <div className="prose prose-invert max-w-none space-y-6">
          <p className="text-gray-300 text-lg">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-battles-gold">Acceptance of Terms</h2>
            <p className="text-gray-300">
              By accessing and using the Battles Budz LLC website, you accept and agree to be bound by these terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-battles-gold">Age Verification</h2>
            <p className="text-gray-300">
              You must be 21 years of age or older to access cannabis-related content on this website. Licensed cannabis
              sales begin only when permitted under applicable New York regulations.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-battles-gold">Legal Compliance</h2>
            <p className="text-gray-300">
              Battles Budz LLC is preparing to open a cannabis microbusiness in Buffalo, New York. We follow applicable
              laws and share retail updates only through official Battles Budz channels.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-battles-gold">Product Information</h2>
            <p className="text-gray-300">
              Product availability, pricing, and fulfillment details may change. Please review product-specific
              information and applicable terms before making a purchase.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-battles-gold">Prohibited Uses</h2>
            <p className="text-gray-300">
              You may not use our service:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>To transmit any material that is harmful, threatening, abusive, harassing, or otherwise objectionable</li>
              <li>To impersonate or attempt to impersonate the company, employees, or other users</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-battles-gold">Limitation of Liability</h2>
            <p className="text-gray-300">
              Battles Budz LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-battles-gold">Contact Information</h2>
            <p className="text-gray-300">
              Questions about the Terms of Service should be sent to us at battlesbudz@gmail.com.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
