// Dynamically load SweetAlert2
export default function loadSweetAlert() {
  return new Promise((resolve, reject) => {
    if (window.Swal) return resolve(window.Swal); // Already loaded

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
    script.defer = true;
    script.onload = () => resolve(window.Swal);
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
