import { formSubmit } from './submit.js';
import { watch, numbCaptcha } from './helpers.js';

const DEFAULT_OPTIONS = {
  formId: null,
  submitButton: null,
  data: null,
  indicator: null,
  ajaxUrl: null,
  method: 'POST',
  recaptcha: null,
  recaptcha_site_key: null,
  responseType: 'default',
  callback: null
};

/**
 * New Form
 * @example
 const form = new astronomic.newForm({
    formId: 'contact-form',
    submitButton: '#submit-button',
    data: { name: 'John Doe' },
    indicator: '#loading-indicator',
    ajaxUrl: '/submit-form',
    method: 'POST',
    recaptcha: 'your-recaptcha-site-key',
    responseType: 'swal',
    callback: (response) => {
      console.log(response.message);
    }
  });
 *
 */
export default class newForm {

  constructor(options = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...options };

    if (!this.options.formId) {
      console.error("Form ID is required. Please provide a valid form ID.");
      return;
    }

    if (!this.options.submitButton) {
      console.error("Submit button selector is required. Please provide a valid selector.");
      return;
    }

    if (!this.options.ajaxUrl) {
      console.error("Ajax URL is required. Please provide a valid URL.");
      return;
    }

    watch(this.options.formId);
    numbCaptcha(this.options.formId);

    this.init();
  }

  /**
   * Submit form on button click or form submit
   */
  async init() {
    const submitButtons = document.querySelectorAll(this.options.submitButton);
    const formElement = document.getElementById(this.options.formId);

    if (!submitButtons.length) {
      console.error("Submit button selector did not match any elements.");
      return;
    }

    submitButtons.forEach((submitButton) => {
      if (submitButton.dataset.supersonicFormBound === 'true') return;

      submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        formSubmit(this.options, event);
      });

      submitButton.dataset.supersonicFormBound = 'true';
    });

    if (formElement && formElement.dataset.supersonicFormSubmitBound !== 'true') {
      formElement.addEventListener('submit', (event) => {
        event.preventDefault();
        formSubmit(this.options, event);
      });

      formElement.dataset.supersonicFormSubmitBound = 'true';
    }
  }

}