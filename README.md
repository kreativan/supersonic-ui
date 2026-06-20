# Supersonic UI

Supersonic UI is a lightweight UI library and helper toolkit for the web. It is designed for marketing sites, landing pages, and content-driven websites that need polished interactions without a heavy frontend setup. The JavaScript components are activated with data-* attributes, the package includes form handling and validation helpers, and the styling is intentionally minimal while working well with Tailwind CSS.

## What it is

- No build step required for the browser version
- Works by including a script and stylesheet on the page
- Data-attribute driven UI components such as accordions, dropdowns, drawers, scroll behavior, and more
- Includes form helpers for validation, submission, and AJAX response handling
- Great fit for Astro projects, static websites, and landing pages

## Build locally

Install dependencies:

```bash
npm install
```

Build the library bundles:

```bash
npm run supersonic:build
```

This will generate:

- dist/js/supersonic.es.js
- dist/js/supersonic.umd.js
- dist/css/supersonic.css
- dist/css/supersonic.min.css

## Include from a CDN

### CSS

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@kreativan/supersonic-ui@0.0.1/dist/css/supersonic.min.css">
```

### JavaScript

```html
<script src="https://cdn.jsdelivr.net/npm/@kreativan/supersonic-ui@0.0.1/dist/js/supersonic.umd.js"></script>
<script>
  window.supersonic?.init?.();
</script>
```

## Install from npm

```bash
npm install @kreativan/supersonic-ui
```

## Usage

Once included, you can use the data-attribute based components directly in your markup. For example:

```html
<button data-dropdown-trigger>Open menu</button>
<div data-dropdown>
  <div data-dropdown-content>Content</div>
</div>
```

For forms, initialize the library once and use the built-in helpers as needed.
