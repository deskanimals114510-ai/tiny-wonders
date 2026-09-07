(function () {
  "use strict";

  var QUESTIONS = [
    {
      statement: "犬の嗅覚は、人間の数千万倍ともいわれる。",
      answer: true,
      explain: "犬の鼻には人間よりずっと多くの嗅覚受容体があり、探知犬として活躍できるのもこの能力のおかげです。",
      link: "zatsugaku/inu-hana.html",
      title: "犬はなぜ鼻がこんなに良いの?"
    },
    {
      statement: "猫が喉をゴロゴロ鳴らすのは、甘えているときだけである。",
      answer: false,
      explain: "実は痛みを感じているときにもゴロゴロ音を出すことがあり、単なる甘えのサインだけではありません。",
      link: "zatsugaku/neko-gorogoro.html",
      title: "猫はなぜゴロゴロ喉を鳴らすの?"
    },
    {
      statement: "犬に「もらいあくび」がうつるのは、飼い主との絆の深さが関係しているといわれる。",
      answer: true,
      explain: "研究では、見知らぬ人よりも飼い主のあくびの方がうつりやすいことがわかっており、絆や共感との関わりが指摘されています。",
      link: "zatsugaku/inu-akubi.html",
      title: "犬はなぜ人のあくびがうつるの?"
    },
    {
      statement: "猫のヒゲは、味を感じるためのセンサーである。",
      answer: false,
      explain: "猫のヒゲは味覚ではなく、狭い隙間の幅を体で通れるかどうか事前に感知するセンサーです。",
      link: "zatsugaku/neko-hige.html",
      title: "猫はなぜヒゲで隙間の広さがわかるの?"
    },
    {
      statement: "猫は生まれて1年で、人間でいう18歳相当まで成長する。",
      answer: true,
      explain: "猫の年齢換算は1年目だけ特別で、1歳でおよそ18歳相当。2年目以降は1年ごとに4歳ずつ加算されます。",
      link: "zatsugaku/neko-nenrei.html",
      title: "猫の年齢換算はなぜ1年目だけ18歳?"
    },
    {
      statement: "犬は人間よりもゆっくり年をとる。",
      answer: false,
      explain: "実際は逆で、犬は人間よりずっと早いペースで年をとります。",
      link: "zatsugaku/inu-roka.html",
      title: "犬はなぜ早く年をとる?"
    },
    {
      statement: "コアラは1日20時間以上眠って過ごす。",
      answer: true,
      explain: "ユーカリの栄養価の低さや解毒コストの高さから、コアラは省エネのために長時間眠り続けます。",
      link: "zannen/koala-suimin.html",
      title: "コアラはなぜ1日20時間も眠り続けるの?"
    },
    {
      statement: "パンダの消化器官は、もともと肉食動物に近いつくりのままである。",
      answer: true,
      explain: "パンダは笹を主食にしていますが、消化器官は肉食動物に近いままで、笹の栄養を十分に消化しきれていません。",
      link: "zannen/panda-taberu.html",
      title: "パンダの「ざんねん」な食事事情"
    },
    {
      statement: "犬が排泄前にぐるぐる回るのは、地球の磁場を感知しているという説がある。",
      answer: true,
      explain: "犬が体の向きをそろえて排泄するという実測データがあり、地磁気を感知している可能性が研究で指摘されています。",
      link: "zannen/inu-guruguru.html",
      title: "犬の排泄前ぐるぐるの謎"
    },
    {
      statement: "猫が高い場所から落ちるほど、必ず大怪我をしやすくなる。",
      answer: false,
      explain: "「高所落下症候群」と呼ばれる逆説的な現象があり、一定以上の高さでは体勢を立て直す時間ができ、かえって軽傷で済むことがあります。",
      link: "zannen/neko-rakka.html",
      title: "猫の高所落下症候群という逆説"
    },
    {
      statement: "犬が草を食べる理由は、科学的にはまだ完全には解明されていない。",
      answer: true,
      explain: "胃の不快感を解消するためなど諸説ありますが、はっきりとした結論は出ておらず、現在も議論が続いています。",
      link: "zannen/inu-kusa.html",
      title: "犬はなぜ草を食べるの?"
    },
    {
      statement: "猫がコタツを好むのは、猫の祖先が寒い地域の出身だからである。",
      answer: false,
      explain: "実際は逆で、猫の祖先は砂漠出身。寒さや体温調節が苦手なため、暖かいコタツを好みます。",
      link: "zatsugaku/neko-kotatsu.html",
      title: "猫はなぜ冬にコタツで丸くなるの?"
    },
    {
      statement: "犬は全身の皮膚から汗をかいて体温を下げている。",
      answer: false,
      explain: "犬の汗腺は肉球にしかなく、体温調節の主役は舌を出して行う「パンティング」です。",
      link: "zatsugaku/inu-panting.html",
      title: "犬はなぜ夏に舌を出してハアハアするの?"
    },
    {
      statement: "猫はしっぽの動きで、気持ちを表現している。",
      answer: true,
      explain: "猫は表情よりもしっぽの動きに感情が表れやすい動物で、動きのパターンからある程度気持ちを読み取れます。",
      link: "zatsugaku/neko-shippo.html",
      title: "猫のしっぽが教えてくれること"
    }
  ];

  var QUIZ_LENGTH = 8;

  function hashString(str) {
    var h = 0;
    for (var i = 0; i < str.length; i++) {
      h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
    }
    return h >>> 0;
  }

  function mulberry32(seed) {
    return function () {
      seed |= 0;
      seed = (seed + 0x6D2B79F5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function todaySeed() {
    var d = new Date();
    var key = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    return hashString(key);
  }

  function pickTodayQuestions() {
    var rng = mulberry32(todaySeed());
    var pool = QUESTIONS.slice();
    for (var i = pool.length - 1; i > 0; i--) {
      var j = Math.floor(rng() * (i + 1));
      var tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
    }
    return pool.slice(0, Math.min(QUIZ_LENGTH, pool.length));
  }

  function buildShareRow(text, url) {
    var tweetUrl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text) + "&url=" + encodeURIComponent(url);
    var lineUrl = "https://social-plugins.line.me/lineit/share?url=" + encodeURIComponent(url);
    return '<div class="share-row">' +
      '<a class="link-btn-secondary" href="' + tweetUrl + '" target="_blank" rel="noopener">Xでシェア</a>' +
      '<a class="link-btn-secondary" href="' + lineUrl + '" target="_blank" rel="noopener">LINEでシェア</a>' +
      '</div>';
  }

  document.addEventListener("DOMContentLoaded", function () {
    var questions = pickTodayQuestions();
    var index = 0;
    var score = 0;
    var answered = false;

    var progressEl = document.getElementById("quiz-progress");
    var questionEl = document.getElementById("quiz-question");
    var choicesEl = document.getElementById("quiz-choices");
    var feedbackEl = document.getElementById("quiz-feedback");
    var feedbackHeadlineEl = document.getElementById("quiz-feedback-headline");
    var feedbackExplainEl = document.getElementById("quiz-feedback-explain");
    var feedbackLinkEl = document.getElementById("quiz-feedback-link");
    var nextBtn = document.getElementById("quiz-next");
    var quizCard = document.querySelector(".quiz-card");
    var resultBox = document.getElementById("quiz-result");
    var scoreHeadlineEl = document.getElementById("quiz-score-headline");
    var retryBtn = document.getElementById("quiz-retry");
    var shareContainer = document.getElementById("quiz-share");

    if (!questionEl) return;

    function renderQuestion() {
      answered = false;
      feedbackEl.hidden = true;
      choicesEl.hidden = false;
      var q = questions[index];
      progressEl.textContent = "問題 " + (index + 1) + " / " + questions.length;
      questionEl.textContent = q.statement;
    }

    function handleAnswer(userAnswer) {
      if (answered) return;
      answered = true;
      var q = questions[index];
      var correct = userAnswer === q.answer;
      if (correct) score++;
      feedbackHeadlineEl.textContent = correct ? "○ 正解!" : "× 不正解";
      feedbackHeadlineEl.className = "quiz-feedback-headline " + (correct ? "is-correct" : "is-wrong");
      feedbackExplainEl.textContent = q.explain;
      feedbackLinkEl.href = q.link;
      feedbackLinkEl.textContent = "「" + q.title + "」を読む →";
      choicesEl.hidden = true;
      feedbackEl.hidden = false;
    }

    function finishQuiz() {
      quizCard.hidden = true;
      var text = "動物雑学○×クイズで" + questions.length + "問中" + score + "問正解でした! | Tiny Wonders";
      var url = "https://deskanimals114510-ai.github.io/tiny-wonders/zatsugaku-quiz.html";
      scoreHeadlineEl.innerHTML = questions.length + "問中<strong>" + score + "問</strong>正解でした!";
      shareContainer.innerHTML = buildShareRow(text, url);
      resultBox.hidden = false;
      resultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
      if (window.TWTrack) window.TWTrack("tool_complete", { tool_name: "zatsugaku_quiz", score: score, total: questions.length });
    }

    choicesEl.addEventListener("click", function (e) {
      var btn = e.target.closest(".quiz-choice");
      if (!btn) return;
      handleAnswer(btn.getAttribute("data-answer") === "true");
    });

    nextBtn.addEventListener("click", function () {
      index++;
      if (index >= questions.length) {
        finishQuiz();
      } else {
        renderQuestion();
      }
    });

    retryBtn.addEventListener("click", function () {
      index = 0;
      score = 0;
      quizCard.hidden = false;
      resultBox.hidden = true;
      renderQuestion();
    });

    renderQuestion();
  });
})();
