import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Mail } from "lucide-react";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const newsletterMutation = useMutation({
    mutationFn: async (email: string) => {
      return apiRequest("POST", "/api/newsletter/subscribe", { email });
    },
    onSuccess: () => {
      toast({
        title: "You're on the list.",
        description: "We'll send product drops, launch news, and brand updates.",
      });
      setEmail("");
      setFormError("");
      queryClient.invalidateQueries({ queryKey: ["/api/newsletter/subscribers"] });
    },
    onError: (error: Error) => {
      if (error.message.toLowerCase().includes("already subscribed")) {
        toast({
          title: "You're on the list.",
          description: "We'll send product drops, launch news, and brand updates.",
        });
        setEmail("");
        setFormError("");
        return;
      }

      setFormError("We couldn’t sign you up. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailAddress = email.trim();
    if (!/^\S+@\S+\.\S+$/.test(emailAddress)) {
      setFormError("Enter a valid email address.");
      return;
    }

    setFormError("");
    newsletterMutation.mutate(emailAddress);
  };

  return (
    <section id="newsletter" className="border-y border-yellow-300/20 bg-zinc-950 py-16 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8">
        <div>
          <p className="inline-flex items-center gap-2 border border-yellow-300/40 bg-yellow-300/10 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-yellow-200">
            <Mail className="h-4 w-4" /> All updates
          </p>
          <h2 className="mt-5 max-w-2xl text-5xl font-black uppercase leading-none tracking-[-0.06em] sm:text-6xl">
            Join the Battles Budz list.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-300">
            Be first to hear about new drops, events, and retail launch news.
          </p>
        </div>

        <div className="rounded-lg border border-yellow-300/20 bg-black p-5 sm:p-7">
          <form onSubmit={handleSubmit} noValidate aria-busy={newsletterMutation.isPending}>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="sr-only" htmlFor="newsletter-email">
                Email address for Battles Budz updates
              </label>
              <Input
                id="newsletter-email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (formError) {
                    setFormError("");
                  }
                }}
                aria-invalid={Boolean(formError)}
                aria-describedby={formError ? "newsletter-email-error newsletter-email-help" : "newsletter-email-help"}
                className="min-h-12 flex-1 rounded-none border-[#737373] bg-zinc-900 text-white placeholder:text-zinc-400 focus:border-yellow-300"
                required
              />
              <Button
                type="submit"
                disabled={newsletterMutation.isPending}
                className="min-h-12 rounded-none bg-yellow-300 px-6 font-black uppercase tracking-[0.12em] text-black hover:bg-yellow-200"
              >
                {newsletterMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                    Joining...
                  </>
                ) : (
                  "Get updates"
                )}
              </Button>
            </div>
            {formError ? (
              <p id="newsletter-email-error" className="mt-3 text-sm" role="alert">
                {formError}
              </p>
            ) : null}
            <p id="newsletter-email-help" className="mt-4 text-sm text-zinc-400">Only Battles Budz updates. Unsubscribe anytime.</p>
          </form>

          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-yellow-300">Follow Battles Budz</p>
            <div className="mt-5 flex gap-5">
              <a
                href="https://instagram.com/battles_budz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 transition hover:text-yellow-300"
                title="Follow @battles_budz on Instagram"
                aria-label="Follow Battles Budz on Instagram"
              >
                <Instagram className="h-6 w-6" aria-hidden="true" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100095028196403"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 transition hover:text-yellow-300"
                title="Follow Battles Budz on Facebook"
                aria-label="Follow Battles Budz on Facebook"
              >
                <Facebook className="h-6 w-6" aria-hidden="true" />
              </a>
              <a
                href="https://twitter.com/BattlesBudz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 transition hover:text-yellow-300"
                title="Follow @BattlesBudz on Twitter"
                aria-label="Follow Battles Budz on Twitter"
              >
                <Twitter className="h-6 w-6" aria-hidden="true" />
              </a>
              <a
                href="https://www.linkedin.com/in/justin-battles-5548a018a"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 transition hover:text-yellow-300"
                title="Connect with Justin Battles on LinkedIn"
                aria-label="Connect with Justin Battles on LinkedIn"
              >
                <Linkedin className="h-6 w-6" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
