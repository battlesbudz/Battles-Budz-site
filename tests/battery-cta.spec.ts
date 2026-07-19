import { expect, test } from "@playwright/test";

test("battery retail CTAs open Instagram and record anonymous campaign context", async ({ page }) => {
  const events: Array<Record<string, unknown>> = [];
  await page.route("**/api/analytics/cta-click", async (route) => {
    events.push(JSON.parse(route.request().postData() || "{}"));
    await route.fulfill({ status: 204 });
  });

  await page.goto("/battery?utm_source=instagram&utm_medium=social&utm_campaign=battery_launch");

  const instagramLinks = page.getByRole("link", { name: "Message Us on Instagram", exact: true });
  await expect(instagramLinks).toHaveCount(2);
  await expect(instagramLinks.first()).toHaveAttribute("href", "https://ig.me/m/battles_budz");
  await expect(instagramLinks.first()).toHaveAttribute("target", "_blank");

  await instagramLinks.first().evaluate((link) => link.addEventListener("click", (event) => event.preventDefault(), { once: true }));
  await instagramLinks.first().click();

  await expect.poll(() => events.length).toBe(1);
  expect(events[0]).toMatchObject({
    eventType: "instagram_order",
    placement: "hero",
    pagePath: "/battery",
    utmSource: "instagram",
    utmMedium: "social",
    utmCampaign: "battery_launch",
  });
});

test("battery wholesale CTAs remain email links and record their placement", async ({ page }) => {
  const events: Array<Record<string, unknown>> = [];
  await page.route("**/api/analytics/cta-click", async (route) => {
    events.push(JSON.parse(route.request().postData() || "{}"));
    await route.fulfill({ status: 204 });
  });

  await page.goto("/battery");
  const heroWholesale = page.getByRole("link", { name: "Wholesale Pricing", exact: true });
  await expect(heroWholesale).toHaveAttribute("href", /mailto:battlesbudz@gmail\.com/);
  await heroWholesale.evaluate((link) => link.addEventListener("click", (event) => event.preventDefault(), { once: true }));
  await heroWholesale.click();

  await expect.poll(() => events.length).toBe(1);
  expect(events[0]).toMatchObject({ eventType: "wholesale_email", placement: "hero" });

  const wholesaleSection = page.getByRole("link", { name: "Email for Wholesale Pricing", exact: true });
  await wholesaleSection.evaluate((link) => link.addEventListener("click", (event) => event.preventDefault(), { once: true }));
  await wholesaleSection.click();

  await expect.poll(() => events.length).toBe(2);
  expect(events[1]).toMatchObject({ eventType: "wholesale_email", placement: "wholesale_section" });
});
