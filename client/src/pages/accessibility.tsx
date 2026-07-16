import SEOHead from "@/components/seo/SEOHead";
import { getCanonicalUrl } from "@/utils/seo";

export default function Accessibility() {
  return (
    <div className="min-h-screen bg-battles-black text-white">
      <SEOHead
        title="Accessibility | Battles Budz"
        description="Battles Budz is committed to making battlesbudz.com accessible to everyone."
        canonicalUrl={getCanonicalUrl("/accessibility")}
      />
      <main id="main-content" className="mx-auto max-w-4xl px-4 pb-12 pt-32">
        <h1 className="mb-8 text-4xl font-bold text-battles-gold">Accessibility</h1>
        <div className="space-y-6 text-lg leading-8 text-gray-300">
          <p>Battles Budz is committed to making battlesbudz.com accessible to everyone.</p>
          <p>
            If you have difficulty using this site or accessing information, email{" "}
            <a
              href="mailto:battlesbudz@gmail.com"
              className="font-semibold text-battles-gold underline underline-offset-4 hover:text-yellow-400"
            >
              battlesbudz@gmail.com
            </a>
            . We will work with you to provide the information or service you need.
          </p>
        </div>
      </main>
    </div>
  );
}
