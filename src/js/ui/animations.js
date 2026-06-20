/**
 * counter(el, options)
 * Animates a number from 0 to el.dataset.countTo in the given element.
 *
 * Usage:
 *   <span data-count-to="100"></span>
 *   counter(element, { duration: 1500, decimals: 0 });
 *
 * Parameters:
 *   el: HTMLElement to update textContent.
 *   options:
 *     duration: animation duration in ms (default 1500)
 *     decimals: number of decimal places (default 0)
 */
export function counter(el, { duration = 1500, decimals = 0 } = {}) {
  const to = +el.dataset.countTo || 0;
  const from = 0,
    start = performance.now();
  const fmt = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  function frame(t) {
    const p = Math.min((t - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
    const val = from + (to - from) * eased;
    el.textContent = fmt.format(p < 1 ? val : to);
    if (p < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}