// Viewport Animation Utility (uses custom animations)
//
// Markup Example:
// <div data-viewport-animation="animation:fadeIn;delay:200;duration:500;"></div>
//
// Options (all values in ms):
//   animation: Animation name (required, e.g. fadeIn)
//   delay: Animation delay (e.g. 200)
//   duration: Animation duration (e.g. 500)
//
// Elements with [data-viewport-animation] will animate when entering the viewport.
// Uses custom CSS animations defined in animate.css
//
// To use, ensure animate.css is loaded on your page.

export function viewportAnimations(options) {
  // Default options
  const defaultOptions = {
    selector: '[data-viewport-animation]',
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
    repeat: false
  };

  // Merge user-provided options with default options
  const settings = { ...defaultOptions, ...options };
  const { selector, root, rootMargin, threshold, repeat } = settings;

  const elements = document.querySelectorAll(selector);

  if (!elements.length) {
    return;
  }

  const observer = new IntersectionObserver((entries, observer) => {
    // Batch DOM operations with requestAnimationFrame
    requestAnimationFrame(() => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          handleAnimations(entry.target, true);

          if (!repeat) {
            observer.unobserve(entry.target); // Stop observing after adding class
          }
        } else if (repeat) {
          entry.target.classList.remove('in-view');
          handleAnimations(entry.target, false);
        }
      });
    });
  }, {
    root, // Element used as viewport (null for browser viewport)
    rootMargin, // Margin around root
    threshold // Percentage of element visibility to trigger
  });

  elements.forEach(element => observer.observe(element));
}

// Helper to parse options from data-viewport-animation attribute
function parseViewportAnimationOptions(attr) {
  const config = {};
  if (!attr) return config;
  attr.split(';').forEach((option) => {
    const [key, value] = option.split(':');
    if (key && value) config[key.trim()] = value.trim();
  });
  return config;
}

// Helper function to handle animation for a single element
const handleElementAnimation = (element, isAdding) => {
  const attr = element.getAttribute('data-viewport-animation');
  const opts = parseViewportAnimationOptions(attr);
  const animation = opts.animation;
  if (!animation) return;

  // All values in ms
  let delay = opts.delay ? `${opts.delay}ms` : '0ms';
  let duration = opts.duration ? `${opts.duration}ms` : '';

  if (isAdding) {
    element.style.animationDelay = delay;
    element.style.animationDuration = duration;
    element.classList.add('animate', animation);
  } else {
    element.style.animationDelay = '';
    element.style.animationDuration = '';
    element.classList.remove('animate', animation);
  }
};

// Helper function to handle animations for element and its children
const handleAnimations = (target, isAdding) => {
  // Handle the element itself
  handleElementAnimation(target, isAdding);

  // Handle children elements
  target.querySelectorAll('[data-viewport-animation]').forEach(child => {
    handleElementAnimation(child, isAdding);
  });
};