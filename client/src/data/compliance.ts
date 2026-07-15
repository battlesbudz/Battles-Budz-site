export const ocmCompliance = {
  licenseeName: "Battles Budz LLC",
  licenseNumber: "OCMMICR-2023-000258",
  licenseType: "Adult-use cannabis microbusiness",
  primaryWarning:
    "For use only by persons 21 years of age and older. Keep out of reach of children and pets. If someone accidentally consumes cannabis, contact the Poison Center. Consume responsibly.",
  rotatingWarnings: [
    "Cannabis can be addictive.",
    "Cannabis can impair concentration and coordination. Do not operate a vehicle or machinery under the influence of cannabis.",
    "There may be health risks associated with consumption of this product.",
    "Cannabis is not recommended for use by persons who are pregnant or nursing.",
  ],
  hopeline: {
    phone: "1-877-8-HOPENY (467369)",
    phoneHref: "tel:+18778467369",
    text: "HOPENY (467369)",
    url: "https://oasas.ny.gov/hopeline",
  },
};

export function getCurrentCannabisWarning(date = new Date()) {
  const dayStartUtc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  const yearStartUtc = Date.UTC(date.getUTCFullYear(), 0, 1);
  const dayOfYear = Math.floor((dayStartUtc - yearStartUtc) / 86_400_000);

  return ocmCompliance.rotatingWarnings[dayOfYear % ocmCompliance.rotatingWarnings.length];
}
