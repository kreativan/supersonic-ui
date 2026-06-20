/**
 * Dropdown Component
 * 
 * Usage:
 * 1. Add data-dropdown attribute to container element (usually <li>)
 *    Optional: specify position with data-dropdown="left|center|right" (default: center)
 * 2. First <a> or <button> tag inside will be the trigger
 * 3. First <div> after the trigger will be the dropdown menu
 * 4. Call initDropdowns() to initialize all dropdowns on the page
 * 
 * HTML Structure:
 * <li data-dropdown="center">
 *   <a href="#">Menu Item</a>
 *   <div>
 *     <ul>
 *       <li><a href="#">Sub Item 1</a></li>
 *       <li><a href="#">Sub Item 2</a></li>
 *     </ul>
 *   </div>
 * </li>
 * 
 * or
 * 
 * <div data-dropdown="left">
 *   <button>Menu Item</button>
 *   <div>
 *     <ul>
 *       <li><a href="#">Sub Item 1</a></li>
 *       <li><a href="#">Sub Item 2</a></li>
 *     </ul>
 *   </div>
 * </div>
 * 
 * Initialize:
 * import { initDropdowns } from './dropdown.js';
 * initDropdowns();
 */
export class Dropdown {
  constructor(element) {
    this.element = element;
    // Support both <a> and <button> as trigger
    this.trigger = element.querySelector('a, button'); // First anchor or button tag
    // Find the first <div> after the trigger
    this.menu = this.trigger ? this.trigger.nextElementSibling : null;
    this.icon = element.querySelector('svg'); // First SVG icon
    this.isOpen = false;
    this.position = element.dataset.dropdown || 'center'; // Default to center

    // Bind methods for proper cleanup
    this.handleClickAway = this.handleClickAway.bind(this);
    this.handleEscape = this.handleEscape.bind(this);
    this.handleTriggerClick = this.handleTriggerClick.bind(this);

    this.init();
  }

  init() {
    if (!this.trigger || !this.menu) return;

    // Set initial state - only functional styling
    this.menu.style.display = 'none';
    this.menu.style.position = 'absolute';

    // Bind events
    this.trigger.addEventListener('click', this.handleTriggerClick);

    // Click away to close
    document.addEventListener('click', this.handleClickAway);

    // Escape key to close
    document.addEventListener('keydown', this.handleEscape);
  }

  handleTriggerClick(e) {
    e.preventDefault();
    this.toggle();
  }

  handleClickAway(e) {
    if (!this.element.contains(e.target)) {
      this.close();
    }
  }

  handleEscape(e) {
    if (e.key === 'Escape' && this.isOpen) {
      this.close();
    }
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.isOpen = true;
    this.element.classList.add('open');

    if (this.icon) {
      this.icon.style.transform = 'rotate(180deg)';
    }

    // Set positioning based on data-dropdown attribute
    let positionStyles = 'position:absolute;';
    let initialTransform = 'translateY(-10px)';
    let finalTransform = 'translateY(0)';

    switch (this.position) {
      case 'left':
        positionStyles += 'left:0;';
        break;
      case 'right':
        positionStyles += 'right:0;';
        break;
      case 'center':
      default:
        positionStyles += 'left:50%;';
        initialTransform = 'translateX(-50%) translateY(-10px)';
        finalTransform = 'translateX(-50%) translateY(0)';
        break;
    }

    // Batch style changes for better performance
    this.menu.style.cssText = `display:block;opacity:0;transform:${initialTransform};${positionStyles}`;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.menu.style.transition = 'opacity 200ms ease, transform 200ms ease';
        this.menu.style.opacity = '1';
        this.menu.style.transform = finalTransform;
      });
    });
  }

  close() {
    this.isOpen = false;
    this.element.classList.remove('open');

    if (this.icon) {
      this.icon.style.transform = 'rotate(0deg)';
    }

    // Set closing transform based on position
    let closingTransform = 'translateY(-10px)';
    if (this.position === 'center') {
      closingTransform = 'translateX(-50%) translateY(-10px)';
    }

    // Hide with transition
    this.menu.style.transition = 'opacity 200ms ease, transform 200ms ease';
    this.menu.style.opacity = '0';
    this.menu.style.transform = closingTransform;

    setTimeout(() => {
      this.menu.style.display = 'none';
      this.menu.style.transition = '';
    }, 200);
  }

  /**
   * Cleanup method to remove event listeners and prevent memory leaks
   */
  destroy() {
    if (this.trigger) {
      this.trigger.removeEventListener('click', this.handleTriggerClick);
    }
    document.removeEventListener('click', this.handleClickAway);
    document.removeEventListener('keydown', this.handleEscape);
  }
}

// Store instances for cleanup
const dropdownInstances = new WeakMap();

export function initDropdowns() {
  const dropdowns = document.querySelectorAll('[data-dropdown]');
  dropdowns.forEach(dropdown => {
    const instance = new Dropdown(dropdown);
    dropdownInstances.set(dropdown, instance);
  });
}

export function destroyDropdowns() {
  const dropdowns = document.querySelectorAll('[data-dropdown]');
  dropdowns.forEach(dropdown => {
    const instance = dropdownInstances.get(dropdown);
    if (instance) {
      instance.destroy();
      dropdownInstances.delete(dropdown);
    }
  });
}