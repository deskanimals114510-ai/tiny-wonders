// 犬種・猫種診断 — 5問の回答から相性の良い犬種/猫種を1つ選ぶ簡易診断。
// 内部エンゲージメント用の軽量コンテンツであり、厳密なブリーダー診断ではありません。

(function () {
  "use strict";

  // 各犬種/猫種の「典型プロフィール」を5軸(A/B)で表現し、回答との一致数が最も多いものを結果とする。
  // 軸: [1:アクティブ/インドア, 2:一戸建て/集合住宅向き, 3:一緒にいたい/留守番OK, 4:甘えん坊/マイペース, 5:初心者向け/経験者向け]
  var DOG_BREEDS = [
    {
      name: "柴犬",
      profile: ["A", "A", "B", "B", "B"],
      desc: "運動好きで独立心が強く、留守番も得意な頼れるタイプ。番犬気質もあり、しつけには一貫性が大切です。"
    },
    {
      name: "ゴールデン・レトリバー",
      profile: ["A", "A", "A", "A", "A"],
      desc: "人懐っこく家族と過ごす時間が大好きな甘えん坊。体は大きいですが性格は穏やかで、初めての大型犬にもおすすめです。"
    },
    {
      name: "チワワ",
      profile: ["B", "B", "A", "A", "A"],
      desc: "小さな体に大きな愛情表現。マンション暮らしでも飼いやすく、飼い主にぴったり寄り添うタイプです。"
    },
    {
      name: "ボーダーコリー",
      profile: ["A", "A", "A", "B", "B"],
      desc: "非常に賢く運動量も豊富。頭と体を使う遊びが必要なので、しっかり向き合える経験者向きの犬種です。"
    },
    {
      name: "フレンチブルドッグ",
      profile: ["B", "B", "B", "A", "A"],
      desc: "室内でまったり過ごすのが得意なマイペース屋さん。愛嬌たっぷりの表情で家族を癒してくれます。"
    },
    {
      name: "トイプードル",
      profile: ["A", "B", "A", "A", "A"],
      desc: "賢く飼い主想いで、集合住宅でも人気の犬種。適度な運動と触れ合いの両方を楽しめるタイプです。"
    }
  ];

  var CAT_BREEDS = [
    {
      name: "マンチカン",
      profile: ["B", "B", "A", "A", "A"],
      desc: "短い脚がチャームポイントの甘えん坊。人懐っこく、初めて猫を迎える方にも人気の品種です。"
    },
    {
      name: "ロシアンブルー",
      profile: ["B", "B", "B", "B", "B"],
      desc: "物静かで上品、少しシャイな一面も。過度に構われるより、そっと見守られる関係を好むタイプです。"
    },
    {
      name: "スコティッシュフォールド",
      profile: ["A", "B", "A", "A", "A"],
      desc: "折れ耳が特徴の穏やかな甘えん坊。好奇心旺盛で家族の輪の中心にいたがるタイプです。"
    },
    {
      name: "ベンガル",
      profile: ["A", "A", "A", "B", "B"],
      desc: "野性味あふれる運動能力と好奇心の持ち主。遊びごたえのある環境づくりができる経験者向けです。"
    },
    {
      name: "アメリカンショートヘア",
      profile: ["A", "A", "B", "B", "A"],
      desc: "活発でありながら適応力も高いバランス型。留守番も上手にこなせる、飼いやすい万能タイプです。"
    },
    {
      name: "ラグドール",
      profile: ["B", "A", "A", "A", "A"],
      desc: "抱っこが大好きな「puppy cat」。おっとりした性格で、たっぷり構ってあげたい人にぴったりです。"
    }
  ];

  function scoreBreed(answers, breed) {
    var score = 0;
    for (var i = 0; i < answers.length; i++) {
      if (answers[i] === breed.profile[i]) score++;
    }
    return score;
  }

  function bestMatch(answers, breeds) {
    var best = breeds[0];
    var bestScore = -1;
    breeds.forEach(function (b) {
      var s = scoreBreed(answers, b);
      if (s > bestScore) {
        bestScore = s;
        best = b;
      }
    });
    return best;
  }

  function initQuiz(species, breeds) {
    var form = document.getElementById(species + "-quiz-form");
    var resultBox = document.getElementById(species + "-quiz-result");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var answers = [];
      for (var i = 1; i <= 5; i++) {
        var checked = form.querySelector('input[name="' + species + '-q' + i + '"]:checked');
        answers.push(checked ? checked.value : "A");
      }
      var match = bestMatch(answers, breeds);
      resultBox.innerHTML =
        '<p class="result-sub">あなたと相性が良いのは...</p>' +
        '<p class="result-headline"><strong>' + match.name + '</strong></p>' +
        '<p class="result-note">' + match.desc + '</p>';
      resultBox.hidden = false;
      resultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initQuiz("dog", DOG_BREEDS);
    initQuiz("cat", CAT_BREEDS);

    var tabButtons = document.querySelectorAll(".tool-tab");
    var panels = document.querySelectorAll(".tool-panel");
    tabButtons.forEach(function (btn) {
      var target = btn.getAttribute("data-tab");
      var panel = document.querySelector('.tool-panel[data-panel="' + target + '"]');
      if (panel && !panel.id) panel.id = "shindan-panel-" + target;
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", btn.classList.contains("is-active") ? "true" : "false");
      btn.setAttribute("tabindex", btn.classList.contains("is-active") ? "0" : "-1");
      if (panel) btn.setAttribute("aria-controls", panel.id);
    });
    panels.forEach(function (p) {
      p.setAttribute("role", "tabpanel");
      if (!p.id) p.id = "shindan-panel-" + p.getAttribute("data-panel");
    });
    tabButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = btn.getAttribute("data-tab");
        tabButtons.forEach(function (b) {
          var active = b === btn;
          b.classList.toggle("is-active", active);
          b.setAttribute("aria-selected", active ? "true" : "false");
          b.setAttribute("tabindex", active ? "0" : "-1");
        });
        panels.forEach(function (p) {
          p.classList.toggle("is-active", p.getAttribute("data-panel") === target);
        });
      });
    });
  });
})();
