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
    },
    {
      statement: "犬や猫の「標準体重」は、体重計の数値だけで判断される。",
      answer: false,
      explain: "実際は体重だけでなく、体型や触った感触で評価する「ボディコンディションスコア(BCS)」という指標も重視されます。",
      link: "zatsugaku/hyojun-taiju.html",
      title: "愛犬・愛猫の「標準体重」はどう決まる?"
    },
    {
      statement: "犬のシニア期が始まる年齢は、体格(大きさ)によって異なる。",
      answer: true,
      explain: "小型犬は10歳前後、大型犬は7歳前後など、体が大きい犬種ほどシニア期は早く訪れる傾向があります。",
      link: "zatsugaku/shinia-sign.html",
      title: "犬猫の「高齢期」のはじまりサイン"
    },
    {
      statement: "犬や猫が秋に毛がごっそり抜けるのは、春の換毛と同じ目的である。",
      answer: false,
      explain: "春は暑さに備えて毛を減らし、秋は冬の防寒のために保温性の高い毛へ生え替わる、逆の目的があります。",
      link: "zatsugaku/kanmouki.html",
      title: "犬や猫はなぜ秋にごっそり毛が抜けるの?"
    },
    {
      statement: "猫の発情期は、気温の変化がきっかけで始まる。",
      answer: false,
      explain: "実際は日照時間(日の長さ)がきっかけで、メラトニンの分泌量が変化することで発情が始まります。",
      link: "zatsugaku/neko-hatsujou.html",
      title: "猫はなぜ日照時間で恋の季節を知るの?"
    },
    {
      statement: "犬や猫の花粉症は、人間と同じく鼻水やくしゃみとして症状が出る。",
      answer: false,
      explain: "犬や猫の花粉症は主に「皮膚」に症状が出ます。体をかゆがる、皮膚が赤くなるといったサインが中心です。",
      link: "zatsugaku/kafun.html",
      title: "犬や猫の花粉症は、なぜ鼻ではなく肌に出るの?"
    },
    {
      statement: "冬眠中の動物は、気温が暖かくなっただけで目を覚ます。",
      answer: false,
      explain: "気温だけでなく日照時間や体内時計(概日リズム)も重なって働き、目覚めのタイミングを決めています。",
      link: "zatsugaku/toumin.html",
      title: "冬眠する動物はなぜ春に目を覚ますの?"
    },
    {
      statement: "犬や猫が秋に食欲が増すのは、ホルモンの影響である。",
      answer: false,
      explain: "実際はホルモンではなく、気温の低下に合わせて体が熱をつくろうとする代謝的な仕組みが関わっていると考えられています。",
      link: "zatsugaku/aki-shokuyoku.html",
      title: "犬や猫はなぜ秋になると食欲が増すの?"
    },
    {
      statement: "エゾシカの発情期は、猫と同じく日が長くなる春に始まる。",
      answer: false,
      explain: "エゾシカは猫とは正反対で、日が短くなる秋(9〜11月ごろ)に発情期を迎える「短日繁殖動物」です。",
      link: "zatsugaku/shika.html",
      title: "エゾシカはなぜ秋に恋の季節を迎えるの?"
    },
    {
      statement: "猫は、体がはっきり入りきらない小さな箱にも入ろうとする。",
      answer: true,
      explain: "「もし入れるなら、座る」と言われるほど箱への執着が強く、テープで四角を作っただけでも反応することがあります。",
      link: "zannen/neko-hako.html",
      title: "猫はなぜ明らかに小さすぎる箱に入りたがるの?"
    },
    {
      statement: "フクロウの首がよく回るのは、目玉も一緒に動くからである。",
      answer: false,
      explain: "実際はフクロウの目は筒状で完全に固定されて動かせず、その分を14個ある頸椎(人間は7個)と特殊な血管システムで補っています。",
      link: "zannen/fukurou.html",
      title: "フクロウはなぜ首が270度も回るの?"
    },
    {
      statement: "ラッコは、他の海獣と同じように皮下脂肪で体を保温している。",
      answer: false,
      explain: "ラッコは海獣の中で唯一皮下脂肪をほとんど持たず、毛皮の中の空気層と、体重の2〜3割にもなる大量の食事で体温を保っています。",
      link: "zannen/rakko.html",
      title: "ラッコはなぜ大量に食べ続けなければならないの?"
    },
    {
      statement: "ナマケモノが週1回しか排泄しない理由は、科学的に解明されている。",
      answer: false,
      explain: "「蛾や藻類との共生関係」という説が有力視されたこともありますが、2021年の研究で反論も出ており、理由はまだ決着していません。",
      link: "zannen/namakemono.html",
      title: "ナマケモノはなぜ命がけで週に1回しかトイレに行かないの?"
    },
    {
      statement: "野生のキリンは、動物園のキリンよりも長く横になって眠る。",
      answer: false,
      explain: "実際は逆で、野生のキリンが横になって眠る時間は一晩でわずか8.6分ほど。動物園のキリンの方がずっと長く(約4.6時間)眠ります。",
      link: "zannen/kirin.html",
      title: "キリンはなぜ横になってほとんど眠らないの?"
    },
    {
      statement: "タコが泳ぐとき、3つある心臓はすべてより活発に動く。",
      answer: false,
      explain: "実際は逆で、全身に血を送る1つの心臓は泳ぐと止まってしまいます。これがタコが泳ぐより歩くことを好む理由の一つと考えられています。",
      link: "zannen/tako.html",
      title: "タコはなぜ泳ぐと心臓が1つ止まってしまうの?"
    },
    {
      statement: "犬の登録頭数を人口あたりで比べると、東京都が全国で最も多い。",
      answer: false,
      explain: "実際は逆で、東京都は人口1000人あたりの犬登録頭数が全国45位。1位は香川県で、四国・東海勢が上位を占めています。",
      link: "zatsugaku/inu-mitsudo.html",
      title: "都道府県別・犬の登録頭数ランキング! 人口あたりで一番多いのはどこ?"
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

  var STATS_KEY = "tinywonders-quiz-stats";

  function dateKey(d) {
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  }

  function loadStats() {
    try {
      var raw = window.localStorage.getItem(STATS_KEY);
      return raw ? JSON.parse(raw) : { lastDate: null, streak: 0, bestScore: 0, totalPlays: 0 };
    } catch (e) {
      return { lastDate: null, streak: 0, bestScore: 0, totalPlays: 0 };
    }
  }

  function saveStats(stats) {
    try {
      window.localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    } catch (e) {
      // localStorageが使えない環境(プライベートブラウジング等)では記録をスキップ
    }
  }

  function recordResult(score, total) {
    var stats = loadStats();
    var today = new Date();
    var todayKey = dateKey(today);
    var yesterdayKey = dateKey(new Date(today.getTime() - 24 * 60 * 60 * 1000));

    if (stats.lastDate === todayKey) {
      // 同日中の再挑戦: streakは維持、ベストスコアのみ更新対象
    } else if (stats.lastDate === yesterdayKey) {
      stats.streak = (stats.streak || 0) + 1;
    } else {
      stats.streak = 1;
    }
    stats.lastDate = todayKey;
    stats.bestScore = Math.max(stats.bestScore || 0, score);
    stats.totalPlays = (stats.totalPlays || 0) + 1;
    saveStats(stats);
    return stats;
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
    var streakNoteEl = document.getElementById("quiz-streak-note");
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
      var stats = recordResult(score, questions.length);
      var isBest = score === stats.bestScore && score > 0;
      var text = "動物雑学○×クイズで" + questions.length + "問中" + score + "問正解でした!" +
        (stats.streak > 1 ? "(連続" + stats.streak + "日挑戦中)" : "") + " | Tiny Wonders";
      var url = "https://deskanimals114510-ai.github.io/tiny-wonders/zatsugaku-quiz.html";
      scoreHeadlineEl.innerHTML = questions.length + "問中<strong>" + score + "問</strong>正解でした!";
      if (streakNoteEl) {
        var streakParts = [];
        if (stats.streak > 1) streakParts.push("🔥 連続" + stats.streak + "日挑戦中");
        streakParts.push("自己ベスト " + stats.bestScore + "/" + questions.length + (isBest ? "(更新!)" : ""));
        streakNoteEl.textContent = streakParts.join(" ・ ");
      }
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
