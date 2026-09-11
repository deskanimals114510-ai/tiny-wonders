(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var data = window.TW_INU_NINKI;
    if (!data) return;

    // ---- ダックスフンド登録頭数の推移ラインチャート ----
    var chartEl = document.getElementById("ninki-dachs-chart");
    if (chartEl) {
      var years = data.years, values = data.dachshund;
      var W = 600, H = 220, padL = 46, padR = 12, padT = 14, padB = 26;
      var plotW = W - padL - padR, plotH = H - padT - padB;
      var maxV = 180000;

      function xAt(i) { return padL + (i / (years.length - 1)) * plotW; }
      function yAt(v) { return padT + (1 - v / maxV) * plotH; }

      var points = values.map(function (v, i) { return xAt(i) + "," + yAt(v); });
      var linePath = "M" + points.join(" L");
      var areaPath = "M" + xAt(0) + "," + yAt(0) + " L" + points.join(" L") + " L" + xAt(values.length - 1) + "," + yAt(0) + " Z";

      var gridVals = [0, 50000, 100000, 150000];
      var gridLines = gridVals.map(function (v) {
        var y = yAt(v);
        return '<line class="trend-chart-axis" x1="' + padL + '" y1="' + y + '" x2="' + (W - padR) + '" y2="' + y + '"/>' +
          '<text class="trend-chart-label" x="' + (padL - 6) + '" y="' + (y + 3) + '" text-anchor="end">' + (v === 0 ? "0" : (v / 10000) + "万") + '</text>';
      }).join("");

      var tickYears = [1999, 2003, 2013, 2025];
      var xLabels = tickYears.map(function (yr) {
        var i = years.indexOf(yr);
        if (i < 0) return "";
        return '<text class="trend-chart-label" x="' + xAt(i) + '" y="' + (H - 6) + '" text-anchor="middle">' + yr + '</text>';
      }).join("");

      var peakIdx = years.indexOf(data.peakYear);
      var peakX = xAt(peakIdx), peakY = yAt(data.peakValue);
      var peakMark = '<circle class="trend-chart-peak" cx="' + peakX + '" cy="' + peakY + '" r="4"/>' +
        '<text class="trend-chart-peak-label" x="' + peakX + '" y="' + (peakY - 10) + '" text-anchor="middle">' + data.peakYear + '年 ' + Math.round(data.peakValue / 1000) + '千頭</text>';

      var lastIdx = values.length - 1;
      var lastX = xAt(lastIdx), lastY = yAt(values[lastIdx]);
      var lastMark = '<circle class="trend-chart-peak" cx="' + lastX + '" cy="' + lastY + '" r="4"/>' +
        '<text class="trend-chart-peak-label" x="' + lastX + '" y="' + (lastY - 10) + '" text-anchor="end">2025年 ' + Math.round(values[lastIdx] / 1000) + '千頭</text>';

      chartEl.innerHTML =
        '<svg class="trend-chart-svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="ダックスフンドの登録頭数推移。1999年76,711頭から2003年に171,144頭でピークを迎え、2025年には30,615頭まで減少しています。">' +
        gridLines + xLabels +
        '<path class="trend-chart-area" d="' + areaPath + '"/>' +
        '<path class="trend-chart-line" d="' + linePath + '"/>' +
        peakMark + lastMark +
        '</svg>';
    }

    // ---- 上昇犬種・下落犬種の1999年→2025年比較バー ----
    function renderPairs(containerId, list) {
      var el = document.getElementById(containerId);
      if (!el) return;
      var maxV = 0;
      list.forEach(function (b) { maxV = Math.max(maxV, b.from, b.to); });
      var frag = document.createDocumentFragment();
      list.forEach(function (b) {
        var group = document.createElement("div");
        group.className = "trend-pair-group";
        var sign = b.pct > 0 ? "+" : "";
        group.innerHTML =
          '<div class="trend-pair-label">' + b.breed + ' <span class="trend-pair-pct ' + (b.pct > 0 ? "is-up" : "is-down") + '">' + sign + b.pct.toFixed(1) + '%</span></div>' +
          '<div class="mitsudo-bar-row"><span class="mitsudo-bar-label">1999年</span><div class="mitsudo-bar-track"><div class="mitsudo-bar-fill mitsudo-bar-fill--muted" style="width:' + Math.max(3, (b.from / maxV) * 100) + '%"></div></div><span class="mitsudo-bar-value">' + b.from.toLocaleString("ja-JP") + '</span></div>' +
          '<div class="mitsudo-bar-row"><span class="mitsudo-bar-label">2025年</span><div class="mitsudo-bar-track"><div class="mitsudo-bar-fill" style="width:' + Math.max(3, (b.to / maxV) * 100) + '%"></div></div><span class="mitsudo-bar-value">' + b.to.toLocaleString("ja-JP") + '</span></div>';
        frag.appendChild(group);
      });
      el.appendChild(frag);
    }
    renderPairs("ninki-risers", data.risers);
    renderPairs("ninki-fallers", data.fallers);

    // ---- 2025年 登録頭数トップ10表 ----
    var tableBody = document.getElementById("ninki-table-body");
    if (tableBody) {
      var frag2 = document.createDocumentFragment();
      data.top2025.forEach(function (r) {
        var tr = document.createElement("tr");
        tr.innerHTML = "<td>" + r.rank + "</td><td>" + r.breed + "</td><td>" + r.count.toLocaleString("ja-JP") + "</td>";
        frag2.appendChild(tr);
      });
      tableBody.appendChild(frag2);
    }
  });
})();
