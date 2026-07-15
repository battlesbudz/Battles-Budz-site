import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/navigation";
import ServicesSection from "@/components/services-section";
import AboutSection from "@/components/about-section";
import TeamSection from "@/components/team-section";
import EventsSection from "@/components/events-section";
import NewsletterSection from "@/components/newsletter-section";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo/SEOHead";
import { getCanonicalUrl } from "@/utils/seo";

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead
        title="Our Story | Battles Budz"
        description="Meet Battles Budz, the veteran-owned cannabis microbusiness coming to Buffalo, New York."
        canonicalUrl={getCanonicalUrl("/our-story")}
      />
      <Navigation />

      <main id="main-content" className="pt-24">
        <section className="border-b border-yellow-300/20 bg-black px-5 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.14em] text-yellow-300 transition hover:text-yellow-100"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to home
            </Link>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-yellow-300">Battles Budz story</p>
            <h1 className="mt-5 text-5xl font-black uppercase leading-none tracking-[-0.06em] sm:text-7xl">
              Veteran-owned. <span className="text-battles-gold">Buffalo-bound.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
              Learn who is building Battles Budz, what the microbusiness is working toward, and how to follow the
              Buffalo retail launch.
            </p>
          </div>
        </section>

        <AboutSection />
        <ServicesSection />
        <TeamSection />
        <EventsSection />
        <NewsletterSection />
      </main>

      <Footer />
    </div>
  );
}
