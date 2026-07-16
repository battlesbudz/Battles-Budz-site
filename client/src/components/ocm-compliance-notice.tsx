import { ocmCompliance, getCurrentCannabisWarning, hasOfficialOcmLicenseInfo } from "@/data/compliance";

export default function OcmComplianceNotice() {
  const currentWarning = getCurrentCannabisWarning();
  const hasLicenseInfo = hasOfficialOcmLicenseInfo();

  return (
    <section
      className="border-2 border-black bg-[#FFFF00] font-[Arial] text-black"
      aria-labelledby="ocm-compliance-heading"
      data-ocm-compliance
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-5 py-5 text-[14px] leading-6 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 id="ocm-compliance-heading" className="text-[16px] font-bold uppercase">
            Cannabis advertising notice
          </h2>
          <p className="mt-2">{ocmCompliance.primaryWarning}</p>
          <p className="mt-2">{currentWarning}</p>
        </div>

        <div className="space-y-2">
          {hasLicenseInfo ? (
            <p>
              {ocmCompliance.licenseeName} - {ocmCompliance.licenseType} - License {ocmCompliance.licenseNumber}
            </p>
          ) : null}
          <p>
            Concerned about your cannabis use? Contact the New York State HOPEline by texting {ocmCompliance.hopeline.text}, calling{" "}
            <a className="ocm-compliance-link underline underline-offset-4" href={ocmCompliance.hopeline.phoneHref}>
              {ocmCompliance.hopeline.phone}
            </a>
            , or visiting{" "}
            <a
              className="ocm-compliance-link underline underline-offset-4"
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
