// 犬猫 年齢・体重かんたん換算ツール — 計算ロジック
// すべて「早見表ベースの目安」であり、個体差・犬種差・健康状態により実際とは異なります。

(function () {
  "use strict";

  // ---- 年齢換算テーブル ----
  // 子犬・子猫期は月齢ベースの折れ線、1歳以降は年単位の早見表。
  // 表の最後より先の年齢は annualStep で1年ごとに加算して外挿する。

  var DOG_PUPPY_POINTS = [
    [0, 0],
    [1 / 12, 1],
    [2 / 12, 3],
    [3 / 12, 5],
    [6 / 12, 9],
    [9 / 12, 13]
  ];

  var DOG_TABLES = {
    small: {
      label: "小型犬(〜10kg目安)",
      points: DOG_PUPPY_POINTS.concat([
        [1, 15], [2, 24], [3, 28], [4, 32], [5, 36],
        [6, 40], [7, 44], [8, 48], [9, 52], [10, 56]
      ]),
      annualStep: 4
    },
    medium: {
      label: "中型犬(10〜25kg目安)",
      points: DOG_PUPPY_POINTS.concat([
        [1, 15], [2, 24], [3, 28], [4, 33], [5, 37],
        [6, 42], [7, 47], [8, 51], [9, 56], [10, 60]
      ]),
      annualStep: 4.5
    },
    large: {
      label: "大型犬(25〜40kg目安)",
      points: DOG_PUPPY_POINTS.concat([
        [1, 15], [2, 24], [3, 29], [4, 34], [5, 39],
        [6, 45], [7, 50], [8, 55], [9, 61], [10, 66]
      ]),
      annualStep: 5
    },
    giant: {
      label: "超大型犬(40kg〜目安)",
      points: DOG_PUPPY_POINTS.concat([
        [1, 14], [2, 22], [3, 29], [4, 37], [5, 45],
        [6, 52], [7, 60], [8, 67], [9, 75], [10, 82]
      ]),
      annualStep: 7
    }
  };

  var CAT_TABLE = {
    label: "猫",
    points: [
      [0, 0], [1 / 12, 1], [2 / 12, 3], [3 / 12, 5], [6 / 12, 10], [9 / 12, 14],
      [1, 18], [2, 24], [3, 28], [4, 32], [5, 36],
      [6, 40], [7, 44], [8, 48], [9, 52], [10, 56]
    ],
    annualStep: 4
  };

  function interpolateAge(ageYears, table) {
    var points = table.points;
    if (ageYears <= points[0][0]) return points[0][1];
    for (var i = 0; i < points.length - 1; i++) {
      var p0 = points[i], p1 = points[i + 1];
      if (ageYears <= p1[0]) {
        var ratio = (ageYears - p0[0]) / (p1[0] - p0[0]);
        return p0[1] + (p1[1] - p0[1]) * ratio;
      }
    }
    var last = points[points.length - 1];
    return last[1] + (ageYears - last[0]) * table.annualStep;
  }

  function dogHumanAge(ageYears, size) {
    var table = DOG_TABLES[size] || DOG_TABLES.medium;
    return interpolateAge(ageYears, table);
  }

  function catHumanAge(ageYears) {
    return interpolateAge(ageYears, CAT_TABLE);
  }

  // ---- 体重換算(人間換算 & kg/lb) ----

  var KG_PER_LB = 0.45359237;

  function kgToLb(kg) { return kg / KG_PER_LB; }
  function lbToKg(lb) { return lb * KG_PER_LB; }

  function humanEquivalentWeight(currentWeight, standardWeight, referenceHumanWeight) {
    if (!standardWeight || standardWeight <= 0) return null;
    return (currentWeight / standardWeight) * referenceHumanWeight;
  }

  function weightConditionNote(currentWeight, standardWeight) {
    if (!standardWeight || standardWeight <= 0) return null;
    var diffRatio = (currentWeight - standardWeight) / standardWeight;
    if (diffRatio >= 0.15) return "over";
    if (diffRatio <= -0.15) return "under";
    return "normal";
  }

  function buildShareRow(text, url) {
    var tweetUrl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text) + "&url=" + encodeURIComponent(url);
    var lineUrl = "https://social-plugins.line.me/lineit/share?url=" + encodeURIComponent(url);
    return '<div class="share-row">' +
      '<a class="link-btn-secondary" href="' + tweetUrl + '" target="_blank" rel="noopener">Xでシェア</a>' +
      '<a class="link-btn-secondary" href="' + lineUrl + '" target="_blank" rel="noopener">LINEでシェア</a>' +
      '</div>';
  }

  window.PetCalc = {
    dogHumanAge: dogHumanAge,
    catHumanAge: catHumanAge,
    dogSizeTables: DOG_TABLES,
    kgToLb: kgToLb,
    lbToKg: lbToKg,
    humanEquivalentWeight: humanEquivalentWeight,
    weightConditionNote: weightConditionNote
  };

  // ---- UI配線 ----

  document.addEventListener("DOMContentLoaded", function () {
    initTabs();
    initAgeTool();
    initWeightTool();
  });

  function initTabs() {
    var tabButtons = document.querySelectorAll(".tool-tab");
    var panels = document.querySelectorAll(".tool-panel");

    tabButtons.forEach(function (btn) {
      var target = btn.getAttribute("data-tab");
      var panel = document.querySelector('.tool-panel[data-panel="' + target + '"]');
      if (panel && !panel.id) panel.id = "tool-panel-" + target;
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", btn.classList.contains("is-active") ? "true" : "false");
      btn.setAttribute("tabindex", btn.classList.contains("is-active") ? "0" : "-1");
      if (panel) btn.setAttribute("aria-controls", panel.id);
    });
    panels.forEach(function (p) {
      p.setAttribute("role", "tabpanel");
      if (!p.id) p.id = "tool-panel-" + p.getAttribute("data-panel");
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
  }

  var DOG_SENIOR_AGE = { small: 10, medium: 8, large: 7, giant: 6 };
  var CAT_SENIOR_AGE = 7;

  function lifeStage(ageYears, species, size) {
    if (ageYears < 1) {
      return { label: species === "dog" ? "子犬期" : "子猫期", isSenior: false };
    }
    var seniorAge = species === "dog" ? (DOG_SENIOR_AGE[size] || 8) : CAT_SENIOR_AGE;
    if (ageYears >= seniorAge) {
      return { label: "シニア期", isSenior: true };
    }
    return { label: species === "dog" ? "成犬期" : "成猫期", isSenior: false };
  }

  function initAgeTool() {
    var speciesRadios = document.querySelectorAll('input[name="age-species"]');
    var sizeField = document.getElementById("age-dog-size-field");
    var yearsInput = document.getElementById("age-years");
    var monthsInput = document.getElementById("age-months");
    var sizeSelect = document.getElementById("age-dog-size");
    var breedSelect = document.getElementById("age-dog-breed");
    var resultBox = document.getElementById("age-result");
    var form = document.getElementById("age-form");

    function currentSpecies() {
      var checked = document.querySelector('input[name="age-species"]:checked');
      return checked ? checked.value : "dog";
    }

    function refreshSizeVisibility() {
      sizeField.hidden = currentSpecies() !== "dog";
    }

    speciesRadios.forEach(function (r) {
      r.addEventListener("change", refreshSizeVisibility);
    });
    refreshSizeVisibility();

    if (breedSelect) {
      breedSelect.addEventListener("change", function () {
        var option = breedSelect.options[breedSelect.selectedIndex];
        var size = option ? option.getAttribute("data-size") : "";
        if (size) sizeSelect.value = size;
      });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var years = parseFloat(yearsInput.value) || 0;
      var months = parseFloat(monthsInput.value) || 0;
      if (years < 0) years = 0;
      if (months < 0) months = 0;
      var ageYears = years + months / 12;

      var species = currentSpecies();
      var humanAge, sizeLabel;
      if (species === "dog") {
        var size = sizeSelect.value;
        humanAge = window.PetCalc.dogHumanAge(ageYears, size);
        sizeLabel = window.PetCalc.dogSizeTables[size].label;
      } else {
        humanAge = window.PetCalc.catHumanAge(ageYears);
        sizeLabel = "猫";
      }

      var rounded = Math.round(humanAge);
      var animalLabel = species === "dog" ? "愛犬" : "愛猫";
      var stage = lifeStage(ageYears, species, species === "dog" ? sizeSelect.value : null);
      var shareText = animalLabel + "(" + sizeLabel + ")は人間でいうと約" + rounded + "歳、" + stage.label + "でした! | Tiny Wonders";
      var pageUrl = "https://deskanimals114510-ai.github.io/tiny-wonders/nenrei-taiju.html";
      var stageLine = '<p class="result-sub"><span class="life-stage-badge' + (stage.isSenior ? " is-senior" : "") + '">' + stage.label + '</span></p>';
      var seniorLink = stage.isSenior
        ? '<p class="result-note"><a href="zatsugaku/shinia-sign.html">シニア期のはじまりサインをチェックしてみる →</a></p>'
        : '';
      resultBox.innerHTML =
        '<p class="result-headline">人間でいうと約 <strong>' + rounded + '歳</strong></p>' +
        stageLine +
        '<p class="result-sub">' + sizeLabel + ' ・ 実年齢 ' + years + '歳' + (months ? months + 'ヶ月' : '') + 'の場合の目安</p>' +
        '<p class="result-note">※犬種・体格・個体差により実際の老化スピードは異なります。あくまで参考値としてご覧ください。</p>' +
        seniorLink +
        buildShareRow(shareText, pageUrl);
      resultBox.hidden = false;
      if (window.TWTrack) window.TWTrack("tool_complete", { tool_name: "age_calc", species: species, life_stage: stage.label });
    });
  }

  var WEIGHT_LOG_KEY = "tinywonders-weight-log";
  var WEIGHT_LOG_MAX = 20;

  function loadWeightLog() {
    try {
      var raw = localStorage.getItem(WEIGHT_LOG_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }

  function saveWeightLog(log) {
    try { localStorage.setItem(WEIGHT_LOG_KEY, JSON.stringify(log)); } catch (e) {}
  }

  function todayLabel() {
    var d = new Date();
    return d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
  }

  function renderWeightLog() {
    var container = document.getElementById("weight-log");
    if (!container) return;
    var log = loadWeightLog();
    if (log.length === 0) {
      container.hidden = true;
      container.innerHTML = "";
      return;
    }
    var sorted = log.slice().sort(function (a, b) { return b.ts - a.ts; });
    var rows = sorted.map(function (entry, i) {
      var diffText = "";
      if (i < sorted.length - 1) {
        var diff = entry.kg - sorted[i + 1].kg;
        if (Math.abs(diff) >= 0.01) {
          diffText = '<span class="record-log-diff">(' + (diff > 0 ? "+" : "") + diff.toFixed(1) + "kg)</span>";
        }
      }
      return '<li class="record-log-row" data-index="' + log.indexOf(entry) + '">' +
        '<span class="record-log-date">' + entry.date + '</span>' +
        '<span class="record-log-value">' + entry.kg.toFixed(1) + 'kg ' + diffText + '</span>' +
        '<button type="button" class="record-log-delete" aria-label="この記録を削除">×</button>' +
        '</li>';
    });
    container.innerHTML =
      '<p class="record-log-title">わが子の体重ノート</p>' +
      '<ul class="record-log-list">' + rows.join("") + '</ul>';
    container.hidden = false;
  }

  function initWeightTool() {
    var form = document.getElementById("weight-form");
    var speciesRadios = document.querySelectorAll('input[name="weight-species"]');
    var currentInput = document.getElementById("weight-current");
    var standardInput = document.getElementById("weight-standard");
    var refInput = document.getElementById("weight-ref-human");
    var unitToggle = document.getElementById("weight-unit-lb");
    var resultBox = document.getElementById("weight-result");
    var logContainer = document.getElementById("weight-log");

    renderWeightLog();

    if (logContainer) {
      logContainer.addEventListener("click", function (e) {
        var btn = e.target.closest(".record-log-delete");
        if (!btn) return;
        var row = btn.closest(".record-log-row");
        var index = parseInt(row.getAttribute("data-index"), 10);
        var log = loadWeightLog();
        log.splice(index, 1);
        saveWeightLog(log);
        renderWeightLog();
      });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var useLb = unitToggle.checked;
      var currentRaw = parseFloat(currentInput.value);
      var standardRaw = parseFloat(standardInput.value);
      var refHuman = parseFloat(refInput.value) || 60;

      if (isNaN(currentRaw) || currentRaw <= 0) {
        resultBox.hidden = false;
        resultBox.innerHTML = '<p class="result-note">現在の体重を入力してください。</p>';
        return;
      }

      var currentKg = useLb ? window.PetCalc.lbToKg(currentRaw) : currentRaw;
      var standardKg = (!isNaN(standardRaw) && standardRaw > 0)
        ? (useLb ? window.PetCalc.lbToKg(standardRaw) : standardRaw)
        : null;

      var lines = [];
      var altUnit = useLb
        ? currentKg.toFixed(2) + ' kg'
        : window.PetCalc.kgToLb(currentKg).toFixed(2) + ' lb';
      lines.push('<p class="result-headline">' + currentRaw + (useLb ? 'lb' : 'kg') + ' は約 <strong>' + altUnit + '</strong></p>');

      var shareText = null;
      if (standardKg) {
        var human = window.PetCalc.humanEquivalentWeight(currentKg, standardKg, refHuman);
        if (human) {
          lines.push('<p class="result-sub">標準体重(' + standardRaw + (useLb ? 'lb' : 'kg') + ')と比べると、体重' + Math.round(refHuman) + 'kgのヒトでいうと約 <strong>' + human.toFixed(1) + 'kg</strong> 相当の変化イメージです。</p>');
          shareText = "うちの子の体重、ヒトでいうと約" + human.toFixed(1) + "kg相当でした! | Tiny Wonders";
        }
        var note = window.PetCalc.weightConditionNote(currentKg, standardKg);
        if (note === "over") {
          lines.push('<p class="result-note">標準よりやや重め(+15%以上)の目安です。気になる場合は獣医師にご相談ください。</p>');
        } else if (note === "under") {
          lines.push('<p class="result-note">標準よりやや軽め(-15%以上)の目安です。気になる場合は獣医師にご相談ください。</p>');
        } else {
          lines.push('<p class="result-note">標準体重の範囲内(±15%)の目安です。</p>');
        }
      } else {
        lines.push('<p class="result-note">標準体重を入力すると、人間換算した体重イメージも表示されます。</p>');
      }

      lines.push('<p class="result-note">※あくまで参考値です。健康上の判断は自己判断せず獣医師にご相談ください。</p>');
      lines.push('<button type="button" class="link-btn-secondary record-log-save">この記録をノートに残す</button>');
      if (shareText) {
        lines.push(buildShareRow(shareText, "https://deskanimals114510-ai.github.io/tiny-wonders/nenrei-taiju.html"));
      }
      resultBox.innerHTML = lines.join("");
      resultBox.hidden = false;
      if (window.TWTrack) window.TWTrack("tool_complete", { tool_name: "weight_calc", has_standard: !!standardKg });

      var saveBtn = resultBox.querySelector(".record-log-save");
      if (saveBtn) {
        saveBtn.addEventListener("click", function () {
          var log = loadWeightLog();
          log.push({ date: todayLabel(), ts: Date.now(), kg: currentKg });
          if (log.length > WEIGHT_LOG_MAX) log = log.slice(log.length - WEIGHT_LOG_MAX);
          saveWeightLog(log);
          renderWeightLog();
          saveBtn.disabled = true;
          saveBtn.textContent = "ノートに記録しました";
        });
      }
    });

    speciesRadios.forEach(function (r) {
      r.addEventListener("change", function () {
        standardInput.placeholder = currentWeightSpeciesPlaceholder();
      });
    });

    function currentWeightSpeciesPlaceholder() {
      var checked = document.querySelector('input[name="weight-species"]:checked');
      return checked && checked.value === "cat" ? "例: 4.5" : "例: 10";
    }
  }
})();
