// うちの子なまえ診断 — 名前の文字コードから8タイプのうち1つを判定する簡易診断。
// 言語学的な名前占いではなく、内部エンゲージメント用の軽量コンテンツです。

(function () {
  "use strict";

  var TYPES = [
    {
      name: "太陽タイプ",
      desc: "元気いっぱいで、そこにいるだけで場を明るくするタイプ。人にも他の動物にも物怖じせず、初めての場所でもすぐに馴染んでしまう社交的な一面があります。ボール遊びや追いかけっこなど、体をたくさん動かす遊びとの相性が抜群です。",
      descEn: "A ray of sunshine, full of energy and always brightening the room. Outgoing and fearless, quick to feel at home in new places or around new faces. Loves games that involve lots of running and chasing."
    },
    {
      name: "まんまるタイプ",
      desc: "おっとりマイペースで、そばにいるだけで癒される存在。急かされるのが苦手で、自分のペースでゆったり過ごす時間を大切にします。ブラッシングやなでなでなど、静かなスキンシップを好む傾向があります。",
      descEn: "Round and gentle, easygoing and calming just by being nearby. Prefers a slow, unhurried pace and doesn't like being rushed. Enjoys quiet affection like brushing and gentle petting."
    },
    {
      name: "きらきらタイプ",
      desc: "好奇心旺盛で、いつも新しいものに目を輝かせるタイプ。初めて見るおもちゃや知らない匂いにすぐ気づき、探検するのが大好きです。知育トイやパズル系のおもちゃで刺激を与えると、いきいきとした表情を見せてくれるでしょう。",
      descEn: "Sparkly and curious, always chasing the next new thing. Quick to notice new toys or unfamiliar scents and loves to explore. Puzzle toys and brain games are a great match."
    },
    {
      name: "そよ風タイプ",
      desc: "おだやかでマイペース、争いごとが苦手なタイプ。他の動物や人に対してもおっとり構えていて、無理に自己主張することはあまりありません。落ち着いた環境と、決まった生活リズムを好む傾向があります。",
      descEn: "A gentle breeze, calm and easygoing, avoids conflict. Rarely pushes its own agenda around others, staying relaxed instead. Thrives on a calm environment and a steady daily routine."
    },
    {
      name: "わんぱくタイプ",
      desc: "元気があり余っていて、いたずら好きなタイプ。目を離したすきにティッシュを取り出したり、物を落として遊んだりと、飼い主を飽きさせません。有り余るエネルギーを発散できる遊び道具をたくさん用意してあげると喜びます。",
      descEn: "A little troublemaker, bursting with energy and mischief. Might unroll the tissue paper or bat things off the table the moment you look away. Plenty of toys to burn off that energy will keep everyone happy."
    },
    {
      name: "ミステリアスタイプ",
      desc: "気まぐれでつかみどころがない、でもそこが魅力のタイプ。今日は甘えてきたと思えば、明日はどこかツンとした態度を見せることも。予測できない一面こそが、このタイプならではの奥深い魅力です。",
      descEn: "Mysterious and moody, unpredictable, and that's the charm. Might be affectionate one day and aloof the next. That unpredictability is exactly what makes this type so intriguing."
    },
    {
      name: "あまえんぼうタイプ",
      desc: "甘えん坊で、いつも誰かのそばにいたいタイプ。留守番中は少し寂しがり屋な一面もあり、帰宅すると全力で出迎えてくれることが多いです。たっぷりスキンシップの時間を取ってあげると、より安心して過ごせるでしょう。",
      descEn: "A total cuddle-bug, always wants to be close to someone. Might get a little lonely when left alone, but greets you enthusiastically when you're back. Plenty of cuddle time helps this type feel most at ease."
    },
    {
      name: "しっかり者タイプ",
      desc: "落ち着きがあり、頼れる存在のタイプ。新しい環境の変化にも比較的動じにくく、飼い主のことをよく観察している賢さも持ち合わせています。一貫したルールのもとで安定した生活リズムを作ってあげると、その良さがさらに発揮されます。",
      descEn: "Calm and dependable, the reliable one of the group. Adapts well to change and often seems to be quietly observing everything. A consistent routine helps bring out the best in this type."
    }
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

  var NAMAE_LOG_KEY = "tinywonders-namae-log";
  var NAMAE_LOG_MAX = 20;

  function loadNamaeLog() {
    try {
      var raw = localStorage.getItem(NAMAE_LOG_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }

  function saveNamaeLog(log) {
    try { localStorage.setItem(NAMAE_LOG_KEY, JSON.stringify(log)); } catch (e) {}
  }

  function todayLabel() {
    var d = new Date();
    return d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
  }

  function renderNamaeLog() {
    var container = document.getElementById("namae-log");
    if (!container) return;
    var log = loadNamaeLog();
    if (log.length === 0) {
      container.hidden = true;
      container.innerHTML = "";
      return;
    }
    var sorted = log.slice().sort(function (a, b) { return b.ts - a.ts; });
    var rows = sorted.map(function (entry) {
      return '<li class="record-log-row" data-index="' + log.indexOf(entry) + '">' +
        '<span class="record-log-date">' + entry.date + '</span>' +
        '<span class="record-log-value">' + entry.name + ' → ' + entry.type + '</span>' +
        '<button type="button" class="record-log-delete" aria-label="この記録を削除">×</button>' +
        '</li>';
    });
    container.innerHTML =
      '<p class="record-log-title">なまえ診断ログ</p>' +
      '<ul class="record-log-list">' + rows.join("") + '</ul>';
    container.hidden = false;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("namae-form");
    var input = document.getElementById("namae-input");
    var resultBox = document.getElementById("namae-result");
    var logContainer = document.getElementById("namae-log");
    if (!form) return;

    renderNamaeLog();

    if (logContainer) {
      logContainer.addEventListener("click", function (e) {
        var btn = e.target.closest(".record-log-delete");
        if (!btn) return;
        var row = btn.closest(".record-log-row");
        var index = parseInt(row.getAttribute("data-index"), 10);
        var log = loadNamaeLog();
        log.splice(index, 1);
        saveNamaeLog(log);
        renderNamaeLog();
      });
    }

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
        '<button type="button" class="link-btn-secondary record-log-save">この結果をログに残す</button>' +
        buildShareRow(shareText, pageUrl);
      resultBox.hidden = false;
      if (window.TWTrack) window.TWTrack("tool_complete", { tool_name: "namae_shindan", species: species, result: type.name });

      var saveBtn = resultBox.querySelector(".record-log-save");
      if (saveBtn) {
        saveBtn.addEventListener("click", function () {
          var log = loadNamaeLog();
          log.push({ date: todayLabel(), ts: Date.now(), name: name, type: type.name });
          if (log.length > NAMAE_LOG_MAX) log = log.slice(log.length - NAMAE_LOG_MAX);
          saveNamaeLog(log);
          renderNamaeLog();
          saveBtn.disabled = true;
          saveBtn.textContent = "ログに記録しました";
        });
      }
    });
  });
})();
