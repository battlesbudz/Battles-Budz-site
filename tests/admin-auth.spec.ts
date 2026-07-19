import { expect, test, type Page } from "@playwright/test";

const adminUser = {
  id: "admin-test",
  email: "battlesbudz@gmail.com",
  role: "admin",
  firstName: null,
  lastName: null,
  profileImageUrl: null,
  createdAt: "2026-07-19T12:00:00.000Z",
  updatedAt: "2026-07-19T12:00:00.000Z",
};

async function mockLoggedOut(page: Page, setupRequired: boolean) {
  await page.route("**/api/auth/user", (route) =>
    route.fulfill({ status: 401, contentType: "application/json", body: JSON.stringify({ message: "Unauthorized" }) }),
  );
  await page.route("**/api/admin/auth/status", (route) =>
    route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({ adminEmail: "battlesbudz@gmail.com", setupRequired, setupAvailable: true }),
    }),
  );
}

test("first-time admin setup is single-account and does not show public signup", async ({ page }) => {
  await mockLoggedOut(page, true);
  await page.goto("/admin/login");

  await expect(page).toHaveTitle("Admin Login | Battles Budz");
  await expect(page.getByRole("heading", { name: "Set up admin access" })).toBeVisible();
  await expect(page.getByLabel("Admin email")).toHaveValue("battlesbudz@gmail.com");
  await expect(page.getByLabel("One-time setup token")).toBeVisible();
  await expect(page.getByLabel("New password", { exact: true })).toBeVisible();
  await expect(page.getByLabel("Confirm new password")).toBeVisible();
  await expect(page.getByRole("button", { name: "Create admin account" })).toBeVisible();
  await expect(page.getByText("Sign Up", { exact: true })).toHaveCount(0);
  await expect(page.locator("main#main-content")).toHaveCount(1);
});

test("existing admin can switch between sign-in and recovery", async ({ page }) => {
  await mockLoggedOut(page, false);
  await page.goto("/admin/login");

  await expect(page.getByRole("heading", { name: "Admin sign in" })).toBeVisible();
  await expect(page.getByLabel("Admin email")).toHaveValue("battlesbudz@gmail.com");
  await expect(page.getByLabel("Password", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Use recovery token" }).click();
  await expect(page.getByRole("heading", { name: "Recover admin access" })).toBeVisible();
  await expect(page.getByLabel("Recovery token")).toBeVisible();
  await expect(page.getByRole("button", { name: "Reset password" })).toBeVisible();
});

test("authenticated administrator can open the restored dashboard", async ({ page }) => {
  await page.route("**/api/auth/user", (route) =>
    route.fulfill({ contentType: "application/json", body: JSON.stringify(adminUser) }),
  );
  for (const path of [
    "**/api/newsletter/subscribers",
    "**/api/contact/submissions",
    "**/api/event/bookings",
    "**/api/job/applications",
  ]) {
    await page.route(path, (route) => route.fulfill({ contentType: "application/json", body: "[]" }));
  }
  await page.route("**/api/admin/cta-analytics", (route) =>
    route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({
        summary: { totalClicks: 9, instagramClicks: 6, wholesaleClicks: 3, last7Days: 4 },
        byPlacement: [{ eventType: "instagram_order", placement: "hero", clicks: 6 }],
        recentEvents: [],
      }),
    }),
  );

  await page.goto("/admin");

  await expect(page.getByRole("heading", { name: /Battles Budz Admin Portal/i })).toBeVisible();
  await expect(page.getByText("Signed in as battlesbudz@gmail.com")).toBeVisible();
  await expect(page.getByRole("button", { name: "Newsletter Subscribers" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Account" })).toBeVisible();
  await page.getByRole("button", { name: "CTA Analytics" }).click();
  await expect(page.getByRole("heading", { name: "Battery CTA Analytics" })).toBeVisible();
  await expect(page.getByText("Instagram orders")).toBeVisible();
  await expect(page.getByText("6", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible();
  await expect(page.locator("main#main-content")).toHaveCount(1);
});
