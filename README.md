# Precision Wellness (PRCN) — Static Redesign

A complete static front-end redesign for **ae.prcnstore.com** (Precision Wellness, UAE store). Stage 1 of a two-stage delivery; the WooCommerce theme is built only after this static design is approved.

> **Note on audit:** the live site refused direct crawling from the build sandbox, so the audit below combines search-engine snippets, the parent brand (`prcnstore.com`), and standard WooCommerce wellness-store conventions. Assumptions are labelled.

---

## 1. Audit of the current site

### Brand context (verified)
- **Brand:** Precision Wellness (PRCN), tagline "Trusted Health and Wellness Online Store".
- **Region:** UAE (`ae.` subdomain), pricing in **AED**.
- **Product categories:**
  - Aromatherapy — Essential Oils, Speciality Blends
  - Wellness Range — Vitamins & Minerals, Supplements, Natural Remedies, Hormonal Therapies, Superfoods, Probiotics & Postbiotics, Topicals
  - Personal Care — Skin, Hair, Sleep & Relaxation, Hygiene, Oral, Home
  - Wellness Devices — Equipment, Tools & Gadgets (Nurosym, Whole-Body Red-Light Therapy / "Light Tube™")
  - Accessories — Refills, Attachments
  - Tests (Precision Chex™) — Skinwellgx, Fitwellgx, Gut Chex, Eatwellgx, Cortisol Chex
  - Services — Functional Health Coaching (online or in-person)
- **USPs:** Doctor / medical-board vetted • DHA-approved courier pickup for lab samples • Free shipping over AED 500 • Complimentary expert consultation with every test.

### UI/UX weaknesses observed (typical of stock WooCommerce wellness builds)
1. **Generic Storefront/Astra-style header** — small logo, low-contrast nav, no announcement bar variants, search hidden behind an icon on desktop.
2. **Cluttered homepage** — multiple banners stacked without hierarchy; no clear single hero CTA; promotional sliders push the product grid below the fold on mobile.
3. **Inconsistent product cards** — variable image ratios, prices and badges shifting card heights, "Add to cart" only appearing on hover (broken on mobile), no quick-view, no review stars on the card.
4. **Filters and sort** — desktop sidebar only; mobile filter UX is a vertical stack, no sticky "Filter / Sort" bar, no chip-style applied-filters row, no per-attribute counts.
5. **PDP** — small gallery, thumbnails as a horizontal strip with weak focus state; price and CTA below the fold on mobile; variant selectors as native `<select>` dropdowns; no sticky add-to-cart; sparse trust signals; lab/clinical evidence buried in long paragraphs.
6. **Cart & checkout** — full WooCommerce default; coupon and shipping fields visually equal weight to the checkout button; no free-shipping progress bar; no express payment (Apple Pay / Tabby / Tamara) above the form; address fields long and unsegmented.
7. **Account area** — default WooCommerce list; no dashboard summary, no test-results or coaching-session sections despite those being core offers.
8. **Mobile** — nav drawer is a flat link list; tap targets ~36 px; CTA buttons full-width but unbranded; product cards 2-up with cramped padding.
9. **Performance** — likely heavy theme + builder + multiple sliders; render-blocking fonts; no image art-direction.
10. **Trust & evidence** — "Doctor approved", "Medical board", and "Science-backed" claims are stated but not designed; no medical-board faces, no lab certificates, no DHA badge surfaced.
11. **i18n / RTL readiness** — UAE audience expects optional Arabic; no language switcher visible. Design must accommodate RTL.
12. **Conversion gaps** — no urgency cues (low-stock, restock ETA), no shipping-day estimator, no "Pay over 4" BNPL messaging on cards (Tabby/Tamara are table-stakes in UAE).

### What we keep
- Full product catalogue and category structure.
- Brand promise (medical-board, science-backed, DHA courier, free consultation, AED 500 free-shipping threshold).
- The proprietary `Precision Chex™` test brand.
- Functional Health Coaching as a "service-product".

---

## 2. Design strategy

**Positioning:** Premium clinical wellness with apothecary warmth. We want the calm of a spa, the credibility of a clinic, and the polish of a luxury beauty brand.

