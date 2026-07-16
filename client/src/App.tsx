import { Redirect, Switch, Route, useLocation } from "wouter";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import ShopPage from "@/pages/shop";
import BatteryPage from "@/pages/battery";
import ComingSoonPage from "@/pages/coming-soon";
import OurStoryPage from "@/pages/our-story";
import ProductPreviewPage, { productPreviews } from "@/pages/product-preview";

import NotFound from "./pages/not-found";
import PrivacyPolicy from "./pages/privacy-policy";
import TermsOfService from "./pages/terms-of-service";
import AgeVerification from "./pages/age-verification";
import ShippingReturns from "./pages/shipping-returns";
import Accessibility from "./pages/accessibility";
import PublicPageLayout from "@/components/public-page-layout";
import { AgeVerificationModal } from "@/components/user-guide/age-verification-modal";
import NewsletterSignupPopup from "@/components/newsletter-signup-popup";
import { useUserGuide } from "@/hooks/useUserGuide";

const shopHashes = new Set(["retail", "shop"]);
const batteryHashes = new Set(["dual-cart-battery"]);
const ourStoryHashes = new Set(["about", "services", "team", "events"]);

function ScrollToRouteTop() {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");

    if (hash && window.location.pathname === "/" && shopHashes.has(hash)) {
      setLocation("/shop");
      return;
    }

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

function RouteAccessibility() {
  const [location] = useLocation();
  const isInitialRoute = useRef(true);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setAnnouncement(document.title);

      if (isInitialRoute.current) {
        isInitialRoute.current = false;
        return;
      }

      const main = document.getElementById("main-content");
      if (!main) return;

      const hadTabIndex = main.hasAttribute("tabindex");
      if (!hadTabIndex) main.setAttribute("tabindex", "-1");
      main.focus({ preventScroll: true });

      if (!hadTabIndex) {
        main.addEventListener("blur", () => main.removeAttribute("tabindex"), { once: true });
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, [location]);

  return (
    <div className="sr-only" aria-live="polite" aria-atomic="true">
      {announcement}
    </div>
  );
}

function SkipLink() {
  return (
    <a
      href="#main-content"
      className="skip-link"
      onClick={(event) => {
        event.preventDefault();
        const main = document.getElementById("main-content");
        if (!main) return;

        const hadTabIndex = main.hasAttribute("tabindex");
        if (!hadTabIndex) main.setAttribute("tabindex", "-1");
        main.focus();

        if (!hadTabIndex) {
          main.addEventListener("blur", () => main.removeAttribute("tabindex"), { once: true });
        }
      }}
    >
      Skip to main content
    </a>
  );
}

function StandardPublicPage({ children }: { children: ReactNode }) {
  return <PublicPageLayout>{children}</PublicPageLayout>;
}

function Router() {
  return (
    <>
      <Switch>
        <Route path="/"><StandardPublicPage><Home /></StandardPublicPage></Route>
        <Route path="/shop"><StandardPublicPage><ShopPage /></StandardPublicPage></Route>
        <Route path="/battery" component={BatteryPage} />
        <Route path="/coming-soon"><StandardPublicPage><ComingSoonPage /></StandardPublicPage></Route>
        <Route path="/our-story"><StandardPublicPage><OurStoryPage /></StandardPublicPage></Route>
        <Route path="/products/freedom-fog-vapes">
          <StandardPublicPage><ProductPreviewPage product={productPreviews["freedom-fog-vapes"]} /></StandardPublicPage>
        </Route>
        <Route path="/products/battles-budz-flower">
          <StandardPublicPage><ProductPreviewPage product={productPreviews["battles-budz-flower"]} /></StandardPublicPage>
        </Route>
        <Route path="/products/heirloom-flower">
          <StandardPublicPage><ProductPreviewPage product={productPreviews["heirloom-flower"]} /></StandardPublicPage>
        </Route>
        <Route path="/products/pre-rolls">
          <StandardPublicPage><ProductPreviewPage product={productPreviews["pre-rolls"]} /></StandardPublicPage>
        </Route>
        <Route path="/products/edibles">
          <StandardPublicPage><ProductPreviewPage product={productPreviews.edibles} /></StandardPublicPage>
        </Route>
        <Route path="/products/cosmic-chewz">
          <StandardPublicPage><ProductPreviewPage product={productPreviews["cosmic-chewz"]} /></StandardPublicPage>
        </Route>
        <Route path="/products/concentrates">
          <StandardPublicPage><ProductPreviewPage product={productPreviews.concentrates} /></StandardPublicPage>
        </Route>
        <Route path="/products/battle-brew">
          <StandardPublicPage><ProductPreviewPage product={productPreviews["battle-brew"]} /></StandardPublicPage>
        </Route>
        <Route path="/privacy-policy"><StandardPublicPage><PrivacyPolicy /></StandardPublicPage></Route>
        <Route path="/terms-of-service"><StandardPublicPage><TermsOfService /></StandardPublicPage></Route>
        <Route path="/shipping-returns"><StandardPublicPage><ShippingReturns /></StandardPublicPage></Route>
        <Route path="/age-verification"><StandardPublicPage><AgeVerification /></StandardPublicPage></Route>
        <Route path="/accessibility"><StandardPublicPage><Accessibility /></StandardPublicPage></Route>
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
        <Route><StandardPublicPage><NotFound /></StandardPublicPage></Route>
      </Switch>
    </>
  );
}

function App() {
  const userGuide = useUserGuide();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SkipLink />
        <Toaster />
        <ScrollToRouteTop />
        <RouteAccessibility />
        <Router />

        {/* User Guide System */}
        <AgeVerificationModal
          isOpen={userGuide.showAgeVerification}
          onVerified={userGuide.handleAgeVerified}
          onDenied={userGuide.handleAgeDenied}
        />
        <NewsletterSignupPopup isAgeGateOpen={userGuide.showAgeVerification} />

      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
