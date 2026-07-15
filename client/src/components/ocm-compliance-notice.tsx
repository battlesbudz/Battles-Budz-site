import { ocmCompliance, getCurrentCannabisWarning } from "@/data/compliance";

export default function OcmComplianceNotice() {
  const currentWarning = getCurrentCannabisWarning();

  return (
    <section
      className="border-y border-black bg-yellow-300 text-black"
      aria-labelledby="ocm-compliance-heading"
    >
      <div className="mx-auto grid max-w-7xl gap-4 px-5 py-5 text-sm leading-6 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
        <div>
          <h2 id="ocm-compliance-heading" className="text-base font-black uppercase tracking-[0.12em]">
            Cannabis advertising notice
          </h2>
          <p className="mt-2 font-semibold">{ocmCompliance.primaryWarning}</p>
          <p className="mt-2 font-semibold">{currentWarning}</p>
        </div>

        <div className="space-y-2 font-semibold">
          <p>
            {ocmCompliance.licenseeName} - {ocmCompliance.licenseType} - License {ocmCompliance.licenseNumber}
          </p>
          <p>
            NYS HOPEline: call{" "}
            <a className="underline underline-offset-4" href={ocmCompliance.hopeline.phoneHref}>
              {ocmCompliance.hopeline.phone}
            </a>
            , text {ocmCompliance.hopeline.text}, or visit{" "}
            <a
              className="underline underline-offset-4"
              href={ocmCompliance.hopeline.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              oasas.ny.gov/hopeline
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
