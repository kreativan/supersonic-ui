// public/js/init.js
import { init } from './index.js';   // ← Use absolute path starting with /

const supersonicOptions = {
  i18n: {},
  supersonic_mode: "dev",
  gtm: null,
  swal: true,
};

globalThis.supersonic.init(supersonicOptions);
console.log("Supersonic initialized");