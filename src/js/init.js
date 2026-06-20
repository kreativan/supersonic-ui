import { init } from "./index.js";

const supersonicOptions = {
  i18n: {},
  supersonic_mode: "dev",
  gtm: null, // Google Tag Manager ID, e.g., "GTM-XXXXXX"
  swal: true,
};


globalThis.supersonic.init(supersonicOptions);

console.log("Supersonic:", globalThis.supersonic);