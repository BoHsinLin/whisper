# 完全免費部署方案

## 費用說明

### ✅ 完全免費的服務

1. **GitHub 儲存庫** - 免費（公開儲存庫）
2. **GitHub Pages** - 免費（只支援靜態網站，適合前端）
3. **Vercel** - 免費（前端部署）
4. **Netlify** - 免費（前端部署）
5. **Render** - 免費（後端部署，但有休眠限制）
6. **Railway** - 免費方案（每月 $5 額度，通常足夠）

---

## 方案一：完全免費（推薦）

### 前端：GitHub Pages（免費）

**優點：**
- ✅ 完全免費
- ✅ 自動 HTTPS
- ✅ 自動部署（推送到 GitHub 自動更新）

**限制：**
- ⚠️ 只支援靜態網站（適合 React 建置後的檔案）
- ⚠️ 需要公開儲存庫（或使用 GitHub Pro）

### 後端：Render（免費）

**優點：**
- ✅ 完全免費
- ✅ 自動 HTTPS
- ✅ 支援 Node.js

**限制：**
- ⚠️ 免費方案會休眠（15 分鐘無活動後）
- ⚠️ 首次請求可能較慢（喚醒需要時間）

---

## 方案二：幾乎免費（推薦）

### 前端：Vercel（免費）

**優點：**
- ✅ 完全免費
- ✅ 不會休眠
- ✅ 全球 CDN
- ✅ 自動部署

### 後端：Railway（免費方案）

**優點：**
- ✅ 每月 $5 免費額度（通常足夠）
- ✅ 不會休眠
- ✅ 部署簡單

**注意：**
- 如果超過 $5 額度，需要升級（但小型應用通常不會超過）

---

## 詳細部署步驟

### 方案 A：GitHub Pages + Render（完全免費）

#### 1. 前端部署到 GitHub Pages

**步驟 1：建置前端**
```bash
cd frontend
npm run build
```

**步驟 2：設定 GitHub Pages**

在 GitHub 儲存庫設定中：
1. 前往 Settings → Pages
2. Source: 選擇 "GitHub Actions"
3. 建立 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: |
          cd frontend
          npm install
          
      - name: Build
        run: |
          cd frontend
          npm run build
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}
          
      - name: Setup Pages
        uses: actions/configure-pages@v2
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v1
        with:
          path: './frontend/dist'
          
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v1
```

**步驟 3：設定環境變數**

在 GitHub 儲存庫：
1. Settings → Secrets and variables → Actions
2. 添加 Secret：`VITE_API_URL` = 您的後端 URL

**步驟 4：推送程式碼**

```bash
git add .
git commit -m "Setup GitHub Pages"
git push
```

GitHub Actions 會自動部署，完成後可以在 `https://yourusername.github.io/your-repo-name` 訪問。

---

#### 2. 後端部署到 Render（免費）

**步驟 1：前往 Render**
- https://render.com
- 使用 GitHub 登入

**步驟 2：建立 Web Service**
1. 點擊 "New +" → "Web Service"
2. 連接 GitHub 儲存庫
3. 設定：
   - **Name**: whisper-backend
   - **Root Directory**: backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

**步驟 3：設定環境變數**
- `OPENAI_API_KEY`: 您的 OpenAI API 金鑰

**步驟 4：部署**
- Render 會自動部署
- 獲得 URL：`https://whisper-backend.onrender.com`

**注意**：免費方案會休眠，首次請求可能需要等待幾秒。

---

### 方案 B：Vercel + Railway（推薦，更穩定）

#### 1. 前端部署到 Vercel（免費）

```bash
# 安裝 Vercel CLI
npm install -g vercel

# 部署
cd frontend
vercel
```

完全免費，不會休眠。

#### 2. 後端部署到 Railway（免費方案）

按照 `RAILWAY_DEPLOY.md` 的步驟。

---

## 費用比較表

| 服務 | 費用 | 限制 |
|------|------|------|
| GitHub 儲存庫 | 免費 | 公開儲存庫免費 |
| GitHub Pages | 免費 | 只支援靜態網站 |
| Vercel | 免費 | 個人專案免費 |
| Netlify | 免費 | 個人專案免費 |
| Render | 免費 | 會休眠 |
| Railway | 免費方案 | 每月 $5 額度 |

---

## 推薦組合

### 最佳免費組合（推薦）

1. **前端**：Vercel（免費，不休眠）
2. **後端**：Railway（免費方案，不休眠）

**總費用：$0**（如果使用量在 Railway 免費額度內）

### 完全免費組合

1. **前端**：GitHub Pages（免費）
2. **後端**：Render（免費，會休眠）

**總費用：$0**

---

## 總結

✅ **GitHub 儲存庫本身是免費的**

✅ **前端可以免費部署到：**
- GitHub Pages（免費）
- Vercel（免費）
- Netlify（免費）

✅ **後端可以免費部署到：**
- Render（免費，會休眠）
- Railway（免費方案，每月 $5 額度）

**結論：可以完全免費部署！** 🎉

建議使用 **Vercel（前端）+ Railway（後端）**，因為：
- 都不會休眠
- 部署簡單
- Railway 的免費額度通常足夠小型應用使用
