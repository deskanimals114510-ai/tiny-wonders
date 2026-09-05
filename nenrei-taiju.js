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
      btn.addEventListener("click", function () {
        var target = btn.getAttribute("data-tab");
        tabButtons.forEach(function (b) { b.classList.toggle("is-active", b === btn); });
        panels.forEach(function (p) {
          p.classList.toggle("is-active", p.getAttribute("data-panel") === target);
        });
      });
    });
  }

  function initAgeTool() {
    var speciesRadios = document.querySelectorAll('input[name="age-species"]');
    var sizeField = document.getElementById("age-dog-size-field");
    var yearsInput = document.getElementById("age-years");
    var monthsInput = document.getElementById("age-months");
    var sizeSelect = document.getElementById("age-dog-size");
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
      resultBox.innerHTML =
        '<p class="result-headline">人間でいうと約 <strong>' + rounded + '歳</strong></p>' +
        '<p class="result-sub">' + sizeLabel + ' ・ 実年齢 ' + years + '歳' + (months ? months + 'ヶ月' : '') + 'の場合の目安</p>' +
        '<p class="result-note">※犬種・体格・個体差により実際の老化スピードは異なります。あくまで参考値としてご覧ください。</p>';
      resultBox.hidden = false;
    });
  }

  function initWeightTool() {
    var form = document.getElementById("weight-form");
    var speciesRadios = document.querySelectorAll('input[name="weight-species"]');
    var currentInput = document.getElementById("weight-current");
    var standardInput = document.getElementById("weight-standard");
    var refInput = document.getElementById("weight-ref-human");
    var unitToggle = document.getElementById("weight-unit-lb");
    var resultBox = document.getElementById("weight-result");

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

      if (standardKg) {
        var human = window.PetCalc.humanEquivalentWeight(currentKg, standardKg, refHuman);
        if (human) {
          lines.push('<p class="result-sub">標準体重(' + standardRaw + (useLb ? 'lb' : 'kg') + ')と比べると、体重' + Math.round(refHuman) + 'kgのヒトでいうと約 <strong>' + human.toFixed(1) + 'kg</strong> 相当の変化イメージです。</p>');
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

      resultBox.innerHTML = lines.join("");
      resultBox.hidden = false;
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
