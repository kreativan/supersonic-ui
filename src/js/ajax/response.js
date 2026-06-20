import { isLocal } from '../utility/utility.js';
import * as ajaxHelpers from './helpers.js';
import * as formHelpers from '../forms/helpers.js';
import { i18n } from '../utility/i18n.js';
import { newCustomEvent } from "../utility/utility.js";
import * as swal from './swal.js';

export default {
  ajaxResponse
}

export function ajaxResponse(response) {

  if (isLocal()) {
    console.log(response);
  }

  /** Reset - Clear Fields Error messages */
  if (response.fields) {
    formHelpers.hideErrors(response.fields);
  }

  // Handle client-side errors
  if (response.clientSideErrors && response.clientSideErrors.length > 0) {
    formHelpers.displayErrors(response.clientSideErrors);
    return;
  }

  // Handle direct response errors
  if (response.errors && response.errors.length > 0) {
    response.errors.forEach((e) => {
      // console.log(e);
    });
    return;
  }

  /**
   * Error Response
   * Run stuff after error response
   */
  if (ajaxHelpers.isResponseError(response)) {

    newCustomEvent("supersonic:AjaxResponseError", response);

    if (response.responseType == 'swal' && Swal) {
      if (response.message) {
        swal.errorToast(response.message);
      } else if (response.body) {
        swal.errorModal(response.body, '#333');
      }
    }

  }

  /**
   * Success Response
   * Run stuff after success response
   */
  if (ajaxHelpers.isResponseSuccess(response)) {

    newCustomEvent("supersonic:AjaxResponseSuccess", response);

    if (response.responseType == 'swal' && Swal) {
      let swalHTML = response.body ? response.body : `<p>${response.message}</p>`;
      swal.successModal(swalHTML, '#333');
    }

    setTimeout(() => {
      formHelpers.clearForm(response.form_css_id);
    }, 300);

  }

}