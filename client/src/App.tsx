import { Redirect, Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
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

function Router() {
  return (
    <>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/battery" component={BatteryPage} />
        <Route path="/coming-soon" component={ComingSoonPage} />
        <Route path="/our-story" component={OurStoryPage} />
        <Route path="/products/freedom-fog-vapes">
          <ProductPreviewPage product={productPreviews["freedom-fog-vapes"]} />
        </Route>
        <Route path="/products/battles-budz-flower">
          <ProductPreviewPage product={productPreviews["battles-budz-flower"]} />
        </Route>
        <Route path="/products/heirloom-flower">
          <ProductPreviewPage product={productPreviews["heirloom-flower"]} />
        </Route>
        <Route path="/products/pre-rolls">
          <ProductPreviewPage product={productPreviews["pre-rolls"]} />
        </Route>
        <Route path="/products/edibles">
          <ProductPreviewPage product={productPreviews.edibles} />
        </Route>
        <Route path="/products/cosmic-chewz">
          <ProductPreviewPage product={productPreviews["cosmic-chewz"]} />
        </Route>
        <Route path="/products/concentrates">
          <ProductPreviewPage product={productPreviews.concentrates} />
        </Route>
        <Route path="/products/battle-brew">
          <ProductPreviewPage product={productPreviews["battle-brew"]} />
        </Route>
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-of-service" component={TermsOfService} />
        <Route path="/shipping-returns" component={ShippingReturns} />
        <Route path="/age-verification" component={AgeVerification} />
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
        <NewsletterSignupPopup isAgeGateOpen={userGuide.showAgeVerification} />

      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
