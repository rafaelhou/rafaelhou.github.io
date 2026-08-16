/* ═══════════════════════════════════════════════════════════
   三上詩詞 — 互動
   分頁切換、注音開關、進度表、詩卡（含注音渲染）、作者、搜尋。
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var YT = 'https://www.youtube.com/watch?v=';

  function ytUrl(id, start) {
    return id ? YT + id + (start ? '&t=' + start + 's' : '') : null;
  }

  /* ── 主題 ── */
  (function () {
    var saved = null;
    try { saved = localStorage.getItem('poems-theme'); } catch (e) {}
    if (saved) document.documentElement.dataset.theme = saved;
    $('themeBtn').addEventListener('click', function () {
      var now = document.documentElement.dataset.theme ||
        (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      var next = now === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem('poems-theme', next); } catch (e) {}
    });
  })();

  /* ── 注音開關 ── */
  (function () {
    var btn = $('zyBtn');
    var on = true;
    try { on = localStorage.getItem('poems-zy') !== 'off'; } catch (e) {}
    apply();
    btn.addEventListener('click', function () { on = !on; apply(); });
    function apply() {
      document.body.classList.toggle('nozy', !on);
      btn.classList.toggle('on', on);
      btn.setAttribute('aria-pressed', String(on));
      btn.textContent = on ? '注音 ㄅ' : '注音 關';
      try { localStorage.setItem('poems-zy', on ? 'on' : 'off'); } catch (e) {}
    }
  })();

  /* ── 分頁 ── */
  (function () {
    var tabs = [].slice.call(document.querySelectorAll('.tab'));
    tabs.forEach(function (t) {
      t.addEventListener('click', function () {
        tabs.forEach(function (x) { x.classList.remove('on'); });
        t.classList.add('on');
        ['plan', 'poems', 'authors', 'how'].forEach(function (v) {
          $('view-' + v).hidden = (v !== t.dataset.view);
        });
        scrollTo({ top: 0 });
      });
    });
  })();

  /* ── 進度表 ── */
  (function () {
    var body = $('planBody');
    // JS 的 sort 是穩定的：只比週次，同一週就保持 data.js 裡（＝老師表上）的順序
    var rows = POEMS.slice().sort(function (a, b) { return a.week - b.week; });
    var breaks = {};
    BREAKS.forEach(function (b) { breaks[b.week] = b.why; });

    var lastWeek = null;
    var maxWeek = rows[rows.length - 1].week;

    for (var w = 1; w <= maxWeek; w++) {
      // 期中考暫停的那一週，在表上留一列說明
      if (breaks[w]) {
        var tr = document.createElement('tr');
        tr.className = 'brk';
        var td = document.createElement('td');
        td.colSpan = 5;
        td.innerHTML = '第 <b>' + w + '</b> 週 — ' + breaks[w];
        tr.appendChild(td);
        body.appendChild(tr);
      }
      rows.filter(function (p) { return p.week === w; }).forEach(function (p) {
        var tr = document.createElement('tr');

        var wk = document.createElement('td');
        wk.className = 'wk';
        wk.textContent = (p.week === lastWeek ? '' : p.week);
        lastWeek = p.week;

        var no = document.createElement('td');
        no.className = 'no';
        no.textContent = p.no;

        var tt = document.createElement('td');
        tt.className = 'tt';
        var a = document.createElement('a');
        a.href = '#';
        a.textContent = p.title;
        a.addEventListener('click', function (e) {
          e.preventDefault();
          document.querySelector('.tab[data-view="poems"]').click();
          var el = document.getElementById('p-' + p.no);
          if (el) { el.scrollIntoView({ block: 'start' }); el.classList.add('flash'); }
        });
        tt.appendChild(a);

        var au = document.createElement('td');
        au.className = 'au';
        var dy = document.createElement('span');
        dy.className = 'dy';
        dy.textContent = (AUTHORS[p.author] || {}).dyn || '';
        au.appendChild(dy);
        au.appendChild(document.createTextNode(p.author));

        var vd = document.createElement('td');
        vd.className = 'vd';
        var url = ytUrl(p.video, p.videoStart);
        if (url) {
          var va = document.createElement('a');
          va.href = url; va.target = '_blank'; va.rel = 'noopener';
          va.textContent = '▶ 看影片';
          vd.appendChild(va);
          var u = document.createElement('span');   // 只在列印時出現：紙上要有網址才打得出來
          u.className = 'printurl';
          u.textContent = 'youtu.be/' + p.video;
          vd.appendChild(u);
        } else {
          vd.textContent = '無';
          vd.style.color = 'var(--ink-2)';
        }

        [wk, no, tt, au, vd].forEach(function (c) { tr.appendChild(c); });
        body.appendChild(tr);
      });
    }
  })();

  /* ── 詩卡 ── */
  var renderPoems = (function () {
    var list = $('poemList');

    // 一個字配一個注音，注音直排在字的右邊（課本的樣子）
    // 聲調要跟注音符號分開：二三四聲放在注音右下角，輕聲放在最上面。
    var TONES = 'ˊˇˋ';

    function splitTone(read) {
      if (!read) return { body: '', tone: '', light: false };
      if (read.charAt(0) === '˙') return { body: read.slice(1), tone: '˙', light: true };
      var last = read.charAt(read.length - 1);
      if (TONES.indexOf(last) >= 0) return { body: read.slice(0, -1), tone: last, light: false };
      return { body: read, tone: '', light: false };   // 一聲不標
    }

    function ruby(lines, zy) {
      var reads = (zy || '').split(' ');
      var i = 0;
      var frag = document.createDocumentFragment();
      lines.forEach(function (line) {
        var ln = document.createElement('span');
        ln.className = 'ln';
        for (var k = 0; k < line.length; k++) {
          var ch = line.charAt(k);
          if (ch >= '一' && ch <= '鿿') {
            var parts = splitTone(reads[i++] || '');
            var z = document.createElement('span');
            z.className = 'z';
            var c = document.createElement('span');
            c.className = 'c';
            c.textContent = ch;
            var p = document.createElement('span');
            p.className = 'p';
            var b = document.createElement('span');
            b.className = 'b';
            b.textContent = parts.body;
            p.appendChild(b);
            if (parts.tone) {
              var t = document.createElement('span');
              t.className = parts.light ? 't light' : 't';
              t.textContent = parts.tone;
              p.appendChild(t);
            }
            z.appendChild(c); z.appendChild(p);
            ln.appendChild(z);
          } else {
            ln.appendChild(document.createTextNode(ch));
          }
        }
        frag.appendChild(ln);
      });
      return frag;
    }

    function row(key, cls, build) {
      var r = document.createElement('div');
      r.className = 'row';
      var k = document.createElement('span');
      k.className = 'k' + (cls ? ' ' + cls : '');
      k.textContent = key;
      var v = document.createElement('div');
      v.className = 'v' + (cls ? ' ' + cls : '');
      build(v);
      r.appendChild(k); r.appendChild(v);
      return r;
    }

    return function (items) {
      list.textContent = '';
      items.forEach(function (p) {
        var art = document.createElement('article');
        art.className = 'poem';
        art.id = 'p-' + p.no;

        var h = document.createElement('header');
        var wk = document.createElement('span');
        wk.className = 'wk';
        wk.textContent = '第 ' + p.week + ' 週';
        var h2 = document.createElement('h2');
        h2.textContent = p.title;
        var by = document.createElement('span');
        by.className = 'by';
        var au = AUTHORS[p.author] || {};
        by.innerHTML = '<b>' + au.dyn + '</b>　' + p.author;
        h.appendChild(wk); h.appendChild(h2); h.appendChild(by);
        art.appendChild(h);

        var tx = document.createElement('div');
        tx.className = 'text';
        tx.appendChild(ruby(p.lines, p.zy));
        art.appendChild(tx);

        var rows = document.createElement('div');
        rows.className = 'rows';
        rows.appendChild(row('意思', '', function (v) { v.textContent = p.plain; }));
        rows.appendChild(row('他在想', 'think', function (v) { v.textContent = p.mind; }));
        if (p.hard && p.hard.length) {
          rows.appendChild(row('難字', 'hard', function (v) {
            var box = document.createElement('div');
            box.className = 'hardlist';
            p.hard.forEach(function (h) {
              var s = document.createElement('span');
              s.innerHTML = '<b>' + h[0] + '</b><i>' + h[1] + '</i>' + h[2];
              box.appendChild(s);
            });
            v.appendChild(box);
          }));
        }
        art.appendChild(rows);

        if (p.note) {
          var n = document.createElement('p');
          n.className = 'note';
          n.textContent = p.note;
          art.appendChild(n);
        }

        var go = document.createElement('div');
        go.className = 'go';
        var url = ytUrl(p.video, p.videoStart);
        if (url) {
          var a = document.createElement('a');
          a.href = url; a.target = '_blank'; a.rel = 'noopener';
          a.textContent = '▶ 看這首的影片';
          go.appendChild(a);
        } else {
          var s = document.createElement('span');
          s.className = 'none';
          s.textContent = '老師的表上這首沒有附影片';
          go.appendChild(s);
        }
        if (au.video) {
          var b = document.createElement('a');
          b.href = ytUrl(au.video, au.videoStart);
          b.target = '_blank'; b.rel = 'noopener';
          b.textContent = '認識 ' + p.author;
          go.appendChild(b);
        }
        art.appendChild(go);

        list.appendChild(art);
      });
      $('poemCount').textContent = items.length ? ('共 ' + items.length + ' 首') : '找不到，換個關鍵字試試。';
    };
  })();

  /* ── 搜尋與朝代篩選 ── */
  (function () {
    var dyns = [];
    POEMS.forEach(function (p) {
      var d = (AUTHORS[p.author] || {}).dyn;
      if (d && dyns.indexOf(d) < 0) dyns.push(d);
    });
    var cur = '全部', kw = '';

    ['全部'].concat(dyns).forEach(function (d) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = d === '全部' ? '全部' : d + '朝';
      if (d === '全部') b.classList.add('on');
      b.addEventListener('click', function () {
        cur = d;
        [].forEach.call($('dynChips').children, function (x) { x.classList.remove('on'); });
        b.classList.add('on');
        run();
      });
      $('dynChips').appendChild(b);
    });

    $('q').addEventListener('input', function () { kw = this.value.trim(); run(); });

    function run() {
      var items = POEMS.filter(function (p) {
        if (cur !== '全部' && (AUTHORS[p.author] || {}).dyn !== cur) return false;
        if (!kw) return true;
        return (p.title + p.author + p.lines.join('') + p.plain + p.mind).indexOf(kw) >= 0;
      }).sort(function (a, b) { return a.week - b.week; });
      renderPoems(items);
    }
    run();
  })();

  /* ── 作者 ── */
  (function () {
    var box = $('authorList');
    var ov = ytUrl(OVERVIEW.video, OVERVIEW.start);
    $('ovLink').href = ov;
    $('ovLink').textContent = OVERVIEW.title + ' ↗';

    // 依照第一次出現的週次排序，跟背誦順序一致
    var order = [];
    POEMS.slice().sort(function (a, b) { return a.week - b.week; })
      .forEach(function (p) { if (order.indexOf(p.author) < 0) order.push(p.author); });

    order.forEach(function (name) {
      var a = AUTHORS[name];
      if (!a) return;
      var mine = POEMS.filter(function (p) { return p.author === name; })
        .sort(function (x, y) { return x.week - y.week; });

      var el = document.createElement('article');
      el.className = 'author';

      var h = document.createElement('h3');
      h.innerHTML = name + '<span class="yr">' + a.dyn + '　' + a.years + '</span>';
      el.appendChild(h);

      var tags = document.createElement('div');
      tags.className = 'tags';
      a.tag.forEach(function (t) {
        var s = document.createElement('span');
        s.textContent = t;
        tags.appendChild(s);
      });
      el.appendChild(tags);

      var p1 = document.createElement('p');
      p1.textContent = a.life;
      el.appendChild(p1);

      var p2 = document.createElement('p');
      p2.className = 'think';
      p2.textContent = a.mind;
      el.appendChild(p2);

      var ps = document.createElement('p');
      ps.className = 'poems';
      ps.innerHTML = '這學期要背：' + mine.map(function (m) {
        return '<b>' + m.title + '</b>（第 ' + m.week + ' 週）';
      }).join('、');
      el.appendChild(ps);

      if (a.video) {
        var v = document.createElement('p');
        v.className = 'vd';
        var link = document.createElement('a');
        link.href = ytUrl(a.video, a.videoStart);
        link.target = '_blank'; link.rel = 'noopener';
        link.textContent = '▶ 老師附的作者介紹影片';
        v.appendChild(link);
        el.appendChild(v);
      }

      box.appendChild(el);
    });
  })();
})();
