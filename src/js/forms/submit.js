import * as helper from "./helpers";
import validation from "./validation";
import { ajaxResponse } from "../ajax/response";
import { newCustomEvent } from "../utility/utility";

export default {
  formSubmit
};

/**
 * Submit form using fetch API
 * 
 * @params {Object} options - Options for form submission
 * @params {string} form_id - Form ID
 * @params {string} submitButton - Submit button selector
 * @params {string} data - Additional data to be sent with the form
 * @params {string} indicator - Indicator selector to show loading state
 * @params {string} ajaxUrl - URL to send the form data to
 * @params {string} method - HTTP method to use (GET or POST)
 * @params {string} recaptcha - Recaptcha site key
 * @params {string} recaptcha_site_key - Recaptcha site key for validation
 * @params {string} responseType - Type of response to expect (default, swal, etc.)
 * @params {function} callback - Callback function to handle the response
 * 
 * @example 
 * formSubmit({form_id: 'contact-form', 'responseType': 'swal'});
 */
export async function formSubmit(options = {}, event = null) {
  event.preventDefault();

  let method = options.method ?? "POST";
  let data = options.data ?? null;
  let submitButton = options.submitButton ? document.querySelector(options.submitButton) : event.target;
  let formId = options.formId ?? null;
  let ajaxUrl = options.ajaxUrl ?? null;
  let indicator = options.indicator ? document.querySelector(options.indicator) : null;
  let isRecaptcha = options.recaptcha && options.recaptcha != "false" ? true : false;
  let recaptcha_site_key = options.recaptcha_site_key ? options.recaptcha_site_key : null;
  let responseType = options.responseType ?? "default";
  let callback = options.callback ? options.callback : null;

  if (!formId) {
    console.error("Form ID is required");
    return;
  }

  if (!ajaxUrl) {
    console.error("Ajax URL is required");
    return;
  }

  if (submitButton) {
    submitButton.setAttribute("disabled", "disabled");
  }

  // Get the form
  let form = document.getElementById(formId);

  // Get form fields
  const fields = helper.getFormFields(formId);

  // Show ajax-indicator
  if (indicator) {
    indicator.classList.remove('hidden'); // tailwind
  }

  /**
   * Client Side Validation
   * - Validate fields
   * - Validate numb captcha
   */
  let clientSideErrors = validation.validate(fields);

  let isNumbCaptcha = validation.validateNumbCaptcha(formId);
  if (!isNumbCaptcha) {
    let captchaField = form.querySelector("input[name='numb_captcha']");
    clientSideErrors.push({
      name: "numb_captcha",
      error: "Invalid captcha",
      formId: formId,
      field: captchaField,
    });
  }

  if (clientSideErrors.length > 0) {
    submitButton.removeAttribute("disabled");
    if (indicator) {
      indicator.classList.add('hidden'); // tailwind
    }
    return ajaxResponse({ clientSideErrors: clientSideErrors }, fields);
  }

  /**
   * Use this.formData() method
   * to collect all form data 
   */
  let formData = helper.newFormData(formId);

  /**
   * Additional Data
   */
  if (data) {
    for (const item in data) formData.append(item, data[item]);
  }

  /**
   * Recaptcha
   */
  if (isRecaptcha && recaptcha_site_key) {
    let token = await grecaptcha.execute(recaptcha_site_key, { action: 'submit' });
    formData.append('recaptcha_response', token);
  }

  // Custom Event before form submit
  const FormSubmitBeforeEvent = newCustomEvent("astronomic:FormSubmitBefore", formData);

  if (FormSubmitBeforeEvent.defaultPrevented) {
    if (indicator) {
      indicator.classList.add("uk-hidden"); // uikit
      indicator.classList.add('hidden'); // tailwind
      submitButton.removeAttribute("disabled");
    }
    return;
  }

  /**
   * Request and Response
   * - Send ajax request using fetch API and formData
   * - Get response from the server
   * - Run callback function if available
   */
  let request = await fetch(ajaxUrl, {
    method: method,
    cache: "no-cache",
    body: formData,
  });

  let response = await request.json();

  response.form_css_id = formId;
  response.responseType = responseType;

  // Check if the callback is a function before calling it
  if (callback) {
    callback(response);  // Call the callback function
  } else {
    ajaxResponse(response);  // Call default response handler if no valid callback
  }

  // Custom Event after form submit
  newCustomEvent("astronomic:FormSubmitAfter", response);

  // Hide indicator
  if (indicator) {
    indicator.classList.add("uk-hidden"); // uikit
    indicator.classList.add('hidden'); // tailwind
  }

  // enable the submit button
  setTimeout(() => {
    submitButton.removeAttribute("disabled");
  }, 2000);

  return response;
}