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
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const newsletterMutation = useMutation({
    mutationFn: async (email: string) => {
      return apiRequest("POST", "/api/newsletter/subscribe", { email });
    },
    onSuccess: () => {
      toast({
        title: "You're on the list.",
        description: "We'll keep you updated on the Buffalo launch and current drops.",
      });
      setEmail("");
      queryClient.invalidateQueries({ queryKey: ["/api/newsletter/subscribers"] });
    },
    onError: (error: any) => {
      toast({
        title: "Subscription error",
        description: error.message || "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      newsletterMutation.mutate(email);
    }
  };

  return (
    <section id="newsletter" className="border-y border-yellow-300/20 bg-zinc-950 py-16 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8">
        <div>
          <p className="inline-flex items-center gap-2 border border-yellow-300/40 bg-yellow-300/10 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-yellow-200">
            <Mail className="h-4 w-4" /> Buffalo updates
          </p>
          <h2 className="mt-5 max-w-2xl text-5xl font-black uppercase leading-none tracking-[-0.06em] sm:text-6xl">
            Know before the doors open.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-300">
            Get launch updates, apparel drops, battery availability, and the first notice when the Buffalo retail experience is ready.
          </p>
        </div>

        <div className="rounded-lg border border-yellow-300/20 bg-black p-5 sm:p-7">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-h-12 flex-1 rounded-none border-white/15 bg-zinc-900 text-white placeholder:text-zinc-500 focus:border-yellow-300"
                required
              />
              <Button
                type="submit"
                disabled={newsletterMutation.isPending}
                className="min-h-12 rounded-none bg-yellow-300 px-6 font-black uppercase tracking-[0.12em] text-black hover:bg-yellow-200"
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
            </div>
            <p className="mt-4 text-sm text-zinc-500">No spam. Just launch updates and drop notices.</p>
          </form>

          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-yellow-300">Follow the build</p>
            <div className="mt-5 flex gap-5">
              <a
                href="https://instagram.com/battles_budz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 transition hover:text-yellow-300"
                title="Follow @battles_budz on Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100095028196403"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 transition hover:text-yellow-300"
                title="Follow Battles Budz on Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://twitter.com/BattlesBudz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 transition hover:text-yellow-300"
                title="Follow @BattlesBudz on Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/justin-battles-5548a018a"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 transition hover:text-yellow-300"
                title="Connect with Justin Battles on LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
