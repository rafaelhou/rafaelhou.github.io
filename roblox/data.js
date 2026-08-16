/* ═══════════════════════════════════════════════════════════
   Roblox 學習手冊 — 資料
   進度表、名詞對照、程式碼小測驗都放這裡，改這個檔就能改內容。
   ═══════════════════════════════════════════════════════════ */

/* ── 進度表：五個階段 ──
   每個階段是一疊要打勾的事情。勾了會存在這台電腦裡（localStorage）。 */
const STAGES = [
  {
    n: 1,
    title: '把工具裝好',
    goal: '打開 Studio，看到一片綠色的地板。',
    items: [
      '在電腦上安裝 Roblox Studio（Windows 或 Mac，平板不行）',
      '用自己的帳號登入 Studio',
      '開一個 Baseplate（空白地板）新專案',
      '學會轉視角：滑鼠右鍵拖曳＝轉頭，W A S D＝走動，滾輪＝遠近',
      '把檔案存起來，再重新打開一次'
    ]
  },
  {
    n: 2,
    title: '先蓋東西，還不用寫程式',
    goal: '做出一條可以走的路。',
    items: [
      '插入一個 Part（積木），把它拉大拉小',
      '認識五個視窗：Explorer、Properties、Toolbox、Output、Viewport',
      '把 Anchored 打勾 —— 沒打勾的積木會掉下去',
      '改 BrickColor 換顏色、改 Material 換材質',
      '複製貼上一排積木，排成一條路',
      '把它們選起來 Group 成一個 Model，取一個名字'
    ]
  },
  {
    n: 3,
    title: '第一支程式',
    goal: '讓一個積木聽你的話。',
    items: [
      '在 Part 裡面加一個 Script',
      '寫 print("Hello") 並按 ▶ Play，在 Output 看到它',
      '用程式改積木顏色（不用手動改 Properties）',
      '寫一個 Touched 事件：有人踩到就印字',
      '故意打錯一個字，看 Output 的紅字長什麼樣'
    ]
  },
  {
    n: 4,
    title: '做一個闖關遊戲 Obby',
    goal: '一個真的可以破關的遊戲。',
    items: [
      '放一個 SpawnLocation 當起點',
      '做一片踩到就消失的踏板',
      '做一個碰到就重來的陷阱（紅色的那種）',
      '在終點放一個碰到就顯示「你贏了」的積木',
      '調整難度：讓它難，但不要難到自己破不了關'
    ]
  },
  {
    n: 5,
    title: '發布出去',
    goal: '讓別人可以玩到你做的東西。',
    items: [
      '把遊戲 Publish 到 Roblox',
      '把隱私設成只有自己或朋友看得到',
      '請爸爸媽媽玩一次，看他們卡在哪裡',
      '照他們卡住的地方改一次',
      '把你做的第一個遊戲名字寫下來，記得這一天'
    ]
  }
];

/* ── 名詞對照 ──
   Studio 全部是英文，這張表是給他查的。cat 用來分類過濾。 */
