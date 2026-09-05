// GA4計測(共有スニペット)。ローカル開発サーバーからのアクセスは除外し、本番GA4へのダミーpageview記録を防ぐ。
// GA4プロパティ「診断ツール群」(549448334)に新規ウェブストリーム「Tiny Wonders」を作成済み(2026-09-05)。
(function () {
  const GA_MEASUREMENT_ID = 'G-EXYBLFK9WX';
  const isLocalDev = ['localhost', '127.0.0.1', ''].includes(location.hostname);
  if (!GA_MEASUREMENT_ID || isLocalDev) return;
  const gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(gaScript);
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, { page_location: location.origin + location.pathname });
})();
