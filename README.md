# 空間診断 Web アプリ

airCloset の診断を参考にした、インテリアテイスト診断(全4問 → 23パターン判定)。

## 動かし方

ビルド不要。`app/index.html` をブラウザで開くだけで動きます。
ローカルサーバーで開く場合:

```bash
python3 -m http.server 8000 -d app
# → http://localhost:8000
```

## データの更新

質問画像・重み付けは `00.画像LDK　数値化.xlsx` が元データです。
Excel を更新したら以下を実行すると `app/js/data.js` と `app/assets/` が再生成されます:

```bash
python3 scripts/build_data.py
node scripts/test_engine.mjs   # 判定ロジックの検証(13テスト)
```

- 23パターンの紹介文・特殊判定タグ・しきい値: `scripts/curated_content.json`
- 判定ロジック(リノベレシピ_空間診断仕様書_Ver2 準拠): `app/js/engine.js`
- 設計書: `docs/superpowers/specs/2026-07-21-kukan-shindan-webapp-design.md`

## 結果ページの直リンク

`index.html#result/<パターンID>` で各パターンの結果LPを直接表示できます
(例: `#result/hokuo` = 北欧)。ID は `scripts/curated_content.json` の `patterns[].id` を参照。
