import { expect, test } from "@playwright/test";

test("the session age gate protects a deep link and is keyboard operable", async ({ page }) => {
  await page.goto("/products/freedom-fog-vapes");

  const dialog = page.getByRole("dialog", { name: "Welcome to Battles Budz" });
  await expect(dialog).toBeVisible();
  await expect(page).toHaveURL(/\/products\/freedom-fog-vapes$/);
  await expect
    .poll(() => dialog.evaluate((element) => element.contains(document.activeElement)))
    .toBe(true);

  for (let index = 0; index < 6; index += 1) {
    await page.keyboard.press("Tab");
    expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  }

  const yesButton = dialog.getByRole("button", { name: "Yes, I'm 21+" });
  await yesButton.focus();
  await expect(yesButton).toBeFocused();
  await page.keyboard.press("Enter");

  await expect(dialog).toBeHidden();
  await expect(page).toHaveURL(/\/products\/freedom-fog-vapes$/);
  await expect
    .poll(() => page.evaluate(() => window.sessionStorage.getItem("ageVerified")))
    .toBe("true");
});

test("the age gate cannot be dismissed with Escape", async ({ page }) => {
  await page.goto("/battery");

  const dialog = page.getByRole("dialog", { name: "Welcome to Battles Budz" });
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeVisible();
  await page.mouse.click(5, 5);
  await expect(dialog).toBeVisible();
});

test("the mobile menu exposes state, contains focus, and returns focus on Escape", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile"), "The tested menu is shown only at the mobile breakpoint.");

  await page.addInitScript(() => {
    window.sessionStorage.setItem("ageVerified", "true");
    window.sessionStorage.setItem("battlesBudzUpdatesPopupDismissed", "true");
  });
  await page.goto("/shop");

  const menuButton = page.locator('button[aria-controls="primary-navigation-menu"]');
  await expect(menuButton).toHaveAccessibleName("Open menu");
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
  await menuButton.focus();
  await page.keyboard.press("Enter");

  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  const menu = page.locator("#primary-navigation-menu");
  await expect(menu).toBeVisible();
  const firstLink = menu.getByRole("link").first();
  await expect(firstLink).toBeFocused();
  await expect(firstLink).toHaveAttribute("aria-current", "page");

  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
  await expect(menuButton).toBeFocused();
});

test("the battery mobile menu preserves the same keyboard contract", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile"), "The tested menu is shown only at the mobile breakpoint.");

  await page.addInitScript(() => {
    window.sessionStorage.setItem("ageVerified", "true");
    window.sessionStorage.setItem("battlesBudzUpdatesPopupDismissed", "true");
  });
  await page.goto("/battery");

  const menuButton = page.locator('button[aria-controls="battery-mobile-navigation"]');
  await expect(menuButton).toHaveAccessibleName("Open menu");
  await menuButton.focus();
  await page.keyboard.press("Enter");

  const menu = page.locator("#battery-mobile-navigation");
  await expect(menu).toBeVisible();
  await expect(menu.getByRole("link").first()).toBeFocused();
  await expect(menu.getByRole("link", { name: "Dual-Cart Battery", exact: true })).toHaveAttribute(
    "aria-current",
    "page",
  );

  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
  await expect(menuButton).toHaveAccessibleName("Open menu");
  await expect(menuButton).toBeFocused();
});

test("the skip link moves keyboard focus to the main content", async ({ page }) => {
  await page.addInitScript(() => {
    window.sessionStorage.setItem("ageVerified", "true");
    window.sessionStorage.setItem("battlesBudzUpdatesPopupDismissed", "true");
  });
  await page.goto("/");

  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to main content" });
  await expect(skipLink).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
});

test("client-side route changes move focus to the destination main content", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.startsWith("mobile"), "Desktop navigation is hidden at the mobile breakpoint.");

  await page.addInitScript(() => {
    window.sessionStorage.setItem("ageVerified", "true");
    window.sessionStorage.setItem("battlesBudzUpdatesPopupDismissed", "true");
  });
  await page.goto("/");

  await page.getByRole("link", { name: "Our Story", exact: true }).click();
  await expect(page).toHaveURL(/\/our-story$/);
  await expect(page.locator("main")).toBeFocused();
});

