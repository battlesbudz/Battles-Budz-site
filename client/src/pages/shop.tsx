import Navigation from "@/components/navigation";
import RetailSection from "@/components/retail-section";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo/SEOHead";
import { getCanonicalUrl } from "@/utils/seo";

export default function ShopPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black">
      <SEOHead
        title="Shop Battles Budz | Merch and Accessories"
        description="Shop Battles Budz merch and accessories."
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
