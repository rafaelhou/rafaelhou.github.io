# Roblox 學習手冊

給 Aaron 的 Roblox Studio 入門手冊，下學期開始上課用。
不是教他怎麼玩，是教他怎麼**做**。

**線上瀏覽**：https://rafaelhou.github.io/roblox/

---

## 內容

| 章節 | 在講什麼 |
|---|---|
| 01 兩個 Roblox | 玩的 App 和做的 Studio 是兩件事，Studio 只能用電腦 |
| 02 開始前 | 電腦、帳號、家長設定三樣 |
| 03 五個視窗 | Viewport／Explorer／Properties／Output／▶，附一張介面示意圖 |
| 04 第一支程式 | 做一個踩到會變色的積木，五個步驟 |
| 05 Luau 五件事 | `local`、`if`、`for`、`:Connect()`、`function` |
| 06 卡住時 | 四種最常見的錯誤長什麼樣、怎麼修 |
| 07 進度表 | 五階段共 26 項，勾選存在瀏覽器裡 |
| 08 名詞對照 | 41 個 Studio 英文名詞，可搜尋、可依分類過濾 |
| 09 小測驗 | 五題讀程式碼的選擇題 |
| 給爸媽 | 2026 年的年齡驗證與家長控制（預設收合） |

---

## 設計取捨

**程式碼區塊永遠是深色的。** 整頁跟隨系統的淺色／深色主題，只有 `<pre>` 固定深色——
因為 Studio 的程式編輯器就是那個樣子，在手冊上看到的配色跟他在 Studio 裡看到的一樣。

**教「讀懂」而不是「抄對」。** 第一支程式那節，重點放在逐行解釋每一行在做什麼；
小測驗給的是程式碼片段和「這段在幹嘛」，不考語法背誦。

**空格與進度留給他自己。** 進度表存在 `localStorage`，不上傳、不需要帳號，
換一台電腦就重新開始——這是刻意的，因為這份進度是給他自己看的，不是成績。

**錯誤訊息照原文寫。** `attempt to index nil with 'Touched'` 這種字串不翻譯，
因為他在 Output 看到的就是英文原句，翻成中文反而對不上。

**安全那段寫給爸媽，而且收起來。** 小孩需要知道的只有「你的帳號會被限制，這是正常的」；
年齡驗證機制、聊天分層那些細節放在最後的 `<details>` 裡。

---

## 檔案

```
index.html   全部內容
style.css    主題變數、Studio 深色程式碼區塊
app.js       主題切換、進度表、名詞搜尋、測驗
data.js      進度表、名詞、測驗題目 —— 要改內容改這個檔就好
counter.js   Supabase 訪問計數（COUNTER_ID: roblox）
```

無建置步驟，純靜態。新增一個階段或名詞，只要編輯 `data.js` 裡的 `STAGES` / `TERMS` / `QUIZ`。

## 資料來源

- [Roblox 官方公告：聊天需通過年齡驗證](https://about.roblox.com/newsroom/2025/11/roblox-requires-age-checks-limits-minor-and-adult-chat)
- [Facial Age Estimation 說明](https://about.roblox.com/age-estimation)
- [Roblox Core curriculum](https://create.roblox.com/docs/tutorials/curriculums/core)
- [Luau 中文文件](https://create.roblox.com/docs/zh-tw/luau)
