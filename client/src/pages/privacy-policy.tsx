
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import SEOHead from "@/components/seo/SEOHead";
import { getCanonicalUrl } from "@/utils/seo";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-battles-black text-white">
      <SEOHead
        title="Privacy Policy | Battles Budz"
        description="Learn how Battles Budz handles the information you provide when you subscribe or contact us."
        canonicalUrl={getCanonicalUrl("/privacy-policy")}
      />
      <main id="main-content" className="mx-auto max-w-4xl px-4 pb-12 pt-32">
        <Link href="/" className="mb-8 inline-flex items-center text-battles-gold transition-colors hover:text-yellow-400">
          <ArrowLeft className="mr-2 h-5 w-5" aria-hidden="true" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-playfair font-bold text-battles-gold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none space-y-6">
          <p className="text-gray-300 text-lg">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-battles-gold">Information We Collect</h2>
            <p className="text-gray-300">
              At Battles Budz LLC, we collect information you provide directly to us, such as when you:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Subscribe to our newsletter</li>
              <li>Submit a job application</li>
              <li>Contact us through our website</li>
              <li>Request event or launch updates</li>
              <li>Create an investor account</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-battles-gold">How We Use Your Information</h2>
            <p className="text-gray-300">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Provide and improve our services</li>
              <li>Send you newsletters and updates about our business</li>
              <li>Process job applications and communicate with candidates</li>
              <li>Respond to your inquiries and requests</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-battles-gold">Information Sharing</h2>
            <p className="text-gray-300">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-battles-gold">Data Security</h2>
            <p className="text-gray-300">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-battles-gold">Contact Us</h2>
            <p className="text-gray-300">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="text-gray-300">
              <p>Email: battlesbudz@gmail.com</p>
              <p>Retail address details will be shared when customer visits begin.</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
