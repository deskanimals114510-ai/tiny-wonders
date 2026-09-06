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
  // location.hrefでUTMパラメータ(?utm_source=...等)を保持する。Tiny Wondersに内部クエリ文字列ルーティングはないため安全。
  window.gtag('config', GA_MEASUREMENT_ID, { page_location: location.href });

  // 送客リンク(外部ドメインへのクリック)を計測。フッターCTA・Desk Animalsファミリーカード・
  // 記事シェアボタン等、サイト全体のoutboundリンクをここ1箇所で一括カバーする。
  document.addEventListener('click', function (e) {
    const a = e.target.closest('a[href]');
    if (!a) return;
    let url;
    try { url = new URL(a.getAttribute('href'), location.href); } catch (err) { return; }
    if (url.hostname === location.hostname) return;
    const linkText = (a.textContent || '').trim().slice(0, 100);
    const isShare = /twitter\.com\/intent|line\.me\/lineit\/share/.test(url.href);
    if (isShare) {
      window.gtag('event', 'share', {
        method: url.hostname.includes('line.me') ? 'line' : 'x',
        content_type: 'article',
        item_id: location.pathname
      });
    } else {
      window.gtag('event', 'outbound_click', {
        link_url: url.href,
        link_domain: url.hostname,
        link_text: linkText
      });
    }
  }, true);

  // 換算ツール・診断ツールのページから呼び出す共通ヘルパー(tool_start/tool_complete)。
  window.TWTrack = function (eventName, params) {
    if (typeof window.gtag === 'function') window.gtag('event', eventName, params || {});
  };
})();
