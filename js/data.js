// scripts/build_data.py により自動生成。直接編集しない。
const DATA = {
 "styleKeys": [
  "natural",
  "casual",
  "chic",
  "modern",
  "classic",
  "elegant"
 ],
 "styles": {
  "natural": {
   "label": "ナチュラル",
   "features": "自然素材、木、温かみ、癒し",
   "materials": [
    "無垢材(オーク・パイン)",
    "リネン・コットン",
    "ラタン・かご素材"
   ],
   "coord": [
    -0.8,
    -0.2
   ],
   "color": "#7fa06a"
  },
  "casual": {
   "label": "カジュアル",
   "features": "遊び心、明るさ、ポップ",
   "materials": [
    "明るい木材",
    "カラフルなファブリック",
    "スチール・樹脂"
   ],
   "coord": [
    -0.35,
    0.55
   ],
   "color": "#e8a13d"
  },
  "chic": {
   "label": "シック",
   "features": "落ち着き、上質、ホテルライク",
   "materials": [
    "ウォールナット",
    "グレージュのファブリック",
    "大理石調・スモークガラス"
   ],
   "coord": [
    0.45,
    -0.45
   ],
   "color": "#8a7d6d"
  },
  "modern": {
   "label": "モダン",
   "features": "洗練、直線、無機質",
   "materials": [
    "ガラス・スチール",
    "コンクリート",
    "モノトーンのファブリック"
   ],
   "coord": [
    0.85,
    -0.6
   ],
   "color": "#4a5568"
  },
  "classic": {
   "label": "クラシック",
   "features": "重厚感、伝統、高級感",
   "materials": [
    "マホガニー・ダーク木材",
    "レザー",
    "真鍮・ベルベット"
   ],
   "coord": [
    0.55,
    0.65
   ],
   "color": "#7a5230"
  },
  "elegant": {
   "label": "エレガント",
   "features": "華やか、上品、柔らかさ",
   "materials": [
    "白木・鏡面仕上げ",
    "シルク調ファブリック",
    "ゴールド金具・ガラス"
   ],
   "coord": [
    0.05,
    0.8
   ],
   "color": "#c98bb0"
  }
 },
 "categoryWeights": {
  "ldk": 1.0,
  "goods": 1.0,
  "emotion": 1.0,
  "palette": 1.0
 },
 "thresholds": {
  "solo": 1.25,
  "lean": 1.1,
  "specialTagMin": 2
 },
 "specials": [
  {
   "patternId": "hokuo",
   "styleSet": [
    "natural",
    "chic",
    "casual"
   ],
   "tags": {
    "ナチュラル×北欧（ジャパンディ）1": 2,
    "ナチュラル×北欧（ジャパンディ）2": 2,
    "北欧カラフル1": 2,
    "北欧カラフル2": 2,
    "Light Blue": 1,
    "Yellow": 1,
    "Fresh": 1,
    "Clear": 1,
    "シンプル収納": 1
   }
  },
  {
   "patternId": "kobana",
   "styleSet": [
    "elegant",
    "natural"
   ],
   "tags": {
    "花": 2,
    "エレガント・パステル": 2,
    "Pink": 1,
    "Romantic": 1,
    "Soft": 1,
    "やさしい・あたたかい": 1
   }
  },
  {
   "patternId": "soft-elegant",
   "styleSet": [
    "elegant",
    "chic"
   ],
   "tags": {
    "花": 1,
    "キャンドル": 1,
    "ガラス・小物": 1,
    "エレガント・パステル": 1,
    "Romantic": 1,
    "Elegant": 1,
    "Soft": 1,
    "Pink": 1,
    "Purple": 1
   }
  },
  {
   "patternId": "industrial",
   "styleSet": [
    "modern",
    "casual"
   ],
   "tags": {
    "インダストリアル": 3,
    "レトロダイナー": 1,
    "ミッドセンチュリー": 1,
    "モダン・モノトーン": 1,
    "モダンモノトーン2": 1,
    "Black & White": 1,
    "Chic": 1,
    "かっこよく洗練された": 1
   }
  }
 ],
 "patterns": [
  {
   "id": "kobana",
   "name": "小花",
   "type": "special",
   "styles": [
    "elegant",
    "natural"
   ],
   "catch": "やさしさと可憐さに包まれる、花のある暮らし",
   "description": "淡いピンクや花柄、リネンのやわらかな質感に心がときめくタイプ。エレガントの上品さとナチュラルの素朴さをあわせ持ち、小さな花を飾るだけで空間がぱっと明るくなります。木製家具に花柄のファブリックや繊細な小物を合わせると、可憐であたたかい雰囲気がまとまります。"
  },
  {
   "id": "industrial",
   "name": "インダストリアル(モダンカジュアル)",
   "type": "special",
   "styles": [
    "modern",
    "casual"
   ],
   "catch": "無骨さを楽しむ、かっこいい大人の遊び場",
   "description": "ブラックアイアンやコンクリート、レザーといった無骨な素材に惹かれるタイプ。モダンの洗練とカジュアルの遊び心が同居し、ヴィンテージ家具や工業系の照明がよく似合います。濃色の木材と黒をベースに、あえてラフさを残すのがかっこよく決めるコツです。"
  },
  {
   "id": "natural",
   "name": "ナチュラル",
   "type": "solo",
   "styles": [
    "natural"
   ],
   "catch": "木のぬくもりに癒される、飾らない心地よさ",
   "description": "自然素材や木の質感、やわらかな光に心地よさを感じるタイプ。ベージュやアイボリーを基調に、観葉植物のグリーンを添えると空間が生き生きとします。無理に飾り立てず、素材そのものの美しさを活かすシンプルなコーディネートが似合います。"
  },
  {
   "id": "natural-casual",
   "name": "ナチュラルカジュアル",
   "type": "combo",
   "styles": [
    "natural",
    "casual"
   ],
   "catch": "あたたかくて、ちょっと遊び心のある空間",
   "description": "木のあたたかみをベースに、明るい色や楽しい雑貨を取り入れたいタイプ。肩の力が抜けた、友人を気軽に呼べるような居心地のよさが魅力です。ライトブラウンの家具にイエローやグリーンなどのアクセントカラーを効かせると、あなたらしい空間になります。"
  },
  {
   "id": "hokuo",
   "name": "北欧",
   "type": "special",
   "styles": [
    "natural",
    "chic",
    "casual"
   ],
   "catch": "明るい木と機能美が調和する、心地よい定番",
   "description": "明るい木材と白を基調に、シンプルで機能的な家具を好むタイプ。ナチュラルの温かみに、すっきりとした洗練とほどよい遊び心が加わった、飽きのこないスタイルです。ライトブルーやイエローなどの差し色と、デザイン性のある照明やファブリックがよく似合います。"
  },
  {
   "id": "natural-chic",
   "name": "ナチュラルシック",
   "type": "combo",
   "styles": [
    "natural",
    "chic"
   ],
   "catch": "自然体なのに上質。大人のくつろぎ空間",
   "description": "木のぬくもりを感じながらも、落ち着いたホテルライクな上質さを求めるタイプ。グレージュやブラウンでトーンを揃えると、静かで洗練された癒しの空間になります。無垢材の家具に、上質なファブリックや間接照明を合わせるのがおすすめです。"
  },
  {
   "id": "casual",
   "name": "カジュアル",
   "type": "solo",
   "styles": [
    "casual"
   ],
   "catch": "好きなものに囲まれる、明るく楽しい毎日",
   "description": "カラフルな色や好きな雑貨に囲まれて、わくわくする空間を作りたいタイプ。ポップなアートや推しグッズも、色数をしぼって飾ればセンスよくまとまります。明るい木材と白をベースに、ビビッドな色を差し色として楽しむのがコツです。"
  },
  {
   "id": "casual-modern",
   "name": "カジュアルモダン",
   "type": "combo",
   "styles": [
    "casual",
    "modern"
   ],
   "catch": "遊び心とクールさのいいとこ取り",
   "description": "楽しさと洗練を両立させたいタイプ。モノトーンや直線的な家具をベースに、ポップな色やアートを効かせると、都会的なのに堅苦しくない空間になります。ミッドセンチュリー系の名作家具やグラフィカルなポスターがよく似合います。"
  },
  {
   "id": "chic",
   "name": "シック",
   "type": "solo",
   "styles": [
    "chic"
   ],
   "catch": "ホテルのような、静かで上質なくつろぎ",
   "description": "落ち着いたトーンと上質な素材で、ホテルライクな空間を求めるタイプ。グレージュやチャコールでまとめた、ノイズのない静かな部屋がよく似合います。素材の質感にこだわり、間接照明で陰影をつくると、ぐっと洗練された雰囲気になります。"
  },
  {
   "id": "chic-elegant",
   "name": "シックエレガント",
   "type": "combo",
   "styles": [
    "chic",
    "elegant"
   ],
   "catch": "落ち着きの中に、華やぎをひとさじ",
   "description": "上質で落ち着いた空間に、華やかさや女性らしい柔らかさを添えたいタイプ。グレーやグレージュを基調に、ゴールドの小物や曲線的な家具を合わせると、気品のある大人の空間になります。花やキャンドルなど、香りや彩りの演出も効果的です。"
  },
  {
   "id": "chic-modern",
   "name": "シックモダン",
   "type": "combo",
   "styles": [
    "chic",
    "modern"
   ],
   "catch": "都会的で凛とした、大人のモノトーン空間",
   "description": "落ち着きと洗練をどちらも求める、都会的なタイプ。チャコールやブラックを効かせたモノトーンの空間に、上質な素材感を重ねるのが似合います。直線的な家具とスモークガラスや大理石調の素材で、ホテルのバーラウンジのような雰囲気に。"
  },
  {
   "id": "chic-casual",
   "name": "シックカジュアル",
   "type": "combo",
   "styles": [
    "chic",
    "casual"
   ],
   "catch": "リラックスと上質のバランス上手",
   "description": "落ち着いた空間が好きだけれど、堅苦しいのは苦手なタイプ。ダークトーンの家具に、デニムや古材のようなラフな素材を合わせると、こなれた大人カジュアルな空間になります。ヴィンテージ小物やアートで自分らしさを足すのもおすすめです。"
  },
  {
   "id": "classic",
   "name": "クラシック",
   "type": "solo",
   "styles": [
    "classic"
   ],
   "catch": "時を重ねて美しい、王道の風格",
   "description": "重厚感のある家具や伝統的な意匠に惹かれるタイプ。ダークブラウンの木材やレザー、装飾のある家具が織りなす、格調高い空間が似合います。アンティークや本のディスプレイ、真鍮の小物で、時間を重ねたような深みを演出しましょう。"
  },
  {
   "id": "classic-modern",
   "name": "クラシックモダン",
   "type": "combo",
   "styles": [
    "classic",
    "modern"
   ],
   "catch": "伝統と現代が響き合う、格調高い洗練",
   "description": "クラシックの重厚感とモダンの洗練を融合させたいタイプ。装飾的な家具をモノトーンでまとめたり、現代的な空間に一点だけアンティークを置いたり、新旧のコントラストを楽しめます。ダーク木材×ガラス・スチールの組み合わせが効果的です。"
  },
  {
   "id": "classic-casual",
   "name": "クラシックカジュアル",
   "type": "combo",
   "styles": [
    "classic",
    "casual"
   ],
   "catch": "重厚なのに親しみやすい、味わいのある空間",
   "description": "アンティークやレトロなものが好きで、それを気負わず日常に取り入れたいタイプ。使い込まれた木の家具やレザーに、ポップな色や雑貨を合わせると、カフェのような味わいのある空間になります。レトロダイナー風の演出もよく似合います。"
  },
  {
   "id": "elegant",
   "name": "エレガント",
   "type": "solo",
   "styles": [
    "elegant"
   ],
   "catch": "上品で華やか、うっとりする美しい空間",
   "description": "曲線的な家具や華やかな装飾、上品な色づかいに心惹かれるタイプ。白やアイボリーをベースに、ゴールドやピンクを添えた、明るく優美な空間が似合います。シルク調のファブリックやガラスの小物で、光を美しく取り込みましょう。"
  },
  {
   "id": "elegant-casual",
   "name": "エレガントカジュアル",
   "type": "combo",
   "styles": [
    "elegant",
    "casual"
   ],
   "catch": "華やかさを、肩ひじ張らずに楽しむ",
   "description": "華やかで上品なものが好きだけれど、気取りすぎない心地よさも大切にしたいタイプ。白を基調に、パステルカラーや楽しい雑貨をバランスよく取り入れると、明るく親しみやすいフェミニン空間になります。花やアートを気軽に飾るのがおすすめです。"
  },
  {
   "id": "elegant-natural",
   "name": "エレガントナチュラル",
   "type": "combo",
   "styles": [
    "elegant",
    "natural"
   ],
   "catch": "自然のやさしさをまとった、上品な華やぎ",
   "description": "上品な華やかさと、自然素材のあたたかみを両方求めるタイプ。白木やリネンのやわらかな質感に、曲線的な家具や花を合わせると、優しく満ち足りた空間になります。ベージュ×ピンクベージュの配色に、グリーンを添えるのが似合います。"
  },
  {
   "id": "soft-elegant",
   "name": "ソフトエレガント",
   "type": "special",
   "styles": [
    "elegant",
    "chic"
   ],
   "catch": "淡い色に包まれる、しっとり上品な空間",
   "description": "淡いトーンと曲線的なフォルム、しっとりとした上品さに惹かれるタイプ。エレガントの華やかさをぐっと抑えた、控えめで洗練された美しさが持ち味です。ピンクベージュやアイボリーのグラデーションに、花やキャンドル、ガラスの小物を添えて。"
  },
  {
   "id": "elegant-modern",
   "name": "エレガントモダン",
   "type": "combo",
   "styles": [
    "elegant",
    "modern"
   ],
   "catch": "華やかさとシャープさが同居する、洗練の極み",
   "description": "華やかな上品さと、モダンな洗練をあわせ持つタイプ。鏡面仕上げの家具やガラス、ゴールドの金具が織りなす、ラグジュアリーホテルのような空間が似合います。モノトーン×ゴールドの配色で、ドラマチックにまとめましょう。"
  },
  {
   "id": "modern",
   "name": "モダン",
   "type": "solo",
   "styles": [
    "modern"
   ],
   "catch": "無駄をそぎ落とした、クールな洗練",
   "description": "直線的なデザインと無機質な素材、ミニマルな空間に美しさを感じるタイプ。モノトーンを基調に、ガラスやスチールの家具ですっきりとまとめるのが似合います。ものを厳選し、シンプルな収納で生活感を消すと、理想の空間に近づきます。"
  },
  {
   "id": "modern-natural",
   "name": "モダンナチュラル",
   "type": "combo",
   "styles": [
    "modern",
    "natural"
   ],
   "catch": "洗練とぬくもりの、ちょうどいい関係",
   "description": "すっきりとした洗練を求めつつ、木のあたたかみも手放したくないタイプ。直線的な家具に明るい木目を合わせた、シンプルで心地よい空間が似合います。グレー×ウッドの配色に観葉植物を添えると、無機質になりすぎず整います。"
  },
  {
   "id": "modern-casual",
   "name": "モダンカジュアル",
   "type": "combo",
   "styles": [
    "modern",
    "casual"
   ],
   "catch": "クールをベースに、自分らしい遊びを",
   "description": "モノトーンの洗練された空間に、遊び心をプラスしたいタイプ。ベースはシンプルに抑えて、アートやビビッドな色の小物で個性を表現するのが似合います。ブルーやマスタードの差し色、グラフィカルなポスターで自分らしさを楽しんで。"
  }
 ],
 "comboMap": {
  "natural+casual": "natural-casual",
  "natural+chic": "natural-chic",
  "casual+modern": "casual-modern",
  "chic+elegant": "chic-elegant",
  "chic+modern": "chic-modern",
  "chic+casual": "chic-casual",
  "classic+modern": "classic-modern",
  "classic+casual": "classic-casual",
  "elegant+casual": "elegant-casual",
  "elegant+natural": "elegant-natural",
  "elegant+modern": "elegant-modern",
  "modern+natural": "modern-natural",
  "modern+casual": "modern-casual"
 },
 "soloMap": {
  "natural": "natural",
  "casual": "casual",
  "chic": "chic",
  "modern": "modern",
  "classic": "classic",
  "elegant": "elegant"
 },
 "questions": {
  "ldk": [
   {
    "id": "ldk01",
    "name": "ナチュラル×北欧（ジャパンディ）1",
    "img": "assets/ldk/01.png",
    "weights": {
     "natural": 10.0,
     "casual": 8.0,
     "chic": 0.0,
     "modern": 1.0,
     "classic": 0.0,
     "elegant": 0.0
    }
   },
   {
    "id": "ldk02",
    "name": "ナチュラル×北欧（ジャパンディ）2",
    "img": "assets/ldk/02.png",
    "weights": {
     "natural": 10.0,
     "casual": 8.0,
     "chic": 0.0,
     "modern": 1.0,
     "classic": 0.0,
     "elegant": 0.0
    }
   },
   {
    "id": "ldk03",
    "name": "ナチュラルインテリア",
    "img": "assets/ldk/03.png",
    "weights": {
     "natural": 10.0,
     "casual": 8.0,
     "chic": 0.0,
     "modern": 1.0,
     "classic": 0.0,
     "elegant": 0.0
    }
   },
   {
    "id": "ldk04",
    "name": "アメリカンテイスト・シンプル",
    "img": "assets/ldk/04.png",
    "weights": {
     "natural": 5.0,
     "casual": 8.0,
     "chic": 6.0,
     "modern": 3.0,
     "classic": 1.0,
     "elegant": 0.0
    }
   },
   {
    "id": "ldk05",
    "name": "カジュアル・リゾート黒",
    "img": "assets/ldk/05.png",
    "weights": {
     "natural": 5.0,
     "casual": 8.0,
     "chic": 6.0,
     "modern": 1.0,
     "classic": 2.0,
     "elegant": 0.0
    }
   },
   {
    "id": "ldk06",
    "name": "カジュアル・リゾート白",
    "img": "assets/ldk/06.png",
    "weights": {
     "natural": 6.0,
     "casual": 9.0,
     "chic": 1.0,
     "modern": 0.0,
     "classic": 0.0,
     "elegant": 0.0
    }
   },
   {
    "id": "ldk07",
    "name": "カジュアル・リゾート白×青1",
    "img": "assets/ldk/07.png",
    "weights": {
     "natural": 6.0,
     "casual": 10.0,
     "chic": 0.0,
     "modern": 0.0,
     "classic": 0.0,
     "elegant": 0.0
    }
   },
   {
    "id": "ldk08",
    "name": "カジュアル・リゾート白×青2",
    "img": "assets/ldk/08.png",
    "weights": {
     "natural": 6.0,
     "casual": 10.0,
     "chic": 0.0,
     "modern": 0.0,
     "classic": 0.0,
     "elegant": 0.0
    }
   },
   {
    "id": "ldk09",
    "name": "カラフル",
    "img": "assets/ldk/09.png",
    "weights": {
     "natural": 0.0,
     "casual": 10.0,
     "chic": 0.0,
     "modern": 3.0,
     "classic": 0.0,
     "elegant": 0.0
    }
   },
   {
    "id": "ldk10",
    "name": "レトロダイナー",
    "img": "assets/ldk/10.png",
    "weights": {
     "natural": 1.0,
     "casual": 9.0,
     "chic": 3.0,
     "modern": 2.0,
     "classic": 4.0,
     "elegant": 0.0
    }
   },
   {
    "id": "ldk11",
    "name": "北欧カラフル1",
    "img": "assets/ldk/11.png",
    "weights": {
     "natural": 1.0,
     "casual": 9.0,
     "chic": 1.0,
     "modern": 1.0,
     "classic": 0.0,
     "elegant": 0.0
    }
   },
   {
    "id": "ldk12",
    "name": "北欧カラフル2",
    "img": "assets/ldk/12.png",
    "weights": {
     "natural": 6.0,
     "casual": 10.0,
     "chic": 0.0,
     "modern": 2.0,
     "classic": 0.0,
     "elegant": 0.0
    }
   },
   {
    "id": "ldk13",
    "name": "シック×ナチュラル",
    "img": "assets/ldk/13.png",
    "weights": {
     "natural": 10.0,
     "casual": 0.0,
     "chic": 10.0,
     "modern": 0.0,
     "classic": 0.0,
     "elegant": 0.0
    }
   },
   {
    "id": "ldk14",
    "name": "シック王道グレージュ",
    "img": "assets/ldk/14.png",
    "weights": {
     "natural": 4.0,
     "casual": 0.0,
     "chic": 10.0,
     "modern": 2.0,
     "classic": 0.0,
     "elegant": 0.0
    }
   },
   {
    "id": "ldk15",
    "name": "インダストリアル",
    "img": "assets/ldk/15.png",
    "weights": {
     "natural": 1.0,
     "casual": 6.0,
     "chic": 8.0,
     "modern": 4.0,
     "classic": 3.0,
     "elegant": 0.0
    }
   },
   {
    "id": "ldk16",
    "name": "ミッドセンチュリー",
    "img": "assets/ldk/16.png",
    "weights": {
     "natural": 0.0,
     "casual": 5.0,
     "chic": 7.0,
     "modern": 7.0,
     "classic": 0.0,
     "elegant": 0.0
    }
   },
   {
    "id": "ldk17",
    "name": "モダン・モノトーン",
    "img": "assets/ldk/17.png",
    "weights": {
     "natural": 0.0,
     "casual": 0.0,
     "chic": 6.0,
     "modern": 10.0,
     "classic": 0.0,
     "elegant": 0.0
    }
   },
   {
    "id": "ldk18",
    "name": "モダンクラシック",
    "img": "assets/ldk/18.png",
    "weights": {
     "natural": 0.0,
     "casual": 0.0,
     "chic": 10.0,
     "modern": 10.0,
     "classic": 5.0,
     "elegant": 1.0
    }
   },
   {
    "id": "ldk19",
    "name": "モダンモノトーン2",
    "img": "assets/ldk/19.png",
    "weights": {
     "natural": 0.0,
     "casual": 0.0,
     "chic": 10.0,
     "modern": 10.0,
     "classic": 0.0,
     "elegant": 0.0
    }
   },
   {
    "id": "ldk20",
    "name": "クラシック・王道",
    "img": "assets/ldk/20.png",
    "weights": {
     "natural": 0.0,
     "casual": 0.0,
     "chic": 6.0,
     "modern": 0.0,
     "classic": 10.0,
     "elegant": 2.0
    }
   },
   {
    "id": "ldk21",
    "name": "クラシック・王道2",
    "img": "assets/ldk/21.png",
    "weights": {
     "natural": 3.0,
     "casual": 0.0,
     "chic": 2.0,
     "modern": 0.0,
     "classic": 10.0,
     "elegant": 2.0
    }
   },
   {
    "id": "ldk22",
    "name": "クラシック×エレガント",
    "img": "assets/ldk/22.png",
    "weights": {
     "natural": 0.0,
     "casual": 0.0,
     "chic": 5.0,
     "modern": 0.0,
     "classic": 10.0,
     "elegant": 10.0
    }
   },
   {
    "id": "ldk23",
    "name": "エレガント",
    "img": "assets/ldk/23.png",
    "weights": {
     "natural": 3.0,
     "casual": 10.0,
     "chic": 1.0,
     "modern": 2.0,
     "classic": 0.0,
     "elegant": 1.0
    }
   },
   {
    "id": "ldk24",
    "name": "エレガント・パステル",
    "img": "assets/ldk/24.png",
    "weights": {
     "natural": 3.0,
     "casual": 4.0,
     "chic": 1.0,
     "modern": 1.0,
     "classic": 1.0,
     "elegant": 10.0
    }
   },
   {
    "id": "ldk25",
    "name": "エレガント・王道",
    "img": "assets/ldk/25.png",
    "weights": {
     "natural": 5.0,
     "casual": 0.0,
     "chic": 0.0,
     "modern": 0.0,
     "classic": 3.0,
     "elegant": 10.0
    }
   },
   {
    "id": "ldk26",
    "name": "エレガント×モダン",
    "img": "assets/ldk/26.png",
    "weights": {
     "natural": 1.0,
     "casual": 10.0,
     "chic": 5.0,
     "modern": 9.0,
     "classic": 0.0,
     "elegant": 0.0
    }
   },
   {
    "id": "ldk27",
    "name": "エレガントモダン",
    "img": "assets/ldk/27.png",
    "weights": {
     "natural": 5.0,
     "casual": 0.0,
     "chic": 3.0,
     "modern": 6.0,
     "classic": 0.0,
     "elegant": 10.0
    }
   }
  ],
  "goods": [
   {
    "id": "goods01",
    "name": "観葉植物",
    "img": "assets/goods/01.png",
    "weights": {
     "natural": 10.0,
     "casual": 6.0,
     "chic": 5.0,
     "modern": 4.0,
     "classic": 2.0,
     "elegant": 2.0
    }
   },
   {
    "id": "goods02",
    "name": "アート・ポスター",
    "img": "assets/goods/02.png",
    "weights": {
     "natural": 3.0,
     "casual": 8.0,
     "chic": 5.0,
     "modern": 9.0,
     "classic": 4.0,
     "elegant": 5.0
    }
   },
   {
    "id": "goods03",
    "name": "間接照明",
    "img": "assets/goods/03.png",
    "weights": {
     "natural": 5.0,
     "casual": 4.0,
     "chic": 9.0,
     "modern": 8.0,
     "classic": 6.0,
     "elegant": 7.0
    }
   },
   {
    "id": "goods04",
    "name": "キャンドル",
    "img": "assets/goods/04.png",
    "weights": {
     "natural": 5.0,
     "casual": 3.0,
     "chic": 7.0,
     "modern": 3.0,
     "classic": 8.0,
     "elegant": 10.0
    }
   },
   {
    "id": "goods05",
    "name": "花",
    "img": "assets/goods/05.png",
    "weights": {
     "natural": 6.0,
     "casual": 4.0,
     "chic": 5.0,
     "modern": 2.0,
     "classic": 8.0,
     "elegant": 10.0
    }
   },
   {
    "id": "goods06",
    "name": "本・ブックディスプレイ",
    "img": "assets/goods/06.png",
    "weights": {
     "natural": 5.0,
     "casual": 4.0,
     "chic": 8.0,
     "modern": 6.0,
     "classic": 9.0,
     "elegant": 5.0
    }
   },
   {
    "id": "goods07",
    "name": "ガラス・小物",
    "img": "assets/goods/07.png",
    "weights": {
     "natural": 2.0,
     "casual": 4.0,
     "chic": 7.0,
     "modern": 9.0,
     "classic": 5.0,
     "elegant": 8.0
    }
   },
   {
    "id": "goods08",
    "name": "シンプル収納",
    "img": "assets/goods/08.png",
    "weights": {
     "natural": 4.0,
     "casual": 3.0,
     "chic": 10.0,
     "modern": 10.0,
     "classic": 2.0,
     "elegant": 3.0
    }
   },
   {
    "id": "goods09",
    "name": "推しグッズ",
    "img": "assets/goods/09.png",
    "weights": {
     "natural": 1.0,
     "casual": 10.0,
     "chic": 0.0,
     "modern": 3.0,
     "classic": 0.0,
     "elegant": 2.0
    }
   },
   {
    "id": "goods10",
    "name": "カラフル雑貨",
    "img": "assets/goods/10.png",
    "weights": {
     "natural": 2.0,
     "casual": 10.0,
     "chic": 1.0,
     "modern": 5.0,
     "classic": 0.0,
     "elegant": 3.0
    }
   }
  ],
  "emotion": [
   {
    "id": "emotion01",
    "name": "やさしい・あたたかい",
    "img": "assets/emotion/01.png",
    "weights": {
     "natural": 10.0,
     "casual": 5.0,
     "chic": 3.0,
     "modern": 1.0,
     "classic": 4.0,
     "elegant": 4.0
    }
   },
   {
    "id": "emotion02",
    "name": "やさしくて・スッキリ",
    "img": "assets/emotion/02.png",
    "weights": {
     "natural": 7.0,
     "casual": 4.0,
     "chic": 9.0,
     "modern": 6.0,
     "classic": 2.0,
     "elegant": 5.0
    }
   },
   {
    "id": "emotion03",
    "name": "個性的であたたかい",
    "img": "assets/emotion/03.png",
    "weights": {
     "natural": 4.0,
     "casual": 10.0,
     "chic": 2.0,
     "modern": 5.0,
     "classic": 3.0,
     "elegant": 2.0
    }
   },
   {
    "id": "emotion04",
    "name": "かっこよく洗練された",
    "img": "assets/emotion/04.png",
    "weights": {
     "natural": 1.0,
     "casual": 3.0,
     "chic": 8.0,
     "modern": 10.0,
     "classic": 6.0,
     "elegant": 5.0
    }
   }
  ],
  "palette": [
   {
    "id": "palette01",
    "name": "Romantic",
    "img": "assets/palette/01.png",
    "weights": {
     "natural": 2.0,
     "casual": 4.0,
     "chic": 3.0,
     "modern": 1.0,
     "classic": 2.0,
     "elegant": 10.0
    }
   },
   {
    "id": "palette02",
    "name": "Elegant",
    "img": "assets/palette/02.png",
    "weights": {
     "natural": 2.0,
     "casual": 2.0,
     "chic": 6.0,
     "modern": 3.0,
     "classic": 5.0,
     "elegant": 10.0
    }
   },
   {
    "id": "palette03",
    "name": "Soft",
    "img": "assets/palette/03.png",
    "weights": {
     "natural": 5.0,
     "casual": 2.0,
     "chic": 9.0,
     "modern": 5.0,
     "classic": 3.0,
     "elegant": 5.0
    }
   },
   {
    "id": "palette04",
    "name": "Natural",
    "img": "assets/palette/04.png",
    "weights": {
     "natural": 10.0,
     "casual": 5.0,
     "chic": 6.0,
     "modern": 2.0,
     "classic": 4.0,
     "elegant": 1.0
    }
   },
   {
    "id": "palette05",
    "name": "Fresh",
    "img": "assets/palette/05.png",
    "weights": {
     "natural": 7.0,
     "casual": 10.0,
     "chic": 1.0,
     "modern": 2.0,
     "classic": 0.0,
     "elegant": 1.0
    }
   },
   {
    "id": "palette06",
    "name": "Clear",
    "img": "assets/palette/06.png",
    "weights": {
     "natural": 4.0,
     "casual": 8.0,
     "chic": 6.0,
     "modern": 8.0,
     "classic": 1.0,
     "elegant": 2.0
    }
   },
   {
    "id": "palette07",
    "name": "Organic",
    "img": "assets/palette/07.png",
    "weights": {
     "natural": 10.0,
     "casual": 6.0,
     "chic": 5.0,
     "modern": 2.0,
     "classic": 3.0,
     "elegant": 1.0
    }
   },
   {
    "id": "palette08",
    "name": "Vivid",
    "img": "assets/palette/08.png",
    "weights": {
     "natural": 1.0,
     "casual": 10.0,
     "chic": 0.0,
     "modern": 6.0,
     "classic": 0.0,
     "elegant": 2.0
    }
   },
   {
    "id": "palette09",
    "name": "Chic",
    "img": "assets/palette/09.png",
    "weights": {
     "natural": 3.0,
     "casual": 1.0,
     "chic": 10.0,
     "modern": 8.0,
     "classic": 6.0,
     "elegant": 5.0
    }
   },
   {
    "id": "palette10",
    "name": "Classic",
    "img": "assets/palette/10.png",
    "weights": {
     "natural": 2.0,
     "casual": 1.0,
     "chic": 8.0,
     "modern": 4.0,
     "classic": 10.0,
     "elegant": 6.0
    }
   },
   {
    "id": "palette11",
    "name": "Red",
    "img": "assets/palette/11.png",
    "weights": {
     "natural": 1.0,
     "casual": 6.0,
     "chic": 3.0,
     "modern": 5.0,
     "classic": 5.0,
     "elegant": 8.0
    }
   },
   {
    "id": "palette12",
    "name": "Orange",
    "img": "assets/palette/12.png",
    "weights": {
     "natural": 5.0,
     "casual": 10.0,
     "chic": 1.0,
     "modern": 2.0,
     "classic": 2.0,
     "elegant": 2.0
    }
   },
   {
    "id": "palette13",
    "name": "Yellow",
    "img": "assets/palette/13.png",
    "weights": {
     "natural": 8.0,
     "casual": 9.0,
     "chic": 1.0,
     "modern": 2.0,
     "classic": 1.0,
     "elegant": 2.0
    }
   },
   {
    "id": "palette14",
    "name": "Green",
    "img": "assets/palette/14.png",
    "weights": {
     "natural": 10.0,
     "casual": 5.0,
     "chic": 6.0,
     "modern": 4.0,
     "classic": 3.0,
     "elegant": 1.0
    }
   },
   {
    "id": "palette15",
    "name": "Light Blue",
    "img": "assets/palette/15.png",
    "weights": {
     "natural": 6.0,
     "casual": 8.0,
     "chic": 5.0,
     "modern": 4.0,
     "classic": 1.0,
     "elegant": 2.0
    }
   },
   {
    "id": "palette16",
    "name": "Blue",
    "img": "assets/palette/16.png",
    "weights": {
     "natural": 2.0,
     "casual": 6.0,
     "chic": 7.0,
     "modern": 9.0,
     "classic": 2.0,
     "elegant": 3.0
    }
   },
   {
    "id": "palette17",
    "name": "Purple",
    "img": "assets/palette/17.png",
    "weights": {
     "natural": 1.0,
     "casual": 2.0,
     "chic": 6.0,
     "modern": 3.0,
     "classic": 6.0,
     "elegant": 10.0
    }
   },
   {
    "id": "palette18",
    "name": "Pink",
    "img": "assets/palette/18.png",
    "weights": {
     "natural": 1.0,
     "casual": 4.0,
     "chic": 3.0,
     "modern": 1.0,
     "classic": 2.0,
     "elegant": 10.0
    }
   },
   {
    "id": "palette19",
    "name": "Brown",
    "img": "assets/palette/19.png",
    "weights": {
     "natural": 10.0,
     "casual": 4.0,
     "chic": 7.0,
     "modern": 3.0,
     "classic": 8.0,
     "elegant": 2.0
    }
   },
   {
    "id": "palette20",
    "name": "Black & White",
    "img": "assets/palette/20.png",
    "weights": {
     "natural": 0.0,
     "casual": 2.0,
     "chic": 8.0,
     "modern": 10.0,
     "classic": 4.0,
     "elegant": 4.0
    }
   }
  ]
 },
 "resultPalettes": [
  {
   "type": "同系色（トーン・オン・トーン）",
   "name": "ベージュ・アイボリー・グレージュ",
   "weights": {
    "natural": 10.0,
    "casual": 2.0,
    "chic": 7.0,
    "modern": 4.0,
    "classic": 3.0,
    "elegant": 2.0
   }
  },
  {
   "type": "同系色（トーン・オン・トーン）",
   "name": "ホワイト・ライトグレー・チャコール",
   "weights": {
    "natural": 4.0,
    "casual": 2.0,
    "chic": 10.0,
    "modern": 8.0,
    "classic": 3.0,
    "elegant": 3.0
   }
  },
  {
   "type": "同系色（トーン・オン・トーン）",
   "name": "ブラウン・ダークブラウン・ブラック",
   "weights": {
    "natural": 2.0,
    "casual": 1.0,
    "chic": 8.0,
    "modern": 7.0,
    "classic": 10.0,
    "elegant": 3.0
   }
  },
  {
   "type": "類似色",
   "name": "ベージュ・オリーブ・ブラウン",
   "weights": {
    "natural": 10.0,
    "casual": 5.0,
    "chic": 5.0,
    "modern": 3.0,
    "classic": 4.0,
    "elegant": 1.0
   }
  },
  {
   "type": "類似色",
   "name": "テラコッタ・ベージュ・オリーブ",
   "weights": {
    "natural": 8.0,
    "casual": 8.0,
    "chic": 3.0,
    "modern": 2.0,
    "classic": 2.0,
    "elegant": 1.0
   }
  },
  {
   "type": "類似色",
   "name": "ブルー・ネイビー・ホワイト",
   "weights": {
    "natural": 3.0,
    "casual": 8.0,
    "chic": 6.0,
    "modern": 5.0,
    "classic": 2.0,
    "elegant": 2.0
   }
  },
  {
   "type": "類似色",
   "name": "ダスティブルー・グレー・ホワイト",
   "weights": {
    "natural": 4.0,
    "casual": 4.0,
    "chic": 10.0,
    "modern": 8.0,
    "classic": 2.0,
    "elegant": 4.0
   }
  },
  {
   "type": "アクセントカラー",
   "name": "モスグリーン・ブラック・ウォールナット",
   "weights": {
    "natural": 4.0,
    "casual": 4.0,
    "chic": 8.0,
    "modern": 9.0,
    "classic": 6.0,
    "elegant": 2.0
   }
  },
  {
   "type": "補色・コントラスト",
   "name": "マスタード・ネイビー・グレー",
   "weights": {
    "natural": 2.0,
    "casual": 10.0,
    "chic": 2.0,
    "modern": 7.0,
    "classic": 1.0,
    "elegant": 1.0
   }
  },
  {
   "type": "補色・コントラスト",
   "name": "ホワイト・ブルー・イエロー",
   "weights": {
    "natural": 2.0,
    "casual": 10.0,
    "chic": 1.0,
    "modern": 4.0,
    "classic": 0.0,
    "elegant": 1.0
   }
  },
  {
   "type": "同系色＋アクセント",
   "name": "ピンクベージュ・アイボリー・ゴールド",
   "weights": {
    "natural": 2.0,
    "casual": 3.0,
    "chic": 6.0,
    "modern": 3.0,
    "classic": 6.0,
    "elegant": 10.0
   }
  },
  {
   "type": "補色・コントラスト",
   "name": "ブラック・ホワイト・レッド",
   "weights": {
    "natural": 0.0,
    "casual": 4.0,
    "chic": 7.0,
    "modern": 10.0,
    "classic": 4.0,
    "elegant": 3.0
   }
  }
 ]
};
if (typeof module !== 'undefined') module.exports = DATA;