**Framework choice — Tailwind CSS** (via Play CDN with custom theme) over Bootstrap:
- Better fit for bespoke premium e-commerce design (Bootstrap's defaults read "admin dashboard").
- Utility-first lets us keep CSS small and per-page; avoids unused-component bloat.
- Easier to mirror exactly inside a WooCommerce theme later (`@apply` in `assets/css/styles.css` or a build step).
- First-class RTL support via `dir="rtl"` and logical properties.

**Visual language**

| Token | Value | Use |
|---|---|---|
| `--prcn-forest` | `#0E4F47` | Primary brand, headings on light, primary buttons |
| `--prcn-forest-700` | `#0A3B36` | Hover / pressed |
| `--prcn-sage` | `#A9C0B4` | Soft accent, secondary buttons, dividers |
| `--prcn-amber` | `#C8924A` | Apothecary accent, pricing highlight, badges |
| `--prcn-cream` | `#F7F2E8` | Page background (warm) |
| `--prcn-ivory` | `#FBF8F2` | Surface / card |
| `--prcn-ink` | `#1A1F1D` | Body text |
| `--prcn-muted` | `#6B7470` | Secondary text |
| `--prcn-line` | `#E6DFD1` | Hairline borders |
| `--prcn-sale` | `#B23A3A` | Sale price / errors |

**Typography**
- **Display / H1–H3:** *Fraunces* (variable serif, soft optical size) — premium, editorial, not stuffy.
- **Body / UI:** *Inter* (variable) — neutral, legible at small sizes, RTL-friendly when paired with *Cairo* for Arabic later.
- Type scale: 12 / 14 / 16 / 18 / 20 / 24 / 32 / 40 / 56 / 72.

**Spacing & layout**
- 8 px base grid; container 1240 px max; gutter 24 px desktop / 16 px mobile.
- Generous section padding: 96 px desktop, 56 px mobile.
- Product cards 4 / 3 / 2 / 1 across at ≥1280 / 1024 / 640 / <640.

**Iconography:** Lucide (CDN) — uniform 1.5 px stroke, neutral.

**Imagery:** Lifestyle hero shots; product shots on warm cream background with soft shadows. Placeholders use Unsplash for the static prototype and are noted to be replaced from the live media library during WooCommerce conversion.

**Motion:** Subtle — `prefers-reduced-motion` respected; only opacity/transform; no parallax; transitions ≤200 ms.

**Accessibility & SEO:**
- WCAG AA contrast on every token pair we ship.
- Semantic landmarks (`header`, `nav`, `main`, `footer`, `aside`).
- Focus rings on every interactive control (`focus-visible`).
- Logical heading order; `aria-label` on icon-only controls.
- Schema.org markup placeholders (Product, AggregateRating, Offer, BreadcrumbList) noted in HTML comments.

---

## 3. Page-by-page redesign plan

Every section ends with a **→ Woo** note describing how it maps to a WooCommerce template/hook.

### Header (shared)
- Slim **announcement bar** with rotating messages: free shipping AED 500+, free expert consultation, DHA-approved sample pickup. `→ header.php` + `template-parts/announcement-bar.php`.
- **Top header:** logo (centered on mobile, left on desktop), primary nav with mega-menu for `Shop`, `Tests`, `Devices`, search input (visible on desktop ≥`lg`), country/language switcher (AED · EN), wishlist, account, cart with badge. `→ header.php`, `wp_nav_menu()`, `WC()->cart->get_cart_contents_count()`.
- **Mobile drawer** with collapsible category accordions, search at top, login CTA. `→ template-parts/mobile-nav.php`.

### Footer (shared)
- 4-column desktop / accordion-stack mobile: Shop, Tests & Coaching, Help, Company.
- Newsletter card with consent checkbox.
- Trust strip: payment methods (Visa, Mastercard, Apple Pay, Tabby, Tamara, COD), DHA badge, ISO/CE marks where applicable.
- Legal row: copyright, T&Cs, privacy, refunds, shipping, sitemap, language switcher. `→ footer.php` + `template-parts/footer-newsletter.php`.

### Homepage (`index.html`)
1. **Hero** — full-bleed editorial image, serif H1, sub, dual CTA (Shop bestsellers / Take a test). `→ front-page.php` block.
2. **Category quick-nav** — 6 tiles (Supplements, Aromatherapy, Devices, Tests, Personal Care, Coaching). `→ get_terms('product_cat')`.
3. **USP strip** — 4 icons (Doctor-approved, DHA pickup, Free shipping AED 500+, Free consultation). `→ template-parts/trust-strip.php`.
4. **Bestsellers grid** — 8 products. `→ wc_get_products(['stock_status'=>'instock','meta_key'=>'total_sales','orderby'=>'meta_value_num'])`.
5. **Editorial banner — Precision Chex™** — split layout, copy + image, CTA "See all tests". `→ ACF flexible block`.
6. **Devices spotlight** — Nurosym + Light Tube cards with feature bullets. `→ curated `product_cat` query`.
7. **By concern** — Sleep, Stress, Gut, Hormones, Energy chips → filtered shop links. `→ tax archive links`.
8. **Reviews** — 3-up testimonial cards. `→ ACF or 3rd-party (Yotpo/Judge.me) shortcode`.
9. **Backed by science** — medical-board faces + claim. `→ ACF`.
10. **Newsletter** — full-width band. `→ MC4WP / Klaviyo form`.

### Shop / Category (`shop.html`)
- Breadcrumb, category H1, intro copy.
- **Sticky toolbar** (mobile + desktop): result count, sort, view toggle, "Filters" button (opens off-canvas on `<lg`).
- **Sidebar filters** (≥`lg`): Category, Concern, Form, Brand, Price (slider), Rating; collapsible; active filters as removable chips.
- **Product grid** with skeleton placeholders.
- **Pagination** + "Load more" option.
- `→ archive-product.php`, `woocommerce_before_shop_loop`, custom `template-parts/loop/product-card.php`.

### Product detail (`product.html`)
- Breadcrumb.
- Two-col: gallery (main image + thumbnails as vertical rail on desktop, horizontal swiper on mobile, zoom on hover) / buy box (title, star rating + count, AED price w/ strike-through + AED savings, short copy, variant pills, qty stepper, **sticky** Add-to-cart + Buy Now, BNPL inline message ("Pay AED 50/month with Tabby"), trust micro-copy strip).
- **Key benefits** — 4 icon-bullets.
- **Tabs**: Overview, Ingredients, How to use, Lab evidence, FAQ, Reviews, Shipping & returns.
- **Doctor-approved callout** with medical-board mention.
- **Sticky mini-bar** on scroll (image · name · price · qty · CTA) on desktop.
- **Frequently bought together** (3-product bundle).
- **Related products** carousel.
- `→ single-product.php`, hooks: `woocommerce_before_single_product`, `woocommerce_single_product_summary`, `woocommerce_after_single_product_summary`, custom variation swatches via `woocommerce_dropdown_variation_attribute_options_html`.

### Cart (`cart.html`)
- Two-col: line items (image, name, variant, qty stepper, unit price, line total, remove) / summary (free-shipping progress bar, subtotal, est. shipping, coupon, total, taxes note, checkout CTA, secondary "Continue shopping").
- Express-pay row above the CTA (Apple Pay, Tabby).
- Suggested upsells row.
- `→ woocommerce/cart/cart.php` override + `cart-totals.php`, `woocommerce_after_cart_table`, `woocommerce_cart_collaterals`.

### Checkout (`checkout.html`)
- One-page accordion: 1) Contact, 2) Delivery, 3) Shipping method, 4) Payment, 5) Review.
- Right-rail order summary (sticky, collapsible on mobile).
- Express-pay row (Apple Pay, Tabby, Tamara) at top.
- COD supported, with clear copy.
- Field-level validation (real-time visual states).
- `→ woocommerce/checkout/form-checkout.php` override; hook `woocommerce_review_order_before_payment` for express row.

