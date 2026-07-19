import { expect, test, type Page } from "@playwright/test";

const approvedPrimaryWarning =
  "For use only by persons 21 years of age and older. Keep out of reach of children and pets. If someone accidentally consumes cannabis, contact the Poison Center. Consume responsibly.";

const approvedHopelineCopy =
  "Concerned about your cannabis use? Contact the New York State HOPEline by texting HOPENY to 467369, calling 1-877-8-HOPENY, or visiting oasas.ny.gov/hopeline.";

const warningCases = [
  ["2026-01-01T12:00:00.000Z", "Cannabis can be addictive."],
  [
    "2026-01-02T12:00:00.000Z",
    "Cannabis can impair concentration and coordination. Do not operate a vehicle or machinery under the influence of cannabis.",
  ],
  [
    "2026-01-03T12:00:00.000Z",
    "There may be health risks associated with consumption of this product.",
  ],
  [
    "2026-01-04T12:00:00.000Z",
    "Cannabis is not recommended for use by persons who are pregnant or nursing.",
  ],
] as const;

const productTitleCases = [
  ["/products/freedom-fog-vapes", "Freedom Fog Vapes | Battles Budz"],
  ["/products/battles-budz-flower", "Battles Budz Flower | Battles Budz"],
  ["/products/heirloom-flower", "Heirloom Flower | Battles Budz"],
  ["/products/pre-rolls", "Pre-rolls | Battles Budz"],
  ["/products/edibles", "Edibles | Battles Budz"],
  ["/products/cosmic-chewz", "Cosmic Chewz | Battles Budz"],
  ["/products/concentrates", "Concentrates | Battles Budz"],
  ["/products/battle-brew", "Battle Brew | Battles Budz"],
] as const;

async function bypassOverlays(page: Page) {
  await page.addInitScript(() => {
    window.sessionStorage.setItem("ageVerified", "true");
    window.sessionStorage.setItem("battlesBudzUpdatesPopupDismissed", "true");
  });
}

test.beforeEach(async ({ page }) => {
  await bypassOverlays(page);
});

test("the sitewide OCM notice uses the approved warning and HOPEline copy", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.startsWith("mobile"), "Copy is identical across breakpoints and covered once here.");
  await page.goto("/");

  const notice = page.locator("[data-ocm-compliance]");
  await expect(notice).toHaveCount(1);
  await expect(notice.getByText(approvedPrimaryWarning, { exact: true })).toBeVisible();
  await expect(notice.locator("p").filter({ hasText: "Concerned about your cannabis use?" })).toHaveText(
    approvedHopelineCopy,
  );
  await expect(notice).not.toContainText(/\blicense\b/i);
});

test("the sitewide OCM notice keeps the approved visual treatment", async ({ page }, testInfo) => {
  await page.goto("/");

  const notice = page.locator("[data-ocm-compliance]");
  const noticeStyle = await notice.evaluate((element) => {
    const style = window.getComputedStyle(element);
    return {
      backgroundColor: style.backgroundColor,
      borderBottomWidth: style.borderBottomWidth,
      borderTopWidth: style.borderTopWidth,
      color: style.color,
      fontFamily: style.fontFamily,
    };
  });
  expect(noticeStyle.backgroundColor).toBe("rgb(255, 255, 0)");
  expect(noticeStyle.color).toBe("rgb(0, 0, 0)");
  expect(noticeStyle.borderTopWidth).toBe("2px");
  expect(noticeStyle.borderBottomWidth).toBe("2px");
  expect(noticeStyle.fontFamily.toLowerCase()).toContain("arial");

  const headingStyle = await notice
    .getByRole("heading", { name: "Cannabis advertising notice", exact: true })
    .evaluate((element) => {
      const style = window.getComputedStyle(element);
      return {
        fontSize: style.fontSize,
        fontWeight: Number.parseInt(style.fontWeight, 10),
        textTransform: style.textTransform,
      };
    });
  expect(headingStyle.fontSize).toBe("16px");
  expect(headingStyle.fontWeight).toBeGreaterThanOrEqual(700);
  expect(headingStyle.textTransform).toBe("uppercase");
  await expect(notice.locator("p").first()).toHaveCSS("font-size", "14px");

  const gridColumnCount = await notice.locator(":scope > div").evaluate((element) =>
    window
      .getComputedStyle(element)
      .gridTemplateColumns.split(" ")
      .filter(Boolean).length,
  );
  expect(gridColumnCount).toBe(testInfo.project.name.startsWith("mobile") ? 1 : 2);

  const hopelineLink = notice.getByRole("link", { name: "1-877-8-HOPENY", exact: true });
  await hopelineLink.focus();
  await expect(hopelineLink).toBeFocused();
  const focusStyle = await hopelineLink.evaluate((element) => {
    const style = window.getComputedStyle(element);
    return {
      outlineColor: style.outlineColor,
      outlineStyle: style.outlineStyle,
      outlineWidth: Number.parseFloat(style.outlineWidth),
    };
  });
  expect(focusStyle.outlineColor).toBe("rgb(0, 0, 0)");
  expect(focusStyle.outlineStyle).not.toBe("none");
  expect(focusStyle.outlineWidth).toBeGreaterThanOrEqual(3);
});

