(function () {
  "use strict";

  function shortName(pref) {
    if (pref === "北海道") return "北海道";
    return pref.replace(/[都道府県]$/, "");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var raw = window.TW_JUISHI;
    if (!raw || !raw.length) return;

    var rows = raw.map(function (r) {
      return {
        pref: r.pref,
        region: r.region,
        dogs: r.dogs,
        pop: r.pop,
        vets: r.vets,
        col: r.col,
        row: r.row,
        perDogs: (r.vets / r.dogs) * 1000,
        perPop: (r.vets / r.pop) * 100000
      };
    });

    // 犬1,000頭あたりの獣医師数の多い順に順位を付ける
    var sorted = rows.slice().sort(function (a, b) { return b.perDogs - a.perDogs; });
    sorted.forEach(function (r, i) { r.rank = i + 1; });

    // 参考: 人口10万人あたりの順位
    rows.slice().sort(function (a, b) { return b.perPop - a.perPop; })
      .forEach(function (r, i) { r.popRank = i + 1; });

    // 5分位のしきい値(タイルマップの塗り分け用)
    // quantile() は昇順の配列を前提にするため、多い順の並びを反転して渡す
    var values = sorted.map(function (r) { return r.perDogs; }).reverse();
    function quantile(p) {
      var idx = (values.length - 1) * p;
      var lo = Math.floor(idx), hi = Math.ceil(idx);
      if (lo === hi) return values[lo];
      return values[lo] + (values[hi] - values[lo]) * (idx - lo);
    }
    var thresholds = [quantile(0.8), quantile(0.6), quantile(0.4), quantile(0.2)];
    function bandOf(v) {
      if (v >= thresholds[0]) return 5;
      if (v >= thresholds[1]) return 4;
      if (v >= thresholds[2]) return 3;
      if (v >= thresholds[3]) return 2;
      return 1;
    }

    // ---- タイルマップ描画 ----
    var mapEl = document.getElementById("byoin-map");
    if (mapEl) {
      rows.forEach(function (r) {
        var tile = document.createElement("div");
        tile.className = "mitsudo-tile mitsudo-tile--q" + bandOf(r.perDogs);
        tile.style.gridColumn = String(r.col + 1);
        tile.style.gridRow = String(r.row + 1);
        tile.textContent = shortName(r.pref);
        tile.title = r.pref + ": 犬1,000頭あたり" + r.perDogs.toFixed(2) + "人(全国" + r.rank + "位)";
        mapEl.appendChild(tile);
      });
    }

    // ---- 上位10 / 下位10 バーチャート ----
    var maxValue = sorted[0].perDogs;
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
        fill.style.width = Math.max(4, (r.perDogs / maxValue) * 100) + "%";
        track.appendChild(fill);

        var value = document.createElement("span");
        value.className = "mitsudo-bar-value";
        value.textContent = r.perDogs.toFixed(2);

        row.appendChild(label);
        row.appendChild(track);
        row.appendChild(value);
        el.appendChild(row);
      });
    }
    renderBars("byoin-top10", sorted.slice(0, 10));
    renderBars("byoin-worst10", sorted.slice(-10).reverse());

    // ---- 全47都道府県ランキング表 ----
    var tableBody = document.getElementById("byoin-table-body");
    if (tableBody) {
      var frag = document.createDocumentFragment();
      sorted.forEach(function (r) {
        var tr = document.createElement("tr");
        tr.innerHTML =
          "<td>" + r.rank + "</td>" +
          "<td>" + r.pref + "</td>" +
          "<td>" + r.vets.toLocaleString("ja-JP") + "</td>" +
          "<td>" + r.dogs.toLocaleString("ja-JP") + "</td>" +
          "<td>" + r.perDogs.toFixed(2) + "</td>" +
          "<td>" + r.popRank + "</td>";
        frag.appendChild(tr);
      });
      tableBody.appendChild(frag);
    }
  });
})();
