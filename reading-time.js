(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var article = document.querySelector(".article-card");
    var dateEl = document.querySelector(".article-date");
    if (!article || !dateEl) return;

    var text = article.textContent || "";
    var chars = text.replace(/\s+/g, "").length;
    // 日本語の黙読速度はおよそ400〜600字/分、500字/分を目安に概算する
    var minutes = Math.max(1, Math.round(chars / 500));

    var badge = document.createElement("span");
    badge.className = "reading-time-badge";
    badge.textContent = "📖 読了目安 " + minutes + "分";
    dateEl.insertAdjacentElement("afterend", badge);
  });
})();
