import { useState } from "react";
import { Link } from "wouter";
import { Menu, ShoppingBag, X } from "lucide-react";

const shopUrl = "https://shop.battlesbudz.com/";

const links = [
  { label: "Shop", href: shopUrl, external: true },
  { label: "Battery", href: "/battery" },
  { label: "Coming Soon", href: "/coming-soon" },
  { label: "Our Story", href: "/our-story" },
  { label: "Updates", href: "/#newsletter", external: true },
  { label: "Contact", href: "/#contact", external: true },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-yellow-300/25 bg-black/95 text-white backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Battles Budz home">
          <img src="/media/battles-budz-logo-cropped.png" alt="Battles Budz USA" className="h-12 w-auto object-contain sm:h-14" />
        </Link>

        <div className="hidden items-center gap-6 lg:flex xl:gap-8">
          {links.map((link) =>
            link.external ? (
              <a key={link.href} href={link.href} className="text-xs font-black uppercase tracking-[0.16em] text-zinc-100 transition hover:text-yellow-300 xl:text-sm">
                {link.label}
              </a>
            ) : (
              <Link key={link.href} href={link.href} className="text-xs font-black uppercase tracking-[0.16em] text-zinc-100 transition hover:text-yellow-300 xl:text-sm">
                {link.label}
              </Link>
            ),
          )}
        </div>

        <a
          href={shopUrl}
          aria-label="Open Battles Budz online store"
          className="hidden items-center gap-2 text-yellow-300 transition hover:text-yellow-100 lg:inline-flex"
        >
          <ShoppingBag className="h-6 w-6" />
          <span className="sr-only">Online store</span>
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg border border-yellow-300/40 p-2 text-yellow-300 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-black px-5 py-4 lg:hidden">
          {links.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block border-b border-white/10 py-4 text-sm font-black uppercase tracking-[0.16em] text-zinc-200 hover:text-yellow-300"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block border-b border-white/10 py-4 text-sm font-black uppercase tracking-[0.16em] text-zinc-200 hover:text-yellow-300"
              >
                {link.label}
              </Link>
            ),
          )}
          <a
            href={shopUrl}
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 bg-yellow-300 px-5 py-3 text-sm font-black uppercase tracking-[0.16em] text-black"
          >
            Shop merch <ShoppingBag className="h-4 w-4" />
          </a>
        </div>
      ) : null}
    </nav>
  );
}
