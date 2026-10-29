// モルモットのビタミンC計算機。体重から「最低ライン」を出し、野菜ごとにその野菜だけで最低ラインに届く量を出す。
// 数字は表の data-c(日本食品標準成分表の可食部100gあたりのビタミンC、mg)から読む。
(function () {
  "use strict";

  var MIN_PER_KG = 10;   // 体重1kgあたり1日の最低ライン(mg)
  var HIGH_PER_KG = 25;  // 獣医向け資料(Merck)の成体の幅の上限(mg/kg)
  var W_MIN = 100;
  var W_MAX = 2000;
  var ADULT_MIN = 700;   // 成体メスの体重の下限の目安(VCA)。これより軽いときは成長期の可能性があるため数字を出さない

  var form = document.getElementById("gp-form");
  if (!form) return;

  var weightInput = document.getElementById("gp-weight");
  var minOut = document.getElementById("gp-min");
  var rangeOut = document.getElementById("gp-range");
  var weightMsg = document.getElementById("gp-weight-msg");
  var youngOut = document.getElementById("gp-young");
  var rows = Array.prototype.slice.call(document.querySelectorAll("#gp-foods tbody tr"));
  var tracked = false;

  function fmt(n) {
    return (Math.round(n * 10) / 10).toFixed(1);
  }

  function readWeight() {
    var raw = weightInput.value.trim();
    if (raw === "") return null;
    var w = Number(raw);
    if (!isFinite(w) || w < W_MIN || w > W_MAX) return null;
    return w;
  }

  function setNeeds(text) {
    rows.forEach(function (row) {
      row.querySelector(".gp-need").textContent = text;
    });
  }

  function update(showYoung) {
    var w = readWeight();
    youngOut.textContent = "";
    if (w === null) {
      minOut.textContent = "-";
      rangeOut.textContent = "-";
      setNeeds("-");
      weightInput.setAttribute("aria-invalid", "true");
      return null;
    }
    weightInput.removeAttribute("aria-invalid");
    weightMsg.textContent = "";
    if (w < ADULT_MIN) {
      minOut.textContent = "-";
      rangeOut.textContent = "-";
      setNeeds("-");
      if (showYoung) {
        youngOut.textContent = "体重が " + ADULT_MIN + " g より軽いので、成長期の可能性があります。成長期は必要量が増えるため、ここでは数字を出しません。成長期でなくても、やせている・病気の場合があります。早めに獣医師に相談してください。";
      }
      return w;
    }
    var minMg = (w / 1000) * MIN_PER_KG;
    minOut.textContent = fmt(minMg);
    rangeOut.textContent = fmt(minMg) + "〜" + fmt((w / 1000) * HIGH_PER_KG);
    rows.forEach(function (row) {
      var c = Number(row.getAttribute("data-c"));
      row.querySelector(".gp-need").textContent = fmt((minMg / c) * 100) + " g";
    });
    return w;
  }

  // 入力中は黙って計算し、入力を終えたとき(change)に範囲外の案内を出す
  weightInput.addEventListener("input", function () { update(false); });
  weightInput.addEventListener("change", function () {
    var w = update(true);
    if (w === null) {
      weightMsg.textContent = "半角の数字で、" + W_MIN + "〜" + W_MAX + " g の範囲で入れてください。";
    } else if (!tracked) {
      tracked = true;
      if (window.TWTrack) window.TWTrack("tool_complete", { tool_name: "guinea_pig_vitc" });
    }
  });
  form.addEventListener("submit", function (e) { e.preventDefault(); });
  update(true);
})();
