// WEAROOM 空間ヒアリング — sheet.js
// UI制御のみ。config.js(CONFIG) / data.js(DATA) / engine.js(Engine) / submission.js(Submission) に依存。
// 設問の描画・選択ロジック(QUESTIONS / renderQuestion / toggleSelection / goBack / goNext)は app.js からのコピー。app.js は変更しない。設問を変えるときは両方を直すこと。
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
  paint(`
    <section class="screen-top fade-in">
      <div class="top-brand">
        <img class="top-logo" src="assets/brand/logo-v.svg" alt="WEAROOM 着替える賃貸 ウェアルーム">
        <p class="top-tagline">着替える、賃貸。</p>
      </div>
      <div class="top-photo">
        <img src="assets/brand/top-hero.jpg" alt="">
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

/* ==========================================================
   お客様情報フォーム(確認画面の下部)
   ========================================================== */
function renderFormBlock() {
  const f = state.form;
  return `
    <section class="c-form">
      <div class="c-block-head">
        <div>
          <span class="w-eyebrow">Contact</span>
          <h2 class="c-title">お客様情報</h2>
        </div>
      </div>
      <label class="w-field" data-field="name">
        <span class="w-label">お名前<em>必須</em></span>
        <input type="text" name="name" autocomplete="name" maxlength="60" value="${esc(f.name)}" placeholder="例：山田 花子">
        <span class="w-error" data-error="name"></span>
      </label>
      <label class="w-field" data-field="contact">
        <span class="w-label">メールアドレス または 電話番号<em>必須</em></span>
        <input type="text" name="contact" autocomplete="email" maxlength="120" value="${esc(f.contact)}" placeholder="例：hanako@example.com / 090-1234-5678">
        <span class="w-error" data-error="contact"></span>
      </label>
      <label class="w-field" data-field="memo">
        <span class="w-label">ご要望・備考<small>任意</small></span>
        <textarea name="memo" rows="4" maxlength="1000" placeholder="例：来月引っ越し予定。猫と暮らしています">${esc(f.memo)}</textarea>
      </label>
      <p class="c-privacy">ご入力いただいた内容は、WEAROOM からのご提案・ご連絡のみに使用します。</p>
      <button type="button" class="w-btn btn-submit">この内容で送信する</button>
      <p class="w-error c-submit-error" hidden></p>
    </section>
  `;
}

function bindConfirmEvents() {
  app.querySelectorAll(".c-edit").forEach((btn) => {
    btn.addEventListener("click", () => editQuestion(Number(btn.dataset.q)));
  });
  app.querySelectorAll(".c-form input, .c-form textarea").forEach((el) => {
    el.addEventListener("input", () => {
      state.form[el.name] = el.value;
      showFieldError(el.name, "");
    });
  });
  app.querySelector(".btn-submit").addEventListener("click", handleSubmit);
}

function showFieldError(name, message) {
  const field = app.querySelector(`.w-field[data-field="${name}"]`);
  if (!field) return;
  field.classList.toggle("has-error", Boolean(message));
  const slot = field.querySelector(".w-error");
  if (slot) slot.textContent = message;
}

function handleSubmit() {
  const emptyQuestion = QUESTIONS.find((q) => state.answers[q.cat].length === 0);
  if (emptyQuestion) {
    const summary = app.querySelector(".c-submit-error");
    summary.textContent = `${emptyQuestion.label} が未選択です。「変更する」から選んでください`;
    summary.hidden = false;
    return;
  }
  const check = Submission.validateForm(state.form);
  showFieldError("name", check.errors.name || "");
  showFieldError("contact", check.errors.contact || "");
  const summary = app.querySelector(".c-submit-error");
  if (!check.ok) {
    summary.textContent = "入力内容をご確認ください";
    summary.hidden = false;
    const firstError = app.querySelector(".w-field.has-error");
    if (firstError) firstError.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  summary.hidden = true;
  const payload = Submission.buildSubmission(state.answers, state.form, { ua: navigator.userAgent });
  submitFlow(payload);
}

/* ==========================================================
   送信
   ========================================================== */
const SEND_TIMEOUT_MS = 20000;

async function sendSubmission(payload) {
  if (!CONFIG.ENDPOINT_URL) {
    // ドライラン: 送信先未設定。payload を console に出して成功扱い
    console.info("[WEAROOM 空間ヒアリング] dry-run payload", payload);
    await new Promise((r) => setTimeout(r, 600));
    return { ok: true, submissionId: payload.submissionId, dryRun: true };
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SEND_TIMEOUT_MS);
  try {
    const res = await fetch(CONFIG.ENDPOINT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" }, // プリフライト回避(GAS の定石)
      body: JSON.stringify(payload),
      redirect: "follow",
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (!json || json.ok !== true) throw new Error((json && json.error) || "サーバーが送信を受け付けませんでした");
    return json;
  } finally {
    clearTimeout(timer);
  }
}

async function submitFlow(payload) {
  renderSending();
  let result;
  try {
    result = await sendSubmission(payload);
  } catch (err) {
    renderError(err, payload);
    return;
  }
  renderDone(result, payload);
}

function renderSending() {
  paint(`
    <section class="screen-status fade-in">
      <div class="w-spinner" role="status" aria-label="送信中"></div>
      <p class="status-text">送信しています…</p>
    </section>
  `);
}

function renderDone(result, payload) {
  const title = result.dryRun ? "テスト送信として処理しました" : "送信しました";
  const note = result.dryRun
    ? `<p class="status-note">※ 送信先(ENDPOINT_URL)が未設定のため、内容は保存されていません</p>`
    : "";
  paint(`
    <section class="screen-status fade-in">
      <img class="status-logo" src="assets/brand/logo-v.svg" alt="WEAROOM 着替える賃貸 ウェアルーム">
      <h1 class="status-title">${title}</h1>
      <p class="status-text">ありがとうございます。<br>担当者が内容を確認のうえ、ご連絡いたします。</p>
      <p class="status-id">ID ${esc(payload.submissionId)}</p>
      ${note}
      <div class="status-actions">
        <button type="button" class="w-link btn-restart">最初に戻る</button>
      </div>
    </section>
  `);
  app.querySelector(".btn-restart").addEventListener("click", () => {
    state.answers = emptyAnswers();
    state.qIndex = 0;
    state.form = { name: "", contact: "", memo: "" };
    renderTop();
  });
}

function renderError(err, payload) {
  const reason = err && err.name === "AbortError" ? "時間内に応答がありませんでした" : String((err && err.message) || err);
  paint(`
    <section class="screen-status fade-in">
      <img class="status-symbol" src="assets/brand/symbol.svg" alt="">
      <h1 class="status-title">送信できませんでした</h1>
      <p class="status-text">通信状況をご確認のうえ、もう一度お試しください。<br>何度も失敗する場合は、回答内容をコピーして担当者へお送りください。</p>
      <div class="status-actions">
        <button type="button" class="w-btn btn-retry">もう一度送信する</button>
        <button type="button" class="w-btn w-btn--ghost btn-copy">回答内容をコピー</button>
        <button type="button" class="w-link btn-back-confirm">確認画面に戻る</button>
      </div>
      <p class="status-detail">${esc(reason)}</p>
    </section>
  `);
  app.querySelector(".btn-retry").addEventListener("click", () => submitFlow(payload));
  app.querySelector(".btn-back-confirm").addEventListener("click", renderConfirm);
  const copyBtn = app.querySelector(".btn-copy");
  copyBtn.addEventListener("click", async () => {
    const ok = await copyText(Submission.formatSubmissionText(payload));
    copyBtn.textContent = ok ? "コピーしました" : "コピーできませんでした";
    setTimeout(() => (copyBtn.textContent = "回答内容をコピー"), 2000);
  });
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (_) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (_) {
      ok = false;
    }
    ta.remove();
    return ok;
  }
}

/* ==========================================================
   初期化
   ========================================================== */
function init() {
  if (location.hash) history.replaceState(null, "", location.pathname + location.search);
  renderTop();
}

document.addEventListener("DOMContentLoaded", init);