test("the public site remains usable with reduced motion requested", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.startsWith("mobile"), "Media preference behavior is viewport-independent and covered once here.");

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => {
    window.sessionStorage.setItem("ageVerified", "true");
    window.sessionStorage.setItem("battlesBudzUpdatesPopupDismissed", "true");
  });
  await page.goto("/");

  await expect(page.locator("main")).toBeVisible();
  expect(await page.evaluate(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches)).toBe(true);

  const transitionDuration = await page.getByRole("link", { name: "Our Story", exact: true }).evaluate((element) => {
    const durations = window.getComputedStyle(element).transitionDuration.split(",");
    return Math.max(
      ...durations.map((duration) => {
        const trimmed = duration.trim();
        return trimmed.endsWith("ms") ? Number.parseFloat(trimmed) : Number.parseFloat(trimmed) * 1_000;
      }),
    );
  });
  expect(transitionDuration).toBeLessThanOrEqual(0.01);
});

test("the public site remains usable in Windows forced-colors mode", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.startsWith("mobile"), "Forced-colors is a desktop high-contrast preference.");

  await page.emulateMedia({ forcedColors: "active" });
  await page.addInitScript(() => {
    window.sessionStorage.setItem("ageVerified", "true");
    window.sessionStorage.setItem("battlesBudzUpdatesPopupDismissed", "true");
  });
  await page.goto("/");

  expect(await page.evaluate(() => window.matchMedia("(forced-colors: active)").matches)).toBe(true);
  await expect(page.locator("main")).toBeVisible();
  await expect(page.locator("[data-ocm-compliance]")).toBeVisible();

  const skipLink = page.getByRole("link", { name: "Skip to main content" });
  await skipLink.focus();
  const outlineStyle = await skipLink.evaluate((element) => window.getComputedStyle(element).outlineStyle);
  expect(outlineStyle).not.toBe("none");
});

test("representative pages remain usable in mobile landscape orientation", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile"), "Landscape behavior is covered in the mobile project.");

  await page.setViewportSize({ width: 800, height: 320 });
  await page.addInitScript(() => {
    window.sessionStorage.setItem("ageVerified", "true");
    window.sessionStorage.setItem("battlesBudzUpdatesPopupDismissed", "true");
  });

  for (const route of ["/", "/battery", "/accessibility"]) {
    await page.goto(route);
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("[data-ocm-compliance]")).toBeVisible();
    const overflow = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(overflow.scrollWidth, `${route} overflows in landscape`).toBeLessThanOrEqual(overflow.clientWidth + 1);
  }
});

