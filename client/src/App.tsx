import { Redirect, Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";

import NotFound from "./pages/not-found";
import PrivacyPolicy from "./pages/privacy-policy";
import TermsOfService from "./pages/terms-of-service";
import AgeVerification from "./pages/age-verification";
import { AgeVerificationModal } from "@/components/user-guide/age-verification-modal";
import { useUserGuide } from "@/hooks/useUserGuide";

function Router() {
  return (
    <>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-of-service" component={TermsOfService} />
        <Route path="/age-verification" component={AgeVerification} />
        <Route path="/shop"><Redirect to="/" /></Route>
        <Route path="/products/:product"><Redirect to="/" /></Route>
        <Route path="/battles-buds-cannabis-gloversville"><Redirect to="/" /></Route>
        <Route path="/veteran-gloversville-cannabis"><Redirect to="/" /></Route>
        <Route path="/justin-battles-cannabis"><Redirect to="/" /></Route>
        <Route path="/location/:location"><Redirect to="/" /></Route>
        <Route path="/community"><Redirect to="/" /></Route>
        <Route path="/community/posts/:id"><Redirect to="/" /></Route>
        <Route path="/enhanced-community"><Redirect to="/" /></Route>
        <Route path="/investors"><Redirect to="/" /></Route>
        <Route path="/investor-portal"><Redirect to="/" /></Route>
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
