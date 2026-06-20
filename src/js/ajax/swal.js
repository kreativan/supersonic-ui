import { i18n } from '../utility/i18n';

export function toast(icon, message) {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: icon,
    title: message,
    showConfirmButton: false,
    timer: 3000,
  });
}

export function errorToast(message) {
  if (message && Array.isArray(message)) {
    let messages = message;
    messages.forEach((message) => {
      toast('error', message);
    });
  } else if (typeof message === 'string') {
    toast('error', message);
  }
}

export function errorModal(html, color = '#333') {
  Swal.fire({
    html: html,
    icon: "error",
    confirmButtonText: i18n('ok', 'OK'),
    confirmButtonColor: color,
  })
}

export function successModal(html, color = '#333') {
  Swal.fire({
    html: html,
    icon: "success",
    confirmButtonText: i18n('ok', 'OK'),
    confirmButtonColor: color,
  })
}