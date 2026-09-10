(function () {
  "use strict";

  function shortName(pref) {
    if (pref === "北海道") return "北海道";
    return pref.replace(/[都道府県]$/, "");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var raw = window.TW_INU_MITSUDO;
    if (!raw || !raw.length) return;

    var rows = raw.map(function (r) {
      return {
        pref: r.pref,
        region: r.region,
        dogs: r.dogs,
        pop: r.pop,
        col: r.col,
        row: r.row,
        density: (r.dogs / r.pop) * 1000
      };
    });

    var sorted = rows.slice().sort(function (a, b) { return b.density - a.density; });
    sorted.forEach(function (r, i) { r.rank = i + 1; });

    // 5分位のしきい値(タイルマップの塗り分け用)
    var densities = sorted.map(function (r) { return r.density; });
    function quantile(p) {
      var idx = (densities.length - 1) * p;
      var lo = Math.floor(idx), hi = Math.ceil(idx);
      if (lo === hi) return densities[lo];
      return densities[lo] + (densities[hi] - densities[lo]) * (idx - lo);
    }
    var thresholds = [quantile(0.8), quantile(0.6), quantile(0.4), quantile(0.2)];
    function bandOf(d) {
      if (d >= thresholds[0]) return 5;
      if (d >= thresholds[1]) return 4;
      if (d >= thresholds[2]) return 3;
      if (d >= thresholds[3]) return 2;
      return 1;
    }

    // ---- タイルマップ描画 ----
    var mapEl = document.getElementById("mitsudo-map");
    if (mapEl) {
      rows.forEach(function (r) {
        var tile = document.createElement("div");
        var band = bandOf(r.density);
        tile.className = "mitsudo-tile mitsudo-tile--q" + band;
        tile.style.gridColumn = String(r.col + 1);
        tile.style.gridRow = String(r.row + 1);
        tile.textContent = shortName(r.pref);
        tile.title = r.pref + ": 人口1000人あたり" + r.density.toFixed(1) + "頭(全国" + r.rank + "位)";
        mapEl.appendChild(tile);
      });
    }

    // ---- TOP10 / WORST10 バーチャート ----
    var maxDensity = sorted[0].density;
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
        fill.style.width = Math.max(4, (r.density / maxDensity) * 100) + "%";
        track.appendChild(fill);

        var value = document.createElement("span");
        value.className = "mitsudo-bar-value";
        value.textContent = r.density.toFixed(1);

        row.appendChild(label);
        row.appendChild(track);
        row.appendChild(value);
        el.appendChild(row);
      });
    }
    renderBars("mitsudo-top10", sorted.slice(0, 10));
    renderBars("mitsudo-worst10", sorted.slice(-10).reverse());

    // ---- 全47都道府県ランキング表 ----
    var tableBody = document.getElementById("mitsudo-table-body");
    if (tableBody) {
      var frag = document.createDocumentFragment();
      sorted.forEach(function (r) {
        var tr = document.createElement("tr");
        tr.innerHTML =
          "<td>" + r.rank + "</td>" +
          "<td>" + r.pref + "</td>" +
          "<td>" + r.dogs.toLocaleString("ja-JP") + "</td>" +
          "<td>" + r.density.toFixed(1) + "</td>";
        frag.appendChild(tr);
      });
      tableBody.appendChild(frag);
    }
  });
})();
