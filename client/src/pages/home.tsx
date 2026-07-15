import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import NewsletterSection from "@/components/newsletter-section";
import ShopByCategorySection from "@/components/shop-by-category-section";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo/SEOHead";
import {
  CANNABIS_KEYWORDS,
  getCanonicalUrl,
  getLocalBusinessSchema,
  getOrganizationSchema,
} from "@/utils/seo";

export default function Home() {
  const structuredData = [getOrganizationSchema(), getLocalBusinessSchema()];

  return (
    <div className="min-h-screen overflow-x-hidden bg-black">
      <SEOHead
        title="Battles Budz | Buffalo Cannabis Microbusiness Opening Soon"
        description="Battles Budz is a veteran-owned cannabis microbusiness coming to Buffalo, New York. Shop official apparel and sign up for retail launch updates."
        keywords={[
          ...CANNABIS_KEYWORDS.home,
          "Battles Budz apparel",
          "Battles Budz merchandise",
          "Buffalo cannabis brand",
          "veteran owned cannabis New York",
          "dual cart battery",
        ]}
        canonicalUrl={getCanonicalUrl("/")}
        structuredData={structuredData}
        ogType="website"
      />
      <Navigation />
      <HeroSection />
      <NewsletterSection />
      <ShopByCategorySection />
      <Footer />
    </div>
  );
}
