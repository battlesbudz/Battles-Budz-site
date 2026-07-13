import { Mail } from "lucide-react";
import logoPath from "@assets/BattlesBudz_Logo_1752301078028.png";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-white/10 bg-zinc-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.2fr_.8fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3"><img src={logoPath} alt="" className="h-11 w-11 rounded-full object-cover" /><span className="text-lg font-black uppercase text-yellow-300">Battles Budz</span></div>
          <p className="mt-5 max-w-lg leading-7 text-zinc-400">A veteran-owned cannabis microbusiness opening soon in Buffalo, New York. Merchandise and accessories are part of the journey now.</p>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-yellow-300">Contact</p>
          <a href="mailto:battlesbudz@gmail.com" className="mt-4 inline-flex items-center gap-2 text-lg font-semibold text-white hover:text-yellow-200"><Mail className="h-5 w-5 text-yellow-300" /> battlesbudz@gmail.com</a>
          <div className="mt-6 flex gap-5 text-sm text-zinc-400"><a href="/privacy-policy" className="hover:text-yellow-300">Privacy</a><a href="/terms-of-service" className="hover:text-yellow-300">Terms</a><a href="/age-verification" className="hover:text-yellow-300">21+ information</a></div>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-5 text-center text-sm text-zinc-500">© {new Date().getFullYear()} Battles Budz LLC. Buffalo, New York · Opening soon.</div>
    </footer>
  );
}
