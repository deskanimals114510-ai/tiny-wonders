// サイト全記事(雑学+ざんねん)の一覧データ。
// index.html「今日のプチ雑学」ウィジェットと、matome/index.htmlのまとめ一覧の両方から参照する。
// path はサイトルート基準の相対パス(例: "zatsugaku/inu-roka.html")。
// 参照側で自分の場所に応じてプレフィックスを付け足して使う。
window.TW_TRIVIA = [
  { category: "zatsugaku", title: "犬はなぜ人間より早く年をとるの?", teaser: "子犬期の急成長と、体の大きさによる老化スピードの違いを解説します。", path: "zatsugaku/inu-roka.html" },
  { category: "zatsugaku", title: "猫の年齢換算、1年目だけ「18歳」なのはなぜ?", teaser: "早見表で1歳と2歳の伸び方が違って見える理由を解説します。", path: "zatsugaku/neko-nenrei.html" },
  { category: "zatsugaku", title: "愛犬・愛猫の「標準体重」はどう決まる?", teaser: "体重だけでなく体型で見る「ボディコンディションスコア」の考え方を紹介します。", path: "zatsugaku/hyojun-taiju.html" },
  { category: "zatsugaku", title: "うちの子、いつからシニア?犬猫の「高齢期」のはじまりサイン", teaser: "体格別のシニア期の目安と、見逃しやすい5つの初期サインを解説します。", path: "zatsugaku/shinia-sign.html" },
  { category: "zatsugaku", title: "猫のしっぽが教えてくれること。動きでわかる7つの気持ち", teaser: "ピンと立てる、ふくらませる、ゆっくり振るなど、7つの動きから読み解く猫の気持ちを解説します。", path: "zatsugaku/neko-shippo.html" },
  { category: "zatsugaku", title: "犬はなぜ鼻がこんなに良いの?", teaser: "受容体の数の違いから、探知犬として活躍できる理由まで、犬の嗅覚の秘密を解説します。", path: "zatsugaku/inu-hana.html" },
  { category: "zatsugaku", title: "猫はなぜゴロゴロ喉を鳴らすの?", teaser: "甘えている時だけじゃない、ゴロゴロ音に隠された意外な役割を解説します。", path: "zatsugaku/neko-gorogoro.html" },
  { category: "zatsugaku", title: "犬や猫はなぜ秋にごっそり毛が抜けるの?", teaser: "春と秋で目的が逆になる換毛の仕組みと、ダブルコート・シングルコートの違いを解説します。", path: "zatsugaku/kanmouki.html" },
  { category: "zatsugaku", title: "猫はなぜ日照時間で恋の季節を知るの?", teaser: "メラトニンが日の長さを伝える仕組みと、シカや犬との違いを解説します。", path: "zatsugaku/neko-hatsujou.html" },
  { category: "zatsugaku", title: "犬はなぜ人のあくびがうつるの?", teaser: "東京大学の研究が明かした、飼い主との絆と共感のふしぎな関係を解説します。", path: "zatsugaku/inu-akubi.html" },
  { category: "zatsugaku", title: "猫はなぜヒゲで隙間の広さがわかるの?", teaser: "顔まわりに円を描くヒゲと、根元の神経が作る高感度センサーを解説します。", path: "zatsugaku/neko-hige.html" },
  { category: "zatsugaku", title: "猫はなぜ冬にコタツで丸くなるの?", teaser: "高めの平熱・砂漠出身という進化の背景・低温やけどの注意点を解説します。", path: "zatsugaku/neko-kotatsu.html" },
  { category: "zatsugaku", title: "犬はなぜ夏に舌を出してハアハアするの?", teaser: "汗腺が足の裏にしかない犬が、唾液の気化熱で体を冷やす仕組みを解説します。", path: "zatsugaku/inu-panting.html" },
  { category: "zatsugaku", title: "犬や猫の花粉症は、なぜ鼻ではなく肌に出るの?", teaser: "犬1995年・猫2000年ごろに確認された動物の花粉症と、症状が皮膚に出る理由を解説します。", path: "zatsugaku/kafun.html" },
  { category: "zatsugaku", title: "冬眠する動物はなぜ春に目を覚ますの?", teaser: "気温・日照・体内時計が重なって働く目覚めの仕組みと、クマの「本当は冬眠じゃない」謎を解説します。", path: "zatsugaku/toumin.html" },
  { category: "zatsugaku", title: "犬や猫はなぜ秋になると食欲が増すの?", teaser: "気温が下がると体は脂肪を燃やして熱をつくる、体温維持のための自然な仕組みを解説します。", path: "zatsugaku/aki-shokuyoku.html" },
  { category: "zatsugaku", title: "エゾシカはなぜ秋に恋の季節を迎えるの?", teaser: "猫とは正反対、日が短くなる秋に動き出す「短日繁殖動物」の一年がかりの恋の準備を解説します。", path: "zatsugaku/shika.html" },
  { category: "zatsugaku", title: "都道府県別・犬の登録頭数ランキング! 人口あたりで一番多いのはどこ?", teaser: "厚労省・総務省の公式統計から算出した、人口あたりの犬密度ランキング47都道府県。1位は香川県という結果に。", path: "zatsugaku/inu-mitsudo.html" },

  { category: "zannen", title: "犬はなぜうんちの前にぐるぐる回るの?", teaser: "実は方角にまでこだわっていた、という笑ってしまう研究結果があります。", path: "zannen/inu-guruguru.html" },
  { category: "zannen", title: "猫はなぜ明らかに小さすぎる箱に入りたがるの?", teaser: "「もし入れるなら、座る」猫の宿命と、テープの四角にも反応する不思議。", path: "zannen/neko-hako.html" },
  { category: "zannen", title: "猫の「高所は平気」は実は危険信号?", teaser: "驚異の立ち直り反射と、「中くらいの高さが一番危ない」というふしぎな事実。", path: "zannen/neko-rakka.html" },
  { category: "zannen", title: "パンダはなぜ1日14時間も食べ続けるの?", teaser: "クマ科なのに笹しか消化できない、という体を張った「ざんねん」設計。", path: "zannen/panda-taberu.html" },
  { category: "zannen", title: "犬はなぜ草を食べるの?", teaser: "消化に良いわけでもないのに、なぜかむしゃむしゃ。理由はまだはっきりしていません。", path: "zannen/inu-kusa.html" },
  { category: "zannen", title: "コアラはなぜ1日20時間も眠り続けるの?", teaser: "低栄養で毒素まで含むユーカリのせいで、寝るしかなくなった省エネ生活。", path: "zannen/koala-suimin.html" },
  { category: "zannen", title: "フクロウはなぜ首が270度も回るの?", teaser: "目玉が固定されて動かせないという弱点を、頸椎14個と特殊な血管システムで力技カバー。", path: "zannen/fukurou.html" },
  { category: "zannen", title: "ラッコはなぜ大量に食べ続けなければならないの?", teaser: "皮下脂肪を持たない体を、毛皮の空気層と体重の2〜3割の食事量で力技カバー。", path: "zannen/rakko.html" },
  { category: "zannen", title: "ナマケモノはなぜ命がけで週に1回しかトイレに行かないの?", teaser: "週1回のトイレに全エネルギーの約8%を注ぎ込む、命がけの「ざんねん」な排泄事情。", path: "zannen/namakemono.html" },
  { category: "zannen", title: "キリンはなぜ横になってほとんど眠らないの?", teaser: "野生では横になって眠る時間が一晩わずか8.6分、長すぎる首と脚が招いた「ざんねん」な睡眠事情。", path: "zannen/kirin.html" },
  { category: "zannen", title: "タコはなぜ泳ぐと心臓が1つ止まってしまうの?", teaser: "3つある心臓のうち全身担当の1つが、泳ぐと止まってしまう「ざんねん」な体の仕組み。", path: "zannen/tako.html" }
];