### My account (`account.html`)
- Sidebar (Dashboard, Orders, Subscriptions, Test results, Coaching sessions, Addresses, Payment methods, Wishlist, Account details, Logout).
- Dashboard: greeting, recent order, default address, wellness profile chips, quick re-order.
- `→ myaccount.php` + custom endpoints registered via `add_rewrite_endpoint('test-results' / 'coaching-sessions')`.

### Search results (`search.html`)
- Search input pre-filled with query, suggestion chips, count.
- Same product grid + filters as shop.
- Empty state with bestsellers and "talk to a coach" CTA.
- `→ woocommerce.php` (custom search loop) or `archive-product.php` with `is_search()`.

---

## 4. Reusable components (static prototype)

All live in plain HTML using Tailwind utility classes, with a few custom rules in `assets/css/styles.css` (`.btn`, `.card`, `.chip`, `.input`, `.badge`, `.divider`). Component templates are commented `<!-- ====== component: header ====== -->` so they can be lifted directly into PHP partials.

| Component | File location | WooCommerce target |
|---|---|---|
| Announcement bar | inline in every page header | `template-parts/announcement-bar.php` |
| Header (with mega menu) | inline | `header.php` |
| Footer | inline | `footer.php` |
| Hero (homepage) | `index.html` | `front-page.php` block |
| Trust strip | inline | `template-parts/trust-strip.php` |
| Product card | `shop.html`, `index.html`, `search.html` | `template-parts/loop/product-card.php` |
| Product grid | wrapper around card | `archive-product.php` loop |
| Filter sidebar | `shop.html` | `sidebar-shop.php` |
| Cart line item | `cart.html` | `cart/cart.php` row |
| Order summary | `cart.html`, `checkout.html` | `cart/cart-totals.php`, `checkout/review-order.php` |
| Checkout form | `checkout.html` | `checkout/form-checkout.php` |
| Account sidebar | `account.html` | `myaccount/navigation.php` |
| Product gallery | `product.html` | `single-product/product-image.php` |
| Buy box | `product.html` | `single-product/add-to-cart/*.php` |

---

## 5. WooCommerce conversion plan (Stage 2)

