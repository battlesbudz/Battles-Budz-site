import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { batteryInquiryInputSchema } from "../shared/battery-inquiries";

const consumerInput = {
  inquiryType: "consumer" as const,
  name: "Test Customer",
  email: " CUSTOMER@EXAMPLE.COM ",
  location: "Buffalo, NY 14201",
  quantity: 2,
  idempotencyKey: "abcdefghijklmnop",
  website: "",
};

describe("battery inquiry input contract", () => {
  it("normalizes a valid consumer inquiry", () => {
    const result = batteryInquiryInputSchema.parse(consumerInput);

    assert.equal(result.email, "customer@example.com");
    assert.equal(result.quantity, 2);
    assert.equal(result.inquiryType, "consumer");
  });

  it("requires business context for wholesale inquiries", () => {
    const missingBusiness = batteryInquiryInputSchema.safeParse({
      ...consumerInput,
      inquiryType: "wholesale",
    });
    const validWholesale = batteryInquiryInputSchema.safeParse({
      ...consumerInput,
      inquiryType: "wholesale",
      businessName: "Example Retail LLC",
      quantity: 24,
    });

    assert.equal(missingBusiness.success, false);
    assert.equal(validWholesale.success, true);
  });

  it("rejects client-owned commerce fields and honeypot submissions", () => {
    assert.equal(batteryInquiryInputSchema.safeParse({ ...consumerInput, price: 60 }).success, false);
    assert.equal(batteryInquiryInputSchema.safeParse({ ...consumerInput, status: "won" }).success, false);
    assert.equal(batteryInquiryInputSchema.safeParse({ ...consumerInput, website: "spam.example" }).success, false);
  });

  it("enforces quantity and text limits", () => {
    assert.equal(batteryInquiryInputSchema.safeParse({ ...consumerInput, quantity: 0 }).success, false);
    assert.equal(batteryInquiryInputSchema.safeParse({ ...consumerInput, quantity: 10_001 }).success, false);
    assert.equal(batteryInquiryInputSchema.safeParse({ ...consumerInput, notes: "x".repeat(1_001) }).success, false);
  });
});
