/* ═══════════════════════════════════════════════════════════
   Roblox 學習手冊 — 互動
   四件事：主題切換、進度表（存 localStorage）、名詞搜尋、小測驗。
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var KEY = 'roblox-progress';

  /* ── 主題 ── */
  (function theme() {
    var btn = $('themeBtn');
    var saved = null;
    try { saved = localStorage.getItem('roblox-theme'); } catch (e) {}
    if (saved) document.documentElement.dataset.theme = saved;

    btn.addEventListener('click', function () {
      var now = document.documentElement.dataset.theme;
      // 沒設定過就看系統目前是什麼，切到相反的那一邊
      if (!now) {
        now = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      var next = now === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem('roblox-theme', next); } catch (e) {}
    });
  })();

  /* ── 章節導覽跟著捲動 ── */
  (function toc() {
    var links = [].slice.call(document.querySelectorAll('.toc a'));
    var map = {};
    links.forEach(function (a) {
      var el = document.querySelector(a.getAttribute('href'));
      if (el) map[el.id] = a;
    });
    if (!('IntersectionObserver' in window)) return;

    var strip = document.querySelector('.tocin');

    // 只動導覽列自己的橫向捲動。
    // （原本用 scrollIntoView，它會連整個頁面一起捲——使用者往下滑時被往回拉，
    //   點章節時也會把正在進行的捲動打斷，跳不到目的地。）
    function reveal(a) {
      if (!strip) return;
      var pad = 12;
      var l = a.offsetLeft, r = l + a.offsetWidth;
      var vl = strip.scrollLeft, vr = vl + strip.clientWidth;
      if (l < vl + pad) strip.scrollLeft = Math.max(0, l - pad);
      else if (r > vr - pad) strip.scrollLeft = r - strip.clientWidth + pad;
    }

    // 用捲動位置直接算「現在在哪一節」：越過導覽列下緣的最後一節就是它。
    // （章節長短差很多，用 IntersectionObserver 會同時有兩節在框裡，標錯。）
    var secs = links.map(function (a) { return document.querySelector(a.getAttribute('href')); })
                    .filter(Boolean);
    var cur = null, ticking = false;

    function update() {
      ticking = false;
      var line = 70;                       // 導覽列下方一點點
      var now = secs[0];
      for (var i = 0; i < secs.length; i++) {
        if (secs[i].getBoundingClientRect().top <= line) now = secs[i]; else break;
      }
      if (now === cur) return;             // 沒換就什麼都不做
      cur = now;
      links.forEach(function (a) { a.classList.remove('on'); });
      var a = map[now.id];
      if (a) { a.classList.add('on'); reveal(a); }
    }

    addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    addEventListener('resize', update);
    update();
  })();

  /* ── 進度表 ── */
  (function progress() {
    var box = $('stages');
    if (!box || typeof STAGES === 'undefined') return;

    var done = {};
    try { done = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { done = {}; }

    var total = 0;
    STAGES.forEach(function (st) { total += st.items.length; });

    function save() {
      try { localStorage.setItem(KEY, JSON.stringify(done)); } catch (e) {}
    }

    function paint() {
      var n = 0;
      Object.keys(done).forEach(function (k) { if (done[k]) n++; });
      $('progBar').style.width = (total ? (n / total * 100) : 0) + '%';
      $('progTxt').textContent = n + ' / ' + total;

      STAGES.forEach(function (st, si) {
        var all = st.items.every(function (_, ii) { return done[si + '-' + ii]; });
        box.children[si].classList.toggle('done', all);
      });
    }

    STAGES.forEach(function (st, si) {
      var sec = document.createElement('div');
      sec.className = 'stage';

      var h = document.createElement('h3');
      var sn = document.createElement('span');
      sn.className = 'sn';
      sn.textContent = st.n;
      h.appendChild(sn);
      h.appendChild(document.createTextNode(st.title));
      sec.appendChild(h);

      var g = document.createElement('p');
      g.className = 'goal';
      g.textContent = '目標：' + st.goal;
      sec.appendChild(g);

      st.items.forEach(function (it, ii) {
        var id = si + '-' + ii;
        var label = document.createElement('label');
        var cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.checked = !!done[id];
        cb.addEventListener('change', function () {
          done[id] = cb.checked;
          save();
          paint();
        });
        var sp = document.createElement('span');
        sp.textContent = it;
        label.appendChild(cb);
        label.appendChild(sp);
        sec.appendChild(label);
      });

      box.appendChild(sec);
    });

    $('resetBtn').addEventListener('click', function () {
      if (!confirm('把所有勾選清掉？')) return;
      done = {};
      save();
      [].forEach.call(box.querySelectorAll('input'), function (cb) { cb.checked = false; });
      paint();
    });

    paint();
  })();

  /* ── 名詞對照 ── */
  (function terms() {
    var list = $('termList');
    if (!list || typeof TERMS === 'undefined') return;

    var cats = ['全部'];
    TERMS.forEach(function (t) { if (cats.indexOf(t.cat) < 0) cats.push(t.cat); });

    var cur = '全部';
    var kw = '';

    cats.forEach(function (c) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = c;
      if (c === '全部') b.classList.add('on');
      b.addEventListener('click', function () {
        cur = c;
        [].forEach.call($('cats').children, function (x) { x.classList.remove('on'); });
        b.classList.add('on');
        render();
      });
      $('cats').appendChild(b);
    });

    $('termSearch').addEventListener('input', function () {
      kw = this.value.trim().toLowerCase();
      render();
    });

    function render() {
      list.textContent = '';
      var n = 0;
      TERMS.forEach(function (t) {
        if (cur !== '全部' && t.cat !== cur) return;
        if (kw && (t.en + t.zh + t.desc).toLowerCase().indexOf(kw) < 0) return;
        n++;
        var d = document.createElement('div');
        d.className = 'term';
        var top = document.createElement('div');
        var en = document.createElement('span');
        en.className = 'en';
        en.textContent = t.en;
        var zh = document.createElement('span');
        zh.className = 'zh';
        zh.textContent = t.zh;
        top.appendChild(en);
        top.appendChild(zh);
        var p = document.createElement('p');
        p.textContent = t.desc;
        d.appendChild(top);
        d.appendChild(p);
        list.appendChild(d);
      });
      $('termCount').textContent = n ? ('共 ' + n + ' 個') : '找不到這個字，換個關鍵字試試。';
    }

    render();
  })();

  /* ── 小測驗 ── */
  (function quiz() {
    var box = $('quizList');
    if (!box || typeof QUIZ === 'undefined') return;

    QUIZ.forEach(function (item) {
      var d = document.createElement('div');
      d.className = 'q';

      var pre = document.createElement('pre');
      var code = document.createElement('code');
      code.textContent = item.code;      // 測驗的程式碼不上色，讓他自己讀
      pre.appendChild(code);
      d.appendChild(pre);

      var qt = document.createElement('p');
      qt.className = 'qt';
      qt.textContent = item.q;
      d.appendChild(qt);

      var opts = document.createElement('div');
      opts.className = 'opts';
      var why = document.createElement('p');
      why.className = 'why';
      why.hidden = true;

      item.opts.forEach(function (o, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.textContent = o;
        b.addEventListener('click', function () {
          [].forEach.call(opts.children, function (x) { x.disabled = true; });
          opts.children[item.a].classList.add('ok');
          if (i !== item.a) b.classList.add('no');
          why.textContent = (i === item.a ? '答對了。' : '再看一次程式碼。') + item.why;
          why.hidden = false;
        });
        opts.appendChild(b);
      });

      d.appendChild(opts);
      d.appendChild(why);
      box.appendChild(d);
    });
  })();

  /* ── 遊戲清單 ── */
  (function games() {
    if (typeof GAMES === 'undefined') return;

    function el(tag, cls, txt) {
      var e = document.createElement(tag);
      if (cls) e.className = cls;
      if (txt) e.textContent = txt;
      return e;
    }

    // 一張卡：標題列（名字＋好評率）、一段為什麼、學到什麼、提醒、連結
    function card(g, kind) {
      var a = el('a', 'game');
      a.href = 'https://www.roblox.com/games/' + g.id;
      a.target = '_blank';
      a.rel = 'noopener';

      var top = el('div', 'gtop');
      top.appendChild(el('b', null, g.name));
      if (g.rating) {
        var r = el('span', 'rate', g.rating + '%');
        if (g.rating >= 93) r.className = 'rate high';
        if (g.rating < 80) r.className = 'rate low';
        top.appendChild(r);
      }
      a.appendChild(top);
      a.appendChild(el('p', 'gby', g.by + (g.players ? ' · 最多 ' + g.players + ' 人一局' : '')));

      if (g.why) a.appendChild(el('p', 'gwhy', g.why));
      if (g.learn) a.appendChild(el('p', 'glearn', g.learn));
      if (g.watch) a.appendChild(el('p', 'gwatch', g.watch));
      if (g.note) a.appendChild(el('p', 'gwatch', g.note));

      if (kind === 'careful') a.classList.add('warn');
      return a;
    }

    function fill(id, rows, kind) {
      var box = $(id);
      if (!box) return;
      rows.forEach(function (g) { box.appendChild(card(g, kind)); });
    }

    fill('funList', GAMES.fun);
    fill('carefulList', GAMES.careful, 'careful');
    fill('deepList', GAMES.deep);

    var note = $('gameNote');
    if (note) {
      note.textContent = '好評率和同時在線人數是 ' + GAMES.checked +
        '直接查 Roblox 官方資料得到的，之後會變。點名字會開新分頁到官方頁面。';
    }
  })();
})();
