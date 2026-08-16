# 侯政宏 — 個人網站

把陪孩子摸索科技、遊戲、金錢與學習的過程，整理成一個一個可以帶著走的網站。這裡是入口。

純靜態網站，無建置步驟。

## 結構

以**主題系列**組織，不是時間軸：

| 系列 | 內容 |
| --- | --- |
| Series 01 · 陪孩子玩 | [麥塊家長指南](https://minecraft-parent-guide.pages.dev)、[和八歲孩子玩 Steam](https://steam-with-kids.pages.dev)、[Roblox 學習手冊](roblox/) |
| Series 02 · 陪孩子學 | [錢會自己長大嗎？](https://kids-investing.pages.dev)、[WMI 備賽計畫](https://wmi-prep.pages.dev)、[打字小英雄](typing-hero/)、[三上詩詞](poems/) |
| Series 03 · 我的學習筆記 | [AI 素養教育工作坊課堂筆記](https://ai-literacy-notes.pages.dev) |

多數站各有自己的倉庫，另有幾個小站直接住在這個倉庫的子目錄裡，網址即 `rafaelhou.github.io/<子目錄>/`：

| 子目錄 | 內容 |
| --- | --- |
| [`poems/`](poems/) | 三上詩詞——115 學年度 23 首的背誦進度、原文注音、語譯與作者小檔案 |
| [`roblox/`](roblox/) | Roblox 學習手冊——Roblox Studio 與 Luau 入門，含進度表、名詞對照與小測驗 |
| [`typing-hero/`](typing-hero/) | 打字小英雄——英文打字練習，鍵盤會亮起下一個要按的鍵並以顏色標示手指 |
| [`idiom-3d/`](idiom-3d/) | 一毛不拔立體作品施工圖 |

## 倉庫命名

倉庫名為 `rafaelhou.github.io`，是 GitHub Pages 的**使用者頁面**特殊命名，因此網址為根目錄：

```
https://rafaelhou.github.io/
```

其餘專案站則各自位於 `rafaelhou.github.io/<repo>/`。

## 新增一個站

編輯 `index.html`，在對應的 `<section>` 內複製一張 `.card` 並修改：

```html
<a class="card XX" href="https://…" target="_blank" rel="noopener">
  <div class="thumb"><span>🔧</span></div>
  <div class="body">
    <h3>標題</h3>
    <p>兩三句說明。</p>
    <p class="meta">關鍵字 · 關鍵字 · 關鍵字</p>
  </div>
</a>
```

縮圖的漸層底色定義在 `style.css` 的 `.card.XX .thumb`，新增一組即可。

## 本機預覽

```bash
npx --yes serve rafaelhou.github.io -l 4325
```

## 部署

| 平台 | 網址 | 觸發 |
| --- | --- | --- |
| GitHub Pages | `rafaelhou.github.io` | push 到 `main` |
| Cloudflare Pages | Git 連結，輸出目錄 `/` | push 到 `main` |

## 之後可以考慮

購買自有網域（例如 `houchenghung.tw`）指向 Cloudflare Pages，五個子站也可用子網域統一，例如 `minecraft.你的網域`。Cloudflare 同時管理網域與 Pages，設定只需幾分鐘。
