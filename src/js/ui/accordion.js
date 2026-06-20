// Accordion Component
// This script initializes all elements with the `data-accordion` attribute as accordions.
//
// HTML Markup Example:
// <ul data-accordion="multiple:true;">
//   <li class="accordion-item">
//     <div class="accordion-title">Title 1</div>
//     <div class="accordion-content">
//       Content 1
//       <button data-accordion-close>Close</button> <!-- This button will close the item -->
//     </div>
//   </li>
//   <li class="accordion-item">
//     <div class="accordion-title">Title 2</div>
//     <div class="accordion-content">Content 2</div>
//   </li>
// </ul>
//
// Options (separate with semicolons):
//   multiple:true;   // Allow multiple items to stay open (default: false)
// Example: <ul data-accordion="multiple:true;">
//
// If no options are provided, only one item can be open at a time.
//
// Features:
// - Add [data-accordion-close] to any element inside .accordion-item to close that item when clicked.
//
// Usage:
//   <ul data-accordion>...</ul> // single open (default)
//   <ul data-accordion="multiple:true;">...</ul> // multiple open

/**
 * Initialize accordions
 */
function initAccordions() {
  const accordions = document.querySelectorAll('[data-accordion]');

  accordions.forEach((accordion) => {
    if (accordion.dataset.supersonicAccordionInit === 'true') return;
    accordion.dataset.supersonicAccordionInit = 'true';
    const options = accordion.getAttribute('data-accordion');
    const config = {};

    // Parse options from data-accordion attribute
    if (options) {
      options.split(';').forEach((option) => {
        const [key, value] = option.split(':');
        if (key && value) {
          config[key.trim()] = value.trim() === 'true';
        }
      });
    }

    const items = accordion.querySelectorAll('.accordion-item');

    items.forEach((item) => {
      const title = item.querySelector('.accordion-title');
      const content = item.querySelector('.accordion-content');

      if (title && content) {
        if (item.dataset.supersonicAccordionBound === 'true') return;
        item.dataset.supersonicAccordionBound = 'true';

        // Set initial state
        content.style.maxHeight = item.classList.contains('open') ? `${content.scrollHeight}px` : '0';
        content.style.transition = 'max-height 0.3s ease-out';

        // Add click event listener to title
        title.addEventListener('click', () => {
          const isOpen = item.classList.contains('open');

          if (!config.multiple) {
            // Close all items in the accordion if multiple is not allowed
            items.forEach((i) => {
              i.classList.remove('open');
              const c = i.querySelector('.accordion-content');
              if (c) c.style.maxHeight = '0';
            });
            // Open the clicked item if it was not already open
            if (!isOpen) {
              item.classList.add('open');
              content.style.maxHeight = `${content.scrollHeight}px`;
            }
          } else {
            // Toggle the clicked item independently
            if (isOpen) {
              item.classList.remove('open');
              content.style.maxHeight = '0';
            } else {
              item.classList.add('open');
              content.style.maxHeight = `${content.scrollHeight}px`;
            }
          }
        });

        // Add click event listener to any [data-accordion-close] inside the item
        const closeBtn = item.querySelector('[data-accordion-close]');
        if (closeBtn) {
          closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            item.classList.remove('open');
            content.style.maxHeight = '0';
          });
        }
      }
    });
  });
}

// Export the initialization function
export { initAccordions };