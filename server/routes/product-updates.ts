import type { Express } from "express";
import { db } from "../db";
import { productUpdateSubscribers } from "@shared/schema";
import { productUpdateProducts, productUpdateSlugs } from "@shared/product-updates";
import { z } from "zod";

const productUpdateSubscriberSchema = z.object({
  email: z.string().email(),
  productSlug: z.enum(productUpdateSlugs),
});

export function registerProductUpdateRoutes(app: Express) {
  app.post("/api/product-updates/subscribe", async (req, res) => {
    try {
      const validatedData = productUpdateSubscriberSchema.parse(req.body);
      const productName = productUpdateProducts[validatedData.productSlug].name;

      await db
        .insert(productUpdateSubscribers)
        .values({
          email: validatedData.email,
          productSlug: validatedData.productSlug,
          productName,
        })
        .onConflictDoNothing({
          target: [productUpdateSubscribers.email, productUpdateSubscribers.productSlug],
        });

      res.status(201).json({
        subscriber: {
          email: validatedData.email,
          productSlug: validatedData.productSlug,
          productName,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Please try again.",
        });
      }

      console.error("Product update subscription error:", error);
      res.status(500).json({
        message: "Please try again.",
      });
    }
  });
}
