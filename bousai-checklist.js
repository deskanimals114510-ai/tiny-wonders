// ペットの防災手帳チェックリスト — チェック状態をlocalStorageに保存する。
// 印刷ボタンはwindow.print()を呼び出すのみ、印刷時のレイアウトはstyle.cssの@media printで制御。

(function () {
  "use strict";
  var STORAGE_KEY = "tinywonders-bousai-checklist";

  function loadChecked() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) { return {}; }
  }

  function saveChecked(map) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(map)); } catch (e) {}
  }

  document.addEventListener("DOMContentLoaded", function () {
    var checkboxes = document.querySelectorAll(".checklist-item input[type=checkbox]");
    if (checkboxes.length === 0) return;

    var checked = loadChecked();
    checkboxes.forEach(function (box) {
      if (checked[box.id]) box.checked = true;
      box.addEventListener("change", function () {
        checked[box.id] = box.checked;
        saveChecked(checked);
      });
    });

    var printBtn = document.getElementById("checklist-print");
    if (printBtn) {
      printBtn.addEventListener("click", function () {
        if (window.TWTrack) window.TWTrack("tool_complete", { tool_name: "bousai_checklist_print" });
        window.print();
      });
    }
  });
})();
