import * as validation from "./validation";

/**
 * Get form fields
 * @param {string} form_id 
 * @returns 
 */
export function getFormFields(form_id) {
  const form = document.getElementById(form_id);
  const fields = form.querySelectorAll("input, select, textarea, file");
  return fields;
}

/**
 * Create FormData for use in fetch requests
 * @param {string} form_id
 * @param {object} data - {"name": "My Name", "email": "My Email"}
 * @returns {object}
 */
export function newFormData(form_id, data = null) {
  let fields = getFormFields(form_id);
  let formData = new FormData();
  if (data) {
    for (const item in data) formData.append(item, data[item]);
  }
  fields.forEach((e) => {
    let type = e.getAttribute("type");
    let name = e.getAttribute("name");
    if (type === "file") {
      formData.append(name, e.files[0]);
    } else if (type === "checkbox") {
      if (e.checked) formData.append(name, e.value);
    } else {
      formData.append(name, e.value);
    }
  });
  return formData;
};

/**
 * Reset/clear all form fields values
 * @param {string} form_id css id
 */
export function clearForm(form_id) {
  let fields = getFormFields(form_id);
  fields.forEach((e) => {
    let type = e.getAttribute("type");
    if (type !== "submit" && type !== "hidden" && type !== "button") {
      e.value = "";
    }
    if (type == "checkbox") {
      e.checked = false;
    }
  });
};

/**
 * Set form field values
 * @param {string} form_id
 * @param {object} obj {id: 'my-form', title: 'My Title'...}
 */
export function setFieldValues(form_id, obj) {
  const form = document.getElementById(form_id);
  for (const property in obj) {
    let name = property;
    let value = obj[property];
    let input = form.querySelector(`[name='${name}']`);
    input.value = value;
  }
};

/**
 * Display and hide errors on form fields
 */
export function displayErrors(errors) {
  errors.forEach((e) => {
    displayError(e);
  });
}

export function displayError(error) {
  let field = null;

  if (error.field instanceof Element) {
    field = error.field;
  } else if (error.formId) {
    const form = document.getElementById(error.formId);
    field = form ? form.querySelector(`[name='${error.name}']`) : null;
  }

  if (!field) {
    // Backward compatibility: global fallback
    field = document.querySelector(`[name='${error.name}']`);
  }

  if (!field || !field.parentNode) return;

  if (field.parentNode.querySelector(".error-message")) return;

  let span = document.createElement("span");
  span.classList.add("error-message");
  span.innerHTML = error.error;
  field.parentNode.appendChild(span);
}

export function hideErrors(fields) {
  fields.forEach((field) => {
    hideError(field);
  });
}

export function hideError(field) {
  let queryField = null;

  if (field instanceof Element) {
    queryField = field;
  } else if (field && field.name) {
    if (field.formId) {
      const form = document.getElementById(field.formId);
      queryField = form ? form.querySelector(`[name='${field.name}']`) : null;
    } else {
      queryField = document.querySelector(`[name='${field.name}']`);
    }
  }

  if (!queryField || !queryField.parentNode) return;

  let errorMessageSpan = queryField.parentNode.querySelector(".error-message");
  if (errorMessageSpan) errorMessageSpan.remove();
}

/**
 * Watch field
 * - validate
 * - display error
 * @param {*} field 
 */
export function watchField(field) {
  hideError(field);
  let error = validation.validateField(field);
  if (error) displayError(error);
}

/**
 * Watch form for changes
 * - Validate fields on change and keyup
 * 
 * @param {string} form_id - form css ID
 * 
 * @example astronomic.form.watch('contact-form');
 * 
*/
export function watch(form_id) {
  const fields = getFormFields(form_id);
  fields.forEach((field) => {
    if (field.dataset.supersonicWatchBound === 'true') return;

    field.addEventListener("keyup", () => {
      watchField(field);
    });
    field.addEventListener("change", () => {
      watchField(field);
    });
    field.addEventListener("blur", () => {
      watchField(field);
    });

    field.dataset.supersonicWatchBound = 'true';
  });
}

/**
 * To use numbCaptcha, 
 * just add text field to your form with the name numb_captcha
 * and use this function to generate random numbers for the captcha
 * @example astronomic.form.numbCaptcha('contact-form');
 */
export function numbCaptcha(form_id) {
  let form = document.getElementById(form_id);
  if (!form) return;

  if (form.dataset.supersonicCaptchaInit === 'true') return;

  let numbCaptcha = form.querySelector(`input[name='numb_captcha']`);

  if (!numbCaptcha) return;

  let num1Value = Math.ceil(Math.random() * 10);
  let num2Value = Math.ceil(Math.random() * 10);
  numbCaptcha.setAttribute("placeholder", `${num1Value} + ${num2Value} = ?`);

  let hiddenNum1 = document.createElement("input");
  hiddenNum1.setAttribute("type", "hidden");
  hiddenNum1.setAttribute("name", "num1");
  hiddenNum1.setAttribute("value", num1Value);
  form.appendChild(hiddenNum1);

  let hiddenNum2 = document.createElement("input");
  hiddenNum2.setAttribute("type", "hidden");
  hiddenNum2.setAttribute("name", "num2");
  hiddenNum2.setAttribute("value", num2Value);
  form.appendChild(hiddenNum2);

  form.dataset.supersonicCaptchaInit = 'true';
}