test("the OCM warning rotates through all four approved messages by UTC day", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.startsWith("mobile"), "Rotation logic is viewport-independent and covered once here.");

  for (const [date, warning] of warningCases) {
    await page.clock.setFixedTime(new Date(date));
    await page.goto("/");
    await expect(page.locator("[data-ocm-compliance]").getByText(warning, { exact: true })).toBeVisible();
  }
});

test("the OCM warning continues rotating across a calendar-year boundary", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.startsWith("mobile"), "Rotation logic is viewport-independent and covered once here.");

  await page.clock.setFixedTime(new Date("2026-12-31T12:00:00.000Z"));
  await page.goto("/");
  const decemberWarning = await page.locator("[data-ocm-compliance] p").nth(1).textContent();

  await page.clock.setFixedTime(new Date("2027-01-01T12:00:00.000Z"));
  await page.goto("/");
  const januaryWarning = await page.locator("[data-ocm-compliance] p").nth(1).textContent();

  expect(januaryWarning).not.toBe(decemberWarning);
});

test("the Accessibility link and page use the approved title and copy", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.startsWith("mobile"), "Copy is identical across breakpoints and covered once here.");
  await page.goto("/");

  const accessibilityLink = page
    .getByRole("contentinfo")
    .getByRole("link", { name: "Accessibility", exact: true });
  await expect(accessibilityLink).toHaveCount(1);
  await accessibilityLink.click();

  await expect(page).toHaveURL(/\/accessibility$/);
  await expect(page).toHaveTitle("Accessibility | Battles Budz");
  await expect(
    page.getByText("Battles Budz is committed to making battlesbudz.com accessible to everyone.", {
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByText(
      "If you have difficulty using this site or accessing information, email battlesbudz@gmail.com. We will work with you to provide the information or service you need.",
      { exact: true },
    ),
  ).toBeVisible();
});

test("the not-found page uses the approved title and recovery copy", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.startsWith("mobile"), "Copy is identical across breakpoints and covered once here.");
  await page.goto("/this-route-does-not-exist");

  await expect(page).toHaveTitle("Page Not Found | Battles Budz");
  await expect(page.getByRole("heading", { level: 1, name: "Page not found." })).toBeVisible();
  await expect(page.getByText("The page you’re looking for isn’t here.", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Back to home", exact: true })).toHaveAttribute("href", "/");
});

test("every coming-soon product has the approved product title pattern", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.startsWith("mobile"), "Titles are viewport-independent and covered once here.");

  for (const [route, title] of productTitleCases) {
    await page.goto(route);
    await expect(page).toHaveTitle(title);
  }
});

