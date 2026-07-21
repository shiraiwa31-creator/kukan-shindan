// 空間診断 — app.js
// UI制御のみ。data.js(DATA) / engine.js(Engine) に依存。ライブラリ不使用。
"use strict";

/* ==========================================================
   配色名 → HEX 対応表(おすすめ配色パレットの丸チップ描画用)
   ========================================================== */
const COLOR_HEX = {
  ベージュ: "#d9c7a7",
  アイボリー: "#f5efe0",
  グレージュ: "#b8ada0",
  ホワイト: "#f7f7f5",
  ライトグレー: "#cfcfcf",
  チャコール: "#4a4a4a",
  ブラウン: "#7a5230",
  ダークブラウン: "#4e342e",
  ブラック: "#222222",
  オリーブ: "#7d8452",
  テラコッタ: "#c47a5a",
  ブルー: "#4a6fa5",
  ネイビー: "#253858",
  ダスティブルー: "#7d96ad",
  グレー: "#9e9e9e",
  モスグリーン: "#6b7a4f",
  ウォールナット: "#5d4037",
  マスタード: "#d4a72c",
  イエロー: "#e8c93d",
  ピンクベージュ: "#e3c2b8",
  ゴールド: "#c9a24b",
  レッド: "#b83a3a",
};

/* ==========================================================
   設問設定(共通テンプレで描画する4問)
   ========================================================== */
const QUESTIONS = [
  {
    cat: "ldk",
    label: "Q1",
    title: "好みのインテリアを選んでください",
    note: "複数選択できます",
    multi: true,
    aspect: "landscape",
    caption: false,
  },
  {
    cat: "goods",
    label: "Q2",
    title: "好みの小物を選んでください",
    note: "複数選択できます",
    multi: true,
    aspect: "landscape",
    caption: true,
  },
  {
    cat: "emotion",
    label: "Q3",
    title: "お部屋でどう感じたいですか？",
    note: "1つだけ選んでください",
    multi: false,
    aspect: "landscape",
    caption: true,
  },
  {
    cat: "palette",
    label: "Q4",
    title: "好きな配色を選んでください",
    note: "複数選択できます",
    multi: true,
    aspect: "wide",
    caption: false,
  },
];

const LOADING_DURATION_MS = 2000;

/* ==========================================================
   状態
   ========================================================== */
function emptyAnswers() {
  return { ldk: [], goods: [], emotion: [], palette: [] };
}

const state = {
  qIndex: 0,
  answers: emptyAnswers(),
  ldkOrder: null, // Q1の表示順(診断開始時にシャッフル。戻る/進むでは変わらない)
};

