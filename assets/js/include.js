// Tiny include loader for the static prototype.
// Replaces every <div data-include="path"></div> with the fetched HTML, then
// re-runs lucide icons + main.js initialisation.
//
// In Stage 2 these data-include points become PHP `get_template_part()` calls.
(function () {
  'use strict';

  async function inject(node) {
    const url = node.getAttribute('data-include');
    if (!url) return;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(res.statusText);
      const html = await res.text();
      const tpl = document.createElement('template');
      tpl.innerHTML = html;
      node.replaceWith(tpl.content);
    } catch (err) {
      // Fall back: leave a small notice so it's visible during dev.
      node.innerHTML = '<!-- include failed: ' + url + ' (' + err.message + ') -->';
    }
  }

  async function run() {
    const nodes = Array.from(document.querySelectorAll('[data-include]'));
    await Promise.all(nodes.map(inject));

    // Year stamp.
    document.querySelectorAll('[data-year]').forEach(el => {
      el.textContent = new Date().getFullYear();
    });

    // Re-run lucide if present.
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
    // Load main interactions after partials are in the DOM.
    if (!document.querySelector('script[data-main]')) {
      const s = document.createElement('script');
      s.src = 'assets/js/main.js';
      s.dataset.main = '1';
      s.defer = true;
      document.body.appendChild(s);
    } else {
      // Re-execute init if main.js already loaded (shouldn't normally).
      window.dispatchEvent(new CustomEvent('partials:loaded'));
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
