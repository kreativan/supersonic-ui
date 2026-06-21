var V = Object.defineProperty, K = Object.defineProperties;
var Q = Object.getOwnPropertyDescriptors;
var N = Object.getOwnPropertySymbols;
var Z = Object.prototype.hasOwnProperty, J = Object.prototype.propertyIsEnumerable;
var $ = (e, t, n) => t in e ? V(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, y = (e, t) => {
  for (var n in t || (t = {}))
    Z.call(t, n) && $(e, n, t[n]);
  if (N)
    for (var n of N(t))
      J.call(t, n) && $(e, n, t[n]);
  return e;
}, O = (e, t) => K(e, Q(t));
var L = (e, t, n) => new Promise((r, o) => {
  var i = (l) => {
    try {
      a(n.next(l));
    } catch (c) {
      o(c);
    }
  }, s = (l) => {
    try {
      a(n.throw(l));
    } catch (c) {
      o(c);
    }
  }, a = (l) => l.done ? r(l.value) : Promise.resolve(l.value).then(i, s);
  a((n = n.apply(e, t)).next());
});
const ee = {
  setCookie: te,
  getCookie: ne
};
function H() {
  return window.location.hostname === "localhost";
}
function te(e, t, n, r = {}) {
  const {
    path: o = "/",
    sameSite: i = "Lax",
    secure: s = window.location.protocol === "https:"
  } = r, a = n ? `expires=${new Date(Date.now() + n * 864e5).toUTCString()};` : "", l = s ? "Secure;" : "";
  document.cookie = `${e}=${encodeURIComponent(t)};${a}path=${o};SameSite=${i};${l}`;
}
function ne(e) {
  const t = `${e}=`, n = document.cookie.split(";");
  for (let r of n)
    if (r = r.trim(), r.startsWith(t))
      return decodeURIComponent(r.substring(t.length));
  return "";
}
function S(e, t, n = !0) {
  let r = new CustomEvent(e, {
    detail: t,
    cancelable: n
  });
  return window.dispatchEvent(r), r;
}
function re(e = null) {
  const t = e ? document.querySelector(e) : event.target;
  t.value = t.value.replace(/\D/g, "");
}
function A(e, t = "", n = {}) {
  var o, i, s;
  let r = (s = (i = (o = window.supersonic) == null ? void 0 : o.i18n) == null ? void 0 : i[e]) != null ? s : t || e;
  return n && typeof n == "object" && (r = r.replace(/\{(\w+)\}/g, (a, l) => n[l] !== void 0 ? n[l] : a)), r;
}
const B = {
  validate: oe,
  validateNumbCaptcha: ae
};
function oe(e) {
  let t = [];
  return e.forEach((n) => {
    let r = P(n);
    r && t.push(r);
  }), t;
}
function P(e) {
  let t = A("invalid_email", "Invalid email address"), n = A("required_field", 'This field is required"'), r = e.getAttribute("type"), o = ie(e), i = se(e.value);
  if (o)
    e.parentNode.classList.remove("error");
  else
    return e.parentNode.classList.add("error"), {
      name: e.getAttribute("name"),
      error: n,
      formId: e.form ? e.form.id : null,
      field: e
    };
  return r === "email" && !i ? (e.parentNode.classList.add("error"), {
    name: e.getAttribute("name"),
    error: t,
    formId: e.form ? e.form.id : null,
    field: e
  }) : (e.parentNode.classList.remove("error"), !1);
}
function ie(e) {
  let t = e.hasAttribute("required"), n = e.value;
  return !(t && n === "");
}
function se(e) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(e).toLowerCase());
}
function ae(e) {
  let t = document.getElementById(e);
  if (!t) return !0;
  let n = t.querySelector("input[name='numb_captcha']");
  if (!n) return !0;
  let r = t.querySelector("input[name='num1']"), o = t.querySelector("input[name='num2']");
  if (!r || !o) return !1;
  let i = r.value, s = o.value, a = n.value;
  return a === "" ? !1 : Number(i) + Number(s) === Number(a);
}
function k(e) {
  return document.getElementById(e).querySelectorAll("input, select, textarea, file");
}
function le(e, t = null) {
  let n = k(e), r = new FormData();
  if (t)
    for (const o in t) r.append(o, t[o]);
  return n.forEach((o) => {
    let i = o.getAttribute("type"), s = o.getAttribute("name");
    i === "file" ? r.append(s, o.files[0]) : i === "checkbox" ? o.checked && r.append(s, o.value) : r.append(s, o.value);
  }), r;
}
function ce(e) {
  k(e).forEach((n) => {
    let r = n.getAttribute("type");
    r !== "submit" && r !== "hidden" && r !== "button" && (n.value = ""), r == "checkbox" && (n.checked = !1);
  });
}
function ue(e) {
  e.forEach((t) => {
    z(t);
  });
}
function z(e) {
  let t = null;
  if (e.field instanceof Element)
    t = e.field;
  else if (e.formId) {
    const r = document.getElementById(e.formId);
    t = r ? r.querySelector(`[name='${e.name}']`) : null;
  }
  if (t || (t = document.querySelector(`[name='${e.name}']`)), !t || !t.parentNode || t.parentNode.querySelector(".error-message")) return;
  let n = document.createElement("span");
  n.classList.add("error-message"), n.innerHTML = e.error, t.parentNode.appendChild(n);
}
function de(e) {
  e.forEach((t) => {
    W(t);
  });
}
function W(e) {
  let t = null;
  if (e instanceof Element)
    t = e;
  else if (e && e.name)
    if (e.formId) {
      const r = document.getElementById(e.formId);
      t = r ? r.querySelector(`[name='${e.name}']`) : null;
    } else
      t = document.querySelector(`[name='${e.name}']`);
  if (!t || !t.parentNode) return;
  let n = t.parentNode.querySelector(".error-message");
  n && n.remove();
}
function q(e) {
  W(e);
  let t = P(e);
  t && z(t);
}
function fe(e) {
  k(e).forEach((n) => {
    n.dataset.supersonicWatchBound !== "true" && (n.addEventListener("keyup", () => {
      q(n);
    }), n.addEventListener("change", () => {
      q(n);
    }), n.addEventListener("blur", () => {
      q(n);
    }), n.dataset.supersonicWatchBound = "true");
  });
}
function me(e) {
  let t = document.getElementById(e);
  if (!t || t.dataset.supersonicCaptchaInit === "true") return;
  let n = t.querySelector("input[name='numb_captcha']");
  if (!n) return;
  let r = Math.ceil(Math.random() * 10), o = Math.ceil(Math.random() * 10);
  n.setAttribute("placeholder", `${r} + ${o} = ?`);
  let i = document.createElement("input");
  i.setAttribute("type", "hidden"), i.setAttribute("name", "num1"), i.setAttribute("value", r), t.appendChild(i);
  let s = document.createElement("input");
  s.setAttribute("type", "hidden"), s.setAttribute("name", "num2"), s.setAttribute("value", o), t.appendChild(s), t.dataset.supersonicCaptchaInit = "true";
}
function pe(e) {
  return e.status === "success" || e.code === 200 || e.code === "success" || e.status === 200 || e.code === "ok" || e.code === "OK";
}
function he(e) {
  return e.status === "error" || e.code === 400 || e.code === "error" || e.status === 400 || e.code === "error" || e.code === "ERROR";
}
function _(e, t) {
  Swal.fire({
    toast: !0,
    position: "top-end",
    icon: e,
    title: t,
    showConfirmButton: !1,
    timer: 3e3
  });
}
function ye(e) {
  e && Array.isArray(e) ? e.forEach((n) => {
    _("error", n);
  }) : typeof e == "string" && _("error", e);
}
function ge(e, t = "#333") {
  Swal.fire({
    html: e,
    icon: "error",
    confirmButtonText: A("ok", "OK"),
    confirmButtonColor: t
  });
}
function ve(e, t = "#333") {
  Swal.fire({
    html: e,
    icon: "success",
    confirmButtonText: A("ok", "OK"),
    confirmButtonColor: t
  });
}
function M(e) {
  if (H() && console.log(e), e.fields && de(e.fields), e.clientSideErrors && e.clientSideErrors.length > 0) {
    ue(e.clientSideErrors);
    return;
  }
  if (e.errors && e.errors.length > 0) {
    e.errors.forEach((t) => {
    });
    return;
  }
  if (he(e) && (S("supersonic:AjaxResponseError", e), e.responseType == "swal" && Swal && (e.message ? ye(e.message) : e.body && ge(e.body, "#333"))), pe(e)) {
    if (S("supersonic:AjaxResponseSuccess", e), e.responseType == "swal" && Swal) {
      let t = e.body ? e.body : `<p>${e.message}</p>`;
      ve(t, "#333");
    }
    setTimeout(() => {
      ce(e.form_css_id);
    }, 300);
  }
}
function R() {
  return L(this, arguments, function* (e = {}, t = null) {
    var x, I, C, F, D;
    t.preventDefault();
    let n = (x = e.method) != null ? x : "POST", r = (I = e.data) != null ? I : null, o = e.submitButton ? document.querySelector(e.submitButton) : t.target, i = (C = e.formId) != null ? C : null, s = (F = e.ajaxUrl) != null ? F : null, a = e.indicator ? document.querySelector(e.indicator) : null, l = !!(e.recaptcha && e.recaptcha != "false"), c = e.recaptcha_site_key ? e.recaptcha_site_key : null, u = (D = e.responseType) != null ? D : "default", d = e.callback ? e.callback : null;
    if (!i) {
      console.error("Form ID is required");
      return;
    }
    if (!s) {
      console.error("Ajax URL is required");
      return;
    }
    o && o.setAttribute("disabled", "disabled");
    let m = document.getElementById(i);
    const h = k(i);
    a && a.classList.remove("hidden");
    let p = B.validate(h);
    if (!B.validateNumbCaptcha(i)) {
      let w = m.querySelector("input[name='numb_captcha']");
      p.push({
        name: "numb_captcha",
        error: "Invalid captcha",
        formId: i,
        field: w
      });
    }
    if (p.length > 0)
      return o.removeAttribute("disabled"), a && a.classList.add("hidden"), M({ clientSideErrors: p });
    let E = le(i);
    if (r)
      for (const w in r) E.append(w, r[w]);
    if (l && c) {
      let w = yield grecaptcha.execute(c, { action: "submit" });
      E.append("recaptcha_response", w);
    }
    if (S("astronomic:FormSubmitBefore", E).defaultPrevented) {
      a && (a.classList.add("uk-hidden"), a.classList.add("hidden"), o.removeAttribute("disabled"));
      return;
    }
    let v = yield (yield fetch(s, {
      method: n,
      cache: "no-cache",
      body: E
    })).json();
    return v.form_css_id = i, v.responseType = u, d ? d(v) : M(v), S("astronomic:FormSubmitAfter", v), a && (a.classList.add("uk-hidden"), a.classList.add("hidden")), setTimeout(() => {
      o.removeAttribute("disabled");
    }, 2e3), v;
  });
}
const we = {
  formId: null,
  submitButton: null,
  data: null,
  indicator: null,
  ajaxUrl: null,
  method: "POST",
  recaptcha: null,
  recaptcha_site_key: null,
  responseType: "default",
  callback: null
};
class be {
  constructor(t = {}) {
    if (this.options = y(y({}, we), t), !this.options.formId) {
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
    fe(this.options.formId), me(this.options.formId), this.init();
  }
  /**
   * Submit form on button click or form submit
   */
  init() {
    return L(this, null, function* () {
      const t = document.querySelectorAll(this.options.submitButton), n = document.getElementById(this.options.formId);
      if (!t.length) {
        console.error("Submit button selector did not match any elements.");
        return;
      }
      t.forEach((r) => {
        r.dataset.supersonicFormBound !== "true" && (r.addEventListener("click", (o) => {
          o.preventDefault(), R(this.options, o);
        }), r.dataset.supersonicFormBound = "true");
      }), n && n.dataset.supersonicFormSubmitBound !== "true" && (n.addEventListener("submit", (r) => {
        r.preventDefault(), R(this.options, r);
      }), n.dataset.supersonicFormSubmitBound = "true");
    });
  }
}
function Ee(e) {
  if (e) {
    if (!e || !/^GTM-[A-Z0-9]+$/.test(e)) {
      console.error("Invalid GTM ID");
      return;
    }
    try {
      window.dataLayer = window.dataLayer || [], window.dataLayer.push({
        "gtm.start": (/* @__PURE__ */ new Date()).getTime(),
        event: "gtm.js"
      });
      const t = document.createElement("script");
      if (t.async = !0, t.src = `https://www.googletagmanager.com/gtm.js?id=${e}`, t.onerror = () => console.error("Failed to load GTM script"), document.head.appendChild(t), document.body) {
        const n = document.createElement("noscript"), r = document.createElement("iframe");
        r.src = `https://www.googletagmanager.com/ns.html?id=${e}`, r.height = "0", r.width = "0", r.style.display = "none", r.style.visibility = "hidden", n.appendChild(r), document.body.appendChild(n);
      }
    } catch (t) {
      console.error("Error loading GTM:", t);
    }
  }
}
function Se() {
  return new Promise((e, t) => {
    if (window.Swal) return e(window.Swal);
    const n = document.createElement("script");
    n.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11", n.defer = !0, n.onload = () => e(window.Swal), n.onerror = t, document.head.appendChild(n);
  });
}
function Ae(e, { duration: t = 1500, decimals: n = 0 } = {}) {
  const r = +e.dataset.countTo || 0, o = 0, i = performance.now(), s = new Intl.NumberFormat(void 0, {
    minimumFractionDigits: n,
    maximumFractionDigits: n
  });
  function a(l) {
    const c = Math.min((l - i) / t, 1), u = 1 - Math.pow(1 - c, 3), d = o + (r - o) * u;
    e.textContent = s.format(c < 1 ? d : r), c < 1 && requestAnimationFrame(a);
  }
  requestAnimationFrame(a);
}
const ke = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  counter: Ae
}, Symbol.toStringTag, { value: "Module" }));
function Le(e) {
  const t = e.selector, n = e.root || null, r = e.rootMargin || "0px", o = e.threshold || 0.2, i = e.repeat || !1, s = e.onEnter || null, a = document.querySelectorAll(t);
  if (!a.length) {
    console.warn(`No elements found with selector "${t}".`);
    return;
  }
  const l = new IntersectionObserver((c, u) => {
    c.forEach((d) => {
      d.isIntersecting ? (d.target.classList.add("in-view"), s && typeof s == "function" && s(d.target, d), i || u.unobserve(d.target)) : i && d.target.classList.remove("in-view");
    });
  }, {
    root: n,
    // Element used as viewport (null for browser viewport)
    rootMargin: r,
    // Margin around root
    threshold: o
    // Percentage of element visibility to trigger
  });
  a.forEach((c) => l.observe(c));
}
function qe(e) {
  const n = y(y({}, {
    selector: "[data-viewport-animation]",
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
    repeat: !1
  }), e), { selector: r, root: o, rootMargin: i, threshold: s, repeat: a } = n, l = document.querySelectorAll(r);
  if (!l.length)
    return;
  const c = new IntersectionObserver((u, d) => {
    requestAnimationFrame(() => {
      u.forEach((m) => {
        m.isIntersecting ? (m.target.classList.add("in-view"), j(m.target, !0), a || d.unobserve(m.target)) : a && (m.target.classList.remove("in-view"), j(m.target, !1));
      });
    });
  }, {
    root: o,
    // Element used as viewport (null for browser viewport)
    rootMargin: i,
    // Margin around root
    threshold: s
    // Percentage of element visibility to trigger
  });
  l.forEach((u) => c.observe(u));
}
function Te(e) {
  const t = {};
  return e && e.split(";").forEach((n) => {
    const [r, o] = n.split(":");
    r && o && (t[r.trim()] = o.trim());
  }), t;
}
const Y = (e, t) => {
  const n = e.getAttribute("data-viewport-animation"), r = Te(n), o = r.animation;
  if (!o) return;
  let i = r.delay ? `${r.delay}ms` : "0ms", s = r.duration ? `${r.duration}ms` : "";
  t ? (e.style.animationDelay = i, e.style.animationDuration = s, e.classList.add("animate", o)) : (e.style.animationDelay = "", e.style.animationDuration = "", e.classList.remove("animate", o));
}, j = (e, t) => {
  Y(e, t), e.querySelectorAll("[data-viewport-animation]").forEach((n) => {
    Y(n, t);
  });
}, U = 300, xe = 50;
function Ie(e, t = {}) {
  const {
    threshold: n = 100,
    offset: r = 0,
    stickyOnTop: o = !1
  } = t;
  let i = 0, s = null, a = null, l = !1, c = null;
  const u = document.createElement("div");
  u.className = "sticky-navbar-placeholder", u.style.cssText = "display:none;height:0;visibility:hidden", e.parentNode.insertBefore(u, e.nextSibling), e.style.transition = `transform ${U}ms ease-out`;
  function d() {
    l || (c || (c = e.offsetHeight), l = !0, e.style.cssText += `position:fixed;top:${r}px;left:0;right:0;z-index:1000;transform:translateY(-100%)`, u.style.cssText = `display:block;height:${c}px;visibility:hidden`, requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        l && (e.style.transform = "translateY(0)");
      });
    }));
  }
  function m() {
    l && (a && clearTimeout(a), e.style.transform = "translateY(-100%)", a = setTimeout(() => {
      if (!l) return;
      const p = e.style.transition;
      e.style.cssText = "", e.style.transition = p, u.style.cssText = "display:none;height:0;visibility:hidden", l = !1, a = null;
    }, U));
  }
  function h() {
    s && clearTimeout(s), s = setTimeout(() => {
      const p = window.pageYOffset || document.documentElement.scrollTop;
      if (p <= n) {
        l && m(), i = p;
        return;
      }
      if (p === i)
        return;
      const g = p < i;
      o ? g && !l ? d() : !g && l && m() : l || d(), i = p;
    }, xe);
  }
  return window.addEventListener("scroll", h, { passive: !0 }), () => {
    window.removeEventListener("scroll", h), s && (clearTimeout(s), s = null), a && (clearTimeout(a), a = null), u && u.parentNode && u.parentNode.removeChild(u), l = !1;
  };
}
function Ce(e) {
  const t = {};
  return !e || e === "" || e.split(";").forEach((n) => {
    const [r, o] = n.split(":");
    if (r && o) {
      const i = r.trim(), s = o.trim();
      s === "true" ? t[i] = !0 : s === "false" ? t[i] = !1 : t[i] = s;
    }
  }), t;
}
function Fe(e = "[data-navbar-sticky]") {
  const t = document.querySelector(e);
  if (!t)
    return null;
  const n = Ce(t.getAttribute("data-navbar-sticky")), r = {
    threshold: n.threshold ? parseInt(n.threshold) : 100,
    offset: n.offset ? parseInt(n.offset) : 0,
    stickyOnTop: n.stickyOnTop === !0
  };
  return Ie(t, r);
}
class De {
  constructor(t) {
    this.element = t, this.trigger = t.querySelector("a, button"), this.menu = this.trigger ? this.trigger.nextElementSibling : null, this.icon = t.querySelector("svg"), this.isOpen = !1, this.position = t.dataset.dropdown || "center", this.handleClickAway = this.handleClickAway.bind(this), this.handleEscape = this.handleEscape.bind(this), this.handleTriggerClick = this.handleTriggerClick.bind(this), this.init();
  }
  init() {
    !this.trigger || !this.menu || (this.menu.style.display = "none", this.menu.style.position = "absolute", this.trigger.addEventListener("click", this.handleTriggerClick), document.addEventListener("click", this.handleClickAway), document.addEventListener("keydown", this.handleEscape));
  }
  handleTriggerClick(t) {
    t.preventDefault(), this.toggle();
  }
  handleClickAway(t) {
    this.element.contains(t.target) || this.close();
  }
  handleEscape(t) {
    t.key === "Escape" && this.isOpen && this.close();
  }
  toggle() {
    this.isOpen ? this.close() : this.open();
  }
  open() {
    this.isOpen = !0, this.element.classList.add("open"), this.icon && (this.icon.style.transform = "rotate(180deg)");
    let t = "position:absolute;", n = "translateY(-10px)", r = "translateY(0)";
    switch (this.position) {
      case "left":
        t += "left:0;";
        break;
      case "right":
        t += "right:0;";
        break;
      default:
        t += "left:50%;", n = "translateX(-50%) translateY(-10px)", r = "translateX(-50%) translateY(0)";
        break;
    }
    this.menu.style.cssText = `display:block;opacity:0;transform:${n};${t}`, requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.menu.style.transition = "opacity 200ms ease, transform 200ms ease", this.menu.style.opacity = "1", this.menu.style.transform = r;
      });
    });
  }
  close() {
    this.isOpen = !1, this.element.classList.remove("open"), this.icon && (this.icon.style.transform = "rotate(0deg)");
    let t = "translateY(-10px)";
    this.position === "center" && (t = "translateX(-50%) translateY(-10px)"), this.menu.style.transition = "opacity 200ms ease, transform 200ms ease", this.menu.style.opacity = "0", this.menu.style.transform = t, setTimeout(() => {
      this.menu.style.display = "none", this.menu.style.transition = "";
    }, 200);
  }
  /**
   * Cleanup method to remove event listeners and prevent memory leaks
   */
  destroy() {
    this.trigger && this.trigger.removeEventListener("click", this.handleTriggerClick), document.removeEventListener("click", this.handleClickAway), document.removeEventListener("keydown", this.handleEscape);
  }
}
const Ne = /* @__PURE__ */ new WeakMap();
function $e() {
  document.querySelectorAll("[data-dropdown]").forEach((t) => {
    const n = new De(t);
    Ne.set(t, n);
  });
}
const b = /* @__PURE__ */ new Set();
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && b.size > 0) {
    const t = Array.from(b).pop();
    T(t);
  }
});
function G(e, t, n, r, o) {
  const i = performance.now();
  function s(a) {
    const l = a - i, c = Math.min(l / r, 1), u = t + (n - t) * c;
    e.style.transform = `translateX(${u}%)`, c < 1 ? requestAnimationFrame(s) : o();
  }
  requestAnimationFrame(s);
}
function Oe() {
  document.querySelectorAll("[data-drawer]").forEach((t) => {
    const n = t.getAttribute("data-drawer"), r = document.querySelectorAll(`[data-drawer-trigger="${n}"]`), o = document.querySelectorAll(`[data-drawer-close="${n}"]`);
    r.forEach((s) => {
      s.addEventListener("click", () => Be(n));
    }), o.forEach((s) => {
      s.addEventListener("click", () => T(n));
    }), t.querySelectorAll("a").forEach((s) => {
      s.addEventListener("click", (a) => {
        s.closest("li[data-submenu]") || _e(n);
      });
    });
  });
}
function Be(e) {
  const t = document.querySelector(`[data-drawer="${e}"]`);
  if (t && (b.add(e), t.style.display = "block", t.style.position = "fixed", t.style.top = "0", t.style.left = "0", t.style.zIndex = "1002", t.style.transform = "translateX(-100%)", document.body.style.overflowY = "hidden", G(t, -100, 0, 200, () => {
  }), t.getAttribute("data-drawer-overlay") === "true")) {
    let n = document.createElement("div");
    n.className = "drawer-overlay", n.style.position = "fixed", n.style.top = "0", n.style.left = "0", n.style.width = "100vw", n.style.height = "100vh", n.style.background = "rgba(0,0,0,0.5)", n.style.zIndex = "999", n.setAttribute("data-drawer-overlay", "true"), n.addEventListener("click", () => T(e)), document.body.prepend(n);
  }
}
function _e(e) {
  const t = document.querySelector(`[data-drawer="${e}"]`);
  if (t) {
    if (b.delete(e), t.style.display = "none", t.style.position = "", t.style.top = "", t.style.left = "", t.style.zIndex = "", t.style.transform = "", t.getAttribute("data-drawer-overlay") === "true") {
      const n = document.querySelector('.drawer-overlay[data-drawer-overlay="true"]');
      n && n.remove();
    }
    document.body.style.overflowY = "";
  }
}
function T(e) {
  const t = document.querySelector(`[data-drawer="${e}"]`);
  if (t) {
    if (b.delete(e), G(t, 0, -100, 300, () => {
      t.style.display = "none", t.style.position = "", t.style.top = "", t.style.left = "", t.style.zIndex = "", t.style.transform = "";
    }), t.getAttribute("data-drawer-overlay") === "true") {
      const n = document.querySelector('.drawer-overlay[data-drawer-overlay="true"]');
      n && n.remove();
    }
    document.body.style.overflowY = "";
  }
}
function Me() {
  document.querySelectorAll("[data-submenu]").forEach((t) => {
    const n = t.querySelector("a"), r = t.querySelector("ul"), o = n == null ? void 0 : n.querySelector("svg");
    !n || !r || (r.style.display = "none", n.addEventListener("click", (i) => {
      i.preventDefault(), Re(t, r, o);
    }));
  });
}
function Re(e, t, n) {
  e.classList.contains("open") ? (t.style.display = "none", e.classList.remove("open"), n && (n.style.transform = "rotate(0deg)")) : (t.style.display = "block", e.classList.add("open"), n && (n.style.transform = "rotate(180deg)"));
}
function Ye(e) {
  const t = {};
  return e && e.split(";").forEach((n) => {
    const [r, o] = n.split(":");
    r && o && (t[r.trim()] = o.trim());
  }), t;
}
function je() {
  document.querySelectorAll("[data-scroll]").forEach((e) => {
    e.addEventListener("click", function(t) {
      const n = Ye(e.getAttribute("data-scroll"));
      let r = n.target || e.getAttribute("href");
      if (r && (r.startsWith("#") || r.startsWith("/#"))) {
        r.startsWith("/#") && (r = r.slice(1));
        const o = document.querySelector(r);
        if (o) {
          t.preventDefault();
          let i = n.offset && parseInt(n.offset, 10) || 0, s = n.speed ? parseFloat(n.speed) : 0;
          const a = o.getBoundingClientRect().top + window.scrollY - i;
          if (s > 0) {
            let d = function(h) {
              const p = h - u, g = Math.min(p / s, 1);
              window.scrollTo(0, l + c * m(g)), g < 1 && requestAnimationFrame(d);
            }, m = function(h) {
              return h < 0.5 ? 2 * h * h : -1 + (4 - 2 * h) * h;
            };
            const l = window.scrollY, c = a - l, u = performance.now();
            requestAnimationFrame(d);
          } else
            window.scrollTo({
              top: a,
              behavior: "smooth"
            });
        }
      }
    });
  });
}
function Ue() {
  document.querySelectorAll("[data-accordion]").forEach((t) => {
    if (t.dataset.supersonicAccordionInit === "true") return;
    t.dataset.supersonicAccordionInit = "true";
    const n = t.getAttribute("data-accordion"), r = {};
    n && n.split(";").forEach((i) => {
      const [s, a] = i.split(":");
      s && a && (r[s.trim()] = a.trim() === "true");
    });
    const o = t.querySelectorAll(".accordion-item");
    o.forEach((i) => {
      const s = i.querySelector(".accordion-title"), a = i.querySelector(".accordion-content");
      if (s && a) {
        if (i.dataset.supersonicAccordionBound === "true") return;
        i.dataset.supersonicAccordionBound = "true", a.style.maxHeight = i.classList.contains("open") ? `${a.scrollHeight}px` : "0", a.style.transition = "max-height 0.3s ease-out", s.addEventListener("click", () => {
          const c = i.classList.contains("open");
          r.multiple ? c ? (i.classList.remove("open"), a.style.maxHeight = "0") : (i.classList.add("open"), a.style.maxHeight = `${a.scrollHeight}px`) : (o.forEach((u) => {
            u.classList.remove("open");
            const d = u.querySelector(".accordion-content");
            d && (d.style.maxHeight = "0");
          }), c || (i.classList.add("open"), a.style.maxHeight = `${a.scrollHeight}px`));
        });
        const l = i.querySelector("[data-accordion-close]");
        l && l.addEventListener("click", (c) => {
          c.stopPropagation(), i.classList.remove("open"), a.style.maxHeight = "0";
        });
      }
    });
  });
}
const f = typeof window != "undefined" ? window : globalThis;
f.supersonic || (f.supersonic = {});
f.supersonic.init = X;
function X(e = {}) {
  const t = {
    i18n: {},
    lang: document.documentElement.lang || "en",
    gtm: null,
    swal: !1
  }, n = y(y({}, t), e);
  f.supersonic = O(y(y({}, f.supersonic), n), {
    init: X
  }), f.supersonic.newForm = be, f.supersonic.isLocal = H(), f.supersonic.utility = ee, f.supersonic.animations = ke, f.supersonic.ui = {}, f.supersonic.ui.observeElement = Le, f.supersonic.ui.onlyAllowNumbers = re;
  const r = [
    { name: "gtm", function: () => Ee(f.supersonic.gtm) },
    // Google Tag Manager
    { name: "swal", function: () => Se() },
    // Load SweetAlert library
    { name: "stickyNavbar", function: () => Fe() },
    // Sticky navbar
    { name: "viewportAnimations", function: () => qe() },
    // Viewport animations
    { name: "dropdowns", function: () => $e() },
    // Dropdowns
    { name: "drawers", function: () => Oe() },
    // Drawers
    { name: "submenus", function: () => Me() },
    // Submenus
    { name: "scroll", function: () => je() },
    // Smooth scroll
    { name: "accordions", function: () => Ue() }
    // Accordions
  ], o = () => {
    r.forEach((s) => {
      s.function();
    });
  };
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", o, { once: !0 }) : o(), f.__supersonicLifecycleBound || (document.addEventListener("astro:after-swap", o), document.addEventListener("astro:page-load", o), document.addEventListener("htmx:afterSwap", o), document.addEventListener("htmx:afterSettle", o), document.addEventListener("htmx:afterRequest", o), f.__supersonicLifecycleBound = !0);
}
export {
  X as init
};
