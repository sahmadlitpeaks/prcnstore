// Precision Wellness — shared front-end interactions for the static prototype.
// In Stage 2 these handlers are wrapped in jQuery-free, WP-enqueued modules.

(function () {
  'use strict';

  // ---------- helpers ----------
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ---------- icons ----------
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

  // ---------- mobile nav drawer ----------
  const root = document.documentElement;
  const openMenu  = () => root.setAttribute('data-drawer-open', 'true');
  const closeMenu = () => root.setAttribute('data-drawer-open', 'false');
  $$('[data-action="open-menu"]').forEach(b => b.addEventListener('click', openMenu));
  $$('[data-action="close-menu"]').forEach(b => b.addEventListener('click', closeMenu));

  // ---------- cart drawer ----------
  const openCart  = () => root.setAttribute('data-cart-open', 'true');
  const closeCart = () => root.setAttribute('data-cart-open', 'false');
  $$('[data-action="open-cart"]').forEach(b => b.addEventListener('click', openCart));
  $$('[data-action="close-cart"]').forEach(b => b.addEventListener('click', closeCart));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeMenu(); closeCart(); }
  });

  // ---------- qty steppers ----------
  $$('.qty').forEach(group => {
    const input = group.querySelector('input');
    const dec = group.querySelector('[data-qty="dec"]');
    const inc = group.querySelector('[data-qty="inc"]');
    const min = parseInt(input?.min || '1', 10);
    const max = parseInt(input?.max || '99', 10);
    if (!input) return;
    dec?.addEventListener('click', () => {
      input.value = Math.max(min, (parseInt(input.value, 10) || min) - 1);
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
    inc?.addEventListener('click', () => {
      input.value = Math.min(max, (parseInt(input.value, 10) || min) + 1);
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  });

  // ---------- variant pill groups ----------
  $$('[data-variant-group]').forEach(group => {
    const pills = $$('.variant-pill', group);
    pills.forEach(p => p.addEventListener('click', () => {
      pills.forEach(o => o.setAttribute('aria-pressed', 'false'));
      p.setAttribute('aria-pressed', 'true');
    }));
  });

  // ---------- PDP gallery ----------
  const gallery = $('[data-gallery]');
  if (gallery) {
    const main = $('[data-gallery-main]', gallery);
    const thumbs = $$('[data-gallery-thumb]', gallery);
    thumbs.forEach((t) => {
      t.addEventListener('click', () => {
        thumbs.forEach(o => o.setAttribute('aria-current', 'false'));
        t.setAttribute('aria-current', 'true');
        const src = t.dataset.src || t.querySelector('img')?.src;
        if (src && main) main.src = src;
      });
    });
  }

  // ---------- PDP tabs ----------
  $$('[data-tabs]').forEach(group => {
    const tabs = $$('[role="tab"]', group);
    const panels = $$('[role="tabpanel"]', group);
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => {
        tabs.forEach(o => o.setAttribute('aria-selected', 'false'));
        panels.forEach(p => p.hidden = true);
        t.setAttribute('aria-selected', 'true');
        if (panels[i]) panels[i].hidden = false;
      });
    });
  });

  // ---------- announcement bar rotator ----------
  const ann = $('[data-announce]');
  if (ann) {
    const items = $$('[data-announce-item]', ann);
    let i = 0;
    if (items.length > 1) {
      setInterval(() => {
        items[i].classList.add('hidden');
        i = (i + 1) % items.length;
        items[i].classList.remove('hidden');
      }, 4500);
    }
  }

  // ---------- search overlay ----------
  $$('[data-action="open-search"]').forEach(b =>
    b.addEventListener('click', () => {
      const o = $('#search-overlay');
      if (o) { o.hidden = false; setTimeout(() => $('input', o)?.focus(), 0); }
    })
  );
  $$('[data-action="close-search"]').forEach(b =>
    b.addEventListener('click', () => { const o = $('#search-overlay'); if (o) o.hidden = true; })
  );

  // ---------- filters drawer (mobile shop) ----------
  $$('[data-action="open-filters"]').forEach(b =>
    b.addEventListener('click', () => root.setAttribute('data-filters-open', 'true'))
  );
  $$('[data-action="close-filters"]').forEach(b =>
    b.addEventListener('click', () => root.setAttribute('data-filters-open', 'false'))
  );

  // ---------- free-shipping progress (cart) ----------
  const fsBar = $('[data-free-shipping]');
  if (fsBar) {
    const subtotal = parseFloat(fsBar.dataset.subtotal || '0');
    const threshold = parseFloat(fsBar.dataset.threshold || '500');
    const pct = Math.min(100, Math.round((subtotal / threshold) * 100));
    const fill = $('span', fsBar);
    if (fill) fill.style.width = pct + '%';
    const remaining = Math.max(0, threshold - subtotal);
    const note = $('[data-free-shipping-note]');
    if (note) {
      note.textContent = remaining <= 0
        ? "Congrats — you've unlocked free shipping."
        : `You're AED ${remaining.toFixed(0)} away from free shipping.`;
    }
  }

  // ---------- account page tabs (mobile select) ----------
  const acctSelect = $('[data-account-select]');
  if (acctSelect) {
    acctSelect.addEventListener('change', (e) => {
      const v = e.target.value;
      $$('[data-account-panel]').forEach(p => p.hidden = (p.dataset.accountPanel !== v));
    });
  }
})();
