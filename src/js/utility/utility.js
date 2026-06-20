export default {
  setCookie,
  getCookie
};


/**
 * Check if the current environment is local
 * @returns {boolean}
 */
export function isLocal() {
  return window.location.hostname === 'localhost';
}

/**
 * Set a cookie with optional expiration
 * @param {string} name - Cookie name
 * @param {string} value - Cookie value
 * @param {number} days - Days until expiration (optional)
 * @param {Object} options - Additional options (path, sameSite, secure)
 */
export function setCookie(name, value, days, options = {}) {
  const {
    path = '/',
    sameSite = 'Lax',
    secure = window.location.protocol === 'https:'
  } = options;

  const expires = days
    ? `expires=${new Date(Date.now() + days * 864e5).toUTCString()};`
    : '';

  const secureFlag = secure ? 'Secure;' : '';

  document.cookie = `${name}=${encodeURIComponent(value)};${expires}path=${path};SameSite=${sameSite};${secureFlag}`;
}

/**
 * Get a cookie by name
 * @param {string} name - Cookie name
 * @returns {string} Cookie value or empty string if not found
 */
export function getCookie(name) {
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(';');

  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(nameEQ)) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }
  return '';
}


/**
 * Create Custom Events
 *  
 * @param {string} name 
 * @param {object} data 
 * 
 * @example
 * createCustomEvent('myCustomEvent', {name: 'John Doe'});
 * 
 * @example
 * window.addEventListener('myCustomEvent', function (event) { console.log(event.detail); });
 */
export function newCustomEvent(name, data, cancelable = true) {
  let event = new CustomEvent(name, {
    detail: data,
    cancelable: cancelable
  });
  window.dispatchEvent(event);
  return event;
}