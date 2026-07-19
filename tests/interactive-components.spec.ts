import { expect, test, type Page } from "@playwright/test";

async function bypassOverlays(page: Page) {
  await page.addInitScript(() => {
    window.sessionStorage.setItem("ageVerified", "true");
    window.sessionStorage.setItem("battlesBudzUpdatesPopupDismissed", "true");
  });
}

test.beforeEach(async ({ page }) => {
  await bypassOverlays(page);
});

test("newsletter errors are inline, exact, and programmatically associated", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.startsWith("mobile"), "Form semantics are breakpoint-independent and covered once here.");
  await page.route("**/api/newsletter/subscribe", async (route) => {
    await route.fulfill({ status: 500, contentType: "application/json", body: JSON.stringify({ message: "failure" }) });
  });
  await page.goto("/");

  const newsletter = page.locator("#newsletter");
  const email = newsletter.getByRole("textbox", { name: "Email address for Battles Budz updates" });
  await email.fill("not-an-email");
  await newsletter.getByRole("button", { name: "Get updates", exact: true }).click();

  const invalidError = page.getByText("Enter a valid email address.", { exact: true });
  await expect(invalidError).toBeVisible();
  await expect(email).toHaveAttribute("aria-invalid", "true");
  await expect(email).toHaveAttribute("aria-describedby", /newsletter-email-error/);

  await email.fill("customer@example.com");
  await newsletter.getByRole("button", { name: "Get updates", exact: true }).click();
  await expect(page.getByText("We couldn’t sign you up. Please try again.", { exact: true })).toBeVisible();
  await expect(email).toHaveAttribute("aria-invalid", "true");
});

test("the main newsletter form treats an existing subscriber as subscribed", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.startsWith("mobile"), "Form behavior is breakpoint-independent and covered once here.");
  await page.route("**/api/newsletter/subscribe", async (route) => {
    await route.fulfill({
      status: 400,
      contentType: "application/json",
      body: JSON.stringify({ message: "Email already subscribed to newsletter" }),
    });
  });
  await page.goto("/");

  const newsletter = page.locator("#newsletter");
  const email = newsletter.getByRole("textbox", { name: "Email address for Battles Budz updates" });
  await email.fill("customer@example.com");
  await newsletter.getByRole("button", { name: "Get updates", exact: true }).click();

  await expect(page.getByText("You're on the list.", { exact: true })).toBeVisible();
  await expect(email).toHaveValue("");
  await expect(newsletter.getByRole("alert")).toHaveCount(0);
});

test("product-update errors are inline, exact, and programmatically associated", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.startsWith("mobile"), "Form semantics are breakpoint-independent and covered once here.");
  await page.route("**/api/product-updates/subscribe", async (route) => {
    await route.fulfill({ status: 500, contentType: "application/json", body: JSON.stringify({ message: "failure" }) });
  });
  await page.goto("/products/freedom-fog-vapes");

  const email = page.getByRole("textbox", { name: "Product updates for Freedom Fog Vapes" });
  await email.fill("not-an-email");
  await page.getByRole("button", { name: "Notify Me", exact: true }).click();

  await expect(page.getByText("Enter a valid email address.", { exact: true })).toBeVisible();
  await expect(email).toHaveAttribute("aria-invalid", "true");
  await expect(email).toHaveAttribute("aria-describedby", "freedom-fog-vapes-email-error");

  await email.fill("customer@example.com");
  await page.getByRole("button", { name: "Notify Me", exact: true }).click();
  await expect(page.getByText("We couldn’t save your request. Please try again.", { exact: true })).toBeVisible();
  await expect(email).toHaveAttribute("aria-invalid", "true");
});

test("the category carousel is a named list of keyboard-focusable links", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.startsWith("mobile"), "List semantics are breakpoint-independent and covered once here.");
  await page.goto("/");

  const categoryList = page.getByRole("list", { name: "Shop Battles Budz categories" });
  await expect(categoryList).toBeVisible();
  const listItems = categoryList.getByRole("listitem");
  expect(await listItems.count()).toBeGreaterThan(1);

  for (let index = 0; index < (await listItems.count()); index += 1) {
    const link = listItems.nth(index).getByRole("link");
    await expect(link).toHaveCount(1);
    expect(await link.getAttribute("href")).toBeTruthy();
  }

  const firstLink = listItems.first().getByRole("link");
  await firstLink.focus();
  await expect(firstLink).toBeFocused();
});

test("the job form focuses the first invalid field and keeps resume controls keyboard-accessible", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.startsWith("mobile"), "Form behavior is breakpoint-independent and covered once here.");
  await page.goto("/our-story");

  await page.getByRole("button", { name: "Apply Now", exact: true }).click();
  const formRegion = page.getByRole("region", { name: "Join Our Team" });
  await expect(formRegion).toBeVisible();
  await expect(formRegion.getByRole("button", { name: "Close application form" })).toBeFocused();

  await formRegion.getByRole("button", { name: "Submit Application", exact: true }).click();
  const firstName = formRegion.getByRole("textbox", { name: /First Name/ });
  await expect(firstName).toBeFocused();
  await expect(firstName).toHaveAttribute("aria-invalid", "true");
  await expect(firstName).toHaveAttribute("aria-describedby", "firstName-error");

  const resumeInput = formRegion.locator('input[type="file"]#resume-upload');
  await resumeInput.focus();
  await expect(resumeInput).toBeFocused();
  await resumeInput.setInputFiles({
    name: "resume.pdf",
    mimeType: "application/pdf",
    buffer: Buffer.from("%PDF-1.4 test resume"),
  });

  const removeResume = formRegion.getByRole("button", { name: "Remove uploaded resume" });
  await expect(removeResume).toBeVisible();
  await removeResume.focus();
  await page.keyboard.press("Enter");
  await expect(formRegion.getByText("Choose File", { exact: true })).toBeVisible();
  await expect(resumeInput).toBeFocused();
});

test("the open job form reflows without hiding controls at 320 CSS pixels", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile"), "Narrow reflow is covered in the mobile project.");
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/our-story");

  await page.getByRole("button", { name: "Apply Now", exact: true }).click();
  const formRegion = page.getByRole("region", { name: "Join Our Team" });
  await expect(formRegion.getByRole("button", { name: "Cancel", exact: true })).toBeVisible();
  await expect(formRegion.getByRole("button", { name: "Submit Application", exact: true })).toBeVisible();

  const widths = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(widths.scrollWidth).toBeLessThanOrEqual(widths.clientWidth + 1);
});
