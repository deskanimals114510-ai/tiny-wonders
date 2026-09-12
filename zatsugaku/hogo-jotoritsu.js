(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var data = window.TW_JOTORITSU;
    if (!data) return;

    // ---- 全国・返還譲渡率の推移ラインチャート(2004→2024) ----
    var chartEl = document.getElementById("joto-trend-chart");
    if (chartEl) {
      var years = data.years, values = data.totalRate;
      var W = 600, H = 220, padL = 40, padR = 12, padT = 14, padB = 26;
      var plotW = W - padL - padR, plotH = H - padT - padB;
      var maxV = 100;

      function xAt(i) { return padL + (i / (years.length - 1)) * plotW; }
      function yAt(v) { return padT + (1 - v / maxV) * plotH; }

      var points = values.map(function (v, i) { return xAt(i) + "," + yAt(v); });
      var linePath = "M" + points.join(" L");
      var areaPath = "M" + xAt(0) + "," + yAt(0) + " L" + points.join(" L") + " L" + xAt(values.length - 1) + "," + yAt(0) + " Z";

      var gridVals = [0, 25, 50, 75, 100];
      var gridLines = gridVals.map(function (v) {
        var y = yAt(v);
        return '<line class="trend-chart-axis" x1="' + padL + '" y1="' + y + '" x2="' + (W - padR) + '" y2="' + y + '"/>' +
          '<text class="trend-chart-label" x="' + (padL - 6) + '" y="' + (y + 3) + '" text-anchor="end">' + v + '%</text>';
      }).join("");

      var tickYears = [2004, 2012, 2018, 2024];
      var xLabels = tickYears.map(function (yr) {
        var i = years.indexOf(yr);
        if (i < 0) return "";
        return '<text class="trend-chart-label" x="' + xAt(i) + '" y="' + (H - 6) + '" text-anchor="middle">' + yr + '</text>';
      }).join("");

      var firstMark = '<circle class="trend-chart-peak" cx="' + xAt(0) + '" cy="' + yAt(values[0]) + '" r="4"/>' +
        '<text class="trend-chart-peak-label" x="' + xAt(0) + '" y="' + (yAt(values[0]) - 10) + '" text-anchor="start">2004年度 ' + values[0].toFixed(1) + '%</text>';

      var lastIdx = values.length - 1;
      var lastMark = '<circle class="trend-chart-peak" cx="' + xAt(lastIdx) + '" cy="' + yAt(values[lastIdx]) + '" r="4"/>' +
        '<text class="trend-chart-peak-label" x="' + xAt(lastIdx) + '" y="' + (yAt(values[lastIdx]) - 10) + '" text-anchor="end">2024年度 ' + values[lastIdx].toFixed(1) + '%</text>';

      chartEl.innerHTML =
        '<svg class="trend-chart-svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="犬猫合計の返還・譲渡率の推移。2004年度は7.0%でしたが、2024年度には82.5%まで上昇しています。">' +
        gridLines + xLabels +
        '<path class="trend-chart-area" d="' + areaPath + '"/>' +
        '<path class="trend-chart-line" d="' + linePath + '"/>' +
        firstMark + lastMark +
        '</svg>';
    }

    // ---- 犬・猫それぞれの2004年度→2024年度 比較バー ----
    function renderPctPair(containerId, obj, label) {
      var el = document.getElementById(containerId);
      if (!el) return;
      var maxV = 100;
      var group = document.createElement("div");
      group.className = "trend-pair-group";
      var diff = obj.to - obj.from;
      group.innerHTML =
        '<div class="trend-pair-label">' + label + ' <span class="trend-pair-pct is-up">+' + diff.toFixed(1) + 'pt</span></div>' +
        '<div class="mitsudo-bar-row"><span class="mitsudo-bar-label">' + obj.fromLabel + '</span><div class="mitsudo-bar-track"><div class="mitsudo-bar-fill mitsudo-bar-fill--muted" style="width:' + Math.max(3, (obj.from / maxV) * 100) + '%"></div></div><span class="mitsudo-bar-value">' + obj.from.toFixed(1) + '%</span></div>' +
        '<div class="mitsudo-bar-row"><span class="mitsudo-bar-label">' + obj.toLabel + '</span><div class="mitsudo-bar-track"><div class="mitsudo-bar-fill" style="width:' + Math.max(3, (obj.to / maxV) * 100) + '%"></div></div><span class="mitsudo-bar-value">' + obj.to.toFixed(1) + '%</span></div>';
      el.appendChild(group);
    }
    renderPctPair("joto-dog-pair", data.dog, "犬");
    renderPctPair("joto-cat-pair", data.cat, "猫");

    // ---- 都道府県別 返還・譲渡率 TOP10/WORST10 ----
    var sorted = data.prefectures.slice().sort(function (a, b) { return b.rate - a.rate; });
    sorted.forEach(function (r, i) { r.rank = i + 1; });
    var maxRate = sorted[0].rate;

    function renderBars(containerId, list) {
      var el = document.getElementById(containerId);
      if (!el) return;
      list.forEach(function (r) {
        var row = document.createElement("div");
        row.className = "mitsudo-bar-row";
        var label = document.createElement("span");
        label.className = "mitsudo-bar-label";
        label.textContent = r.rank + "位 " + r.pref;
        var track = document.createElement("div");
        track.className = "mitsudo-bar-track";
        var fill = document.createElement("div");
        fill.className = "mitsudo-bar-fill";
        fill.style.width = Math.max(4, (r.rate / maxRate) * 100) + "%";
        track.appendChild(fill);
        var value = document.createElement("span");
        value.className = "mitsudo-bar-value";
        value.textContent = r.rate.toFixed(1) + "%";
        row.appendChild(label);
        row.appendChild(track);
        row.appendChild(value);
        el.appendChild(row);
      });
    }
    renderBars("joto-top10", sorted.slice(0, 10));
    renderBars("joto-worst10", sorted.slice(-10).reverse());

    // ---- 全47都道府県ランキング表 ----
    var tableBody = document.getElementById("joto-table-body");
    if (tableBody) {
      var frag = document.createDocumentFragment();
      sorted.forEach(function (r) {
        var tr = document.createElement("tr");
        tr.innerHTML = "<td>" + r.rank + "</td><td>" + r.pref + "</td><td>" + r.rate.toFixed(1) + "%</td>";
        frag.appendChild(tr);
      });
      tableBody.appendChild(frag);
    }
  });
})();
