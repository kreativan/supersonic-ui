/**
 * Smooth Scroll Utility
 *
 * Enables smooth scrolling for any clickable element with the [data-scroll] attribute.
 *
 * Usage Example:
 *   <a data-scroll="target:#target-section;offset:80;speed:500;">Go to Section</a>
 *
 * Options (all values in px/ms):
 *   target: CSS selector for scroll target (e.g. #section1)
 *   offset: Number of pixels to offset from the top (e.g. 80)
 *   speed: Duration of scroll animation in ms (e.g. 500)
 *
 * To initialize, call:
 *   import { initScroll } from './scroll.js';
 *   initScroll();
 */

// Smooth scroll for elements with [data-scroll] attribute

function parseScrollOptions(attr) {
  const config = {};
  if (!attr) return config;
  attr.split(';').forEach((option) => {
    const [key, value] = option.split(':');
    if (key && value) config[key.trim()] = value.trim();
  });
  return config;
}

export function initScroll() {
  document.querySelectorAll('[data-scroll]').forEach(el => {
    el.addEventListener('click', function (e) {
      const opts = parseScrollOptions(el.getAttribute('data-scroll'));
      // Prefer target option, then href
      let targetSelector = opts.target || el.getAttribute('href');
      // Support both #section and /#section
      if (targetSelector && (targetSelector.startsWith('#') || targetSelector.startsWith('/#'))) {
        // If starts with /#, treat as hash for current page
        if (targetSelector.startsWith('/#')) {
          targetSelector = targetSelector.slice(1); // remove leading /
        }
        const target = document.querySelector(targetSelector);
        if (target) {
          e.preventDefault();

          // Get offset (in px)
          let offset = opts.offset ? parseInt(opts.offset, 10) || 0 : 0;

          // Get speed (duration in ms)
          let duration = opts.speed ? parseFloat(opts.speed) : 0;

          // Calculate target position with offset
          const targetY = target.getBoundingClientRect().top + window.scrollY - offset;

          if (duration > 0) {
            // Custom smooth scroll with duration
            const startY = window.scrollY;
            const change = targetY - startY;
            const startTime = performance.now();

            function animateScroll(currentTime) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              window.scrollTo(0, startY + change * easeInOutQuad(progress));
              if (progress < 1) {
                requestAnimationFrame(animateScroll);
              }
            }
            function easeInOutQuad(t) {
              return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            }
            requestAnimationFrame(animateScroll);
          } else {
            // Native smooth scroll, then adjust for offset
            window.scrollTo({
              top: targetY,
              behavior: 'smooth'
            });
          }
        }
      }
    });
  });
}