function shuffled(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const app = document.getElementById("app");

/* ==========================================================
   共通ヘルパー
   ========================================================== */
function paint(html) {
  app.innerHTML = html;
  window.scrollTo(0, 0);
}

/* ==========================================================
   TOP 画面
   ========================================================== */
function renderTop() {
  const ldk = DATA.questions.ldk;
  const pick = (i) => ldk[i % ldk.length];
  const pics = [pick(2), pick(11), pick(19)];

  paint(`
    <section class="screen-top">
      <div class="hero-collage">
        <div class="collage-photo c3"><img src="${pics[2].img}" alt="${pics[2].name}"></div>
        <div class="collage-photo c1"><img src="${pics[0].img}" alt="${pics[0].name}"></div>
        <div class="collage-photo c2"><img src="${pics[1].img}" alt="${pics[1].name}"></div>
        <div class="hero-fade"></div>
      </div>
      <div class="top-body">
        <p class="eyebrow">Interior Diagnosis</p>
        <h1 class="app-title">空間診断</h1>
        <p class="lead">「自分らしさ」と「実現したい空間」から、あなたに似合うインテリアを見つける診断です</p>
        <p class="sub-note">全4問・約1分</p>
        <button type="button" class="btn-primary btn-start">無料診断を始める</button>
      </div>
    </section>
  `);

  app.querySelector(".btn-start").addEventListener("click", startQuiz);
}

/* ==========================================================
   Q1〜Q4 質問画面
   ========================================================== */
function startQuiz() {
  state.answers = emptyAnswers();
  state.qIndex = 0;
  state.ldkOrder = shuffled(DATA.questions.ldk); // テイスト順の偏りを避けるためランダム表示
  renderQuestion();
}

function renderQuestion() {
  const q = QUESTIONS[state.qIndex];
  const items = q.cat === "ldk" && state.ldkOrder ? state.ldkOrder : DATA.questions[q.cat];
  const selected = state.answers[q.cat];
  const progressPct = Math.round(((state.qIndex + 1) / QUESTIONS.length) * 100);
  const canProceed = selected.length > 0;

  const cardsHtml = items
    .map((item) => {
      const isSelected = selected.includes(item.id);
      return `
        <button type="button" class="opt-card${isSelected ? " is-selected" : ""}" data-id="${item.id}">
          <span class="opt-thumb aspect-${q.aspect}">
            <img src="${item.img}" alt="${item.name}" loading="lazy">
            <span class="opt-check">✓</span>
          </span>
          ${q.caption ? `<span class="opt-caption">${item.name}</span>` : ""}
        </button>
      `;
    })
    .join("");

  paint(`
    <section class="screen-question">
      <header class="q-header">
        <div class="q-progress"><i style="width:${progressPct}%"></i></div>
        <div class="q-meta"><span class="q-count">${q.label}/4</span></div>
      </header>
      <div class="q-body">
        <h2 class="q-title">${q.title}</h2>
        <p class="q-note">${q.note}</p>
        <div class="opt-grid">${cardsHtml}</div>
      </div>
      <footer class="q-footer">
        <div class="q-footer-inner">
          <button type="button" class="link-back">← 戻る</button>
          <button type="button" class="btn-primary btn-next" ${canProceed ? "" : "disabled"}>次へ</button>
        </div>
      </footer>
    </section>
  `);

  app.querySelector(".opt-grid").addEventListener("click", (e) => {
    const card = e.target.closest(".opt-card");
    if (!card) return;
    toggleSelection(q, card.dataset.id);
  });
  app.querySelector(".link-back").addEventListener("click", goBack);
  app.querySelector(".btn-next").addEventListener("click", goNext);
}

function toggleSelection(question, id) {
  const arr = state.answers[question.cat];
  if (question.multi) {
    const idx = arr.indexOf(id);
    if (idx >= 0) arr.splice(idx, 1);
    else arr.push(id);
  } else {
    // 単一選択: 選び直しは置き換え。同じものを選ぶと解除。
    if (arr[0] === id) arr.length = 0;
    else {
      arr.length = 0;
      arr.push(id);
    }
  }
  // 再描画するとスクロール位置が先頭に戻ってしまうため、選択状態だけDOMに反映する
  app.querySelectorAll(".opt-card").forEach((card) => {
    card.classList.toggle("is-selected", arr.includes(card.dataset.id));
  });
  app.querySelector(".btn-next").disabled = arr.length === 0;
}

function goBack() {
  if (state.qIndex === 0) {
    renderTop();
    return;
  }
  state.qIndex -= 1;
  renderQuestion();
}

function goNext() {
  const q = QUESTIONS[state.qIndex];
  if (!state.answers[q.cat].length) return;
  if (state.qIndex < QUESTIONS.length - 1) {
    state.qIndex += 1;
    renderQuestion();
  } else {
    runDiagnosis();
  }
}

/* ==========================================================
   診断中画面
   ========================================================== */
function runDiagnosis() {
  paint(`
    <section class="screen-loading">
      <div class="spinner"></div>
      <p class="loading-text">あなたの空間タイプを分析しています…</p>
    </section>
  `);

  setTimeout(() => {
    const result = Engine.diagnose(state.answers);
    // location.hash への代入は hashchange 経由で個人スコアなし表示に上書きされるため
    // replaceState でイベントを発火させずにハッシュだけ更新する
    history.replaceState(null, "", `#result/${encodeURIComponent(result.pattern.id)}`);
    renderResult(result, true);
  }, LOADING_DURATION_MS);
}

/* ==========================================================
   結果 LP
   ========================================================== */
function renderResult(result, personal) {
  const pattern = result.pattern;
  const content = Engine.buildResultContent(pattern);

  const leanNoteHtml =
    personal && result.lean
      ? `<p class="lean-note">※ ${DATA.styles[result.primary].label}寄りの傾向です</p>`
      : "";

  paint(`
    <section class="screen-result fade-in">
      <header class="r-header">
        <p class="r-kicker">あなたの空間タイプは</p>
        <h1 class="r-name">${pattern.name}</h1>
        <p class="r-catch">${pattern.catch}</p>
        ${leanNoteHtml}
      </header>

      <div class="r-section r-map-section">
        <h3 class="r-heading">4象限マップ</h3>
        ${renderQuadrantMap(result, personal)}
      </div>

      <div class="r-section r-desc-section">
        <h3 class="r-heading">テイストの傾向</h3>
        <p class="r-desc">${pattern.description}</p>
      </div>

      <div class="r-section">
        <h3 class="r-heading">こんなインテリアが似合います</h3>
        <div class="r-grid-2col">${renderMediaGrid(content.photos)}</div>
      </div>

      <div class="r-section">
        <h3 class="r-heading">似合う小物</h3>
        <div class="r-grid-2col">${renderMediaGrid(content.goods)}</div>
      </div>

      <div class="r-section">
        <h3 class="r-heading">おすすめの配色</h3>
        <div class="palette-list">${renderPalettes(content.palettes)}</div>
      </div>

      <div class="r-section">
        <h3 class="r-heading">おすすめの素材</h3>
        <div class="material-tags">${renderMaterials(content.materials)}</div>
      </div>

      <div class="r-restart">
        <button type="button" class="btn-primary btn-restart">もう一度診断する</button>
      </div>
    </section>
  `);

  app.querySelector(".btn-restart").addEventListener("click", restartQuiz);
}

function restartQuiz() {
  state.answers = emptyAnswers();
  state.qIndex = 0;
  clearHash();
  renderTop();
}

/* ---------- 4象限マップ(SVG) ---------- */
function projectCoord(coord, size, pad) {
  const scale = size / 2 - pad;
  const cx = size / 2;
  const cy = size / 2;
  return [cx + coord[0] * scale, cy - coord[1] * scale];
}

function renderQuadrantMap(result, personal) {
  // 結果パターンのポジションのみを表示する
  const size = 320;
  const pad = 56;
  const cx = size / 2;
  const cy = size / 2;
  const patternCoord = personal ? result.patternCoord : Engine.coordForPattern(result.pattern);

  const [pxx, pyy] = projectCoord(patternCoord, size, pad);
  // ラベルは点の下に置き、横軸ラベル(ナチュラル/モダン)との重なりを避ける
  const patternSvg = `
    <circle cx="${pxx}" cy="${pyy}" r="9" class="map-pattern-dot"></circle>
    <text x="${pxx}" y="${pyy + 26}" class="map-pattern-label" text-anchor="middle">あなたのタイプ</text>
  `;

  return `
    <svg viewBox="0 0 ${size} ${size}" class="quadrant-map" role="img" aria-label="4象限マップ">
      <line x1="${pad}" y1="${cy}" x2="${size - pad}" y2="${cy}" class="map-axis"></line>
      <line x1="${cx}" y1="${pad}" x2="${cx}" y2="${size - pad}" class="map-axis"></line>
      <text x="${pad - 8}" y="${cy - 10}" class="map-axis-label" text-anchor="start">ナチュラル</text>
      <text x="${size - pad + 8}" y="${cy - 10}" class="map-axis-label" text-anchor="end">モダン</text>
      <text x="${cx}" y="${pad - 16}" class="map-axis-label" text-anchor="middle">デコラティブ</text>
      <text x="${cx}" y="${size - pad + 26}" class="map-axis-label" text-anchor="middle">シンプル</text>
      ${patternSvg}
    </svg>
  `;
}

/* ---------- 写真・小物グリッド ---------- */
function renderMediaGrid(items) {
  return items
    .map(
      (item) => `
        <div class="media-card">
          <div class="media-thumb"><img src="${item.img}" alt="${item.name}" loading="lazy"></div>
          ${item.name ? `<p class="media-caption">${item.name}</p>` : ""}
        </div>
      `
    )
    .join("");
}

/* ---------- おすすめの配色 ---------- */
function renderPalettes(palettes) {
  return palettes
    .map((p) => {
      const chips = p.name
        .split("・")
        .map((name) => {
          const hex = COLOR_HEX[name] || "#cccccc";
          return `
            <span class="color-chip">
              <span class="color-swatch" style="background:${hex}"></span>
              <span class="color-name">${name}</span>
            </span>
          `;
        })
        .join("");
      return `
        <div class="palette-card">
          <p class="palette-type">${p.type}</p>
          <div class="color-chip-row">${chips}</div>
        </div>
      `;
    })
    .join("");
}

/* ---------- おすすめの素材 ---------- */
function renderMaterials(materials) {
  return materials.map((m) => `<span class="material-tag">${m}</span>`).join("");
}

/* ==========================================================
   URLハッシュ制御 / 初期化
   ========================================================== */
function clearHash() {
  history.replaceState(null, "", location.pathname + location.search);
}

function parseResultHash() {
  const match = location.hash.match(/^#result\/(.+)$/);
  if (!match) return null;
  const id = decodeURIComponent(match[1]);
  return DATA.patterns.find((p) => p.id === id) || null;
}

function init() {
  const pattern = parseResultHash();
  if (pattern) {
    renderResult({ pattern }, false);
    return;
  }
  if (location.hash) clearHash();
  renderTop();
}

document.addEventListener("DOMContentLoaded", init);
window.addEventListener("hashchange", init);
