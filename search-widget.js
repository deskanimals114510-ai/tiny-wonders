(function () {
  "use strict";

  // pagefind/はこのファイル(search-widget.js)と同じapp直下に常に存在する。
  // dynamic import()は「ページのURL」ではなく「このスクリプト自身のURL」基準で相対解決されるため、
  // ページの階層(ルート直下/1階層下)に関わらず、このファイルの絶対URLを起点に解決する。
  var SCRIPT_URL = document.currentScript ? document.currentScript.src : null;

  document.addEventListener("DOMContentLoaded", function () {
    var input = document.getElementById("site-search-input");
    var resultsEl = document.getElementById("site-search-results");
    if (!input || !resultsEl || !SCRIPT_URL) return;

    var pagefindPromise = null;
    function loadPagefind() {
      if (!pagefindPromise) {
        var pagefindUrl = new URL("pagefind/pagefind.js", SCRIPT_URL);
        // GitHub Pagesのプロジェクトサイト(/tiny-wonders/配下)でも正しい結果URLになるよう、
        // pagefind.jsの実際の解決先パスからbundlePath/baseUrlを自動算出する(ローカルdevサーバーとの両対応)。
        var bundlePath = pagefindUrl.pathname.replace(/pagefind\.js$/, "");
        var baseUrl = bundlePath.replace(/pagefind\/$/, "");
        pagefindPromise = import(pagefindUrl.href).then(function (mod) {
          return Promise.resolve(mod.options({ bundlePath: bundlePath, baseUrl: baseUrl })).then(function () {
            mod.init();
            return mod;
          });
        });
      }
      return pagefindPromise;
    }

    var debounceTimer = null;
    var requestId = 0;

    function renderResults(results) {
      if (!results.length) {
        resultsEl.innerHTML = '<p class="site-search-empty">一致する記事が見つかりませんでした。</p>';
        resultsEl.hidden = false;
        return;
      }
      Promise.all(results.slice(0, 8).map(function (r) { return r.data(); })).then(function (items) {
        resultsEl.innerHTML = items.map(function (item) {
          var title = (item.meta && item.meta.title) || item.url;
          return '<a class="site-search-result" href="' + item.url + '">' +
            '<span class="site-search-result-title">' + title + '</span>' +
            '<span class="site-search-result-excerpt">' + item.excerpt + '</span>' +
            "</a>";
        }).join("");
        resultsEl.hidden = false;
      });
    }

    function runSearch(query) {
      var myId = ++requestId;
      loadPagefind()
        .then(function (pagefind) { return pagefind.search(query); })
        .then(function (res) {
          if (myId !== requestId) return;
          renderResults(res.results);
        })
        .catch(function () {
          if (myId !== requestId) return;
          resultsEl.innerHTML = '<p class="site-search-empty">検索機能の読み込みに失敗しました。</p>';
          resultsEl.hidden = false;
        });
    }

    input.addEventListener("input", function () {
      var query = input.value.trim();
      clearTimeout(debounceTimer);
      if (!query) {
        requestId++;
        resultsEl.hidden = true;
        resultsEl.innerHTML = "";
        return;
      }
      debounceTimer = setTimeout(function () { runSearch(query); }, 250);
    });

    input.addEventListener("focus", function () {
      loadPagefind();
      if (input.value.trim() && resultsEl.innerHTML) resultsEl.hidden = false;
    });

    document.addEventListener("click", function (e) {
      if (!e.target.closest(".site-search")) {
        resultsEl.hidden = true;
      }
    });
  });
})();
