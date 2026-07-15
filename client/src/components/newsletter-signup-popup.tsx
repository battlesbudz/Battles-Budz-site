import { useEffect, useState, type FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Mail } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const POPUP_DISMISSED_KEY = "battlesBudzUpdatesPopupDismissed";
const POPUP_SUBSCRIBED_KEY = "battlesBudzUpdatesPopupSubscribed";

interface NewsletterSignupPopupProps {
  isAgeGateOpen: boolean;
}

export default function NewsletterSignupPopup({ isAgeGateOpen }: NewsletterSignupPopupProps) {
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isAgeGateOpen) {
      return;
    }

    const ageVerified = sessionStorage.getItem("ageVerified") === "true";
    const alreadyDismissed = sessionStorage.getItem(POPUP_DISMISSED_KEY) === "true";
    const alreadySubscribed = sessionStorage.getItem(POPUP_SUBSCRIBED_KEY) === "true";
    const isOnNewsletterSection = window.location.hash === "#newsletter";

    if (!ageVerified || alreadyDismissed || alreadySubscribed || isOnNewsletterSection) {
      return;
    }

    const popupTimer = window.setTimeout(() => {
      setIsOpen(true);
    }, 3500);

    return () => window.clearTimeout(popupTimer);
  }, [isAgeGateOpen]);

  const dismissPopup = () => {
    sessionStorage.setItem(POPUP_DISMISSED_KEY, "true");
    setIsOpen(false);
  };

  const newsletterMutation = useMutation({
    mutationFn: async (emailAddress: string) => {
      return apiRequest("POST", "/api/newsletter/subscribe", { email: emailAddress });
    },
    onSuccess: () => {
      sessionStorage.setItem(POPUP_SUBSCRIBED_KEY, "true");
      setEmail("");
      setIsOpen(false);
      toast({
        title: "You're on the list.",
        description: "We'll send product drops, launch news, and brand updates.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/newsletter/subscribers"] });
    },
    onError: (error: Error) => {
      const alreadySubscribed = error.message.toLowerCase().includes("already subscribed");

      if (alreadySubscribed) {
        sessionStorage.setItem(POPUP_SUBSCRIBED_KEY, "true");
        setEmail("");
        setIsOpen(false);
        toast({
          title: "You're already on the list.",
          description: "We'll send product drops, launch news, and brand updates.",
        });
        return;
      }

      toast({
        title: "Subscription error",
        description: error.message || "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || newsletterMutation.isPending) {
      return;
    }

    newsletterMutation.mutate(email);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          dismissPopup();
        }
      }}
    >
      <DialogContent className="border-yellow-300/30 bg-zinc-950 p-0 text-white shadow-2xl shadow-yellow-300/10 sm:max-w-md">
        <div className="border-b border-yellow-300/20 bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.18),_transparent_48%)] px-6 pb-6 pt-8">
          <DialogHeader className="space-y-4 text-left">
            <p className="inline-flex w-fit items-center gap-2 border border-yellow-300/40 bg-yellow-300/10 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-yellow-200">
              <Mail className="h-4 w-4" /> All updates
            </p>
            <DialogTitle className="text-4xl font-black uppercase leading-none tracking-[-0.06em] text-white">
              Get Battles Budz updates.
            </DialogTitle>
            <DialogDescription className="text-base leading-7 text-zinc-300">
              New drops, events, and retail launch news.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-4 px-6 pb-6" onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="min-h-12 rounded-none border-white/15 bg-black text-white placeholder:text-zinc-500 focus:border-yellow-300"
            required
          />
          <Button
            type="submit"
            disabled={newsletterMutation.isPending}
            className="min-h-12 w-full rounded-none bg-yellow-300 font-black uppercase tracking-[0.12em] text-black hover:bg-yellow-200"
          >
            {newsletterMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Joining...
              </>
            ) : (
              "Get updates"
            )}
          </Button>
          <button
            type="button"
            onClick={dismissPopup}
            className="w-full text-center text-sm font-semibold text-zinc-400 underline-offset-4 transition hover:text-yellow-200 hover:underline"
          >
            Not now
          </button>
          <p className="text-center text-xs text-zinc-500">Only Battles Budz updates. Unsubscribe anytime.</p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
