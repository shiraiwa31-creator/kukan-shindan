// WEAROOM 空間ヒアリング — config.js
// 送信先などの設定。GAS をデプロイしたら ENDPOINT_URL を差し替える。
"use strict";

const CONFIG = {
  // Google Apps Script の「ウェブアプリ URL」。空文字ならドライラン(送信せず成功扱い)。
  ENDPOINT_URL: "",
  // gas/Code.gs の TOKEN と同じ文字列にする(簡易なスパム抑止。秘匿性は無い)
  TOKEN: "wearoom-hearing-2026",
  // 画像の公開 URL の起点(シートの =IMAGE() で使う)
  IMAGE_BASE_URL: "https://shiraiwa31-creator.github.io/kukan-shindan/",
  APP_VERSION: "wearoom-1.0",
  // 運営向け参考値(判定パターン・6スタイル割合)を同送するか
  INCLUDE_DIAGNOSIS: true,
};

if (typeof module !== "undefined") module.exports = CONFIG;
