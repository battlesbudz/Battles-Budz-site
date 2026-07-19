import { useEffect, useState, type FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

type AdminAuthStatus = {
  adminEmail: string;
  setupRequired: boolean;
  setupAvailable: boolean;
};

type Mode = "login" | "recover";

export default function LoginPage() {
  const { login, setup, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [mode, setMode] = useState<Mode>("login");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [setupToken, setSetupToken] = useState("");
  const [recoveryToken, setRecoveryToken] = useState("");
  const [recoveryPending, setRecoveryPending] = useState(false);
  const [error, setError] = useState("");

  const { data: status, isLoading } = useQuery<AdminAuthStatus>({
    queryKey: ["/api/admin/auth/status"],
    staleTime: 0,
  });

  useEffect(() => {
    document.title = "Admin Login | Battles Budz";
  }, []);

  useEffect(() => {
    if (isAuthenticated) window.location.assign("/admin");
  }, [isAuthenticated]);

  const requiresConfirmation = status?.setupRequired || mode === "recover";
  const isPending = login.isPending || setup.isPending || recoveryPending;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!status || isPending) return;
    setError("");

    if (requiresConfirmation && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      if (status.setupRequired) {
        await setup.mutateAsync({ email: status.adminEmail, password, setupToken });
        window.location.assign("/admin");
        return;
      }

      if (mode === "recover") {
        setRecoveryPending(true);
        await apiRequest("POST", "/api/admin/auth/recover", {
          email: status.adminEmail,
          newPassword: password,
          recoveryToken,
        });
        setPassword("");
        setConfirmPassword("");
        setRecoveryToken("");
        setMode("login");
        toast({ title: "Password reset", description: "Sign in with your new password." });
        return;
      }

      await login.mutateAsync({ email: status.adminEmail, password });
      window.location.assign("/admin");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to continue");
    } finally {
      setRecoveryPending(false);
    }
  };

  if (isLoading || !status) {
    return <main id="main-content" className="grid min-h-screen place-items-center bg-black text-yellow-300">Loading admin access…</main>;
  }

  const title = status.setupRequired ? "Set up admin access" : mode === "recover" ? "Recover admin access" : "Admin sign in";
  const description = status.setupRequired
    ? "Create the only administrator account for Battles Budz."
    : mode === "recover"
      ? "Use the private recovery token stored in your deployment settings."
      : "Sign in to the Battles Budz administration system.";

  return (
    <main id="main-content" className="min-h-screen bg-[#050505] px-5 py-12 text-white">
      <div className="mx-auto w-full max-w-md">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-yellow-300 hover:text-yellow-100">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to website
        </Link>

        <Card className="border-yellow-300/40 bg-[#0d0d0d] text-white shadow-2xl shadow-yellow-300/10">
          <CardHeader>
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-300 text-black">
              <LockKeyhole className="h-6 w-6" aria-hidden="true" />
            </div>
            <CardTitle className="text-3xl font-black uppercase tracking-[-0.03em] text-yellow-300">{title}</CardTitle>
            <p className="text-sm leading-6 text-zinc-300">{description}</p>
          </CardHeader>
          <CardContent>
            {status.setupRequired && !status.setupAvailable ? (
              <div role="alert" className="border border-red-400/50 bg-red-950/40 p-4 text-sm leading-6 text-red-100">
                Add a private <code>ADMIN_SETUP_TOKEN</code> of at least 16 characters to the deployment environment, then reload this page.
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Admin email</Label>
                  <Input id="admin-email" type="email" value={status.adminEmail} readOnly autoComplete="username" className="border-white/20 bg-white/5 text-white" />
                </div>

                {status.setupRequired && (
                  <div className="space-y-2">
                    <Label htmlFor="setup-token">One-time setup token</Label>
                    <Input id="setup-token" type="password" value={setupToken} onChange={(event) => setSetupToken(event.target.value)} autoComplete="off" required minLength={16} className="border-white/20 bg-white/5 text-white" />
                  </div>
                )}

                {mode === "recover" && !status.setupRequired && (
                  <div className="space-y-2">
                    <Label htmlFor="recovery-token">Recovery token</Label>
                    <Input id="recovery-token" type="password" value={recoveryToken} onChange={(event) => setRecoveryToken(event.target.value)} autoComplete="off" required minLength={16} className="border-white/20 bg-white/5 text-white" />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="admin-password">{requiresConfirmation ? "New password" : "Password"}</Label>
                  <Input id="admin-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={status.setupRequired ? "new-password" : "current-password"} required minLength={status.setupRequired || mode === "recover" ? 12 : 1} maxLength={128} className="border-white/20 bg-white/5 text-white" />
                  {requiresConfirmation && <p className="text-xs text-zinc-400">Use at least 12 characters.</p>}
                </div>

                {requiresConfirmation && (
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm new password</Label>
                    <Input id="confirm-password" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} autoComplete="new-password" required minLength={12} maxLength={128} className="border-white/20 bg-white/5 text-white" />
                  </div>
                )}

                {error && <p role="alert" className="border border-red-400/50 bg-red-950/40 p-3 text-sm text-red-100">{error}</p>}

                <Button type="submit" disabled={isPending} className="min-h-12 w-full bg-yellow-300 font-black uppercase tracking-[0.12em] text-black hover:bg-yellow-200">
                  {isPending ? "Working…" : status.setupRequired ? "Create admin account" : mode === "recover" ? "Reset password" : "Sign in"}
                </Button>

                {!status.setupRequired && (
                  <button
                    type="button"
                    onClick={() => {
                      setMode(mode === "login" ? "recover" : "login");
                      setPassword("");
                      setConfirmPassword("");
                      setError("");
                    }}
                    className="w-full text-sm font-semibold text-yellow-300 hover:text-yellow-100"
                  >
                    {mode === "login" ? "Use recovery token" : "Return to sign in"}
                  </button>
                )}
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