test("each apparel card links directly to its matching Shopify product", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.startsWith("mobile"), "Link contracts are viewport-independent and covered once here.");
  await page.goto("/shop");

  const products = [
    ["Full-Chest Tee", "Shop T-shirts", "https://shop.battlesbudz.com/products/battles-budz-usa-t-shirt?utm_source=battlesbudz.com&utm_medium=referral&utm_campaign=apparel&utm_content=full_chest_tee"],
    ["Heavy Blend Hoodie", "Shop hoodies", "https://shop.battlesbudz.com/products/battles-budz-heavy-blend-hoodie?utm_source=battlesbudz.com&utm_medium=referral&utm_campaign=apparel&utm_content=heavy_blend_hoodie"],
    ["Long Sleeve", "Shop long sleeves", "https://shop.battlesbudz.com/products/battles-budz-crest-long-sleeve?utm_source=battlesbudz.com&utm_medium=referral&utm_campaign=apparel&utm_content=crest_long_sleeve"],
    ["Tank Top", "Shop tank tops", "https://shop.battlesbudz.com/products/mens-tank-top?utm_source=battlesbudz.com&utm_medium=referral&utm_campaign=apparel&utm_content=mens_tank_top"],
  ] as const;

  for (const [heading, cta, href] of products) {
    const card = page.getByRole("article").filter({ has: page.getByRole("heading", { name: heading, exact: true }) });
    await expect(card).toHaveCount(1);
    await expect(card.getByRole("link", { name: new RegExp(`^${cta}`, "i") })).toHaveAttribute("href", href);
  }

  await expect(page.getByRole("link", { name: "Shop all apparel", exact: false })).toHaveAttribute(
    "href",
    "https://shop.battlesbudz.com/?utm_source=battlesbudz.com&utm_medium=referral&utm_campaign=apparel&utm_content=shop_all",
  );
  await expect(page.getByText("Free U.S. shipping at $50+", { exact: true })).toBeVisible();
  await expect(page.getByText("30-day refund requests", { exact: true })).toBeVisible();
  await expect(page.getByText("30-day size exchanges", { exact: true })).toBeVisible();
});

test("the battery page uses inquiry flows, verified feature copy, and product structured data", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.startsWith("mobile"), "Content contracts are breakpoint-independent and covered once here.");
  await page.goto("/battery");

  await expect(page.locator('main a[href^="mailto:"]')).toHaveCount(0);
  await expect(page.locator('[data-battery-inquiry="personal"]')).toHaveCount(1);
  await expect(page.locator('[data-battery-inquiry="wholesale"]')).toHaveCount(1);
  const personalRequestLink = page.locator('a[href="#battery-order-request"]').first();
  await personalRequestLink.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { name: "Request battery availability" })).toBeFocused();
  const featureList = page.getByRole("list", { name: "Dual-cart battery features" });
  for (const feature of [
    "Holds two compatible 510-thread cartridges",
    "Three temperature modes",
    "Manual button draw or inhale activation",
    "Pass-through charging",
  ]) {
    await expect(featureList).toContainText(feature);
  }
  await expect(page.getByText(/This is an inquiry, not an order\./)).toHaveCount(2);
  await expect(page.getByRole("link", { name: "View shipping and returns terms" })).toHaveAttribute("href", "/shipping-returns");

  const structuredData = page.locator('script[data-seo-head="true"]');
  await expect(structuredData).toHaveCount(1);
  const product = JSON.parse((await structuredData.textContent()) || "{}");
  expect(product).toEqual(expect.objectContaining({
    "@type": "Product",
    name: "Battles Budz Dual-Cart Battery",
    offers: expect.objectContaining({ price: "60.00", priceCurrency: "USD" }),
  }));

  await page.getByRole("link", { name: "Apparel", exact: true }).first().click();
  await expect(page).toHaveURL(/\/shop$/);
  await expect(page.locator('script[data-seo-head="true"]')).toHaveCount(0);
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);

  await page.getByRole("link", { name: "Battles Budz home", exact: true }).first().click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
});

test("the sitemap lists every canonical revenue and public content route", async ({ request }, testInfo) => {
  test.skip(testInfo.project.name.startsWith("mobile"), "Static sitemap content is covered once here.");
  const response = await request.get("/sitemap.xml");
  expect(response.ok()).toBe(true);
  const sitemap = await response.text();

  const expectedPaths = [
    "/",
    "/battery",
    "/shop",
    "/our-story",
    "/coming-soon",
    "/shipping-returns",
    "/products/freedom-fog-vapes",
    "/products/battles-budz-flower",
    "/products/heirloom-flower",
    "/products/pre-rolls",
    "/products/edibles",
    "/products/cosmic-chewz",
    "/products/concentrates",
    "/products/battle-brew",
    "/privacy-policy",
    "/terms-of-service",
    "/accessibility",
  ];
  const sitemapPaths = Array.from(sitemap.matchAll(/<loc>https:\/\/battlesbudz\.com(\/[^<]*)<\/loc>/g), (match) => match[1]);

  expect(new Set(sitemapPaths).size).toBe(sitemapPaths.length);
  expect([...sitemapPaths].sort()).toEqual([...expectedPaths].sort());

  expect(sitemap).not.toContain("/location/");
  expect(sitemap).not.toContain("/age-verification");
});
