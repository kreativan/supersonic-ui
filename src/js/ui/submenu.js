/**
 * Submenu Accordion Component
 * 
 * This module provides accordion-style functionality for mobile menu submenus.
 * 
 * Usage:
 * 1. Add `data-submenu` attribute to the parent <li> element
 * 2. Include an anchor tag as the trigger and a <ul> as the content
 * 3. Optionally include an SVG icon that will rotate when toggling
 * 
 * HTML Structure:
 * ```html
 * <li data-submenu>
 *   <a href="#">
 *     Menu Item Title
 *     <svg><!-- Optional icon that rotates --></svg>
 *   </a>
 *   <ul>
 *     <li><a href="#">Submenu Link 1</a></li>
 *     <li><a href="#">Submenu Link 2</a></li>
 *   </ul>
 * </li>
 * ```
 * 
 * CSS Classes:
 * - `.open` is added to the parent element when expanded
 * 
 * Features:
 * - Accordion toggle behavior (click to open/close)
 * - SVG icon rotation (0deg closed, 180deg open)
 * - Prevents default link behavior on trigger
 * - Automatic initialization when imported
 * 
 */

/**
 * Initialize submenu accordion functionality
 */
export function initSubmenus() {
  const submenus = document.querySelectorAll('[data-submenu]');

  submenus.forEach(submenu => {
    const trigger = submenu.querySelector('a');
    const content = submenu.querySelector('ul');
    const svg = trigger?.querySelector('svg');

    if (!trigger || !content) return;

    // Set initial state
    content.style.display = 'none';

    // Add click event listener
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      toggleSubmenu(submenu, content, svg);
    });
  });
}

/**
 * Toggle submenu visibility
 * @param {HTMLElement} submenu - The submenu container
 * @param {HTMLElement} content - The submenu content
 * @param {HTMLElement} svg - The SVG icon element
 */
function toggleSubmenu(submenu, content, svg) {
  const isOpen = submenu.classList.contains('open');

  if (isOpen) {
    // Close submenu
    content.style.display = 'none';
    submenu.classList.remove('open');
    if (svg) {
      svg.style.transform = 'rotate(0deg)';
    }
  } else {
    // Open submenu
    content.style.display = 'block';
    submenu.classList.add('open');
    if (svg) {
      svg.style.transform = 'rotate(180deg)';
    }
  }
}
