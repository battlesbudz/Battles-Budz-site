import { Mail, ShoppingBag } from "lucide-react";
import logoPath from "@assets/BattlesBudz_Logo_1752301078028.png";

const shopUrl = "https://shop.battlesbudz.com/";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-yellow-300/20 bg-black text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.1fr_.9fr] lg:px-8">
        <div>
          <img src={logoPath} alt="Battles Budz USA" className="h-16 w-auto object-contain" />
          <p className="mt-5 max-w-lg leading-7 text-zinc-400">
            Battles Budz is a veteran-owned cannabis microbusiness opening soon in Buffalo, New York. Apparel is available now while the retail launch moves toward final clearance.
          </p>
          <a
            href={shopUrl}
            className="mt-6 inline-flex items-center gap-2 bg-yellow-300 px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:bg-yellow-200"
          >
            Shop Battles Budz <ShoppingBag className="h-4 w-4" />
          </a>
        </div>

        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-yellow-300">Contact</p>
          <a href="mailto:battlesbudz@gmail.com" className="mt-4 inline-flex items-center gap-2 text-lg font-semibold text-white hover:text-yellow-200">
            <Mail className="h-5 w-5 text-yellow-300" /> battlesbudz@gmail.com
          </a>
          <div className="mt-7 grid gap-3 text-sm text-zinc-400">
            <a href="#shop" className="hover:text-yellow-300">Shop current drops</a>
            <a href="#dual-cart-battery" className="hover:text-yellow-300">Dual-cart battery</a>
            <a href="/privacy-policy" className="hover:text-yellow-300">Privacy policy</a>
            <a href="/terms-of-service" className="hover:text-yellow-300">Terms of service</a>
            <a href="/age-verification" className="hover:text-yellow-300">21+ information</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-sm text-zinc-500">
        (c) {new Date().getFullYear()} Battles Budz LLC. Buffalo, New York. Opening soon.
      </div>
    </footer>
  );
}
