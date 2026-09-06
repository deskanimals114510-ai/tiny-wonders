// うちの子なまえ診断 — 名前の文字コードから8タイプのうち1つを判定する簡易診断。
// 言語学的な名前占いではなく、内部エンゲージメント用の軽量コンテンツです。

(function () {
  "use strict";

  var TYPES = [
    { name: "太陽タイプ", desc: "元気いっぱいで、そこにいるだけで場を明るくする。", descEn: "A ray of sunshine, full of energy and always brightening the room." },
    { name: "まんまるタイプ", desc: "おっとりマイペースで、そばにいるだけで癒される。", descEn: "Round and gentle, easygoing and calming just by being nearby." },
    { name: "きらきらタイプ", desc: "好奇心旺盛で、いつも新しいものに目を輝かせる。", descEn: "Sparkly and curious, always chasing the next new thing." },
    { name: "そよ風タイプ", desc: "おだやかでマイペース、争いごとが苦手。", descEn: "A gentle breeze, calm and easygoing, avoids conflict." },
    { name: "わんぱくタイプ", desc: "元気があり余っていて、いたずら好き。", descEn: "A little troublemaker, bursting with energy and mischief." },
    { name: "ミステリアスタイプ", desc: "気まぐれでつかみどころがない、でもそこが魅力。", descEn: "Mysterious and moody, unpredictable, and that's the charm." },
    { name: "あまえんぼうタイプ", desc: "甘えん坊で、いつも誰かのそばにいたい。", descEn: "A total cuddle-bug, always wants to be close to someone." },
    { name: "しっかり者タイプ", desc: "落ち着きがあり、頼れる存在。", descEn: "Calm and dependable, the reliable one of the group." }
  ];

  function buildShareRow(text, url) {
    var tweetUrl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text) + "&url=" + encodeURIComponent(url);
    var lineUrl = "https://social-plugins.line.me/lineit/share?url=" + encodeURIComponent(url);
    return '<div class="share-row">' +
      '<a class="link-btn-secondary" href="' + tweetUrl + '" target="_blank" rel="noopener">Xでシェア</a>' +
      '<a class="link-btn-secondary" href="' + lineUrl + '" target="_blank" rel="noopener">LINEでシェア</a>' +
      '</div>';
  }

  function hashName(name) {
    var sum = 0;
    for (var i = 0; i < name.length; i++) {
      sum += name.charCodeAt(i) * (i + 1);
    }
    return sum;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("namae-form");
    var input = document.getElementById("namae-input");
    var resultBox = document.getElementById("namae-result");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = input.value.trim();
      if (!name) {
        resultBox.hidden = false;
        resultBox.innerHTML = '<p class="result-note">なまえを入力してください。</p>';
        return;
      }
      var species = (document.querySelector('input[name="namae-species"]:checked') || {}).value || "dog";
      var speciesLabel = species === "dog" ? "愛犬" : "愛猫";
      var type = TYPES[hashName(name) % TYPES.length];

      var shareText = speciesLabel + "「" + name + "」は「" + type.name + "」でした! | Tiny Wonders なまえ診断";
      var pageUrl = "https://deskanimals114510-ai.github.io/tiny-wonders/namae-shindan.html";

      resultBox.innerHTML =
        '<p class="result-sub">「' + name + '」の音から診断すると...</p>' +
        '<p class="result-headline"><strong>' + type.name + '</strong></p>' +
        '<p class="result-note">' + type.desc + '<br><span class="tagline-en">' + type.descEn + '</span></p>' +
        '<p class="result-note">※音の響きから連想する遊び感覚の簡易診断です。実際の性格には個体差があります。</p>' +
        buildShareRow(shareText, pageUrl);
      resultBox.hidden = false;
      if (window.TWTrack) window.TWTrack("tool_complete", { tool_name: "namae_shindan", species: species, result: type.name });
    });
  });
})();
