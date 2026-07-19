import RetailSection from "@/components/retail-section";
import SEOHead from "@/components/seo/SEOHead";
import { getCanonicalUrl } from "@/utils/seo";

export default function ShopPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black">
      <SEOHead
        title="Veteran-Owned Apparel | Battles Budz"
        description="Shop Battles Budz tees, hoodies, long sleeves, and tanks. Free U.S. shipping on orders of $50 or more."
        canonicalUrl={getCanonicalUrl("/shop")}
        ogImage={getCanonicalUrl("/media/battles-budz-full-chest-tee.jpg")}
        ogType="website"
      />
      <main id="main-content" className="pt-20">
        <RetailSection />
      </main>
    </div>
  );
}
