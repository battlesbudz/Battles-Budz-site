import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { injectRouteMetadata } from "../server/seo";

const template = `<!doctype html><html><head>
  <title>Generic title</title>
  <meta name="description" content="Generic description">
  <meta property="og:title" content="Generic title">
  <meta property="og:description" content="Generic description">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="Generic title">
  <meta name="twitter:description" content="Generic description">
</head><body></body></html>`;

describe("route metadata injection", () => {
  it("renders battery metadata and Product JSON-LD in the raw document", () => {
    const page = injectRouteMetadata(template, "/battery?utm_source=test");

    assert.match(page, /<title>Dual-Cart Battery \| Battles Budz<\/title>/);
    assert.match(page, /<meta property="og:type" content="product">/);
    assert.match(page, /battles-budz-dual-cart-battery-open\.jpg/);
    assert.match(page, /<link rel="canonical" href="https:\/\/battlesbudz\.com\/battery">/);
    assert.match(page, /data-seo-head="true">.*"@type":"Product"/);
  });

  it("renders apparel metadata without adding product structured data", () => {
    const page = injectRouteMetadata(template, "/shop");

    assert.match(page, /<title>Veteran-Owned Apparel \| Battles Budz<\/title>/);
    assert.match(page, /battles-budz-full-chest-tee\.jpg/);
    assert.doesNotMatch(page, /data-seo-head="true"/);
  });

  it("renders unique metadata for indexed product update routes", () => {
    const page = injectRouteMetadata(template, "/products/freedom-fog-vapes");

    assert.match(page, /<title>Freedom Fog Vapes \| Battles Budz<\/title>/);
    assert.match(page, /Be first to know when Freedom Fog Vapes drop\./);
    assert.match(page, /https:\/\/battlesbudz\.com\/products\/freedom-fog-vapes/);
  });

  it("leaves routes without server metadata unchanged", () => {
    assert.equal(injectRouteMetadata(template, "/privacy-policy"), template);
  });
});
