// Example usage:
// observeElement({
//   selector: '.myElement',
//   root: document.querySelector('#myContainer'),
//   rootMargin: '50px',
//   threshold: 0.5,
//   repeat: true,
//   onEnter: (element, entry) => console.log('Element entered:', element)
// });


export function observeElement(params) {
  const selector = params.selector;
  const root = params.root || null;
  const rootMargin = params.rootMargin || '0px';
  const threshold = params.threshold || 0.2;
  const repeat = params.repeat || false;
  const onEnter = params.onEnter || null;

  const elements = document.querySelectorAll(selector);
  if (!elements.length) {
    console.warn(`No elements found with selector "${selector}".`);
    return;
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');

        // Call onEnter callback if provided
        if (onEnter && typeof onEnter === 'function') {
          onEnter(entry.target, entry);
        }

        if (!repeat) {
          observer.unobserve(entry.target); // Stop observing after adding class
        }
      } else if (repeat) {
        entry.target.classList.remove('in-view');
      }
    });
  }, {
    root, // Element used as viewport (null for browser viewport)
    rootMargin, // Margin around root
    threshold // Percentage of element visibility to trigger
  });

  elements.forEach(element => observer.observe(element));
}