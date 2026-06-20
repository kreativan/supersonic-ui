/**
 * Drawer Component
 * 
 * A simple drawer/sidebar component with slide animations.
 * 
 * Usage:
 * 1. Create a drawer element with data-drawer attribute:
 *    <div data-drawer="my-drawer" class="hidden">Drawer content</div>
 * 
 * 2. Create trigger buttons with data-drawer-trigger attribute:
 *    <button data-drawer-trigger="my-drawer">Open Drawer</button>
 * 
 * 3. Create close buttons with data-drawer-close attribute:
 *    <button data-drawer-close="my-drawer">Close</button>
 * 
 * 4. (Optional) Add data-drawer-overlay="true" to drawer element to enable background overlay:
 *    <div data-drawer="my-drawer" data-drawer-overlay="true" class="hidden">Drawer content</div>
 *    The overlay is created and inserted dynamically when the drawer opens, and removed on close.
 * 
 * Features:
 * - Native JavaScript slide animations (0.3s duration)
 * - ESC key to close
 * - Body scroll lock when open
 * - Multiple drawers supported
 * - Optional background overlay (auto-created/removed, click to close)
 * - Drawer always fixed at top/left, overlay appears under drawer
 */

// Track open drawers for ESC key handling
const openDrawers = new Set();

// Single ESC key handler for all drawers (prevents memory leak)
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && openDrawers.size > 0) {
    // Close the most recently opened drawer
    const lastDrawerId = Array.from(openDrawers).pop();
    closeDrawer(lastDrawerId);
  }
});

/**
 * Animate the drawer's transform
 * @param {HTMLElement} drawer 
 * @param {number} startX 
 * @param {number} endX 
 * @param {number} duration 
 * @param {function} callback 
 */
function animateDrawer(drawer, startX, endX, duration, callback) {
  const startTime = performance.now();

  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const currentX = startX + (endX - startX) * progress;
    drawer.style.transform = `translateX(${currentX}%)`;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      callback();
    }
  }

  requestAnimationFrame(animate);
}

/**
 * Initialize all drawers on the page
 */
export function initDrawers() {
  const drawers = document.querySelectorAll('[data-drawer]');

  drawers.forEach(drawer => {
    const drawerId = drawer.getAttribute('data-drawer');
    const triggers = document.querySelectorAll(`[data-drawer-trigger="${drawerId}"]`);
    const closers = document.querySelectorAll(`[data-drawer-close="${drawerId}"]`);

    // Add event listeners to triggers
    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => openDrawer(drawerId));
    });

    // Add event listeners to closers
    closers.forEach(closer => {
      closer.addEventListener('click', () => closeDrawer(drawerId));
    });

    // Add event listener to menu items inside drawer
    const menuLinks = drawer.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // Check if parent has data-submenu attribute
        const parentLi = link.closest('li[data-submenu]');
        if (!parentLi) {
          // Close immediately on navigation to avoid animation glitch
          closeDrawerImmediate(drawerId);
        }
      });
    });
  });
}

/**
 * Open a drawer by ID
 * @param {string} drawerId 
 */
export function openDrawer(drawerId) {
  const drawer = document.querySelector(`[data-drawer="${drawerId}"]`);
  if (drawer) {
    // Track opened drawer
    openDrawers.add(drawerId);

    drawer.style.display = 'block';
    drawer.style.position = 'fixed';
    drawer.style.top = '0';
    drawer.style.left = '0';
    drawer.style.zIndex = '1002';
    drawer.style.transform = 'translateX(-100%)';
    document.body.style.overflowY = 'hidden';

    // Animate in
    animateDrawer(drawer, -100, 0, 300, () => { });

    // Overlay logic
    if (drawer.getAttribute('data-drawer-overlay') === 'true') {
      let overlay = document.createElement('div');
      overlay.className = 'drawer-overlay';
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100vw';
      overlay.style.height = '100vh';
      overlay.style.background = 'rgba(0,0,0,0.5)';
      overlay.style.zIndex = '999';
      overlay.setAttribute('data-drawer-overlay', 'true');
      overlay.addEventListener('click', () => closeDrawer(drawerId));
      // Prepend overlay so it's under the drawer
      document.body.prepend(overlay);
    }
  }
}

/**
 * Close a drawer immediately without animation (used on navigation)
 * @param {string} drawerId 
 */
function closeDrawerImmediate(drawerId) {
  const drawer = document.querySelector(`[data-drawer="${drawerId}"]`);
  if (drawer) {
    openDrawers.delete(drawerId);
    drawer.style.display = 'none';
    drawer.style.position = '';
    drawer.style.top = '';
    drawer.style.left = '';
    drawer.style.zIndex = '';
    drawer.style.transform = '';

    if (drawer.getAttribute('data-drawer-overlay') === 'true') {
      const overlay = document.querySelector('.drawer-overlay[data-drawer-overlay="true"]');
      if (overlay) overlay.remove();
    }

    document.body.style.overflowY = '';
  }
}

/**
 * Close a drawer by ID
 * @param {string} drawerId 
 */
export function closeDrawer(drawerId) {
  const drawer = document.querySelector(`[data-drawer="${drawerId}"]`);
  if (drawer) {
    // Remove from tracking
    openDrawers.delete(drawerId);

    // Animate out
    animateDrawer(drawer, 0, -100, 300, () => {
      drawer.style.display = 'none';
      drawer.style.position = '';
      drawer.style.top = '';
      drawer.style.left = '';
      drawer.style.zIndex = '';
      drawer.style.transform = '';
    });

    // Remove overlay if present
    if (drawer.getAttribute('data-drawer-overlay') === 'true') {
      const overlay = document.querySelector('.drawer-overlay[data-drawer-overlay="true"]');
      if (overlay) overlay.remove();
    }

    document.body.style.overflowY = '';
  }
}

/**
 * Toggle a drawer by ID
 * @param {string} drawerId 
 */
export function toggleDrawer(drawerId) {
  const drawer = document.querySelector(`[data-drawer="${drawerId}"]`);
  if (drawer) {
    if (drawer.style.display !== 'none') {
      closeDrawer(drawerId);
    } else {
      openDrawer(drawerId);
    }
  }
}
