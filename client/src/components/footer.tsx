import { Mail } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-yellow-300/20 bg-black text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.1fr_.9fr] lg:px-8">
        <div>
          <img src="/media/battles-budz-logo-cropped.png" alt="Battles Budz USA" className="h-16 w-auto object-contain" />
          <p className="mt-5 max-w-lg leading-7 text-zinc-300">
            Battles Budz is a veteran-owned cannabis microbusiness coming to Buffalo, New York.
          </p>
        </div>

        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-yellow-300">Contact</p>
          <a href="mailto:battlesbudz@gmail.com" className="mt-4 inline-flex items-center gap-2 text-lg font-semibold text-white hover:text-yellow-200">
            <Mail className="h-5 w-5 text-yellow-300" aria-hidden="true" /> battlesbudz@gmail.com
          </a>
          <nav className="mt-7 text-sm text-zinc-300" aria-label="Footer navigation">
            <ul className="grid gap-3">
              <li><Link href="/shop" className="hover:text-yellow-300">Apparel</Link></li>
              <li><Link href="/battery" className="hover:text-yellow-300">Dual-Cart Battery</Link></li>
              <li><Link href="/coming-soon" className="hover:text-yellow-300">Coming soon products</Link></li>
              <li><Link href="/our-story" className="hover:text-yellow-300">Our story</Link></li>
              <li><a href="/our-story#events" className="hover:text-yellow-300">Community events</a></li>
              <li><Link href="/shipping-returns" className="hover:text-yellow-300">Shipping and returns</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-yellow-300">Privacy policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-yellow-300">Terms of service</Link></li>
              <li><Link href="/age-verification" className="hover:text-yellow-300">21+ information</Link></li>
              <li><Link href="/accessibility" className="hover:text-yellow-300">Accessibility</Link></li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-sm text-zinc-400">
        © {new Date().getFullYear()} Battles Budz LLC. Buffalo, New York. Opening soon.
      </div>
    </footer>
  );
}
