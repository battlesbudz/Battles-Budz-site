import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, ShoppingBag, X } from "lucide-react";

const links = [
  { label: "Apparel", href: "/shop" },
  { label: "Dual-Cart Battery", href: "/battery" },
  { label: "Coming Soon", href: "/coming-soon" },
  { label: "Our Story", href: "/our-story" },
  { label: "Updates", href: "/#newsletter", external: true },
  { label: "Contact", href: "/#contact", external: true },
];

const mobileLinks = links.filter((link) => link.label !== "Updates");

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const homeLinkRef = useRef<HTMLAnchorElement>(null);

  const isCurrent = (href: string) => {
    const [pathname, hash] = href.split("#");

    if (hash) {
      return location === (pathname || "/") && window.location.hash === `#${hash}`;
    }

    return location === href;
  };

  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {
    const desktopBreakpoint = window.matchMedia("(min-width: 1024px)");
    const handleBreakpointChange = (event: MediaQueryListEvent) => {
      if (event.matches && open) {
        setOpen(false);
        window.requestAnimationFrame(() => homeLinkRef.current?.focus());
      }
    };

    desktopBreakpoint.addEventListener("change", handleBreakpointChange);
    return () => desktopBreakpoint.removeEventListener("change", handleBreakpointChange);
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const mobileMenu = mobileMenuRef.current;
    const firstLink = mobileMenu?.querySelector<HTMLElement>("a[href]");
    firstLink?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = [
        menuButtonRef.current,
        ...Array.from(mobileMenu?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []),
      ].filter((element): element is HTMLElement => Boolean(element));

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <nav aria-label="Primary navigation" className="fixed inset-x-0 top-0 z-50 border-b border-yellow-300/25 bg-black/95 text-white backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a ref={homeLinkRef} href="/" className="flex items-center gap-3" aria-label="Battles Budz home">
          <img src="/media/battles-budz-logo-cropped.png" alt="" className="h-12 w-auto object-contain sm:h-14" />
        </a>

        <div className="hidden items-center gap-6 lg:flex xl:gap-8">
          {links.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                aria-current={isCurrent(link.href) ? "location" : undefined}
                className="text-xs font-black uppercase tracking-[0.16em] text-zinc-100 transition hover:text-yellow-300 xl:text-sm"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isCurrent(link.href) ? "page" : undefined}
                className="text-xs font-black uppercase tracking-[0.16em] text-zinc-100 transition hover:text-yellow-300 xl:text-sm"
              >
                {link.label}
              </Link>
            ),
          )}
        </div>

        <Link
          href="/shop"
          aria-label="Open Battles Budz apparel"
          aria-current={isCurrent("/shop") ? "page" : undefined}
          className="hidden min-h-11 min-w-11 items-center justify-center gap-2 text-yellow-300 transition hover:text-yellow-100 lg:inline-flex"
        >
          <ShoppingBag className="h-6 w-6" aria-hidden="true" />
          <span className="sr-only">Battles Budz apparel</span>
        </Link>

        <button
          ref={menuButtonRef}
          onClick={() => setOpen(!open)}
          className="min-h-11 min-w-11 rounded-lg border border-yellow-300/40 p-2 text-yellow-300 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="primary-navigation-menu"
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {open ? (
        <div
          id="primary-navigation-menu"
          ref={mobileMenuRef}
          className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-white/10 bg-black px-5 py-4 lg:hidden"
        >
          {mobileLinks.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={isCurrent(link.href) ? "location" : undefined}
                className="block border-b border-white/10 py-4 text-sm font-black uppercase tracking-[0.16em] text-zinc-200 hover:text-yellow-300"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={isCurrent(link.href) ? "page" : undefined}
                className="block border-b border-white/10 py-4 text-sm font-black uppercase tracking-[0.16em] text-zinc-200 hover:text-yellow-300"
              >
                {link.label}
              </Link>
            ),
          )}
        </div>
      ) : null}
    </nav>
  );
}
