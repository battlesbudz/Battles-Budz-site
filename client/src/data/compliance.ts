export const ocmCompliance = {
  licenseeName: "",
  licenseNumber: "",
  licenseType: "",
  primaryWarning:
    "For use only by persons 21 years of age and older. Keep out of reach of children and pets. If someone accidentally consumes cannabis, contact the Poison Center. Consume responsibly.",
  rotatingWarnings: [
    "Cannabis can be addictive.",
    "Cannabis can impair concentration and coordination. Do not operate a vehicle or machinery under the influence of cannabis.",
    "There may be health risks associated with consumption of this product.",
    "Cannabis is not recommended for use by persons who are pregnant or nursing.",
  ],
  hopeline: {
    phone: "1-877-8-HOPENY",
    phoneHref: "tel:+18778467369",
    text: "HOPENY to 467369",
    url: "https://oasas.ny.gov/hopeline",
  },
};

export function hasOfficialOcmLicenseInfo() {
  return Boolean(ocmCompliance.licenseeName && ocmCompliance.licenseNumber && ocmCompliance.licenseType);
}

export function getCurrentCannabisWarning(date = new Date()) {
  const dayStartUtc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  const epochDay = Math.floor(dayStartUtc / 86_400_000);
  const rotationAnchorDay = Math.floor(Date.UTC(2026, 0, 1) / 86_400_000);
  const warningOffset = epochDay - rotationAnchorDay;
  const warningIndex =
    ((warningOffset % ocmCompliance.rotatingWarnings.length) + ocmCompliance.rotatingWarnings.length) %
    ocmCompliance.rotatingWarnings.length;

  return ocmCompliance.rotatingWarnings[warningIndex];
}
