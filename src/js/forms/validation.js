import { i18n } from '../utility/i18n.js';

export default {
  validate,
  validateNumbCaptcha
}

/**
 * Validate fields
 */
export function validate(fields) {
  let errors = [];
  fields.forEach((field) => {
    let error = validateField(field);
    if (error) errors.push(error);
  });
  return errors;
}

/**
 * Validate a single field
 * @example 
 * let error = validateField(field);
 * if (error) console.log(error);
 */
export function validateField(field) {
  let email_message = i18n('invalid_email', 'Invalid email address');
  let req_message = i18n('required_field', 'This field is required"');
  let type = field.getAttribute("type");
  let isRequired = validateRequired(field);
  let isEmailAddress = validateEmail(field.value);

  /** Required */
  if (!isRequired) {
    field.parentNode.classList.add("error");
    return {
      name: field.getAttribute("name"),
      error: req_message,
      formId: field.form ? field.form.id : null,
      field: field,
    };
  } else {
    field.parentNode.classList.remove("error");
  }

  /** Validate email */
  if (type === "email" && !isEmailAddress) {
    field.parentNode.classList.add("error");
    return {
      name: field.getAttribute("name"),
      error: email_message,
      formId: field.form ? field.form.id : null,
      field: field,
    };
  } else {
    field.parentNode.classList.remove("error");
  }

  return false;
}

/**
 * Required field validation
 */
export function validateRequired(field) {
  let required = field.hasAttribute("required");
  let value = field.value;
  if (required && value === "") {
    return false;
  }
  return true;
};

/**
 * Email field validation
 */
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

/**
 * Num Captcha validation
 */
export function validateNumbCaptcha(form_id) {
  let form = document.getElementById(form_id);
  if (!form) return true;

  let numb_captcha = form.querySelector(`input[name='numb_captcha']`);
  if (!numb_captcha) return true;

  let num1Input = form.querySelector(`input[name='num1']`);
  let num2Input = form.querySelector(`input[name='num2']`);
  if (!num1Input || !num2Input) return false;

  let numb1 = num1Input.value;
  let numb2 = num2Input.value;
  let answer = numb_captcha.value;

  if (answer === "") return false;

  return Number(numb1) + Number(numb2) === Number(answer);
}