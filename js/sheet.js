// WEAROOM 空間ヒアリング — sheet.js
// UI制御のみ。config.js(CONFIG) / data.js(DATA) / engine.js(Engine) / submission.js(Submission) に依存。
// 設問の描画・選択ロジックは app.js と同じ挙動(コードをコピーして保持。app.js は変更しない)。
"use strict";

/* ==========================================================
   設問設定(app.js と同一)
   ========================================================== */
const QUESTIONS = [
  { cat: "ldk", label: "Q1", title: "好みのインテリアを選んでください", note: "複数選択できます", multi: true, aspect: "landscape", caption: false },
  { cat: "goods", label: "Q2", title: "好みの小物を選んでください", note: "複数選択できます", multi: true, aspect: "landscape", caption: true },
  { cat: "emotion", label: "Q3", title: "お部屋でどう感じたいですか？", note: "1つだけ選んでください", multi: false, aspect: "landscape", caption: true },
  { cat: "palette", label: "Q4", title: "好きな配色を選んでください", note: "複数選択できます", multi: true, aspect: "wide", caption: false },
];

/* ==========================================================
   状態
   ========================================================== */
function emptyAnswers() {
  return { ldk: [], goods: [], emotion: [], palette: [] };
}

const state = {
  qIndex: 0,
  answers: emptyAnswers(),
  ldkOrder: null, // Q1の表示順(開始時にシャッフル。戻る/進むでは変わらない)
  returnToConfirm: false, // 確認画面の「変更する」から来たとき true
  form: { name: "", contact: "", memo: "" },
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
function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function paint(html) {
  app.innerHTML = html;
  window.scrollTo(0, 0);
}

function brandHeader() {
  return `
    <header class="w-header">
      <img class="w-header-symbol" src="assets/brand/symbol.svg" alt="WEAROOM">
      <span class="w-header-title">空間ヒアリング</span>
    </header>
  `;
}

/* ==========================================================
   TOP 画面
   ========================================================== */
function renderTop() {
  const ldk = DATA.questions.ldk;
  const pics = [ldk[2 % ldk.length], ldk[11 % ldk.length], ldk[19 % ldk.length]];

  paint(`
    <section class="screen-top fade-in">
      <div class="top-brand">
        <img class="top-logo" src="assets/brand/logo-v.svg" alt="WEAROOM 着替える賃貸 ウェアルーム">
        <p class="top-tagline">着替える、賃貸。</p>
      </div>
      <div class="top-photos">
        ${pics.map((p) => `<img src="${p.img}" alt="">`).join("")}
      </div>
      <div class="top-body">
        <p class="w-eyebrow">Hearing Sheet</p>
        <h1 class="top-title">WEAROOM<br>空間ヒアリング</h1>
        <p class="top-lead">好きなインテリア・小物・色を選ぶだけ。<br>あなたの「好き」を、部屋づくりの担当者にそのまま届けます。</p>
        <p class="top-note">4 QUESTIONS / ABOUT 2 MIN</p>
        <button type="button" class="w-btn btn-start">はじめる</button>
      </div>
    </section>
  `);

  app.querySelector(".btn-start").addEventListener("click", startSheet);
}

/* ==========================================================
   Q1〜Q4 質問画面(app.js と同じ挙動 + 確認画面からの戻り)
   ========================================================== */
function startSheet() {
  state.answers = emptyAnswers();
  state.qIndex = 0;
  state.returnToConfirm = false;
  state.form = { name: "", contact: "", memo: "" };
  state.ldkOrder = shuffled(DATA.questions.ldk);
  renderQuestion();
}

function renderQuestion() {
  const q = QUESTIONS[state.qIndex];
  const items = q.cat === "ldk" && state.ldkOrder ? state.ldkOrder : DATA.questions[q.cat];
  const selected = state.answers[q.cat];
  const progressPct = Math.round(((state.qIndex + 1) / QUESTIONS.length) * 100);
  const canProceed = selected.length > 0;
  const isLast = state.qIndex === QUESTIONS.length - 1;
  const nextLabel = state.returnToConfirm ? "確認画面へ戻る" : isLast ? "回答内容を確認する" : "次へ";

  const cardsHtml = items
    .map((item) => {
      const isSelected = selected.includes(item.id);
      return `
        <button type="button" class="opt-card${isSelected ? " is-selected" : ""}" data-id="${item.id}">
          <span class="opt-thumb aspect-${q.aspect}">
            <img src="${item.img}" alt="${esc(item.name)}" loading="lazy">
            <span class="opt-check">✓</span>
          </span>
          ${q.caption ? `<span class="opt-caption">${esc(item.name)}</span>` : ""}
        </button>
      `;
    })
    .join("");

  paint(`
    <section class="screen-question">
      ${brandHeader()}
      <div class="q-progress"><i style="width:${progressPct}%"></i></div>
      <div class="q-body">
        <span class="q-count">${q.label} / ${QUESTIONS.length}</span>
        <h2 class="q-title">${q.title}</h2>
        <p class="q-note">${q.note}</p>
        <div class="opt-grid">${cardsHtml}</div>
      </div>
      <footer class="q-footer">
        <div class="q-footer-inner">
          <button type="button" class="w-link link-back">← 戻る</button>
          <button type="button" class="w-btn btn-next" ${canProceed ? "" : "disabled"}>${nextLabel}</button>
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
    if (arr[0] === id) arr.length = 0;
    else {
      arr.length = 0;
      arr.push(id);
    }
  }
  // 再描画するとスクロール位置が先頭に戻るため、選択状態だけ DOM に反映する
  app.querySelectorAll(".opt-card").forEach((card) => {
    card.classList.toggle("is-selected", arr.includes(card.dataset.id));
  });
  app.querySelector(".btn-next").disabled = arr.length === 0;
}

function goBack() {
  if (state.returnToConfirm) {
    // 確認画面から来た場合は、選び直さずに確認画面へ戻る
    renderConfirm();
    return;
  }
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
  if (state.returnToConfirm || state.qIndex === QUESTIONS.length - 1) {
    renderConfirm();
    return;
  }
  state.qIndex += 1;
  renderQuestion();
}

function editQuestion(index) {
  state.qIndex = index;
  state.returnToConfirm = true;
  renderQuestion();
}

/* ==========================================================
   回答内容の確認
   ========================================================== */
function selectedItems(cat) {
  return state.answers[cat].map((id) => Engine.itemById[id]).filter(Boolean);
}

function renderConfirm() {
  state.returnToConfirm = false;

  const blocks = QUESTIONS.map((q, i) => {
    const items = selectedItems(q.cat);
    const list = items.length
      ? `<ul class="c-items">${items
          .map(
            (it) => `
              <li class="c-item">
                <span class="c-thumb aspect-${q.aspect}"><img src="${it.img}" alt="${esc(it.name)}" loading="lazy"></span>
                ${q.caption ? `<span class="c-name">${esc(it.name)}</span>` : ""}
              </li>`
          )
          .join("")}</ul>`
      : `<p class="c-empty">未選択です。「変更する」から選んでください。</p>`;
    return `
      <section class="c-block">
        <div class="c-block-head">
          <div>
            <span class="w-eyebrow">${q.label}</span>
            <h2 class="c-title">${q.title.replace("を選んでください", "")}</h2>
          </div>
          <button type="button" class="w-link c-edit" data-q="${i}">変更する</button>
        </div>
        ${list}
      </section>
    `;
  }).join("");

  paint(`
    <section class="screen-confirm fade-in">
      ${brandHeader()}
      <div class="c-intro">
        <p class="w-eyebrow">Check</p>
        <h1 class="c-heading">回答内容の確認</h1>
        <p class="c-lead">選んだ内容をご確認ください。変更したい設問は「変更する」から選び直せます。</p>
      </div>
      ${blocks}
      ${renderFormBlock()}
    </section>
  `);

  bindConfirmEvents();
}

// Task 4 でお客様情報フォームに置き換える
function renderFormBlock() {
  return "";
}

function bindConfirmEvents() {
  app.querySelectorAll(".c-edit").forEach((btn) => {
    btn.addEventListener("click", () => editQuestion(Number(btn.dataset.q)));
  });
}

/* ==========================================================
   初期化
   ========================================================== */
function init() {
  if (location.hash) history.replaceState(null, "", location.pathname + location.search);
  renderTop();
}

document.addEventListener("DOMContentLoaded", init);
