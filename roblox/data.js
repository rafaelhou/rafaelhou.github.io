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

/* ── 遊戲清單 ──
   兩份：一份是拿來玩的，一份是玩了會學到東西的。
   數字（好評率、同時在線）是 2026-08-18 直接查 Roblox 官方 API 得到的，
   會變動；要更新的話重查一次，改這裡就好。
   id = rootPlaceId，連結格式 https://www.roblox.com/games/{id} */
const GAMES = {
  checked: '2026 年 8 月 18 日',

  fun: [
    {
      name: 'Epic Minigames', id: 277751860, by: 'Typical Games', rating: 91, players: 12,
      why: '一局兩三分鐘，隨機換一個小遊戲：躲球、跑酷、搶位子。人越多越好玩，適合跟同學約好一起進去。',
      watch: '不用花任何錢也能玩到全部的小遊戲。'
    },
    {
      name: 'Work at a Pizza Place', id: 192800, by: 'Dued1', rating: 93, players: 12,
      why: '一家披薩店，五種工作：接單、做披薩、送外送、補貨、當老闆。大家要分工，訂單才出得去。',
      watch: '2007 年就有的遊戲，到 2026 年還在更新——這種很少見。'
    },
    {
      name: 'Natural Disaster Survival', id: 189707, by: 'Stickmasterluke', rating: 91, players: 30,
      why: '一張地圖配一個天災：海嘯、龍捲風、地震、隕石。沒有武器，只有跑。五分鐘一局。',
      watch: '死掉就等下一局，不會等很久。'
    },
    {
      name: 'Tower of Hell', id: 1962086868, by: 'YXceptional Studios', rating: 74, players: 20,
      why: '隨機生成的高塔，沒有存檔點，掉下去就從第一層開始。純技巧，跟你有多少 Robux 沒有關係。',
      watch: '好評 74%，是這份清單裡最低的——很多人受不了它的難度。想練反應可以玩，容易生氣就先跳過。'
    },
    {
      name: 'Grow a Garden', id: 126884695634066, by: 'The Garden Game', rating: 90, players: 4,
      why: '種下去、等它長大、收成、再種更貴的。玩法很簡單，但它是這兩年最紅的遊戲之一，同學大概都在玩。',
      watch: '靠時間累積，不課金也追得上，只是慢一點。'
    },
    {
      name: 'Dress To Impress', id: 15101393044, by: 'Dress To Impress Group', rating: 91, players: 13,
      why: '給一個主題，限時搭出一套衣服，然後大家互相評分。比的是想法，不是手速。',
      watch: '評分是匿名的。分數低不用放在心上，下一局換主題重來。'
    },
    {
      name: 'Vehicle Legends', id: 4566572536, by: 'QuadraTech', rating: 94, players: 16,
      why: '開車、改車、比賽。好評 94%，是這兩份清單裡最高的其中一個。',
      watch: '好車要用遊戲裡賺的錢買，慢慢存就好。'
    },
    {
      name: 'Fisch', id: 16732694052, by: 'Fisching', rating: 91, players: 20,
      why: '釣魚。就是釣魚：甩竿、等、拉起來。適合不想動腦的時候。',
      watch: '更新很勤，查的那天剛好又更新了一次。'
    }
  ],

  /* 很紅，但玩之前要先講清楚的 */
  careful: [
    {
      name: 'Brookhaven RP', id: 4924922222, by: 'Voldex', rating: 86, players: 351933,
      note: '全 Roblox 同時在線最多的遊戲（查的時候有 35 萬人）。但它幾乎所有的內容都是「跟別人講話」，你會遇到完全不認識的人。真的要玩，開私人伺服器只找同學。'
    },
    {
      name: 'Adopt Me!', id: 920587237, by: 'Uplift Games', rating: 86, players: 246626,
      note: '養寵物、交換寵物。交易是它的核心，也是最容易出事的地方——有人會用假交易騙走你的稀有寵物。要換東西以前先問大人。'
    },
    {
      name: 'Murder Mystery 2', id: 142823291, by: 'Nikilis', rating: 91, players: 266246,
      note: '26 萬人在玩，卡通畫風、不血腥，但玩法就是「找出誰是兇手」。這個主題適不適合，自己跟爸媽討論一下。'
    }
  ],

  deep: [
    {
      name: 'Lua Learning', id: 1334669864, by: 'Torpedo Software', rating: 94,
      why: '它不是遊戲，是一堂課：在 Roblox 裡面直接教你寫 Luau，有講解、有練習、有測驗。手冊第 05 章那五件事，這裡面全部都有。',
      learn: 'Luau 語法 · 變數 · 迴圈 · 函式',
      watch: '同時在線只有個位數——因為它不是拿來玩的。這不代表它不好。'
    },
    {
      name: 'Theme Park Tycoon 2', id: 69184822, by: 'Den_S', rating: 89,
      why: '蓋一座遊樂園。先蓋什麼、票價多少、廁所放哪裡，都是你決定。錢不夠就是不夠——這是它最像真的地方。',
      learn: '動線規劃 · 預算控制 · 看數字調價格'
    },
    {
      name: 'Build A Boat For Treasure', id: 537413528, by: 'Chillz Studios', rating: 93,
      why: '用積木拼一艘船，然後開出去。會不會沉、會不會翻，是真的照物理算出來的，不是隨機。',
      learn: '重心 · 浮力 · 結構強度'
    },
    {
      name: 'Plane Crazy', id: 166986752, by: 'Plane Crazy Developers', rating: 80,
      why: '給你馬達、輪子、鉸鏈、按鈕，你自己把它們接起來，做出會動的機器。做飛機只是其中一種玩法。',
      learn: '機構 · 傳動 · 控制'
    },
    {
      name: 'Retail Tycoon 2', id: 5865858426, by: 'Secondhand Studios', rating: 88,
      why: '開一家店：進貨、定價、請店員、付水電。定太貴沒人買，定太便宜賺不到錢。',
      learn: '成本 · 定價 · 現金流'
    },
    {
      name: 'Lumber Tycoon 2', id: 13822889, by: 'Defaultio', rating: 88,
      why: '砍樹、把木頭運回來、切成板子、賣掉。地圖很大，光是「怎麼把東西運回去」本身就是一個難題。',
      learn: '資源鏈 · 運輸規劃'
    },
    {
      name: 'Bee Swarm Simulator', id: 1537690962, by: 'Onett', rating: 96,
      why: '養蜜蜂採蜜。看起來只是點來點去，其實底下是一個很深的數值遊戲：哪種蜜蜂配哪個裝備、先升級哪一項。好評 96%，全清單最高。',
      learn: '數值最佳化 · 先後順序'
    },
    {
      name: 'Car Crushers 2', id: 654732683, by: 'Car Crushers Community', rating: 93,
      why: '把車開進各種機器裡壓爛。聽起來很無聊，但它的破壞是真的在算物理——同一台車換個角度撞，爛法不一樣。',
      learn: '物理實驗 · 材料強度'
    },
    {
      name: 'Innovation Inc. Spaceship', id: 331811267, by: 'Festivereinhard2', rating: 91,
      why: '一艘要好幾個人一起操作的太空船：有人開船、有人顧反應爐、有人處理跑出來的東西。一個人做不完。',
      learn: '分工 · 流程 · 出事時怎麼辦'
    }
  ]
};