const TERMS = [
  { en: 'Studio',        zh: '工作室',       cat: '介面', desc: '做遊戲的軟體。玩遊戲用 Roblox，做遊戲用 Roblox Studio。' },
  { en: 'Explorer',      zh: '總管',         cat: '介面', desc: '右上角那張清單，你放進遊戲的每一樣東西都在裡面。' },
  { en: 'Properties',    zh: '屬性',         cat: '介面', desc: 'Explorer 下面那張表，選到什麼就顯示它的顏色、大小、位置。' },
  { en: 'Workspace',     zh: '場景',         cat: '介面', desc: '玩家看得到的世界。積木要放在這裡面才看得到。' },
  { en: 'Toolbox',       zh: '工具箱',       cat: '介面', desc: '別人做好的模型倉庫，可以直接拿來用。' },
  { en: 'Output',        zh: '輸出視窗',     cat: '介面', desc: '程式講話的地方。print 印出來的字、程式壞掉的紅字都在這。' },
  { en: 'Viewport',      zh: '畫面',         cat: '介面', desc: '中間那個 3D 畫面，你在這裡蓋東西。' },
  { en: 'Baseplate',     zh: '地板',         cat: '介面', desc: '新專案預設的那片灰綠色地板。' },

  { en: 'Part',          zh: '積木',         cat: '東西', desc: '最基本的一塊方塊。整個遊戲都是這個堆出來的。' },
  { en: 'Model',         zh: '模型',         cat: '東西', desc: '把好幾個 Part 綁成一組，可以一起搬。' },
  { en: 'MeshPart',      zh: '網格模型',     cat: '東西', desc: '形狀比較複雜的東西，例如一把劍、一棵樹。' },
  { en: 'Terrain',       zh: '地形',         cat: '東西', desc: '山、水、草地。用地形筆刷畫出來的，不是積木。' },
  { en: 'SpawnLocation', zh: '出生點',       cat: '東西', desc: '玩家一進遊戲會站的地方。' },
  { en: 'Humanoid',      zh: '人形',         cat: '東西', desc: '藏在角色裡面，管血量、走路速度、跳多高。' },
  { en: 'Player',        zh: '玩家',         cat: '東西', desc: '正在玩的人。跟角色（Character）是兩件事。' },
  { en: 'Script',        zh: '腳本',         cat: '東西', desc: '寫程式的地方。放在伺服器上跑，大家看到的結果一樣。' },
  { en: 'LocalScript',   zh: '本機腳本',     cat: '東西', desc: '只在一個玩家的電腦上跑。畫面、按鍵這種只跟自己有關的用它。' },

  { en: 'Anchored',      zh: '固定',         cat: '屬性', desc: '打勾＝釘在空中不會掉。忘記打勾是新手第一名錯誤。' },
  { en: 'CanCollide',    zh: '可碰撞',       cat: '屬性', desc: '打勾＝會擋住人。取消＝可以穿過去。' },
  { en: 'BrickColor',    zh: '顏色',         cat: '屬性', desc: '積木的顏色，用名字選，例如 "Bright red"。' },
  { en: 'Material',      zh: '材質',         cat: '屬性', desc: '看起來像木頭、金屬、冰塊還是霓虹燈。' },
  { en: 'Transparency',  zh: '透明度',       cat: '屬性', desc: '0＝完全看得到，1＝完全隱形。' },
  { en: 'Size',          zh: '大小',         cat: '屬性', desc: '積木的長寬高。' },
  { en: 'Position',      zh: '位置',         cat: '屬性', desc: '積木在世界的哪裡，用 X、Y、Z 三個數字。' },
  { en: 'Name',          zh: '名字',         cat: '屬性', desc: '每樣東西的名字。程式要靠名字找到它，所以不要都叫 Part。' },

  { en: 'local',         zh: '區域變數',     cat: '程式', desc: '取一個名字放東西。local part = ... 之後就用 part 這個名字叫它。' },
  { en: 'function',      zh: '函式',         cat: '程式', desc: '一包事情取一個名字，之後可以叫很多次。' },
  { en: 'if / then',     zh: '如果',         cat: '程式', desc: '如果條件成立才做。' },
  { en: 'for',           zh: '數著做',       cat: '程式', desc: '重複固定次數，例如做 10 次。' },
  { en: 'while',         zh: '一直做',       cat: '程式', desc: '條件成立就一直重複，要小心不要停不下來。' },
  { en: 'print()',       zh: '印出來',       cat: '程式', desc: '把訊息印到 Output。檢查程式有沒有跑到這一行最好用。' },
  { en: 'task.wait()',   zh: '等一下',       cat: '程式', desc: 'task.wait(1) 就是等一秒。（舊教學寫 wait()，現在用 task.wait()）' },
  { en: 'Touched',       zh: '被碰到',       cat: '程式', desc: '有東西碰到這個積木時會發生的事件。' },
  { en: ':Connect()',    zh: '接上去',       cat: '程式', desc: '把「事件」跟「要做的事」接起來。' },
  { en: 'script.Parent', zh: '我住的地方',   cat: '程式', desc: '這個腳本被放在誰裡面。放在 Part 裡，它就是那個 Part。' },
  { en: 'Instance.new()',zh: '生一個新的',   cat: '程式', desc: '用程式憑空生出一個新東西。' },
  { en: 'nil',           zh: '沒有東西',     cat: '程式', desc: '空的。程式說 nil 通常代表它找不到你要的東西。' },
  { en: 'Luau',          zh: 'Luau 語言',    cat: '程式', desc: 'Roblox 用的程式語言，從 Lua 改來的。' },

  { en: 'Publish',       zh: '發布',         cat: '發布', desc: '把做好的遊戲送上 Roblox，別人才玩得到。' },
  { en: 'Playtest',      zh: '試玩',         cat: '發布', desc: '按 ▶ 在 Studio 裡自己先玩玩看。' },
  { en: 'Robux',         zh: 'Robux',        cat: '發布', desc: 'Roblox 的錢。買東西前一定要先問爸媽。' }
];

/* ── 小測驗：讀程式碼，不是背語法 ── */
const QUIZ = [
  {
    code: 'local part = script.Parent\npart.BrickColor = BrickColor.new("Bright red")',
    q: '這段程式在做什麼？',
    opts: ['把腳本住的那個積木變成紅色', '生出一個新的紅色積木', '把整個地板變紅色'],
    a: 0,
    why: 'script.Parent 是「這個腳本住在誰裡面」。腳本放在積木裡，它就是那個積木。'
  },
  {
    code: 'local part = script.Parent\n\npart.Touched:Connect(function(hit)\n  print("有人踩到我了")\nend)',
    q: '什麼時候會印出「有人踩到我了」？',
    opts: ['遊戲一開始就印', '有東西碰到這個積木的時候', '每一秒印一次'],
    a: 1,
    why: 'Touched 是事件，:Connect() 把它跟要做的事接起來。沒人碰就不會發生。'
  },
  {
    code: 'for i = 1, 3 do\n  print("第 " .. i .. " 次")\n  task.wait(1)\nend',
    q: 'Output 會出現幾行字？',
    opts: ['1 行', '3 行', '一直印不停'],
    a: 1,
    why: 'for i = 1, 3 是從 1 數到 3，所以跑三次。每次中間等一秒。'
  },
  {
    code: 'local part = script.Parent\npart.Anchored = false',
    q: '按下 ▶ 之後會發生什麼事？',
    opts: ['積木停在原地', '積木掉下去', '積木變透明'],
    a: 1,
    why: 'Anchored 是「釘住」。設成 false 就是沒釘住，重力會把它拉下去。'
  },
  {
    code: 'if hit.Parent:FindFirstChild("Humanoid") then\n  print("這是一個人")\nend',
    q: '為什麼要先找 Humanoid？',
    opts: ['因為 Humanoid 比較快', '為了確認碰到的是角色，不是別的積木', '因為程式規定一定要寫'],
    a: 1,
    why: '任何東西掉下來都會觸發 Touched。找得到 Humanoid，才確定碰到的是一個玩家角色。'
  }
];
