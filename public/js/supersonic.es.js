var Z = Object.defineProperty, J = Object.defineProperties;
var ee = Object.getOwnPropertyDescriptors;
var D = Object.getOwnPropertySymbols;
var te = Object.prototype.hasOwnProperty, ne = Object.prototype.propertyIsEnumerable;
var _ = (e, t, n) => t in e ? Z(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, g = (e, t) => {
  for (var n in t || (t = {}))
    te.call(t, n) && _(e, n, t[n]);
  if (D)
    for (var n of D(t))
      ne.call(t, n) && _(e, n, t[n]);
  return e;
}, O = (e, t) => J(e, ee(t));
var L = (e, t, n) => new Promise((r, o) => {
  var i = (c) => {
    try {
      a(n.next(c));
    } catch (l) {
      o(l);
    }
  }, s = (c) => {
    try {
      a(n.throw(c));
    } catch (l) {
      o(l);
    }
  }, a = (c) => c.done ? r(c.value) : Promise.resolve(c.value).then(i, s);
  a((n = n.apply(e, t)).next());
});
const re = {
  setCookie: oe,
  getCookie: ie
};
function W() {
  return window.location.hostname === "localhost";
}
function oe(e, t, n, r = {}) {
  const {
    path: o = "/",
    sameSite: i = "Lax",
    secure: s = window.location.protocol === "https:"
  } = r, a = n ? `expires=${new Date(Date.now() + n * 864e5).toUTCString()};` : "", c = s ? "Secure;" : "";
  document.cookie = `${e}=${encodeURIComponent(t)};${a}path=${o};SameSite=${i};${c}`;
}
function ie(e) {
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
function se(e = null) {
  const t = e ? document.querySelector(e) : event.target;
  t.value = t.value.replace(/\D/g, "");
}
function k(e, t = "", n = {}) {
  var o, i, s;
  let r = (s = (i = (o = window.supersonic) == null ? void 0 : o.i18n) == null ? void 0 : i[e]) != null ? s : t || e;
  return n && typeof n == "object" && (r = r.replace(/\{(\w+)\}/g, (a, c) => n[c] !== void 0 ? n[c] : a)), r;
}
const B = {
  validate: ae,
  validateNumbCaptcha: ue
};
function ae(e) {
  let t = [];
  return e.forEach((n) => {
    let r = K(n);
    r && t.push(r);
  }), t;
}
function K(e) {
  let t = k("invalid_email", "Invalid email address"), n = k("required_field", 'This field is required"'), r = e.getAttribute("type"), o = ce(e), i = le(e.value);
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
function ce(e) {
  let t = e.hasAttribute("required"), n = e.value;
  return !(t && n === "");
}
function le(e) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(e).toLowerCase());
}
function ue(e) {
  let t = document.getElementById(e);
  if (!t) return !0;
  let n = t.querySelector("input[name='numb_captcha']");
  if (!n) return !0;
  let r = t.querySelector("input[name='num1']"), o = t.querySelector("input[name='num2']");
  if (!r || !o) return !1;
  let i = r.value, s = o.value, a = n.value;
  return a === "" ? !1 : Number(i) + Number(s) === Number(a);
}
function A(e) {
  return document.getElementById(e).querySelectorAll("input, select, textarea, file");
}
function de(e, t = null) {
  let n = A(e), r = new FormData();
  if (t)
    for (const o in t) r.append(o, t[o]);
  return n.forEach((o) => {
    let i = o.getAttribute("type"), s = o.getAttribute("name");
    i === "file" ? r.append(s, o.files[0]) : i === "checkbox" ? o.checked && r.append(s, o.value) : r.append(s, o.value);
  }), r;
}
function fe(e) {
  A(e).forEach((n) => {
    let r = n.getAttribute("type");
    r !== "submit" && r !== "hidden" && r !== "button" && (n.value = ""), r == "checkbox" && (n.checked = !1);
  });
}
function me(e) {
  e.forEach((t) => {
    G(t);
  });
}
function G(e) {
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
function pe(e) {
  e.forEach((t) => {
    V(t);
  });
}
function V(e) {
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
  V(e);
  let t = K(e);
  t && G(t);
}
function he(e) {
  A(e).forEach((n) => {
    n.dataset.supersonicWatchBound !== "true" && (n.addEventListener("keyup", () => {
      q(n);
    }), n.addEventListener("change", () => {
      q(n);
    }), n.addEventListener("blur", () => {
      q(n);
    }), n.dataset.supersonicWatchBound = "true");
  });
}
function ye(e) {
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
function ge(e) {
  return e.status === "success" || e.code === 200 || e.code === "success" || e.status === 200 || e.code === "ok" || e.code === "OK";
}
function we(e) {
  return e.status === "error" || e.code === 400 || e.code === "error" || e.status === 400 || e.code === "error" || e.code === "ERROR";
}
function M(e, t) {
  Swal.fire({
    toast: !0,
    position: "top-end",
    icon: e,
    title: t,
    showConfirmButton: !1,
    timer: 3e3
  });
}
function ve(e) {
  e && Array.isArray(e) ? e.forEach((n) => {
    M("error", n);
  }) : typeof e == "string" && M("error", e);
}
function be(e, t = "#333") {
  Swal.fire({
    html: e,
    icon: "error",
    confirmButtonText: k("ok", "OK"),
    confirmButtonColor: t
  });
}
function Ee(e, t = "#333") {
  Swal.fire({
    html: e,
    icon: "success",
    confirmButtonText: k("ok", "OK"),
    confirmButtonColor: t
  });
}
function R(e) {
  if (W() && console.log(e), e.fields && pe(e.fields), e.clientSideErrors && e.clientSideErrors.length > 0) {
    me(e.clientSideErrors);
    return;
  }
  if (e.errors && e.errors.length > 0) {
    e.errors.forEach((t) => {
    });
    return;
  }
  if (we(e) && (S("supersonic:AjaxResponseError", e), e.responseType == "swal" && Swal && (e.message ? ve(e.message) : e.body && be(e.body, "#333"))), ge(e)) {
    if (S("supersonic:AjaxResponseSuccess", e), e.responseType == "swal" && Swal) {
      let t = e.body ? e.body : `<p>${e.message}</p>`;
      Ee(t, "#333");
    }
    setTimeout(() => {
      fe(e.form_css_id);
    }, 300);
  }
}
function Y() {
  return L(this, arguments, function* (e = {}, t = null) {
    var I, C, N, F, $;
    t.preventDefault();
    let n = (I = e.method) != null ? I : "POST", r = (C = e.data) != null ? C : null, o = e.submitButton ? document.querySelector(e.submitButton) : t.target, i = (N = e.formId) != null ? N : null, s = (F = e.ajaxUrl) != null ? F : null, a = e.indicator ? document.querySelector(e.indicator) : null, c = !!(e.recaptcha && e.recaptcha != "false"), l = e.recaptcha_site_key ? e.recaptcha_site_key : null, u = ($ = e.responseType) != null ? $ : "default", d = e.callback ? e.callback : null;
    if (!i) {
      console.error("Form ID is required");
      return;
    }
    if (!s) {
      console.error("Ajax URL is required");
      return;
    }
    o && o.setAttribute("disabled", "disabled");
    let f = document.getElementById(i);
    const p = A(i);
    a && a.classList.remove("hidden");
    let m = B.validate(p);
    if (!B.validateNumbCaptcha(i)) {
      let v = f.querySelector("input[name='numb_captcha']");
      m.push({
        name: "numb_captcha",
        error: "Invalid captcha",
        formId: i,
        field: v
      });
    }
    if (m.length > 0)
      return o.removeAttribute("disabled"), a && a.classList.add("hidden"), R({ clientSideErrors: m });
    let E = de(i);
    if (r)
      for (const v in r) E.append(v, r[v]);
    if (c && l) {
      let v = yield grecaptcha.execute(l, { action: "submit" });
      E.append("recaptcha_response", v);
    }
    if (S("astronomic:FormSubmitBefore", E).defaultPrevented) {
      a && (a.classList.add("uk-hidden"), a.classList.add("hidden"), o.removeAttribute("disabled"));
      return;
    }
    let w = yield (yield fetch(s, {
      method: n,
      cache: "no-cache",
      body: E
    })).json();
    return w.form_css_id = i, w.responseType = u, d ? d(w) : R(w), S("astronomic:FormSubmitAfter", w), a && (a.classList.add("uk-hidden"), a.classList.add("hidden")), setTimeout(() => {
      o.removeAttribute("disabled");
    }, 2e3), w;
  });
}
const Se = {
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
class ke {
  constructor(t = {}) {
    if (this.options = g(g({}, Se), t), !this.options.formId) {
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
    he(this.options.formId), ye(this.options.formId), this.init();
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
          o.preventDefault(), Y(this.options, o);
        }), r.dataset.supersonicFormBound = "true");
      }), n && n.dataset.supersonicFormSubmitBound !== "true" && (n.addEventListener("submit", (r) => {
        r.preventDefault(), Y(this.options, r);
      }), n.dataset.supersonicFormSubmitBound = "true");
    });
  }
}
function Ae(e) {
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
function Le() {
  return new Promise((e, t) => {
    if (window.Swal) return e(window.Swal);
    const n = document.createElement("script");
    n.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11", n.defer = !0, n.onload = () => e(window.Swal), n.onerror = t, document.head.appendChild(n);
  });
}
function qe(e, { duration: t = 1500, decimals: n = 0 } = {}) {
  const r = +e.dataset.countTo || 0, o = 0, i = performance.now(), s = new Intl.NumberFormat(void 0, {
    minimumFractionDigits: n,
    maximumFractionDigits: n
  });
  function a(c) {
    const l = Math.min((c - i) / t, 1), u = 1 - Math.pow(1 - l, 3), d = o + (r - o) * u;
    e.textContent = s.format(l < 1 ? d : r), l < 1 && requestAnimationFrame(a);
  }
  requestAnimationFrame(a);
}
const Te = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  counter: qe
}, Symbol.toStringTag, { value: "Module" }));
function xe(e) {
  const t = e.selector, n = e.root || null, r = e.rootMargin || "0px", o = e.threshold || 0.2, i = e.repeat || !1, s = e.onEnter || null, a = document.querySelectorAll(t);
  if (!a.length) {
    console.warn(`No elements found with selector "${t}".`);
    return;
  }
  const c = new IntersectionObserver((l, u) => {
    l.forEach((d) => {
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
  a.forEach((l) => c.observe(l));
}
function Ie(e) {
  const n = g(g({}, {
    selector: "[data-viewport-animation]",
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
    repeat: !1
  }), e), { selector: r, root: o, rootMargin: i, threshold: s, repeat: a } = n, c = document.querySelectorAll(r);
  if (!c.length)
    return;
  const l = new IntersectionObserver((u, d) => {
    requestAnimationFrame(() => {
      u.forEach((f) => {
        f.isIntersecting ? (f.target.classList.add("in-view"), U(f.target, !0), a || d.unobserve(f.target)) : a && (f.target.classList.remove("in-view"), U(f.target, !1));
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
  c.forEach((u) => l.observe(u));
}
function Ce(e) {
  const t = {};
  return e && e.split(";").forEach((n) => {
    const [r, o] = n.split(":");
    r && o && (t[r.trim()] = o.trim());
  }), t;
}
const j = (e, t) => {
  const n = e.getAttribute("data-viewport-animation"), r = Ce(n), o = r.animation;
  if (!o) return;
  let i = r.delay ? `${r.delay}ms` : "0ms", s = r.duration ? `${r.duration}ms` : "";
  t ? (e.style.animationDelay = i, e.style.animationDuration = s, e.classList.add("animate", o)) : (e.style.animationDelay = "", e.style.animationDuration = "", e.classList.remove("animate", o));
}, U = (e, t) => {
  j(e, t), e.querySelectorAll("[data-viewport-animation]").forEach((n) => {
    j(n, t);
  });
}, H = 300, Ne = 50, T = "is-sticky";
function Fe(e, t = {}) {
  const {
    threshold: n = 100,
    offset: r = 0,
    stickyOnTop: o = !1
  } = t;
  let i = 0, s = null, a = null, c = !1, l = null;
  const u = document.createElement("div");
  u.className = "sticky-navbar-placeholder", u.style.cssText = "display:none;height:0;visibility:hidden", e.parentNode.insertBefore(u, e.nextSibling), e.style.transition = `transform ${H}ms ease-out`;
  function d() {
    c || (l || (l = e.offsetHeight), c = !0, e.classList.add(T), e.style.cssText += `position:fixed;top:${r}px;left:0;right:0;z-index:1000;transform:translateY(-100%)`, u.style.cssText = `display:block;height:${l}px;visibility:hidden`, requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        c && (e.style.transform = "translateY(0)");
      });
    }));
  }
  function f() {
    c && (a && clearTimeout(a), e.style.transform = "translateY(-100%)", a = setTimeout(() => {
      if (!c) return;
      const m = e.style.transition;
      e.style.cssText = "", e.style.transition = m, u.style.cssText = "display:none;height:0;visibility:hidden", e.classList.remove(T), c = !1, a = null;
    }, H));
  }
  function p() {
    s && clearTimeout(s), s = setTimeout(() => {
      const m = window.pageYOffset || document.documentElement.scrollTop;
      if (m <= n) {
        c && f(), i = m;
        return;
      }
      if (m === i)
        return;
      const y = m < i;
      o ? y && !c ? d() : !y && c && f() : c || d(), i = m;
    }, Ne);
  }
  return window.addEventListener("scroll", p, { passive: !0 }), () => {
    window.removeEventListener("scroll", p), s && (clearTimeout(s), s = null), a && (clearTimeout(a), a = null), u && u.parentNode && u.parentNode.removeChild(u), e.classList.remove(T), c = !1;
  };
}
function $e(e) {
  const t = {};
  return !e || e === "" || e.split(";").forEach((n) => {
    const [r, o] = n.split(":");
    if (r && o) {
      const i = r.trim(), s = o.trim();
      s === "true" ? t[i] = !0 : s === "false" ? t[i] = !1 : t[i] = s;
    }
  }), t;
}
function De(e = "[data-navbar-sticky]") {
  const t = document.querySelector(e);
  if (!t)
    return null;
  const n = $e(t.getAttribute("data-navbar-sticky")), r = {
    threshold: n.threshold ? parseInt(n.threshold) : 100,
    offset: n.offset ? parseInt(n.offset) : 0,
    stickyOnTop: n.stickyOnTop === !0
  };
  return Fe(t, r);
}
const z = "is-sticky";
function _e(e) {
  const t = {};
  return !e || e === "" || e.split(";").forEach((n) => {
    const [r, o] = n.split(":");
    if (!r || !o)
      return;
    const i = r.trim(), s = o.trim();
    s === "true" ? t[i] = !0 : s === "false" ? t[i] = !1 : Number.isNaN(Number(s)) ? t[i] = s : t[i] = Number(s);
  }), t;
}
function P(e = "[data-sticky]") {
  const t = Array.from(document.querySelectorAll(e));
  if (!t.length)
    return [];
  const n = () => window.matchMedia("(min-width: 1024px)").matches;
  return t.map((o) => {
    var p;
    const i = o.getAttribute("data-sticky"), a = (p = _e(i).offset) != null ? p : 0, c = o.offsetTop;
    let l = !1;
    const u = () => {
      const m = o.parentElement, y = m ? m.getBoundingClientRect() : null;
      o.classList.add(z), o.style.position = "fixed", o.style.top = `${a}px`, o.style.zIndex = "1000", y ? (o.style.left = `${y.left}px`, o.style.width = `${y.width}px`) : (o.style.left = "0", o.style.width = "100%");
    }, d = () => {
      o.classList.remove(z), o.style.position = "", o.style.top = "", o.style.left = "", o.style.zIndex = "", o.style.width = "";
    }, f = () => {
      if (!n()) {
        l && (d(), l = !1);
        return;
      }
      const m = window.scrollY >= c - a;
      m && !l ? (u(), l = !0) : !m && l && (d(), l = !1);
    };
    return f(), window.addEventListener("scroll", f, { passive: !0 }), window.addEventListener("resize", f), () => {
      window.removeEventListener("scroll", f), window.removeEventListener("resize", f), d();
    };
  });
}
class Oe {
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
const Be = /* @__PURE__ */ new WeakMap();
function Me() {
  document.querySelectorAll("[data-dropdown]").forEach((t) => {
    const n = new Oe(t);
    Be.set(t, n);
  });
}
const b = /* @__PURE__ */ new Set();
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && b.size > 0) {
    const t = Array.from(b).pop();
    x(t);
  }
});
function X(e, t, n, r, o) {
  const i = performance.now();
  function s(a) {
    const c = a - i, l = Math.min(c / r, 1), u = t + (n - t) * l;
    e.style.transform = `translateX(${u}%)`, l < 1 ? requestAnimationFrame(s) : o();
  }
  requestAnimationFrame(s);
}
function Re() {
  document.querySelectorAll("[data-drawer]").forEach((t) => {
    const n = t.getAttribute("data-drawer"), r = document.querySelectorAll(`[data-drawer-trigger="${n}"]`), o = document.querySelectorAll(`[data-drawer-close="${n}"]`);
    r.forEach((s) => {
      s.addEventListener("click", () => Ye(n));
    }), o.forEach((s) => {
      s.addEventListener("click", () => x(n));
    }), t.querySelectorAll("a").forEach((s) => {
      s.addEventListener("click", (a) => {
        s.closest("li[data-submenu]") || je(n);
      });
    });
  });
}
function Ye(e) {
  const t = document.querySelector(`[data-drawer="${e}"]`);
  if (t && (b.add(e), t.style.display = "block", t.style.position = "fixed", t.style.top = "0", t.style.left = "0", t.style.zIndex = "1002", t.style.transform = "translateX(-100%)", document.body.style.overflowY = "hidden", X(t, -100, 0, 200, () => {
  }), t.getAttribute("data-drawer-overlay") === "true")) {
    let n = document.createElement("div");
    n.className = "drawer-overlay", n.style.position = "fixed", n.style.top = "0", n.style.left = "0", n.style.width = "100vw", n.style.height = "100vh", n.style.background = "rgba(0,0,0,0.5)", n.style.zIndex = "999", n.setAttribute("data-drawer-overlay", "true"), n.addEventListener("click", () => x(e)), document.body.prepend(n);
  }
}
function je(e) {
  const t = document.querySelector(`[data-drawer="${e}"]`);
  if (t) {
    if (b.delete(e), t.style.display = "none", t.style.position = "", t.style.top = "", t.style.left = "", t.style.zIndex = "", t.style.transform = "", t.getAttribute("data-drawer-overlay") === "true") {
      const n = document.querySelector('.drawer-overlay[data-drawer-overlay="true"]');
      n && n.remove();
    }
    document.body.style.overflowY = "";
  }
}
function x(e) {
  const t = document.querySelector(`[data-drawer="${e}"]`);
  if (t) {
    if (b.delete(e), X(t, 0, -100, 300, () => {
      t.style.display = "none", t.style.position = "", t.style.top = "", t.style.left = "", t.style.zIndex = "", t.style.transform = "";
    }), t.getAttribute("data-drawer-overlay") === "true") {
      const n = document.querySelector('.drawer-overlay[data-drawer-overlay="true"]');
      n && n.remove();
    }
    document.body.style.overflowY = "";
  }
}
function Ue() {
  document.querySelectorAll("[data-submenu]").forEach((t) => {
    const n = t.querySelector("a"), r = t.querySelector("ul"), o = n == null ? void 0 : n.querySelector("svg");
    !n || !r || (r.style.display = "none", n.addEventListener("click", (i) => {
      i.preventDefault(), He(t, r, o);
    }));
  });
}
function He(e, t, n) {
  e.classList.contains("open") ? (t.style.display = "none", e.classList.remove("open"), n && (n.style.transform = "rotate(0deg)")) : (t.style.display = "block", e.classList.add("open"), n && (n.style.transform = "rotate(180deg)"));
}
function ze(e) {
  const t = {};
  return e && e.split(";").forEach((n) => {
    const [r, o] = n.split(":");
    r && o && (t[r.trim()] = o.trim());
  }), t;
}
function Pe() {
  document.querySelectorAll("[data-scroll]").forEach((e) => {
    e.addEventListener("click", function(t) {
      const n = ze(e.getAttribute("data-scroll"));
      let r = n.target || e.getAttribute("href");
      if (r && (r.startsWith("#") || r.startsWith("/#"))) {
        r.startsWith("/#") && (r = r.slice(1));
        const o = document.querySelector(r);
        if (o) {
          t.preventDefault();
          let i = n.offset && parseInt(n.offset, 10) || 0, s = n.speed ? parseFloat(n.speed) : 0;
          const a = o.getBoundingClientRect().top + window.scrollY - i;
          if (s > 0) {
            let d = function(p) {
              const m = p - u, y = Math.min(m / s, 1);
              window.scrollTo(0, c + l * f(y)), y < 1 && requestAnimationFrame(d);
            }, f = function(p) {
              return p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
            };
            const c = window.scrollY, l = a - c, u = performance.now();
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
function We() {
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
          const l = i.classList.contains("open");
          r.multiple ? l ? (i.classList.remove("open"), a.style.maxHeight = "0") : (i.classList.add("open"), a.style.maxHeight = `${a.scrollHeight}px`) : (o.forEach((u) => {
            u.classList.remove("open");
            const d = u.querySelector(".accordion-content");
            d && (d.style.maxHeight = "0");
          }), l || (i.classList.add("open"), a.style.maxHeight = `${a.scrollHeight}px`));
        });
        const c = i.querySelector("[data-accordion-close]");
        c && c.addEventListener("click", (l) => {
          l.stopPropagation(), i.classList.remove("open"), a.style.maxHeight = "0";
        });
      }
    });
  });
}
const h = typeof window != "undefined" ? window : globalThis;
h.supersonic || (h.supersonic = {});
h.supersonic.init = Q;
function Q(e = {}) {
  const t = {
    i18n: {},
    lang: document.documentElement.lang || "en",
    gtm: null,
    swal: !1
  }, n = g(g({}, t), e);
  h.supersonic = O(g(g({}, h.supersonic), n), {
    init: Q
  }), h.supersonic.newForm = ke, h.supersonic.isLocal = W(), h.supersonic.utility = re, h.supersonic.animations = Te, h.supersonic.ui = {}, h.supersonic.ui.observeElement = xe, h.supersonic.ui.onlyAllowNumbers = se;
  const r = [
    { name: "gtm", function: () => Ae(h.supersonic.gtm) },
    // Google Tag Manager
    { name: "swal", function: () => Le() },
    // Load SweetAlert library
    { name: "stickyNavbar", function: () => De() },
    // Sticky navbar
    { name: "sticky", function: () => P() },
    // Generic sticky elements
    { name: "viewportAnimations", function: () => Ie() },
    // Viewport animations
    { name: "dropdowns", function: () => Me() },
    // Dropdowns
    { name: "drawers", function: () => Re() },
    // Drawers
    { name: "submenus", function: () => Ue() },
    // Submenus
    { name: "scroll", function: () => Pe() },
    // Smooth scroll
    { name: "accordions", function: () => We() },
    // Accordions
    { ane: "sticky", function: () => P() }
    // Sticky elements
  ], o = () => {
    r.forEach((s) => {
      s.function();
    });
  };
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", o, { once: !0 }) : o(), h.__supersonicLifecycleBound || (document.addEventListener("astro:after-swap", o), document.addEventListener("astro:page-load", o), document.addEventListener("htmx:afterSwap", o), document.addEventListener("htmx:afterSettle", o), document.addEventListener("htmx:afterRequest", o), h.__supersonicLifecycleBound = !0);
}
export {
  Q as init
};
