import RetailSection from "@/components/retail-section";
import SEOHead from "@/components/seo/SEOHead";
import { getCanonicalUrl } from "@/utils/seo";

export default function ShopPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black">
      <SEOHead
        title="Battles Budz Apparel"
        description="Battles Budz apparel."
        canonicalUrl={getCanonicalUrl("/shop")}
        ogType="website"
      />
      <main id="main-content" className="pt-20">
        <RetailSection />
      </main>
    </div>
  );
}
