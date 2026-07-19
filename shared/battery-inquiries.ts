import { z } from "zod";

const optionalShortText = (max: number) => z.string().trim().max(max).optional();

const attributionSchema = z
  .object({
    utmSource: optionalShortText(100),
    utmMedium: optionalShortText(100),
    utmCampaign: optionalShortText(100),
    utmContent: optionalShortText(100),
    referrer: optionalShortText(300),
  })
  .strict();

const commonInquiryFields = {
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().toLowerCase().email().max(254),
  phone: optionalShortText(40),
  location: z.string().trim().min(2).max(120),
  quantity: z.number().int().min(1).max(10_000),
  notes: optionalShortText(1_000),
  idempotencyKey: z.string().regex(/^[A-Za-z0-9_-]{16,64}$/),
  website: z.string().max(0).optional(),
  source: attributionSchema.optional(),
} as const;

const consumerBatteryInquirySchema = z
  .object({
    ...commonInquiryFields,
    inquiryType: z.literal("consumer"),
  })
  .strict();

const wholesaleBatteryInquirySchema = z
  .object({
    ...commonInquiryFields,
    inquiryType: z.literal("wholesale"),
    businessName: z.string().trim().min(2).max(160),
  })
  .strict();

export const batteryInquiryInputSchema = z.discriminatedUnion("inquiryType", [
  consumerBatteryInquirySchema,
  wholesaleBatteryInquirySchema,
]);

export type BatteryInquiryInput = z.infer<typeof batteryInquiryInputSchema>;
