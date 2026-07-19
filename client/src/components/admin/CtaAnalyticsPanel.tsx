import { useQuery } from "@tanstack/react-query";
import { BarChart3, Instagram, Mail, MousePointerClick, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CtaAnalytics = {
  summary: {
    totalClicks: number;
    instagramClicks: number;
    wholesaleClicks: number;
    last7Days: number;
  };
  byPlacement: Array<{
    eventType: "instagram_order" | "wholesale_email";
    placement: "hero" | "wholesale_section" | "closing";
    clicks: number;
  }>;
  recentEvents: Array<{
    id: number;
    eventType: "instagram_order" | "wholesale_email";
    placement: "hero" | "wholesale_section" | "closing";
    pagePath: string;
    referrer: string | null;
    utmSource: string | null;
    utmMedium: string | null;
    utmCampaign: string | null;
    createdAt: string;
  }>;
};

const eventLabels = {
  instagram_order: "Instagram order",
  wholesale_email: "Wholesale email",
};

const placementLabels = {
  hero: "Top of page",
  wholesale_section: "Wholesale section",
  closing: "Bottom of page",
};

export default function CtaAnalyticsPanel() {
  const { data, isLoading, isError, refetch, isFetching } = useQuery<CtaAnalytics>({
    queryKey: ["/api/admin/cta-analytics"],
    staleTime: 30_000,
  });

  if (isLoading) {
    return <p className="py-10 text-center text-gray-500">Loading CTA analytics…</p>;
  }

  if (isError || !data) {
    return (
      <div className="py-10 text-center">
        <p className="text-sm text-red-700">CTA analytics could not be loaded.</p>
        <Button className="mt-4" variant="outline" size="sm" onClick={() => refetch()}>
          Try Again
        </Button>
      </div>
    );
  }

  const metrics = [
    { label: "All clicks", value: data.summary.totalClicks, icon: MousePointerClick },
    { label: "Instagram orders", value: data.summary.instagramClicks, icon: Instagram },
    { label: "Wholesale emails", value: data.summary.wholesaleClicks, icon: Mail },
    { label: "Last 7 days", value: data.summary.last7Days, icon: BarChart3 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-battles-black">Battery CTA Analytics</h2>
          <p className="mt-1 text-sm text-gray-600">Anonymous clicks from the battery page’s Instagram and wholesale buttons.</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isFetching}>
          <RefreshCw className={`mr-2 h-4 w-4 ${isFetching ? "animate-spin" : ""}`} aria-hidden="true" />
          Refresh
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(({ label, value, icon: Icon }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{label}</CardTitle>
              <Icon className="h-4 w-4 text-battles-gold" aria-hidden="true" />
            </CardHeader>
            <CardContent><p className="text-3xl font-bold">{value}</p></CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle>Clicks by Button Location</CardTitle></CardHeader>
        <CardContent>
          {data.byPlacement.length ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead><tr className="border-b"><th className="p-3 text-left">Action</th><th className="p-3 text-left">Location</th><th className="p-3 text-right">Clicks</th></tr></thead>
                <tbody>
                  {data.byPlacement.map((row) => (
                    <tr key={`${row.eventType}-${row.placement}`} className="border-b">
                      <td className="p-3 font-medium">{eventLabels[row.eventType]}</td>
                      <td className="p-3">{placementLabels[row.placement]}</td>
                      <td className="p-3 text-right font-bold">{row.clicks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : <p className="text-sm text-gray-500">No CTA clicks recorded yet.</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Recent Clicks</CardTitle></CardHeader>
        <CardContent>
          {data.recentEvents.length ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="p-3 text-left">Time</th><th className="p-3 text-left">Action</th><th className="p-3 text-left">Location</th><th className="p-3 text-left">Page</th><th className="p-3 text-left">Campaign</th><th className="p-3 text-left">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentEvents.map((event) => (
                    <tr key={event.id} className="border-b align-top">
                      <td className="whitespace-nowrap p-3"><time dateTime={event.createdAt}>{new Date(event.createdAt).toLocaleString()}</time></td>
                      <td className="p-3 font-medium">{eventLabels[event.eventType]}</td>
                      <td className="p-3">{placementLabels[event.placement]}</td>
                      <td className="max-w-[260px] break-words p-3">{event.pagePath}</td>
                      <td className="p-3">{event.utmCampaign || "—"}</td>
                      <td className="max-w-[260px] break-words p-3">{event.utmSource || event.referrer || "Direct"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : <p className="text-sm text-gray-500">No CTA clicks recorded yet.</p>}
        </CardContent>
      </Card>
    </div>
  );
}
