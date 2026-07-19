import { useState, type FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

type AuditEvent = { id: number; action: string; createdAt: string };

export default function AdminAccountPanel() {
  const { toast } = useToast();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const { data: auditEvents, isLoading: auditLoading, refetch } = useQuery<AuditEvent[]>({
    queryKey: ["/api/admin/audit-log"],
    staleTime: 30_000,
  });

  const changePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    setIsSaving(true);
    try {
      await apiRequest("POST", "/api/admin/auth/change-password", { currentPassword, newPassword });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      await refetch();
      toast({ title: "Password updated", description: "Your secure admin session has been renewed." });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to change password");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Change Password</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={changePassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current password</Label>
              <Input id="current-password" type="password" autoComplete="current-password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} required maxLength={128} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New password</Label>
              <Input id="new-password" type="password" autoComplete="new-password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} required minLength={12} maxLength={128} />
              <p className="text-xs text-gray-500">Use at least 12 characters.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-new-password">Confirm new password</Label>
              <Input id="confirm-new-password" type="password" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required minLength={12} maxLength={128} />
            </div>
            {error && <p role="alert" className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
            <Button type="submit" disabled={isSaving} className="bg-battles-gold font-bold text-black hover:bg-yellow-300">
              {isSaving ? "Updating…" : "Update password"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Recent Security Activity</CardTitle></CardHeader>
        <CardContent>
          {auditLoading ? (
            <p className="text-sm text-gray-500">Loading activity…</p>
          ) : auditEvents?.length ? (
            <ul className="divide-y" aria-label="Recent admin security activity">
              {auditEvents.map((event) => (
                <li key={event.id} className="flex items-center justify-between gap-4 py-3 text-sm">
                  <span className="font-medium capitalize">{event.action.replace(/^admin\./, "").replaceAll("_", " ")}</span>
                  <time className="text-right text-gray-500" dateTime={event.createdAt}>{new Date(event.createdAt).toLocaleString()}</time>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No security activity recorded yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
