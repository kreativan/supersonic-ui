/**
 * Get i18n translation with optional parameter interpolation
 * @param {string} key - Translation key
 * @param {string} defaultValue - Default value if translation not found
 * @param {Object} params - Parameters for string interpolation using {placeholder} syntax
 * @returns {string} Translated and interpolated string
 * @example i18n('welcome_message', 'Welcome {name}!', { name: 'John' })
 */
export function i18n(key, defaultValue = '', params = {}) {
  let value = window.supersonic?.i18n?.[key] ?? (defaultValue || key);
  
  // Support {placeholder} interpolation
  if (params && typeof params === 'object') {
    value = value.replace(/\{(\w+)\}/g, (match, paramKey) => {
      return params[paramKey] !== undefined ? params[paramKey] : match;
    });
  }
  
  return value;
}