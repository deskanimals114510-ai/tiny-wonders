// 都道府県別「犬密度」(人口1000人あたり犬登録頭数)データ。
// 出典1: 厚生労働省「衛生行政報告例」令和5年度(2023年度)統計表、第11章 狂犬病予防 第1表(犬の登録頭数、2024年3月31日時点)
//        https://www.e-stat.go.jp/stat-search/files?toukei=00450027
// 出典2: 総務省統計局「人口推計(2024年10月1日現在)」都道府県、男女別人口(総人口、千人単位)
//        https://www.stat.go.jp/data/jinsui/2024np/index.html
// 犬登録頭数の全国合計(6,054,519頭)は統計表内の「全国」欄と一致確認済み(検算済み、2026-09-10)。
// pop は総務省公表の千人単位の値をそのまま人数に換算(×1000)。年度は犬データ2024年3月末、人口2024年10月1日で約7か月のズレあり。
//
// col/row は14×14のタイルグリッド座標(北海道が右上、沖縄が左下)。
// 出典: miruky/nihonmap (MIT License) https://github.com/miruky/nihonmap
window.TW_INU_MITSUDO = [
  { pref: "香川県", region: "四国", dogs: 69196, pop: 917000, col: 4, row: 9 },
  { pref: "三重県", region: "近畿", dogs: 112356, pop: 1711000, col: 8, row: 8 },
  { pref: "高知県", region: "四国", dogs: 40082, pop: 656000, col: 4, row: 10 },
  { pref: "愛媛県", region: "四国", dogs: 77885, pop: 1276000, col: 3, row: 9 },
  { pref: "徳島県", region: "四国", dogs: 41262, pop: 685000, col: 5, row: 9 },
  { pref: "岐阜県", region: "中部", dogs: 114664, pop: 1916000, col: 8, row: 6 },
  { pref: "愛知県", region: "中部", dogs: 423471, pop: 7460000, col: 8, row: 7 },
  { pref: "茨城県", region: "関東", dogs: 158146, pop: 2806000, col: 12, row: 5 },
  { pref: "滋賀県", region: "近畿", dogs: 78781, pop: 1402000, col: 7, row: 7 },
  { pref: "群馬県", region: "関東", dogs: 105405, pop: 1890000, col: 10, row: 5 },
  { pref: "和歌山県", region: "近畿", dogs: 48370, pop: 880000, col: 6, row: 9 },
  { pref: "岡山県", region: "中国", dogs: 100253, pop: 1831000, col: 4, row: 8 },
  { pref: "静岡県", region: "中部", dogs: 192534, pop: 3527000, col: 9, row: 7 },
  { pref: "山口県", region: "中国", dogs: 69745, pop: 1281000, col: 2, row: 8 },
  { pref: "兵庫県", region: "近畿", dogs: 285951, pop: 5337000, col: 5, row: 7 },
  { pref: "宮崎県", region: "九州・沖縄", dogs: 55043, pop: 1033000, col: 2, row: 10 },
  { pref: "広島県", region: "中国", dogs: 143716, pop: 2714000, col: 3, row: 8 },
  { pref: "山梨県", region: "中部", dogs: 41641, pop: 791000, col: 9, row: 6 },
  { pref: "大分県", region: "九州・沖縄", dogs: 56480, pop: 1085000, col: 2, row: 9 },
  { pref: "栃木県", region: "関東", dogs: 97564, pop: 1885000, col: 11, row: 5 },
  { pref: "福島県", region: "東北", dogs: 89510, pop: 1743000, col: 11, row: 4 },
  { pref: "千葉県", region: "関東", dogs: 315054, pop: 6251000, col: 11, row: 6 },
  { pref: "長野県", region: "中部", dogs: 99145, pop: 1987000, col: 9, row: 5 },
  { pref: "福岡県", region: "九州・沖縄", dogs: 253191, pop: 5092000, col: 1, row: 9 },
  { pref: "島根県", region: "中国", dogs: 31815, pop: 642000, col: 3, row: 7 },
  { pref: "岩手県", region: "東北", dogs: 56605, pop: 1145000, col: 12, row: 2 },
  { pref: "佐賀県", region: "九州・沖縄", dogs: 38379, pop: 788000, col: 0, row: 9 },
  { pref: "熊本県", region: "九州・沖縄", dogs: 80774, pop: 1697000, col: 1, row: 10 },
  { pref: "埼玉県", region: "関東", dogs: 348230, pop: 7332000, col: 10, row: 6 },
  { pref: "神奈川県", region: "関東", dogs: 436798, pop: 9225000, col: 10, row: 8 },
  { pref: "北海道", region: "北海道", dogs: 235882, pop: 5043000, col: 13, row: 0 },
  { pref: "大阪府", region: "近畿", dogs: 401813, pop: 8757000, col: 6, row: 8 },
  { pref: "宮城県", region: "東北", dogs: 102986, pop: 2248000, col: 12, row: 3 },
  { pref: "京都府", region: "近畿", dogs: 114040, pop: 2520000, col: 6, row: 7 },
  { pref: "鹿児島県", region: "九州・沖縄", dogs: 69286, pop: 1532000, col: 1, row: 11 },
  { pref: "長崎県", region: "九州・沖縄", dogs: 55926, pop: 1252000, col: 0, row: 10 },
  { pref: "石川県", region: "中部", dogs: 48025, pop: 1098000, col: 7, row: 5 },
  { pref: "沖縄県", region: "九州・沖縄", dogs: 63141, pop: 1466000, col: 0, row: 13 },
  { pref: "青森県", region: "東北", dogs: 50144, pop: 1165000, col: 12, row: 1 },
  { pref: "奈良県", region: "近畿", dogs: 55106, pop: 1285000, col: 7, row: 8 },
  { pref: "富山県", region: "中部", dogs: 42085, pop: 997000, col: 8, row: 5 },
  { pref: "福井県", region: "中部", dogs: 30600, pop: 739000, col: 7, row: 6 },
  { pref: "鳥取県", region: "中国", dogs: 21390, pop: 531000, col: 4, row: 7 },
  { pref: "新潟県", region: "中部", dogs: 81624, pop: 2099000, col: 10, row: 4 },
  { pref: "東京都", region: "関東", dogs: 548935, pop: 14178000, col: 10, row: 7 },
  { pref: "秋田県", region: "東北", dogs: 34236, pop: 897000, col: 11, row: 2 },
  { pref: "山形県", region: "東北", dogs: 37254, pop: 1011000, col: 11, row: 3 }
];
