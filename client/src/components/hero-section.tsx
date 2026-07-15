import { Mail, MapPin, ShoppingBag } from "lucide-react";
import { Link } from "wouter";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-5 pt-24 text-center text-white sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_top,rgba(250,204,21,0.36),transparent_34%),linear-gradient(rgba(250,204,21,0.11)_1px,transparent_1px),linear-gradient(90deg,rgba(250,204,21,0.08)_1px,transparent_1px)] [background-size:100%_100%,54px_54px,54px_54px]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <img
          src="/media/battles-budz-logo-cropped.png"
          alt="Battles Budz Logo"
          className="mx-auto w-full max-w-4xl drop-shadow-[0_0_42px_rgba(250,204,21,0.24)]"
        />

        <div className="mx-auto mt-8 max-w-4xl">
          <p className="inline-flex items-center gap-2 border border-yellow-300/40 bg-yellow-300/10 px-3 py-2 text-xs font-black uppercase tracking-[0.2em] text-yellow-200">
            <MapPin className="h-4 w-4" /> Buffalo, New York
          </p>

          <h1 className="mt-6 text-4xl font-black uppercase leading-[0.92] tracking-[-0.06em] md:text-6xl lg:text-7xl">
            <span className="text-battles-gold">Crafting Community</span>
            <br />
            <span className="text-white">and Cannabis</span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-zinc-300 md:text-xl">
            Join the Battles Budz list for launch updates, new product drops, and first access when retail goes live.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4">
            <button
              onClick={() => scrollToSection("newsletter")}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-battles-gold px-10 py-4 text-sm font-black uppercase tracking-[0.14em] text-black shadow-lg shadow-yellow-300/20 transition hover:bg-yellow-300 sm:w-auto"
            >
              Get updates <Mail className="h-5 w-5" />
            </button>

            <p className="text-sm text-zinc-400">Ready to shop now? Browse Battles Budz merch and the dual-cart battery.</p>

            <Link
              href="/shop"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-battles-gold px-10 py-4 text-sm font-black uppercase tracking-[0.14em] text-battles-gold transition hover:bg-battles-gold hover:text-black sm:w-auto"
            >
              Shop available products <ShoppingBag className="h-5 w-5" />
            </Link>
          </div>

        </div>
      </div>

    </section>
  );
}
