import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const canonicalRoutes = [
  "/",
  "/shop",
  "/battery",
  "/coming-soon",
  "/our-story",
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
  "/shipping-returns",
  "/age-verification",
  "/accessibility",
  "/this-route-does-not-exist",
] as const;

async function bypassOverlays(page: Page) {
  await page.addInitScript(() => {
    window.sessionStorage.setItem("ageVerified", "true");
    window.sessionStorage.setItem("battlesBudzUpdatesPopupDismissed", "true");
  });
}

async function revealAndCheckImages(page: Page) {
  const images = page.locator("img");

  for (let index = 0; index < (await images.count()); index += 1) {
    const image = images.nth(index);
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() => image.evaluate((element) => element.complete), {
        message: `Image ${index + 1} did not finish loading`,
      })
      .toBe(true);

    const imageState = await image.evaluate((element) => ({
      alt: element.alt,
      naturalWidth: element.naturalWidth,
      src: element.currentSrc || element.src,
    }));

    expect(
      imageState.naturalWidth,
      `Broken image: ${imageState.src} (alt: ${JSON.stringify(imageState.alt)})`,
    ).toBeGreaterThan(0);
  }

  const categoryBackgrounds = page.getByRole("list", { name: "Shop Battles Budz categories" }).getByRole("link");
  for (let index = 0; index < (await categoryBackgrounds.count()); index += 1) {
    const category = categoryBackgrounds.nth(index);
    await category.scrollIntoViewIfNeeded();
    const backgroundState = await category.evaluate(async (element) => {
      const backgroundImage = window.getComputedStyle(element).backgroundImage;
      const imageUrl = backgroundImage.match(/url\(["']?(.*?)["']?\)/)?.[1];
      if (!imageUrl) {
        return { backgroundImage, naturalWidth: 0 };
      }

      const image = new Image();
      image.src = imageUrl;
      await image.decode();
      return { backgroundImage, naturalWidth: image.naturalWidth };
    });
    expect(backgroundState.naturalWidth, `Broken category background: ${backgroundState.backgroundImage}`).toBeGreaterThan(0);
  }
}

test.describe("public route accessibility contract", () => {
  for (const route of canonicalRoutes) {
    test(`${route} has the complete accessible public-page shell`, async ({ page }) => {
      await bypassOverlays(page);
      await page.goto(route, { waitUntil: "domcontentloaded" });

      await expect(page.locator("main")).toHaveCount(1);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.getByRole("contentinfo")).toHaveCount(1);

      const skipLink = page.locator('a.skip-link[href^="#"]');
      await expect(skipLink).toHaveCount(1);
      const skipTargetSelector = await skipLink.getAttribute("href");
      expect(skipTargetSelector).toBeTruthy();
      await expect(page.locator(skipTargetSelector!)).toHaveCount(1);

      await expect(
        page.getByRole("heading", {
          name: "Cannabis advertising notice",
          exact: true,
        }),
      ).toHaveCount(1);
      await expect(page.locator("body")).not.toContainText(/provisional\s+(?:cannabis\s+)?license|license\s+.*provisional/i);

      await revealAndCheckImages(page);

      const overflow = await page.evaluate(() => ({
        bodyClientWidth: document.body.clientWidth,
        bodyScrollWidth: document.body.scrollWidth,
        documentClientWidth: document.documentElement.clientWidth,
        documentScrollWidth: document.documentElement.scrollWidth,
      }));
      expect(
        overflow.documentScrollWidth,
        `Document has horizontal overflow: ${JSON.stringify(overflow)}`,
      ).toBeLessThanOrEqual(overflow.documentClientWidth + 1);
      expect(
        overflow.bodyScrollWidth,
        `Body has horizontal overflow: ${JSON.stringify(overflow)}`,
      ).toBeLessThanOrEqual(overflow.bodyClientWidth + 1);

      const axeResults = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();

      expect(axeResults.violations, JSON.stringify(axeResults.violations, null, 2)).toEqual([]);

      await page.addStyleTag({
        content: `
          * { letter-spacing: 0.12em !important; line-height: 1.5 !important; word-spacing: 0.16em !important; }
          p { margin-bottom: 2em !important; }
        `,
      });
      const textSpacingOverflow = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      expect(
        textSpacingOverflow.scrollWidth,
        `Text-spacing override caused horizontal overflow: ${JSON.stringify(textSpacingOverflow)}`,
      ).toBeLessThanOrEqual(textSpacingOverflow.clientWidth + 1);
      await expect(page.locator("main")).toBeVisible();
    });
  }
});
