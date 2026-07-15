import Navigation from "@/components/navigation";
import RetailSection from "@/components/retail-section";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo/SEOHead";
import { getCanonicalUrl } from "@/utils/seo";

export default function ShopPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black">
      <SEOHead
        title="Shop Battles Budz | Merch and Dual-Cart Battery"
        description="Shop Battles Budz merch and learn how to order the dual-cart battery."
        canonicalUrl={getCanonicalUrl("/shop")}
        ogType="website"
      />
      <Navigation />
      <main className="pt-20">
        <RetailSection />
      </main>
      <Footer />
    </div>
  );
}
