/* 訪問計數器 — Supabase
   與其他站共用同一個 Supabase 專案，以 COUNTER_ID 區分。

   anon key 設計上就是公開的。安全性由資料庫端保證：counters 表開了 RLS
   且沒有任何 policy，anon 僅能執行 increment_counter / get_counter 兩個
   security definer 函式，無法直接讀寫資料表。

   sessionStorage 的 key 刻意與首頁的 'rh-counted' 不同：這一頁和首頁同源，
   共用 key 會讓「先逛首頁再進來」的人不被計數。 */

const SUPABASE_URL  = 'https://ciptftupkllmwwnrqmkt.supabase.co';
const SUPABASE_ANON = 'sb_publishable_wlrk7HnxRKzo2bhSsRgbEQ_U4KzaFZz';
const COUNTER_ID    = 'typing-hero';

(function () {
  'use strict';

  const box = document.getElementById('counter');
  const el  = document.getElementById('view-count');
  if (!box || !el) return;

  // 同一個分頁重新整理不重複計數
  let counted = false;
  try { counted = sessionStorage.getItem('th-counted') === '1'; } catch (e) {}

  const fn = counted ? 'get_counter' : 'increment_counter';

  fetch(SUPABASE_URL + '/rest/v1/rpc/' + fn, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_ANON,
      'Authorization': 'Bearer ' + SUPABASE_ANON,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ counter_id: COUNTER_ID })
  })
    .then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    })
    .then(function (n) {
      if (typeof n !== 'number') throw new Error('unexpected payload');
      try { sessionStorage.setItem('th-counted', '1'); } catch (e) {}
      el.textContent = n.toLocaleString('zh-TW');
      box.hidden = false;
    })
    .catch(function () {
      // 連不上就整塊藏起來，不影響閱讀
      box.hidden = true;
    });
})();
