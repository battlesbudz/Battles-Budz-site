import { Redirect, Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import BatteryPage from "@/pages/battery";
import ComingSoonPage from "@/pages/coming-soon";
import OurStoryPage from "@/pages/our-story";

import NotFound from "./pages/not-found";
import PrivacyPolicy from "./pages/privacy-policy";
import TermsOfService from "./pages/terms-of-service";
import AgeVerification from "./pages/age-verification";
import ShippingReturns from "./pages/shipping-returns";
import { AgeVerificationModal } from "@/components/user-guide/age-verification-modal";
import { useUserGuide } from "@/hooks/useUserGuide";

const shopUrl = "https://shop.battlesbudz.com/";
const batteryHashes = new Set(["dual-cart-battery"]);
const ourStoryHashes = new Set(["about", "services", "team", "events"]);

function ExternalRedirect({ to }: { to: string }) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);

  return (
    <main className="min-h-screen bg-black px-5 py-24 text-center text-white">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-yellow-300">Opening the Battles Budz shop</p>
      <a href={to} className="mt-5 inline-block text-lg font-bold text-white underline decoration-yellow-300 underline-offset-4">
        Continue to the online store
      </a>
    </main>
  );
}

function ScrollToRouteTop() {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");

    if (hash && window.location.pathname === "/" && batteryHashes.has(hash)) {
      setLocation("/battery");
      return;
    }

    if (hash && window.location.pathname === "/" && ourStoryHashes.has(hash)) {
      setLocation(`/our-story#${hash}`);
      return;
    }

    if (hash) {
      window.setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView();
      }, 0);
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location, setLocation]);

  return null;
}

function Router() {
  return (
    <>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/battery" component={BatteryPage} />
        <Route path="/coming-soon" component={ComingSoonPage} />
        <Route path="/our-story" component={OurStoryPage} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-of-service" component={TermsOfService} />
        <Route path="/shipping-returns" component={ShippingReturns} />
        <Route path="/age-verification" component={AgeVerification} />
        <Route path="/shop"><ExternalRedirect to={shopUrl} /></Route>
        <Route path="/batteries"><Redirect to="/battery" /></Route>
        <Route path="/dual-cart-battery"><Redirect to="/battery" /></Route>
        <Route path="/products/dual-cart-battery"><Redirect to="/battery" /></Route>
        <Route path="/products/:product"><Redirect to="/coming-soon" /></Route>
        <Route path="/justin-battles-cannabis"><Redirect to="/" /></Route>
        <Route path="/location/:location"><Redirect to="/" /></Route>
        <Route path="/community"><Redirect to="/" /></Route>
        <Route path="/community/posts/:id"><Redirect to="/" /></Route>
        <Route path="/enhanced-community"><Redirect to="/" /></Route>
        <Route path="/investors"><Redirect to="/" /></Route>
        <Route path="/investor-portal"><Redirect to="/" /></Route>
        <Route path="/login"><Redirect to="/" /></Route>
        <Route path="/dashboard"><Redirect to="/" /></Route>
        <Route path="/investor-admin"><Redirect to="/" /></Route>
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  const userGuide = useUserGuide();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <ScrollToRouteTop />
        <Router />

        {/* User Guide System */}
        <AgeVerificationModal
          isOpen={userGuide.showAgeVerification}
          onVerified={userGuide.handleAgeVerified}
          onDenied={userGuide.handleAgeDenied}
        />

      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
