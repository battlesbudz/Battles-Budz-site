import { Link } from "wouter";
import SEOHead from "@/components/seo/SEOHead";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead
        title="Page Not Found | Battles Budz"
        description="The page you’re looking for isn’t here."
        noIndex
      />
      <main id="main-content" className="mx-auto flex min-h-[70vh] max-w-5xl flex-col justify-center px-5 pb-16 pt-32 lg:px-8">
        <h1 className="text-5xl font-black uppercase leading-none tracking-[-0.05em] text-white sm:text-7xl">
          Page not found.
        </h1>
        <p className="mt-6 text-lg leading-8 text-zinc-300">The page you’re looking for isn’t here.</p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-12 w-fit items-center justify-center border border-yellow-300 bg-yellow-300 px-6 text-sm font-black uppercase tracking-[0.14em] text-black transition-colors hover:bg-yellow-200"
        >
          Back to home
        </Link>
      </main>
    </div>
  );
}
