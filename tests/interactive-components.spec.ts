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

test("the personal battery inquiry validates, attributes, and submits a structured lead", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.startsWith("mobile"), "Form behavior is breakpoint-independent and covered once here.");
  let requestBody: Record<string, unknown> | undefined;
  let requestMethod: string | undefined;
  let requestCount = 0;

  await page.route("**/api/battery-inquiries", async (route) => {
    requestCount += 1;
    requestMethod = route.request().method();
    requestBody = route.request().postDataJSON();
    await route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({ id: 17, message: "Battery inquiry received." }),
    });
  });
  await page.goto("/?utm_source=instagram&utm_medium=organic&utm_campaign=battery_launch&utm_content=profile");
  await page.getByRole("link", { name: "Dual-Cart Battery", exact: true }).first().click();
  await expect(page).toHaveURL(/\/battery$/);

  const form = page.locator('[data-battery-inquiry="personal"]');
  await form.getByRole("button", { name: "Request availability", exact: true }).click();

  const name = form.getByRole("textbox", { name: "Name", exact: true });
  await expect(name).toBeFocused();
  await expect(name).toHaveAttribute("aria-invalid", "true");
  await expect(name).toHaveAttribute("aria-describedby", "battery-order-request-name-error");

  await name.fill("Jordan Customer");
  await form.getByRole("textbox", { name: "Email", exact: true }).fill("Jordan@Example.com");
  await form.getByRole("textbox", { name: "Phone" }).fill("716-555-0100");
  await form.getByRole("textbox", { name: "City and state or ZIP code" }).fill("Buffalo, NY 14201");
  await form.getByRole("spinbutton", { name: "Quantity", exact: true }).fill("2");
  await form.getByRole("textbox", { name: "Cartridge details or questions" }).fill("Please confirm fit before purchase.");
  await form.getByRole("button", { name: "Request availability", exact: true }).click();

  const successHeading = form.getByRole("heading", { name: "Request received." });
  await expect(successHeading).toBeVisible();
  await expect(successHeading).toBeFocused();
  await expect(form).toContainText("No order was placed, no payment was collected, and inventory is not reserved.");
  expect(requestMethod).toBe("POST");
  expect(requestCount).toBe(1);
  expect(requestBody).toEqual(expect.objectContaining({
    inquiryType: "consumer",
    name: "Jordan Customer",
    email: "Jordan@Example.com",
    phone: "716-555-0100",
    location: "Buffalo, NY 14201",
    quantity: 2,
    notes: "Please confirm fit before purchase.",
    website: "",
    source: expect.objectContaining({
      utmSource: "instagram",
      utmMedium: "organic",
      utmCampaign: "battery_launch",
      utmContent: "profile",
    }),
  }));
  expect(requestBody).not.toHaveProperty("businessName");
  expect(requestBody).not.toHaveProperty("price");
  expect(requestBody).not.toHaveProperty("status");
  expect(requestBody?.idempotencyKey).toMatch(/^[A-Za-z0-9_-]{16,64}$/);

  await form.getByRole("button", { name: "Send another request" }).click();
  await expect(form.getByRole("textbox", { name: "Name", exact: true })).toBeFocused();
});

test("the wholesale battery inquiry requires business context and preserves data on failure", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.startsWith("mobile"), "Form behavior is breakpoint-independent and covered once here.");
  let responseStatus = 500;
  const requestBodies: Record<string, unknown>[] = [];

  await page.route("**/api/battery-inquiries", async (route) => {
    requestBodies.push(route.request().postDataJSON());
    await route.fulfill({
      status: responseStatus,
      contentType: "application/json",
      body: JSON.stringify({ message: responseStatus === 201 ? "Battery inquiry received." : "failure" }),
    });
  });
  await page.goto("/battery");

  const form = page.locator('[data-battery-inquiry="wholesale"]');
  await form.getByRole("textbox", { name: "Name", exact: true }).fill("Casey Buyer");
  await form.getByRole("textbox", { name: "Email", exact: true }).fill("buyer@example.com");
  await form.getByRole("textbox", { name: "City and state or ZIP code" }).fill("Rochester, NY");
  await form.getByRole("spinbutton", { name: "Estimated opening quantity" }).fill("24");
  await form.getByRole("button", { name: "Send wholesale request", exact: true }).click();

  const businessName = form.getByRole("textbox", { name: "Business name", exact: true });
  await expect(businessName).toBeFocused();
  await expect(businessName).toHaveAttribute("aria-invalid", "true");
  expect(requestBodies).toHaveLength(0);

  await businessName.fill("Example Retail LLC");
  await form.getByRole("textbox", { name: "Store count, timing, or questions" }).fill("One licensed location; fall reset.");
  await form.getByRole("button", { name: "Send wholesale request", exact: true }).click();
  await expect(form.getByText("We couldn’t save your request. Please try again or email battlesbudz@gmail.com.")).toBeVisible();
  await expect(businessName).toHaveValue("Example Retail LLC");

  responseStatus = 201;
  await form.getByRole("button", { name: "Send wholesale request", exact: true }).click();
  await expect(form.getByRole("heading", { name: "Request received." })).toBeVisible();
  expect(requestBodies).toHaveLength(2);
  expect(requestBodies[1]).toEqual(expect.objectContaining({
    inquiryType: "wholesale",
    businessName: "Example Retail LLC",
    email: "buyer@example.com",
    location: "Rochester, NY",
    quantity: 24,
  }));
  expect(requestBodies[1].idempotencyKey).toBe(requestBodies[0].idempotencyKey);
});

test("battery inquiry forms reflow at 320 CSS pixels", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile"), "Narrow reflow is covered in the mobile project.");
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/battery");

  const form = page.locator('[data-battery-inquiry="personal"]');
  await form.scrollIntoViewIfNeeded();
  await expect(form.getByRole("button", { name: "Request availability", exact: true })).toBeVisible();

  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
});
