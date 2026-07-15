import { ArrowLeft, Bell, LockKeyhole, Mail } from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/navigation";
import NewsletterSection from "@/components/newsletter-section";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo/SEOHead";
import { getCanonicalUrl } from "@/utils/seo";
import cosmicChewzImg from "@assets/20240228_223118_1752399041772.png";
import freedomFogImg from "@assets/file_0000000084c86230b8826b578af0fa18_1752398828783.png";
import cannabisFlower1 from "@assets/Screenshot_20250713_025017_Gallery_1752389462073.jpg";
import battleBrewImg from "@assets/file_00000000a95c61f9a7846b7990b6738f_1752399026270.png";

const comingProducts = [
  {
    title: "Heirloom Flower",
    description: "Small-batch flower selected for aroma, structure, and a clean finish.",
    image: cannabisFlower1,
  },
  {
    title: "Battle Brew",
    description: "Signature infused tea concept built around bold flavor and Battles Budz branding.",
    image: battleBrewImg,
  },
  {
    title: "Cosmic Chewz",
    description: "Edible concept shaped around precise portions and bright flavors.",
    image: cosmicChewzImg,
  },
  {
    title: "Freedom Fog Vapes",
    description: "Vape line concept designed around premium extracts and a bold visual identity.",
    image: freedomFogImg,
  },
];

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead
        title="Coming Soon Products | Battles Budz"
        description="Preview the future Battles Budz cannabis menu direction for the Buffalo retail launch."
        canonicalUrl={getCanonicalUrl("/coming-soon")}
      />
      <Navigation />

      <main id="main-content" className="pt-24">
        <section className="border-b border-yellow-300/20 bg-black px-5 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.14em] text-yellow-300 transition hover:text-yellow-100"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to home
            </Link>
            <p className="inline-flex items-center gap-2 border border-yellow-300/40 bg-yellow-300/10 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-yellow-200">
              <LockKeyhole className="h-4 w-4" /> Future cannabis menu
            </p>
            <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_.8fr] lg:items-end">
              <div>
                <h1 className="text-5xl font-black uppercase leading-none tracking-[-0.06em] sm:text-7xl">
                  Coming soon in <span className="text-battles-gold">Buffalo</span>.
                </h1>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-300">
                  These products show the Battles Budz menu direction for the Buffalo retail launch. Availability,
                  pricing, and final details will be published when retail service begins.
                </p>
              </div>
              <div className="rounded-2xl border border-yellow-300/25 bg-zinc-950 p-6">
                <Bell className="h-8 w-8 text-yellow-300" />
                <h2 className="mt-4 text-2xl font-black uppercase tracking-[-0.04em]">Want first notice?</h2>
                <p className="mt-3 leading-7 text-zinc-400">
                  Join the update list for launch announcements, apparel drops, and menu news.
                </p>
                <a
                  href="#newsletter"
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-battles-gold px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-yellow-300"
                >
                  Get updates <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-zinc-950 px-5 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-7 md:grid-cols-2 xl:grid-cols-4">
            {comingProducts.map((product) => (
              <article key={product.title} className="overflow-hidden rounded-3xl border border-white/10 bg-black shadow-xl shadow-black">
                <div className="flex h-64 items-center justify-center border-b border-white/10 bg-zinc-950 p-5">
                  <img src={product.image} alt={`${product.title} product preview`} className="h-full w-full object-contain" />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-black uppercase tracking-[-0.04em] text-white">{product.title}</h2>
                  <p className="mt-3 leading-7 text-zinc-400">{product.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <NewsletterSection />
      </main>

      <Footer />
    </div>
  );
}
