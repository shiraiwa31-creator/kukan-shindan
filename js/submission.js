// WEAROOM 空間ヒアリング — submission.js
// 送信データの組み立て・入力検証・テキスト整形。純粋関数のみ。
// ブラウザでは window.Submission、Node では createSubmission(data, engine, config) を使う。
"use strict";

function createSubmission(data, engine, config) {
  const CATS = ["ldk", "goods", "emotion", "palette"];
  const CAT_LABELS = {
    ldk: "Q1 好みのインテリア",
    goods: "Q2 好みの小物",
    emotion: "Q3 感じたい感情",
    palette: "Q4 好きな配色",
  };

  function absoluteImageUrl(path) {
    if (/^https?:\/\//.test(path)) return path;
    const base = config.IMAGE_BASE_URL.endsWith("/") ? config.IMAGE_BASE_URL : config.IMAGE_BASE_URL + "/";
    return base + path.replace(/^\.?\//, "");
  }

  function resolveItems(cat, ids) {
    return [].concat(ids || [])
      .map((id) => engine.itemById[id])
      .filter(Boolean)
      .map((it) => ({ id: it.id, name: it.name, img: absoluteImageUrl(it.img) }));
  }

  // 全角数字・全角ハイフンを半角に寄せる
  function normalizeContact(s) {
    return String(s || "")
      .trim()
      .replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))
      .replace(/[－ー‐]/g, "-");
  }
  function isEmail(s) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
  }
  function isPhone(s) {
    if (!/^[\d\-\s()+]+$/.test(s)) return false;
    const digits = s.replace(/\D/g, "");
    return digits.length >= 10 && digits.length <= 11;
  }

  function validateForm(form) {
    const errors = {};
    const name = String(form.name || "").trim();
    const contact = normalizeContact(form.contact);
    if (!name) errors.name = "お名前を入力してください";
    if (!contact) errors.contact = "メールアドレスまたは電話番号を入力してください";
    else if (!isEmail(contact) && !isPhone(contact)) {
      errors.contact = "メールアドレスまたは電話番号の形式で入力してください";
    }
    return { ok: Object.keys(errors).length === 0, errors };
  }

  const pad = (n) => String(n).padStart(2, "0");
  function makeSubmissionId(now, rand) {
    const d = now;
    const stamp =
      `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}` +
      `-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
    const suffix = (rand ?? Math.random()).toString(36).slice(2, 6).padEnd(4, "0");
    return `${stamp}-${suffix}`;
  }

  function buildDiagnosis(answers) {
    if (!engine || typeof engine.diagnose !== "function") return null;
    const r = engine.diagnose(answers);
    if (!r || !r.pattern) return null;
    const shares = {};
    for (const k of data.styleKeys) shares[k] = Math.round((r.shares[k] || 0) * 1000) / 1000;
    return {
      patternId: r.pattern.id,
      patternName: r.pattern.name,
      judgeType: r.judgeType,
      lean: r.lean,
      primary: r.primary,
      secondary: r.secondary,
      shares,
    };
  }

  function buildSubmission(answers, form, opts = {}) {
    const now = opts.now || new Date();
    const answersOut = {};
    for (const cat of CATS) answersOut[cat] = resolveItems(cat, answers[cat]);
    return {
      submissionId: makeSubmissionId(now, opts.rand),
      submittedAt: now.toISOString(),
      name: String(form.name || "").trim(),
      contact: normalizeContact(form.contact),
      memo: String(form.memo || "").trim(),
      answers: answersOut,
      diagnosis: config.INCLUDE_DIAGNOSIS === false ? null : buildDiagnosis(answers),
      meta: { ua: opts.ua || "", appVersion: config.APP_VERSION, token: config.TOKEN },
    };
  }

  // 送信失敗時に LINE 等へ貼るためのテキスト。診断結果は含めない。
  function formatSubmissionText(payload) {
    const lines = [
      "【WEAROOM 空間ヒアリング】",
      `回答ID: ${payload.submissionId}`,
      `お名前: ${payload.name}`,
      `連絡先: ${payload.contact}`,
    ];
    if (payload.memo) lines.push(`備考: ${payload.memo}`);
    for (const cat of CATS) {
      lines.push("", CAT_LABELS[cat]);
      for (const it of payload.answers[cat] || []) lines.push(`・${it.name}（${it.id}）`);
    }
    return lines.join("\n");
  }

  return { resolveItems, validateForm, buildSubmission, formatSubmissionText, makeSubmissionId, absoluteImageUrl };
}

if (typeof module !== "undefined") module.exports = { createSubmission };
if (typeof window !== "undefined" && typeof DATA !== "undefined" && typeof CONFIG !== "undefined") {
  window.Submission = createSubmission(DATA, window.Engine, CONFIG);
}
