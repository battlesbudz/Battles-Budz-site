# Battles Budz Shopify Storefront Readiness

Last verified: July 14, 2026

## Public storefront

- Storefront domain: `https://shop.battlesbudz.com/`
- Temporary setup URL is not used in the main-site customer links.
- Main site product links point to `shop.battlesbudz.com` product URLs.

## Products verified through public Shopify product JSON

### Battles Budz USA T-Shirt

- URL: `https://shop.battlesbudz.com/products/battles-budz-usa-t-shirt`
- Price: `$25`
- Public variants: `S`, `M`, `L`, `XL`
- Status: available
- Imagery: supplied black/yellow full-chest tee image
- Public description includes: ships within two business days, U.S. shipping is `$8.99`, free shipping on orders `$50+`

### Battles Budz Heavy Blend Hoodie

- URL: `https://shop.battlesbudz.com/products/battles-budz-heavy-blend-hoodie`
- Price: `$60`
- Public variants: `S`, `M`, `L`, `XL`, `2XL`, `3XL`, `4XL`, `5XL`
- Status: available
- Public description includes: made to order, free U.S. shipping, unisex fit, hoodie material details
- Public product data includes Printful-style SKUs and mockup images

### Battles Budz Crest Long Sleeve

- URL: `https://shop.battlesbudz.com/products/battles-budz-crest-long-sleeve`
- Price: `$35`
- Public variants: `S`, `M`, `L`, `XL`, `2XL`, `3XL`, `4XL`
- Status: available

### Men's Tank Top

- URL: `https://shop.battlesbudz.com/products/mens-tank-top`
- Price: `$25`
- Public variants: `XS`, `S`, `M`, `L`, `XL`, `2XL`
- Status: available

## Policy pages verified publicly

- Refund policy: `https://shop.battlesbudz.com/policies/refund-policy`
- Shipping policy: `https://shop.battlesbudz.com/policies/shipping-policy`
- Privacy policy: `https://shop.battlesbudz.com/policies/privacy-policy`

The main site also publishes a local customer-facing policy page at `/shipping-returns` with the agreed terms:

- U.S. shipping only for now
- `$8.99` shipping below `$50`
- free shipping at `$50+`
- self-fulfilled items intended to ship within two business days
- 30-day refunds with customer-paid return postage
- 30-day apparel size exchanges, including worn items
- Battles Budz pays exchange return postage; customer pays `$9` replacement shipping
- defective battery replacements after photo or video evidence
- support contact: `battlesbudz@gmail.com`

## Sunglasses status

Sunglasses are represented on the main site as a coming-soon preview only. There is no purchase control for sunglasses.

## Owner sample-order workflow

Use this checklist before promoting a new print-on-demand apparel product heavily:

1. In Shopify admin, confirm the product is connected to the intended print-on-demand provider.
2. Confirm product variants, mockups, price, shipping treatment, and production timing in the product listing.
3. Place one low-risk sample order for the product and size the owner actually wants to inspect.
4. Confirm the order appears in Shopify and syncs to the POD provider.
5. Confirm the customer email, fulfillment email, tracking, print placement, garment quality, and packaging.
6. If the sample is wrong, update artwork/mockups/product copy before promotion.
7. If the sample is approved, keep the public product live and use the approved product page in main-site CTAs.

## Remaining manual checkout test

Do not place a real customer order without owner approval at action time. The remaining end-to-end checkout test should validate:

- T-shirt size selection and cart quantity
- `$8.99` shipping below `$50`
- free shipping at `$50+`
- accepted apparel payment method
- transactional email delivery
- refund/shipping policy links in the checkout flow
- no public operational/return address presented as a retail Buffalo address
