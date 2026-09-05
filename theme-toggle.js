// ライト/ダーク表示切り替え。localStorageに保存し、次回訪問時も引き継ぐ。
// 保存がなければOS設定(prefers-color-scheme)に従う。
(function () {
  "use strict";
  var KEY = "tinywonders-theme";
  var root = document.documentElement;

  function getStored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function setStored(value) {
    try { localStorage.setItem(KEY, value); } catch (e) {}
  }
  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function isDarkNow() {
    var explicit = root.getAttribute("data-theme");
    if (explicit === "dark") return true;
    if (explicit === "light") return false;
    return systemPrefersDark();
  }

  var SUN_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.6M12 18.9v2.6M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2.5 12h2.6M18.9 12h2.6M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8"/></svg>';
  var MOON_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><path d="M15.5 4a8 8 0 1 0 4.5 14.6A9 9 0 0 1 15.5 4z"/></svg>';

  var stored = getStored();
  if (stored === "dark" || stored === "light") {
    root.setAttribute("data-theme", stored);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;

    function render() {
      var dark = isDarkNow();
      btn.innerHTML = dark ? SUN_ICON : MOON_ICON;
      btn.setAttribute("aria-label", dark ? "ライト表示に切り替える" : "ダーク表示に切り替える");
    }

    btn.addEventListener("click", function () {
      var next = isDarkNow() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      setStored(next);
      render();
    });

    render();
  });
})();
