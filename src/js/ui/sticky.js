export default initSticky;

const STICKY_CLASS_NAME = 'is-sticky';

function parseStickyOptions(attr) {
  const config = {};

  if (!attr || attr === '') {
    return config;
  }

  attr.split(';').forEach((option) => {
    const [key, value] = option.split(':');

    if (!key || !value) {
      return;
    }

    const trimmedKey = key.trim();
    const trimmedValue = value.trim();

    if (trimmedValue === 'true') {
      config[trimmedKey] = true;
    } else if (trimmedValue === 'false') {
      config[trimmedKey] = false;
    } else if (!Number.isNaN(Number(trimmedValue))) {
      config[trimmedKey] = Number(trimmedValue);
    } else {
      config[trimmedKey] = trimmedValue;
    }
  });

  return config;
}

export function initSticky(selector = '[data-sticky]') {
  const elements = Array.from(document.querySelectorAll(selector));

  if (!elements.length) {
    return [];
  }

  const isDesktop = () => window.matchMedia('(min-width: 1024px)').matches;

  const cleanupFunctions = elements.map((element) => {
    const attr = element.getAttribute('data-sticky');
    const options = parseStickyOptions(attr);
    const offset = options.offset ?? 0;
    const startPosition = element.offsetTop;

    let isSticky = false;

    const applyStickyState = () => {
      const parent = element.parentElement;
      const parentRect = parent ? parent.getBoundingClientRect() : null;

      element.classList.add(STICKY_CLASS_NAME);
      element.style.position = 'fixed';
      element.style.top = `${offset}px`;
      element.style.zIndex = '1000';

      if (parentRect) {
        element.style.left = `${parentRect.left}px`;
        element.style.width = `${parentRect.width}px`;
      } else {
        element.style.left = '0';
        element.style.width = '100%';
      }
    };

    const removeStickyState = () => {
      element.classList.remove(STICKY_CLASS_NAME);
      element.style.position = '';
      element.style.top = '';
      element.style.left = '';
      element.style.zIndex = '';
      element.style.width = '';
    };

    const handleScroll = () => {
      if (!isDesktop()) {
        if (isSticky) {
          removeStickyState();
          isSticky = false;
        }
        return;
      }

      const shouldStick = window.scrollY >= startPosition - offset;

      if (shouldStick && !isSticky) {
        applyStickyState();
        isSticky = true;
      } else if (!shouldStick && isSticky) {
        removeStickyState();
        isSticky = false;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      removeStickyState();
    };
  });

  return cleanupFunctions;
}
