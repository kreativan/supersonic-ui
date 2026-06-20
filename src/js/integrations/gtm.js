export default function loadGTM(gtmId) {
  if (!gtmId) return;

  if (!gtmId || !/^GTM-[A-Z0-9]+$/.test(gtmId)) {
    console.error('Invalid GTM ID');
    return;
  }

  try {
    // Initialize dataLayer if it doesn't exist
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });

    // Create and inject the GTM script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
    script.onerror = () => console.error('Failed to load GTM script');
    document.head.appendChild(script); // Use head for safer injection

    // Create and inject noscript fallback
    if (document.body) {
      const noscript = document.createElement('noscript');
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`;
      iframe.height = '0';
      iframe.width = '0';
      iframe.style.display = 'none';
      iframe.style.visibility = 'hidden';
      noscript.appendChild(iframe);
      document.body.appendChild(noscript); // Append at end of body
    }
  } catch (error) {
    console.error('Error loading GTM:', error);
  }
}