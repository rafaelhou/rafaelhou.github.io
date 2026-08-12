/* ═══════════════════════════════════════════════════════════
   打字小英雄 — 主程式

   五個關卡的字句在 LEVELS，指法對照表在 KEYFINGER。
   每打完一個字元就重畫整行（行很短，直接重畫最單純），
   並把「下一個要按的鍵」在畫面鍵盤上點亮成該手指的顏色。
   ═══════════════════════════════════════════════════════════ */

(function(){
  "use strict";

  var LEVELS = [
    { name:"主排鍵", desc:"手指不用移動，先熟悉最重要的 8 顆鍵。",
      lines:["asdf jkl; asdf jkl;","aaa sss ddd fff","jjj kkk lll ;;;","fj fj dk dk sl sl","dad sad lad fall","ask a salad flask"] },
    { name:"認識字母", desc:"26 個字母走一遍，手指要跑上跑下。",
      lines:["abc def ghi jkl","mno pqr stu vwx","wxyz abcd efgh","the quick brown fox","jumps over the lazy dog","big jazzy vex quilt"] },
    { name:"簡單單字", desc:"你一定認識的短單字，練習一整個字打完。",
      lines:["cat dog pig cow","red blue green pink","one two three four","sun moon star sky","big small tall short","apple banana orange"] },
    { name:"學校單字", desc:"三年級課本裡會用到的單字。",
      lines:["book pencil ruler eraser","teacher student class","desk chair door window","math music art English","school bag lunch box","Monday Tuesday Friday"] },
    { name:"短句挑戰", desc:"有大寫和標點符號，要用到 Shift 鍵。",
      lines:["I like apples.","My name is Type Hero.","The cat is very cute.","I go to school by bus.","Do you like ice cream?","This is my new book."] }
  ];

  var FINGERS = {
    lp:{cn:"左手小指",  v:"--f-lp"}, lr:{cn:"左手無名指",v:"--f-lr"},
    lm:{cn:"左手中指",  v:"--f-lm"}, li:{cn:"左手食指",  v:"--f-li"},
    ri:{cn:"右手食指",  v:"--f-ri"}, rm:{cn:"右手中指",  v:"--f-rm"},
    rr:{cn:"右手無名指",v:"--f-rr"}, rp:{cn:"右手小指",  v:"--f-rp"},
    th:{cn:"大拇指",    v:"--f-th"}
  };

  var KEYFINGER = {};
  (function(){
    function g(keys, f){ keys.split(" ").forEach(function(k){ KEYFINGER[k] = f; }); }
    g("` 1 q a z", "lp");
    g("2 w s x", "lr");
    g("3 e d c", "lm");
    g("4 5 r t f g v b", "li");
    g("6 7 y u h j n m", "ri");
    g("8 i k ,", "rm");
    g("9 o l .", "rr");
    g("0 - = p [ ] ; ' /", "rp");
    KEYFINGER["\\"] = "rp";
    KEYFINGER[" "] = "th";
    KEYFINGER["shiftL"] = "lp";
    KEYFINGER["shiftR"] = "rp";
  })();

  var SHIFTED = {"!":"1","@":"2","#":"3","$":"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0",
    "_":"-","+":"=","{":"[","}":"]",":":";","\"":"'","<":",",">":".","?":"/","~":"`","|":"\\"};

  var ROWS = [
    ["`","1","2","3","4","5","6","7","8","9","0","-","="],
    ["q","w","e","r","t","y","u","i","o","p","[","]","\\"],
    ["a","s","d","f","g","h","j","k","l",";","'"],
    ["shiftL","z","x","c","v","b","n","m",",",".","/","shiftR"],
    [" "]
  ];
  var HOME = {a:1,s:1,d:1,f:1,j:1,k:1,l:1,";":1};
  var keyEls = {};

  function $(id){ return document.getElementById(id); }

  function buildKeyboard(){
    var kb = $("kb");
    kb.textContent = "";
    ROWS.forEach(function(row){
      var r = document.createElement("div");
      r.className = "kb-row";
      row.forEach(function(id){
        var el = document.createElement("div");
        el.className = "k";
        if (id === "shiftL" || id === "shiftR"){ el.classList.add("wide"); el.textContent = "Shift"; }
        else if (id === " "){ el.classList.add("space"); el.textContent = "space"; }
        else el.textContent = id;
        var f = KEYFINGER[id];
        if (f) el.style.setProperty("--fc", "var(" + FINGERS[f].v + ")");
        if (HOME[id]) el.classList.add("home");
        keyEls[id] = el;
        r.appendChild(el);
      });
      kb.appendChild(r);
    });
  }

  var lv = null, lvIndex = 0, lineIdx = 0, charIdx = 0, marks = [];
  var running = false, startAt = 0, tick = null, pending = null;
  var totalKeys = 0, goodKeys = 0, errors = 0;
  var soundOn = true, audio = null;

  function beep(freq, dur, type){
    if (!soundOn) return;
    try{
      if (!audio) audio = new (window.AudioContext || window.webkitAudioContext)();
      var o = audio.createOscillator(), g = audio.createGain();
      o.type = type || "square";
      o.frequency.value = freq;
      g.gain.setValueAtTime(0.05, audio.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + dur);
      o.connect(g); g.connect(audio.destination);
      o.start(); o.stop(audio.currentTime + dur);
    }catch(e){}
  }

  function buildMenu(){
    var list = $("levelList");
    list.textContent = "";
    LEVELS.forEach(function(L, i){
      var b = document.createElement("button");
      b.type = "button";
      b.className = "cap lv";
      var n = document.createElement("span"); n.className = "n"; n.textContent = "Level " + (i + 1);
      var t = document.createElement("span"); t.className = "t"; t.textContent = L.name;
      var d = document.createElement("span"); d.className = "d"; d.textContent = L.desc;
      var s = document.createElement("span"); s.className = "sample"; s.textContent = L.lines[0];
      b.appendChild(n); b.appendChild(t); b.appendChild(d); b.appendChild(s);
      b.addEventListener("click", function(){ start(i); });
      list.appendChild(b);
    });
  }

  function start(i){
    lvIndex = i; lv = LEVELS[i];
    lineIdx = 0; totalKeys = 0; goodKeys = 0; errors = 0;
    running = true; startAt = 0;
    if (pending){ clearTimeout(pending); pending = null; }
    $("menu").hidden = true;
    $("result").hidden = true;
    $("stage").hidden = false;
    $("stage").style.display = "flex";
    $("stage").style.flexDirection = "column";
    $("stage").style.gap = "18px";
    $("homeBtn").hidden = false;
    $("imeWarn").hidden = true;
    loadLine();
    if (tick) clearInterval(tick);
    tick = setInterval(updateStats, 100);
    updateStats();
  }

  function loadLine(){
    charIdx = 0;
    marks = [];
    for (var i = 0; i < lv.lines[lineIdx].length; i++) marks.push(0);
    renderDots();
    renderLine();
  }

  function renderDots(){
    var d = $("dots");
    d.textContent = "";
    lv.lines.forEach(function(_, i){
      var s = document.createElement("span");
      if (i < lineIdx) s.className = "done";
      else if (i === lineIdx) s.className = "now";
      d.appendChild(s);
    });
  }

  function renderLine(){
    var text = lv.lines[lineIdx];
    var p = $("line");
    p.textContent = "";
    for (var i = 0; i < text.length; i++){
      var s = document.createElement("span");
      var cls = [];
      s.textContent = text.charAt(i);
      if (text.charAt(i) === " ") cls.push("sp");
      if (i < charIdx) cls.push(marks[i] === 1 ? "ok" : "no");
      else if (i === charIdx) cls.push("cur");
      s.className = cls.join(" ");
      p.appendChild(s);
    }
    showNextKey(text.charAt(charIdx));
  }

  function showNextKey(ch){
    Object.keys(keyEls).forEach(function(k){ keyEls[k].classList.remove("next"); });
    var hint = $("hint");
    hint.textContent = "";
    if (!ch) return;

    var needShift = false, physical = ch;
    if (/[A-Z]/.test(ch)){ needShift = true; physical = ch.toLowerCase(); }
    else if (SHIFTED[ch]){ needShift = true; physical = SHIFTED[ch]; }

    var f = KEYFINGER[physical];
    if (keyEls[physical]) keyEls[physical].classList.add("next");
    if (needShift && f){
      var side = (f.charAt(0) === "l") ? "shiftR" : "shiftL";
      if (keyEls[side]) keyEls[side].classList.add("next");
    }
    if (!f) return;

    var chip = document.createElement("span");
    chip.className = "finger";
    chip.style.background = "var(" + FINGERS[f].v + ")";
    chip.textContent = FINGERS[f].cn;
    hint.appendChild(document.createTextNode("用 "));
    hint.appendChild(chip);
    hint.appendChild(document.createTextNode(" 按 "));
    var k = document.createElement("kbd");
    k.textContent = (ch === " ") ? "空白鍵" : ch;
    hint.appendChild(k);
    if (needShift){
      hint.appendChild(document.createTextNode(" ，另一手壓著 "));
      var sk = document.createElement("kbd");
      sk.textContent = "Shift";
      hint.appendChild(sk);
    }
  }

  function nextLineOrFinish(delay){
    renderLine();   // 先讓打完的這一句整句亮起來，停一下再換下一句
    if (lineIdx < lv.lines.length - 1){
      pending = setTimeout(function(){ pending = null; lineIdx++; loadLine(); }, delay);
    } else {
      pending = setTimeout(function(){ pending = null; finish(); }, delay);
    }
  }

  function typeChar(ch){
    var text = lv.lines[lineIdx];
    if (charIdx >= text.length) return;
    if (!startAt) startAt = Date.now();
    totalKeys++;

    if (ch === text.charAt(charIdx)){
      marks[charIdx] = 1; goodKeys++;
      beep(880, 0.05);
    } else {
      marks[charIdx] = 2; errors++;
      beep(160, 0.14, "sawtooth");
      var p = $("line");
      p.classList.remove("shake");
      void p.offsetWidth;
      p.classList.add("shake");
    }
    charIdx++;

    if (charIdx >= text.length){
      if (lineIdx < lv.lines.length - 1) beep(1320, 0.12, "triangle");
      nextLineOrFinish(260);
      return;
    }
    renderLine();
  }

  function backspace(){
    if (charIdx <= 0) return;
    // 整行打完後有一小段停頓才換行；在那之內按退格是要改最後一個字，
    // 就把換行取消掉，不然改完還是被換走。
    if (pending){ clearTimeout(pending); pending = null; }
    charIdx--;
    if (marks[charIdx] === 1) goodKeys--;
    if (marks[charIdx] === 2) errors--;
    if (totalKeys > 0) totalKeys--;
    marks[charIdx] = 0;
    renderLine();
  }

  document.addEventListener("keydown", function(e){
    if (!running) return;
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    if (e.key === "Backspace"){ e.preventDefault(); backspace(); return; }
    if (e.key === "Process" || e.key === "Unidentified"){ $("imeWarn").hidden = false; return; }
    if (e.key.length !== 1) return;
    if (e.key.charCodeAt(0) > 255){ $("imeWarn").hidden = false; return; }
    e.preventDefault();
    $("imeWarn").hidden = true;
    typeChar(e.key);
  });

  function elapsed(){ return startAt ? (Date.now() - startAt) / 1000 : 0; }
  function wpm(){ var m = elapsed() / 60; return m > 0 ? Math.round((goodKeys / 5) / m) : 0; }
  function acc(){ return totalKeys ? Math.round(goodKeys / totalKeys * 100) : 100; }

  function updateStats(){
    $("sWpm").textContent = wpm();
    $("sAcc").textContent = acc() + "%";
    $("sTime").textContent = elapsed().toFixed(1) + "s";
    $("sErr").textContent = errors;
  }

  function finish(){
    running = false;
    if (tick) clearInterval(tick);
    var a = acc(), w = wpm(), t = elapsed();
    var stars = 1;
    if (a >= 90 && w >= 12) stars = 2;
    if (a >= 96 && w >= 20) stars = 3;

    $("stage").hidden = true;
    $("result").hidden = false;
    $("homeBtn").hidden = false;

    var full = "", empty = "";
    for (var i = 0; i < stars; i++) full += "⭐";
    for (var j = 0; j < 3 - stars; j++) empty += "☆";
    $("rStars").textContent = full + empty;
    $("rWpm").textContent = w;
    $("rAcc").textContent = a + "%";
    $("rTime").textContent = t.toFixed(1) + "s";

    var msg;
    if (stars === 3){ $("rTitle").textContent = "太厲害了！"; msg = "又快又準，你已經很會打字了，可以挑戰下一關囉。"; }
    else if (stars === 2){ $("rTitle").textContent = "很不錯喔！"; msg = "已經抓到感覺了，再練幾次速度還會更快。"; }
    else { $("rTitle").textContent = "完成了！"; msg = "第一次都是這樣的，慢慢打、打對最重要，速度會自己變快。"; }
    if (a < 85) msg += "（小提示：先求正確，不要急著求快。）";
    $("rMsg").textContent = msg;

    beep(660, 0.1);
    setTimeout(function(){ beep(880, 0.1); }, 130);
    setTimeout(function(){ beep(1100, 0.22, "triangle"); }, 260);
  }

  function toMenu(){
    running = false;
    if (tick) clearInterval(tick);
    if (pending){ clearTimeout(pending); pending = null; }   // 停頓中離開，不要事後才跳出成績
    $("stage").hidden = true;
    $("result").hidden = true;
    $("menu").hidden = false;
    $("homeBtn").hidden = true;
  }

  $("homeBtn").addEventListener("click", toMenu);
  $("backBtn").addEventListener("click", toMenu);
  $("againBtn").addEventListener("click", function(){ start(lvIndex); });
  $("soundBtn").addEventListener("click", function(){
    soundOn = !soundOn;
    this.textContent = soundOn ? "🔊 音效開" : "🔇 音效關";
  });

  buildKeyboard();
  buildMenu();
})();