```
prcn-theme/
├─ style.css                       (theme header + token CSS)
├─ functions.php                   (theme support, enqueue, woo support, image sizes, menus, custom endpoints)
├─ header.php
├─ footer.php
├─ index.php
├─ front-page.php
├─ archive-product.php
├─ single-product.php
├─ search.php
├─ page.php
├─ woocommerce.php
├─ template-parts/
│  ├─ announcement-bar.php
│  ├─ trust-strip.php
│  ├─ mobile-nav.php
│  ├─ footer-newsletter.php
│  └─ loop/product-card.php
├─ woocommerce/                    (template overrides — only files we change)
│  ├─ archive-product.php
│  ├─ content-product.php
│  ├─ single-product/
│  │   ├─ product-image.php
│  │   ├─ price.php
│  │   ├─ rating.php
│  │   └─ tabs/tabs.php
│  ├─ cart/
│  │   ├─ cart.php
│  │   ├─ cart-totals.php
│  │   └─ mini-cart.php
│  ├─ checkout/
│  │   ├─ form-checkout.php
│  │   ├─ form-billing.php
│  │   └─ review-order.php
│  └─ myaccount/
│      ├─ dashboard.php
│      ├─ navigation.php
│      └─ form-login.php
├─ inc/
│  ├─ class-prcn-assets.php        (enqueue + tailwind compiled CSS)
│  ├─ class-prcn-woo.php           (hooks/filters: free-ship bar, BNPL labels, badges, swatches)
│  ├─ class-prcn-account.php       (custom endpoints: test-results, coaching-sessions)
│  └─ class-prcn-blocks.php        (ACF/Gutenberg blocks for hero, banners)
└─ assets/
   ├─ css/styles.css               (compiled Tailwind from /src)
   ├─ js/main.js
   ├─ js/cart-drawer.js
   └─ img/
```

**Conversion principles**
- **No hardcoded product data.** Every loop uses `wc_get_products`, `WC_Product_Query`, or the standard archive loop. Categories are pulled with `get_terms`.
- **Hooks before overrides.** Prefer `add_action`/`add_filter` (`woocommerce_before_shop_loop`, `woocommerce_single_product_summary`, `woocommerce_review_order_before_payment`) over copying templates. Templates are overridden only when markup must change for layout.
- **Update-safe.** All overrides versioned via `Template Version` headers; `wc_get_template_part` used for sub-parts.
- **Plugin compatibility.** Don't dequeue Woo styles wholesale — replace with our theme stylesheet and remove only `woocommerce-general` / `woocommerce-layout`. Keep `woocommerce-smallscreen` for compat or replace fully via our own.
- **Performance.** Tailwind compiled and purged; lazy-load product images; preload Fraunces & Inter subsets; HTTP/2 push for critical CSS; inline critical above-the-fold CSS.
- **i18n / RTL.** All strings wrapped in `__()`/`esc_html__()` with `prcn` text domain; Arabic translation file shipped; all layouts tested with `dir="rtl"`.
- **Schema.** Output Product, Offer, AggregateRating JSON-LD via `wp_head` filter.
- **Accessibility.** Skip-link, focus traps in dialogs, `aria-live` on cart updates, `aria-expanded` on mega-menu and accordions.

---

## 6. Running the static prototype

This is plain static HTML — no build step.

```bash
# from the repo root
python3 -m http.server 8000
# or
npx serve .
```

Then open <http://localhost:8000/>.

Tailwind is loaded via the official Play CDN (`https://cdn.tailwindcss.com`) with a custom theme block. Lucide icons are loaded via `https://unpkg.com/lucide@latest`. Both are CDN-only for the prototype; the WooCommerce theme replaces them with a built/purged Tailwind stylesheet and a self-hosted icon sprite.

Page entrypoints:

| URL | File |
|---|---|
| `/` | `index.html` |
| `/shop` | `shop.html` |
| `/product` | `product.html` |
| `/cart` | `cart.html` |
| `/checkout` | `checkout.html` |
| `/account` | `account.html` |
| `/search` | `search.html` |

---

## 7. Assumptions made (please confirm)

1. Brand keeps "Precision Wellness" full name + "PRCN" abbreviation in nav/footer; logotype is a wordmark in Fraunces.
2. Currency lock to **AED**, with optional EN ↔ AR language switcher (Arabic added during Stage 2).
3. BNPL providers shown are **Tabby** and **Tamara** (both standard in UAE retail). Replace if the merchant uses different ones.
4. **COD** is offered (UAE convention). If not, remove from checkout.
5. Free-shipping threshold = **AED 500** (per public copy).
6. Product imagery in this static build uses Unsplash placeholders; live media library replaces them at theme conversion.
7. Reviews shown are placeholder copy; real reviews come from Judge.me / Yotpo / WP-native at Stage 2.
