import { isLocal } from './utility/utility.js';
import utility from './utility/utility.js';
import { onlyAllowNumbers } from './utility/input.js';

import newForm from './forms/form.js';

import loadGTM from './integrations/gtm.js';
import loadSweetAlert from './integrations/swal.js';

import * as Animations from './ui/animations.js';
import { observeElement } from './ui/observer.js';
import { viewportAnimations } from './ui/viewport-animations.js';
import { initStickyNavbar } from './ui/sticky-navbar.js';
import { initSticky } from './ui/sticky.js';
import { initDropdowns } from './ui/dropdown.js';
import { initDrawers } from './ui/drawer.js';
import { initSubmenus } from './ui/submenu.js';
import { initScroll } from './ui/scroll.js';
import { initAccordions } from './ui/accordion.js';

/**
 * Create global supersonic object
 */
const globalScope = typeof window !== 'undefined' ? window : globalThis;
if (!globalScope.supersonic) globalScope.supersonic = {};
globalScope.supersonic.init = init;


/**
 * Init
 * @param {object} options 
 * @example  supersonic.init({ i18n: true });
 */
export function init(options = {}) {

  const defaults = {
    i18n: {},
    lang: document.documentElement.lang || 'en',
    gtm: null,
    swal: false,
  };

  const settings = { ...defaults, ...options };

  // Keep the runtime state on the real global object without replacing
  // the existing library API such as supersonic.init().
  globalScope.supersonic = {
    ...globalScope.supersonic,
    ...settings,
    init,
  };

  // New form
  globalScope.supersonic.newForm = newForm;

  // Detect local environment
  globalScope.supersonic.isLocal = isLocal();

  // Utility functions
  globalScope.supersonic.utility = utility;

  // Animation functions
  globalScope.supersonic.animations = Animations;

  // UI functions
  globalScope.supersonic.ui = {};
  globalScope.supersonic.ui.observeElement = observeElement;
  globalScope.supersonic.ui.onlyAllowNumbers = onlyAllowNumbers;

  /**
   * UI Components
   */
  const uiComponents = [
    { name: 'gtm', function: () => loadGTM(globalScope.supersonic.gtm) }, // Google Tag Manager
    { name: 'swal', function: () => loadSweetAlert() }, // Load SweetAlert library
    { name: 'stickyNavbar', function: () => initStickyNavbar() }, // Sticky navbar
    { name: 'sticky', function: () => initSticky() }, // Generic sticky elements
    { name: 'viewportAnimations', function: () => viewportAnimations() }, // Viewport animations
    { name: 'dropdowns', function: () => initDropdowns() }, // Dropdowns
    { name: 'drawers', function: () => initDrawers() }, // Drawers
    { name: 'submenus', function: () => initSubmenus() }, // Submenus
    { name: 'scroll', function: () => initScroll() }, // Smooth scroll
    { name: 'accordions', function: () => initAccordions() }, // Accordions
    { ane: 'sticky', function: () => initSticky() }, // Sticky elements
  ];

  /**
   * Init UI components
   * based on environment (dev or prod)
   * In dev mode, init immediately
   * In prod mode, wait for DOMContentLoaded event
   */
  const initComponents = () => {
    uiComponents.forEach(component => {
      component.function();
    });
  };

  const bootstrap = () => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initComponents, { once: true });
    } else {
      initComponents();
    }
  };

  bootstrap();

  if (!globalScope.__supersonicLifecycleBound) {
    document.addEventListener('astro:after-swap', initComponents);
    document.addEventListener('astro:page-load', initComponents);
    document.addEventListener('htmx:afterSwap', initComponents);
    document.addEventListener('htmx:afterSettle', initComponents);
    document.addEventListener('htmx:afterRequest', initComponents);
    globalScope.__supersonicLifecycleBound = true;
  }

}