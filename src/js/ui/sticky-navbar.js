/**
 * Sticky Navbar Component
 *
 * Makes navbar sticky with configurable behavior.
 * Default: sticky when scrolling down and up
 * stickyOnTop: only sticky when scrolling up
 *
 * Usage:
 *
 * 1. HTML with options:
 *    <nav data-navbar-sticky="threshold:100;offset:0;stickyOnTop:true">
 *      Custom sticky navbar
 *    </nav>
 * 
 * 2. HTML with default options:
 *    <nav data-navbar-sticky>Basic sticky navbar</nav>
 *
 * Options:
 * - threshold: scroll distance before sticky activates in px (default: 100)
 * - offset: top position when sticky in px (default: 0)
 * - stickyOnTop: only sticky on scroll up (default: false)
 */

const ANIMATION_DURATION = 300;
const SCROLL_DEBOUNCE = 50;

export function makeStickyNavbar(element, options = {}) {
  const {
    threshold = 100,
    offset = 0,
    stickyOnTop = false
  } = options;

  // Local state
  let lastScrollTop = 0;
  let scrollTimeout = null;
  let removeTimeout = null;
  let isSticky = false;
  let cachedNavbarHeight = null;

  // Create placeholder element
  const placeholder = document.createElement('div');
  placeholder.className = 'sticky-navbar-placeholder';
  placeholder.style.cssText = 'display:none;height:0;visibility:hidden';
  element.parentNode.insertBefore(placeholder, element.nextSibling);

  // Set transition once
  element.style.transition = `transform ${ANIMATION_DURATION}ms ease-out`;

  function makeSticky() {
    if (isSticky) return;

    // Cache height on first call
    if (!cachedNavbarHeight) {
      cachedNavbarHeight = element.offsetHeight;
    }

    isSticky = true;

    // Batch style updates
    element.style.cssText += `position:fixed;top:${offset}px;left:0;right:0;z-index:1000;transform:translateY(-100%)`;

    // Show placeholder
    placeholder.style.cssText = `display:block;height:${cachedNavbarHeight}px;visibility:hidden`;

    // Trigger animation with double rAF
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (isSticky) {
          element.style.transform = 'translateY(0)';
        }
      });
    });
  }

  function removeSticky() {
    if (!isSticky) return;

    // Clear any pending removal
    if (removeTimeout) {
      clearTimeout(removeTimeout);
    }

    // Slide out animation
    element.style.transform = 'translateY(-100%)';

    // Remove sticky after animation
    removeTimeout = setTimeout(() => {
      if (!isSticky) return;

      const currentTransition = element.style.transition;
      element.style.cssText = '';
      element.style.transition = currentTransition;

      placeholder.style.cssText = 'display:none;height:0;visibility:hidden';

      isSticky = false;
      removeTimeout = null;
    }, ANIMATION_DURATION);
  }

  function handleScroll() {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    scrollTimeout = setTimeout(() => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Below threshold - remove sticky
      if (currentScrollTop <= threshold) {
        if (isSticky) {
          removeSticky();
        }
        lastScrollTop = currentScrollTop;
        return;
      }

      // Skip if no scroll change
      if (currentScrollTop === lastScrollTop) {
        return;
      }

      const isScrollingUp = currentScrollTop < lastScrollTop;

      if (stickyOnTop) {
        // Sticky only when scrolling up
        if (isScrollingUp && !isSticky) {
          makeSticky();
        } else if (!isScrollingUp && isSticky) {
          removeSticky();
        }
      } else {
        // Default: sticky on both directions
        if (!isSticky) {
          makeSticky();
        }
      }

      lastScrollTop = currentScrollTop;
    }, SCROLL_DEBOUNCE);
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Return cleanup function
  return () => {
    window.removeEventListener('scroll', handleScroll);

    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
      scrollTimeout = null;
    }

    if (removeTimeout) {
      clearTimeout(removeTimeout);
      removeTimeout = null;
    }

    if (placeholder && placeholder.parentNode) {
      placeholder.parentNode.removeChild(placeholder);
    }

    isSticky = false;
  };
}

function parseStickyNavbarOptions(attr) {
  const config = {};
  if (!attr || attr === '') return config;

  attr.split(';').forEach((option) => {
    const [key, value] = option.split(':');
    if (key && value) {
      const trimmedKey = key.trim();
      const trimmedValue = value.trim();

      // Parse boolean values
      if (trimmedValue === 'true') {
        config[trimmedKey] = true;
      } else if (trimmedValue === 'false') {
        config[trimmedKey] = false;
      } else {
        config[trimmedKey] = trimmedValue;
      }
    }
  });

  return config;
}

export function initStickyNavbar(selector = '[data-navbar-sticky]') {
  const element = document.querySelector(selector);

  if (!element) {
    return null;
  }

  // Parse options from data-navbar-sticky attribute if present
  const opts = parseStickyNavbarOptions(element.getAttribute('data-navbar-sticky'));

  const options = {
    threshold: opts.threshold ? parseInt(opts.threshold) : 100,
    offset: opts.offset ? parseInt(opts.offset) : 0,
    stickyOnTop: opts.stickyOnTop === true
  };

  return makeStickyNavbar(element, options);
}