test("mandatory dialogs and mobile menus remain reachable in a short viewport", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile"), "Short-viewport behavior is covered in the mobile project.");
  await page.setViewportSize({ width: 800, height: 320 });

  await page.goto("/battery");
  const ageDialog = page.getByRole("dialog", { name: "Welcome to Battles Budz" });
  await expect.poll(async () => (await ageDialog.boundingBox())?.y ?? -1).toBeGreaterThanOrEqual(0);
  await expect
    .poll(async () => {
      const box = await ageDialog.boundingBox();
      return box ? box.y + box.height : Number.POSITIVE_INFINITY;
    })
    .toBeLessThanOrEqual(321);
  await ageDialog.getByRole("button", { name: "Yes, I'm 21+" }).scrollIntoViewIfNeeded();
  await ageDialog.getByRole("button", { name: "Yes, I'm 21+" }).click();

  const batteryMenuButton = page.locator('button[aria-controls="battery-mobile-navigation"]');
  await batteryMenuButton.click();
  const batteryMenu = page.locator("#battery-mobile-navigation");
  await expect(batteryMenu).toBeVisible();
  const batteryMenuDimensions = await batteryMenu.evaluate((element) => ({
    clientHeight: element.clientHeight,
    scrollHeight: element.scrollHeight,
  }));
  expect(batteryMenuDimensions.scrollHeight).toBeGreaterThan(batteryMenuDimensions.clientHeight);
  const batteryMenuBox = await batteryMenu.boundingBox();
  expect(batteryMenuBox!.y + batteryMenuBox!.height).toBeLessThanOrEqual(321);
  await batteryMenu.getByRole("link", { name: "Contact", exact: true }).scrollIntoViewIfNeeded();
  await batteryMenu.getByRole("link", { name: "Contact", exact: true }).focus();
  await expect(batteryMenu.getByRole("link", { name: "Contact", exact: true })).toBeFocused();

  await page.addInitScript(() => {
    window.sessionStorage.setItem("ageVerified", "true");
    window.sessionStorage.setItem("battlesBudzUpdatesPopupDismissed", "true");
  });
  await page.goto("/");
  const standardMenuButton = page.locator('button[aria-controls="primary-navigation-menu"]');
  await standardMenuButton.click();
  const standardMenu = page.locator("#primary-navigation-menu");
  await expect(standardMenu).toBeVisible();
  const standardMenuDimensions = await standardMenu.evaluate((element) => ({
    clientHeight: element.clientHeight,
    scrollHeight: element.scrollHeight,
  }));
  expect(standardMenuDimensions.scrollHeight).toBeGreaterThan(standardMenuDimensions.clientHeight);
  const standardMenuBox = await standardMenu.boundingBox();
  expect(standardMenuBox!.y + standardMenuBox!.height).toBeLessThanOrEqual(321);
  await standardMenu.getByRole("link", { name: "Contact", exact: true }).scrollIntoViewIfNeeded();
  await standardMenu.getByRole("link", { name: "Contact", exact: true }).focus();
  await expect(standardMenu.getByRole("link", { name: "Contact", exact: true })).toBeFocused();

  const newsletterPage = await page.context().newPage();
  await newsletterPage.setViewportSize({ width: 800, height: 320 });
  await newsletterPage.addInitScript(() => {
    window.sessionStorage.setItem("ageVerified", "true");
  });
  await newsletterPage.goto("/");
  const newsletterDialog = newsletterPage.getByRole("dialog", { name: "Get Battles Budz updates." });
  await expect(newsletterDialog).toBeVisible({ timeout: 6_000 });
  await expect.poll(async () => (await newsletterDialog.boundingBox())?.y ?? -1).toBeGreaterThanOrEqual(0);
  await expect
    .poll(async () => {
      const box = await newsletterDialog.boundingBox();
      return box ? box.y + box.height : Number.POSITIVE_INFINITY;
    })
    .toBeLessThanOrEqual(321);
  await newsletterDialog.getByRole("button", { name: "Not now" }).scrollIntoViewIfNeeded();
  await newsletterDialog.getByRole("button", { name: "Not now" }).click();
  await expect(newsletterDialog).toBeHidden();
  await newsletterPage.close();
});

test("open mobile menus close cleanly when the layout changes to desktop", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile"), "Responsive menu state is covered in the mobile project.");
  await page.setViewportSize({ width: 800, height: 600 });
  await page.addInitScript(() => {
    window.sessionStorage.setItem("ageVerified", "true");
    window.sessionStorage.setItem("battlesBudzUpdatesPopupDismissed", "true");
  });

  await page.goto("/");
  const standardMenuButton = page.locator('button[aria-controls="primary-navigation-menu"]');
  await standardMenuButton.click();
  await expect(standardMenuButton).toHaveAttribute("aria-expanded", "true");
  await page.setViewportSize({ width: 1100, height: 600 });
  await expect(standardMenuButton).toHaveAttribute("aria-expanded", "false");
  await expect(page.getByRole("link", { name: "Battles Budz home" }).first()).toBeFocused();

  await page.setViewportSize({ width: 800, height: 600 });
  await page.goto("/battery");
  const batteryMenuButton = page.locator('button[aria-controls="battery-mobile-navigation"]');
  await batteryMenuButton.click();
  await expect(batteryMenuButton).toHaveAttribute("aria-expanded", "true");
  await page.setViewportSize({ width: 1100, height: 600 });
  await expect(batteryMenuButton).toHaveAttribute("aria-expanded", "false");
  await expect(page.getByRole("link", { name: "Battles Budz home" }).first()).toBeFocused();
});
