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
      desc: "運動好きで独立心が強く、留守番も得意な頼れるタイプ。番犬気質があり、換毛期のブラッシングはこまめに行うのがおすすめです。一戸建てでのびのび暮らすのに向いており、しつけには一貫性が求められる経験者向きの犬種です。"
    },
    {
      name: "ゴールデン・レトリバー",
      profile: ["A", "A", "A", "A", "A"],
      desc: "人懐っこく家族と過ごす時間が大好きな甘えん坊。長い被毛は週2〜3回のブラッシングでツヤを保てます。体は大きいですが性格は穏やかで、初めての大型犬デビューにもおすすめです。"
    },
    {
      name: "チワワ",
      profile: ["B", "B", "A", "A", "A"],
      desc: "小さな体に大きな愛情表現をしてくれるタイプ。被毛のお手入れは短毛種なら比較的簡単です。マンション暮らしでも飼いやすく、飼い主にぴったり寄り添いたい方に向いています。"
    },
    {
      name: "ボーダーコリー",
      profile: ["A", "A", "A", "B", "B"],
      desc: "非常に賢く運動量も豊富な、頭を使うことが大好きな犬種。毎日のトレーニングや知育遊びで刺激を与える手間がかかります。庭付き住宅で、しっかり向き合える経験者向きの犬種です。"
    },
    {
      name: "フレンチブルドッグ",
      profile: ["B", "B", "B", "A", "A"],
      desc: "室内でまったり過ごすのが得意なマイペース屋さん。短頭種のため暑さ対策と皮膚のシワのお手入れが必要です。愛嬌たっぷりの表情で、集合住宅暮らしの家族を癒してくれます。"
    },
    {
      name: "トイプードル",
      profile: ["A", "B", "A", "A", "A"],
      desc: "賢く飼い主想いで、集合住宅でも人気の犬種。巻き毛は定期的なトリミングが欠かせません。適度な運動と触れ合いの両方を楽しめる、初心者にも扱いやすいタイプです。"
    },
    {
      name: "ミニチュアシュナウザー",
      profile: ["A", "B", "B", "B", "B"],
      desc: "好奇心旺盛でよく吠える番犬気質の持ち主。ひげ周りの被毛は伸びやすく、定期的なトリミングが必要です。マンション暮らしにも対応できますが、しつけの一貫性が問われる経験者向けの犬種です。"
    },
    {
      name: "ビーグル",
      profile: ["A", "B", "A", "B", "A"],
      desc: "鼻と好奇心が命の食いしん坊タイプ。短毛でお手入れは楽ですが、抜け毛はやや多めです。人懐っこく初心者にも人気ですが、食事管理と鳴き声対策は忘れずに。"
    },
    {
      name: "ウェルシュ・コーギー",
      profile: ["B", "A", "A", "A", "A"],
      desc: "短い脚に似合わず活発で、家族と一緒に過ごすのが大好き。二重毛のためブラッシングは週数回が理想です。庭付き住宅でのびのび走らせてあげられる、初心者にも人気の犬種です。"
    },
    {
      name: "シベリアン・ハスキー",
      profile: ["A", "A", "B", "B", "B"],
      desc: "運動量が非常に多く、独立心も強い犬種。豊かな被毛は換毛期のお手入れに手間がかかります。広い庭と経験豊富な飼い主のもとで本領を発揮するタイプです。"
    }
  ];

  var CAT_BREEDS = [
    {
      name: "マンチカン",
      profile: ["B", "B", "A", "A", "A"],
      desc: "短い脚がチャームポイントの甘えん坊。胴が長いため肥満対策と適度な運動を心がけたい品種です。人懐っこく、初めて猫を迎える方にも人気です。"
    },
    {
      name: "ロシアンブルー",
      profile: ["B", "B", "B", "B", "B"],
      desc: "物静かで上品、少しシャイな一面もあるタイプ。短毛でお手入れは楽で、抜け毛も比較的少なめです。過度に構われるより、そっと見守られる関係を好みます。"
    },
    {
      name: "スコティッシュフォールド",
      profile: ["A", "B", "A", "A", "A"],
      desc: "折れ耳が特徴の穏やかな甘えん坊。遺伝的に関節への負担が出やすいため、定期的な健康チェックが大切です。好奇心旺盛で、家族の輪の中心にいたがるタイプです。"
    },
    {
      name: "ベンガル",
      profile: ["A", "A", "A", "B", "B"],
      desc: "野性味あふれる運動能力と好奇心の持ち主。豊富な運動量を満たすキャットタワー等の環境づくりが欠かせません。遊びごたえのある関係を楽しめる経験者向けです。"
    },
    {
      name: "アメリカンショートヘア",
      profile: ["A", "A", "B", "B", "A"],
      desc: "活発でありながら適応力も高いバランス型。短毛でお手入れも簡単な万能タイプです。留守番も上手にこなせる、初めて猫を飼う方にも飼いやすい品種です。"
    },
    {
      name: "ラグドール",
      profile: ["B", "A", "A", "A", "A"],
      desc: "抱っこが大好きな「puppy cat」。長い被毛は毎日のブラッシングで毛玉を防ぎたいところです。おっとりした性格で、たっぷり構ってあげたい人にぴったりです。"
    },
    {
      name: "ノルウェージャンフォレストキャット",
      profile: ["A", "A", "B", "B", "A"],
      desc: "がっしりした体格と豊かな被毛を持つ、運動能力の高い品種。長毛のため毎日のブラッシングが欠かせません。キャットタワー等で上下運動できる環境が向いており、初心者でも迎えやすい穏やかさも持ち合わせています。"
    },
    {
      name: "シャム",
      profile: ["A", "B", "A", "A", "B"],
      desc: "よくおしゃべりで人懐っこく、飼い主にべったり甘えるタイプ。短毛でお手入れは楽ですが、寂しがり屋なので留守番の多い家庭にはやや不向きです。賢く感情表現も豊かな、経験者にも愛される品種です。"
    },
    {
      name: "アビシニアン",
      profile: ["A", "A", "A", "B", "B"],
      desc: "好奇心旺盛でエネルギッシュ、運動能力の高い品種。短毛でお手入れは簡単ですが、遊び相手として十分な時間が必要です。広い一戸建てで思い切り動き回れる環境が向いた経験者向けの猫種です。"
    },
    {
      name: "ペルシャ",
      profile: ["B", "B", "B", "A", "B"],
      desc: "おっとりとしたマイペースな性格で、静かな環境を好むタイプ。長く豊かな被毛は毎日のブラッシングが必須です。留守番も得意ですが、被毛のお手入れに慣れた経験者向けの品種です。"
    }
  ];

  function scoreBreed(answers, breed) {
    var score = 0;
    for (var i = 0; i < answers.length; i++) {
      if (answers[i] === breed.profile[i]) score++;
    }
    return score;
  }

  function buildShareRow(text, url) {
    var tweetUrl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text) + "&url=" + encodeURIComponent(url);
    var lineUrl = "https://social-plugins.line.me/lineit/share?url=" + encodeURIComponent(url);
    return '<div class="share-row">' +
      '<a class="link-btn-secondary" href="' + tweetUrl + '" target="_blank" rel="noopener">Xでシェア</a>' +
      '<a class="link-btn-secondary" href="' + lineUrl + '" target="_blank" rel="noopener">LINEでシェア</a>' +
      '</div>';
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
      var speciesLabel = species === "dog" ? "犬種" : "猫種";
      var shareText = speciesLabel + "診断で「" + match.name + "タイプ」でした! | Tiny Wonders";
      var pageUrl = "https://deskanimals114510-ai.github.io/tiny-wonders/shindan.html";
      resultBox.innerHTML =
        '<p class="result-sub">あなたと相性が良いのは...</p>' +
        '<p class="result-headline"><strong>' + match.name + '</strong></p>' +
        '<p class="result-note">' + match.desc + '</p>' +
        '<p class="result-note">※簡易的な相性の目安です。実際の性格には個体差があります。</p>' +
        buildShareRow(shareText, pageUrl);
      resultBox.hidden = false;
      resultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
      if (window.TWTrack) window.TWTrack("tool_complete", { tool_name: "breed_quiz", species: species, result: match.name });
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
