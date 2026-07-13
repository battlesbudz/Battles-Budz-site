import { useState } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import logoPath from "@assets/BattlesBudz_Logo_1752301078028.png";

const links = [
  { label: "Available now", href: "#available-now" },
  { label: "Dual Cart Battery", href: "#dual-cart-battery" },
  { label: "Our story", href: "#about" },
  { label: "Updates", href: "#newsletter" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-yellow-300/15 bg-[#090909]/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Battles Budz home">
          <img src={logoPath} alt="" className="h-10 w-10 rounded-full object-cover" />
          <span className="text-base font-black uppercase tracking-[-0.03em] text-yellow-300 sm:text-lg">Battles Budz</span>
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => <a key={link.href} href={link.href} className="text-sm font-semibold text-zinc-200 transition hover:text-yellow-300">{link.label}</a>)}
          <a href="#newsletter" className="rounded-full bg-yellow-300 px-4 py-2 text-sm font-bold text-black transition hover:bg-yellow-200">Stay in the loop</a>
        </div>
        <button onClick={() => setOpen(!open)} className="rounded-lg border border-yellow-300/40 p-2 text-yellow-300 md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && <div className="border-t border-white/10 bg-[#090909] px-6 py-4 md:hidden">{links.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="block py-3 font-semibold text-zinc-200 hover:text-yellow-300">{link.label}</a>)}</div>}
    </nav>
  );
}
