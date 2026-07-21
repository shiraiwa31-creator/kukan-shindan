// 空間診断エンジン — リノベレシピ_空間診断仕様書_Ver2 準拠
// 純粋関数のみ。ブラウザでは window.Engine、Node では createEngine(data) を使う。
"use strict";

function createEngine(data) {
  const KEYS = data.styleKeys;

  // 全カテゴリの項目を id / name で引けるようにする
  const itemById = {};
  const allItems = [];
  for (const cat of Object.keys(data.questions)) {
    for (const item of data.questions[cat]) {
      itemById[item.id] = item;
      allItems.push(item);
    }
  }

  // 1. スコア集計: カテゴリ内は選択画像の平均(選択数を正規化)→ カテゴリ係数を掛けて合算
  function computeScores(selections) {
    const total = Object.fromEntries(KEYS.map((k) => [k, 0]));
    for (const cat of Object.keys(data.questions)) {
      const ids = [].concat(selections[cat] || []);
      if (!ids.length) continue;
      const w = data.categoryWeights[cat] ?? 1;
      for (const k of KEYS) {
        const mean =
          ids.reduce((s, id) => s + (itemById[id]?.weights[k] || 0), 0) / ids.length;
        total[k] += mean * w;
      }
    }
    return total;
  }

  // 特殊スタイル: 上位2スタイルが styleSet 内 かつ 特徴タグ一致ポイントが閾値以上
  function checkSpecials(ranking, selections) {
    const selectedNames = new Set(
      Object.keys(data.questions)
        .flatMap((cat) => [].concat(selections[cat] || []))
        .map((id) => itemById[id]?.name)
        .filter(Boolean)
    );
    let best = null;
    for (const sp of data.specials) {
      if (!sp.styleSet.includes(ranking[0]) || !sp.styleSet.includes(ranking[1])) continue;
      let points = 0;
      for (const [name, pt] of Object.entries(sp.tags)) {
        if (selectedNames.has(name)) points += pt;
      }
      if (points >= data.thresholds.specialTagMin && (!best || points > best.points)) {
        best = { patternId: sp.patternId, points };
      }
    }
    return best;
  }

  function patternById(id) {
    return data.patterns.find((p) => p.id === id);
  }

  // 2. 判定: 特殊 → 単独(ratio≥1.25) → 複合(1位寄り注記は ratio≥1.10)
  function diagnose(selections) {
    const scores = computeScores(selections);
    const sum = KEYS.reduce((s, k) => s + scores[k], 0);
    const shares = Object.fromEntries(
      KEYS.map((k) => [k, sum > 0 ? scores[k] / sum : 0])
    );
    const ranking = [...KEYS].sort((a, b) => scores[b] - scores[a]);
    const [primary, secondary] = ranking;
    const ratio =
      scores[secondary] > 0 ? scores[primary] / scores[secondary] : Infinity;

    let judgeType, patternId, lean = false;
    const special = ratio < data.thresholds.solo ? checkSpecials(ranking, selections) : null;
    if (special) {
      judgeType = "special";
      patternId = special.patternId;
    } else if (ratio >= data.thresholds.solo) {
      judgeType = "solo";
      patternId = data.soloMap[primary];
    } else {
      judgeType = "combo";
      lean = ratio >= data.thresholds.lean;
      patternId =
        data.comboMap[`${primary}+${secondary}`] ??
        data.comboMap[`${secondary}+${primary}`] ??
        data.soloMap[primary]; // 対応表にない組合せは1位単独へフォールバック
    }
    const pattern = patternById(patternId);
    return {
      scores, shares, ranking, ratio, judgeType, lean,
      primary, secondary, pattern,
      userCoord: coordFromShares(shares),
      patternCoord: coordForPattern(pattern),
    };
  }

  // 4象限マップ座標
  function coordFromShares(shares) {
    let x = 0, y = 0;
    for (const k of KEYS) {
      x += shares[k] * data.styles[k].coord[0];
      y += shares[k] * data.styles[k].coord[1];
    }
    return [x, y];
  }

  function coordForPattern(pattern) {
    const st = pattern.styles;
    const ws = st.length === 2 ? [0.65, 0.35] : st.map(() => 1 / st.length);
    let x = 0, y = 0;
    st.forEach((k, i) => {
      x += ws[i] * data.styles[k].coord[0];
      y += ws[i] * data.styles[k].coord[1];
    });
    return [x, y];
  }

  // 3. 結果LPコンテンツ: パターン構成スタイルへの適合度で写真・小物・配色を選ぶ
  function matchScore(weights, pattern) {
    const st = pattern.styles;
    const ws = st.length === 2 ? [0.65, 0.35] : st.map(() => 1 / st.length);
    return st.reduce((s, k, i) => s + ws[i] * (weights[k] || 0), 0);
  }

  function buildResultContent(pattern) {
    const top = (items, n) =>
      [...items].sort((a, b) => matchScore(b.weights, pattern) - matchScore(a.weights, pattern)).slice(0, n);
    const materials = [];
    for (const k of pattern.styles) {
      for (const m of data.styles[k].materials) {
        if (!materials.includes(m)) materials.push(m);
      }
    }
    return {
      // 結果写真はPDF由来のパターン別ギャラリーを優先し、なければLDK画像から選ぶ
      photos: pattern.photos && pattern.photos.length
        ? pattern.photos.map((img) => ({ img, name: "" }))
        : top(data.questions.ldk, 4),
      goods: top(data.questions.goods, 4),
      palettes: [...data.resultPalettes]
        .sort((a, b) => matchScore(b.weights, pattern) - matchScore(a.weights, pattern))
        .slice(0, 3),
      materials: materials.slice(0, 5),
    };
  }

  return { computeScores, diagnose, buildResultContent, coordFromShares, coordForPattern, itemById };
}

if (typeof module !== "undefined") module.exports = { createEngine };
if (typeof window !== "undefined" && typeof DATA !== "undefined") {
  window.Engine = createEngine(DATA);
}
