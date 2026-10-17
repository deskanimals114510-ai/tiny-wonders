// 都道府県別「犬1,000頭あたりの獣医師数・動物病院数」データ(2026-10-17作成)。
// 出典1: 農林水産省「獣医師の届出状況(獣医師数)」令和6年12月31日現在(獣医師法第22条の届出)。診療施設に従事する獣医師のうち「犬猫」(開設者+被雇用者)。
//        https://www.maff.go.jp/j/tokei/kouhyou/zyui/index.html
// 出典2: 農林水産省「飼育動物診療施設の開設届出状況(診療施設数)」令和6年12月31日現在。小動物・その他の診療施設数と合計。
//        https://www.maff.go.jp/j/tokei/kouhyou/animal/index.html
// 出典3: 厚生労働省「都道府県別の犬の登録頭数と予防注射頭数等」令和6年度(年度末現在=2025年3月31日)。https://www.mhlw.go.jp/bunya/kenkou/kekkaku-kansenshou10/01.html
// 出典4: 総務省統計局「人口推計(2024年10月1日現在)」都道府県別総人口(千人単位を人数に換算)。
// 検算: 47県の合計が、犬の登録頭数6,048,725/犬猫診療従事獣医師16,717/小動物その他施設12,846/診療施設合計16,993で、各表の全国計と一致(2026-10-17)。
// col/row は14×14のタイルグリッド座標(北海道が右上、沖縄が左下)。出典: miruky/nihonmap (MIT License) https://github.com/miruky/nihonmap
window.TW_JUISHI = [
  { pref: "東京都", region: "関東", dogs: 558579, pop: 14178000, vets: 2774, fac: 1992, facSmall: 1912, col: 10, row: 7 },
  { pref: "神奈川県", region: "関東", dogs: 434721, pop: 9225000, vets: 1737, fac: 1243, facSmall: 1166, col: 10, row: 8 },
  { pref: "奈良県", region: "近畿", dogs: 56104, pop: 1285000, vets: 201, fac: 157, facSmall: 141, col: 7, row: 8 },
  { pref: "千葉県", region: "関東", dogs: 320995, pop: 6251000, vets: 1043, fac: 882, facSmall: 730, col: 11, row: 6 },
  { pref: "京都府", region: "近畿", dogs: 114192, pop: 2520000, vets: 368, fac: 288, facSmall: 258, col: 6, row: 7 },
  { pref: "埼玉県", region: "関東", dogs: 348398, pop: 7332000, vets: 1090, fac: 880, facSmall: 817, col: 10, row: 6 },
  { pref: "北海道", region: "北海道", dogs: 234280, pop: 5043000, vets: 693, fac: 1136, facSmall: 534, col: 13, row: 0 },
  { pref: "鳥取県", region: "中国", dogs: 21260, pop: 531000, vets: 62, fac: 109, facSmall: 44, col: 4, row: 7 },
  { pref: "山梨県", region: "中部", dogs: 41375, pop: 791000, vets: 107, fac: 127, facSmall: 105, col: 9, row: 6 },
  { pref: "石川県", region: "中部", dogs: 47452, pop: 1098000, vets: 122, fac: 117, facSmall: 93, col: 7, row: 5 },
  { pref: "宮城県", region: "東北", dogs: 101163, pop: 2248000, vets: 260, fac: 302, facSmall: 192, col: 12, row: 3 },
  { pref: "大阪府", region: "近畿", dogs: 412545, pop: 8757000, vets: 1057, fac: 877, facSmall: 854, col: 6, row: 8 },
  { pref: "鹿児島県", region: "九州・沖縄", dogs: 68782, pop: 1532000, vets: 176, fac: 388, facSmall: 154, col: 1, row: 11 },
  { pref: "山形県", region: "東北", dogs: 36777, pop: 1011000, vets: 94, fac: 140, facSmall: 64, col: 11, row: 3 },
  { pref: "静岡県", region: "中部", dogs: 188560, pop: 3527000, vets: 467, fac: 454, facSmall: 385, col: 9, row: 7 },
  { pref: "栃木県", region: "関東", dogs: 98574, pop: 1885000, vets: 244, fac: 321, facSmall: 180, col: 11, row: 5 },
  { pref: "愛知県", region: "中部", dogs: 420901, pop: 7460000, vets: 1027, fac: 826, facSmall: 707, col: 8, row: 7 },
  { pref: "新潟県", region: "中部", dogs: 79823, pop: 2099000, vets: 194, fac: 208, facSmall: 155, col: 10, row: 4 },
  { pref: "長野県", region: "中部", dogs: 97020, pop: 1987000, vets: 233, fac: 320, facSmall: 230, col: 9, row: 5 },
  { pref: "兵庫県", region: "近畿", dogs: 279840, pop: 5337000, vets: 663, fac: 689, facSmall: 571, col: 5, row: 7 },
  { pref: "熊本県", region: "九州・沖縄", dogs: 80372, pop: 1697000, vets: 190, fac: 286, facSmall: 152, col: 1, row: 10 },
  { pref: "群馬県", region: "関東", dogs: 104756, pop: 1890000, vets: 239, fac: 304, facSmall: 207, col: 10, row: 5 },
  { pref: "沖縄県", region: "九州・沖縄", dogs: 62338, pop: 1466000, vets: 140, fac: 255, facSmall: 145, col: 0, row: 13 },
  { pref: "広島県", region: "中国", dogs: 144324, pop: 2714000, vets: 316, fac: 317, facSmall: 247, col: 3, row: 8 },
  { pref: "茨城県", region: "関東", dogs: 155572, pop: 2806000, vets: 340, fac: 417, facSmall: 287, col: 12, row: 5 },
  { pref: "富山県", region: "中部", dogs: 41861, pop: 997000, vets: 91, fac: 88, facSmall: 59, col: 8, row: 5 },
  { pref: "山口県", region: "中国", dogs: 71490, pop: 1281000, vets: 153, fac: 189, facSmall: 134, col: 2, row: 8 },
  { pref: "滋賀県", region: "近畿", dogs: 79295, pop: 1402000, vets: 166, fac: 169, facSmall: 128, col: 7, row: 7 },
  { pref: "福岡県", region: "九州・沖縄", dogs: 259976, pop: 5092000, vets: 538, fac: 495, facSmall: 451, col: 1, row: 9 },
  { pref: "高知県", region: "四国", dogs: 38222, pop: 656000, vets: 78, fac: 100, facSmall: 72, col: 4, row: 10 },
  { pref: "大分県", region: "九州・沖縄", dogs: 54023, pop: 1085000, vets: 109, fac: 170, facSmall: 99, col: 2, row: 9 },
  { pref: "秋田県", region: "東北", dogs: 33157, pop: 897000, vets: 65, fac: 124, facSmall: 60, col: 11, row: 2 },
  { pref: "岡山県", region: "中国", dogs: 100744, pop: 1831000, vets: 193, fac: 258, facSmall: 161, col: 4, row: 8 },
  { pref: "長崎県", region: "九州・沖縄", dogs: 54941, pop: 1252000, vets: 105, fac: 149, facSmall: 92, col: 0, row: 10 },
  { pref: "岐阜県", region: "中部", dogs: 113443, pop: 1916000, vets: 212, fac: 273, facSmall: 185, col: 8, row: 6 },
  { pref: "福島県", region: "東北", dogs: 86061, pop: 1743000, vets: 159, fac: 262, facSmall: 143, col: 11, row: 4 },
  { pref: "岩手県", region: "東北", dogs: 54183, pop: 1145000, vets: 98, fac: 265, facSmall: 91, col: 12, row: 2 },
  { pref: "徳島県", region: "四国", dogs: 41528, pop: 685000, vets: 75, fac: 105, facSmall: 62, col: 5, row: 9 },
  { pref: "福井県", region: "中部", dogs: 29974, pop: 739000, vets: 54, fac: 53, facSmall: 44, col: 7, row: 6 },
  { pref: "香川県", region: "四国", dogs: 68046, pop: 917000, vets: 122, fac: 119, facSmall: 86, col: 4, row: 9 },
  { pref: "青森県", region: "東北", dogs: 49776, pop: 1165000, vets: 84, fac: 197, facSmall: 79, col: 12, row: 1 },
  { pref: "三重県", region: "近畿", dogs: 111435, pop: 1711000, vets: 188, fac: 207, facSmall: 159, col: 8, row: 8 },
  { pref: "愛媛県", region: "四国", dogs: 79734, pop: 1276000, vets: 134, fac: 160, facSmall: 111, col: 3, row: 9 },
  { pref: "島根県", region: "中国", dogs: 31064, pop: 642000, vets: 50, fac: 146, facSmall: 58, col: 3, row: 7 },
  { pref: "宮崎県", region: "九州・沖縄", dogs: 53843, pop: 1033000, vets: 84, fac: 243, facSmall: 103, col: 2, row: 10 },
  { pref: "佐賀県", region: "九州・沖縄", dogs: 38621, pop: 788000, vets: 59, fac: 89, facSmall: 51, col: 0, row: 9 },
  { pref: "和歌山県", region: "近畿", dogs: 48605, pop: 880000, vets: 63, fac: 97, facSmall: 88, col: 6, row: 9 },
];
