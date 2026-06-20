export function onlyAllowNumbers(elementSelector = null) {
  const element = elementSelector ? document.querySelector(elementSelector) : event.target;
  element.value = element.value.replace(/\D/g, "");
}