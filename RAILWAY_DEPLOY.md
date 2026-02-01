# Railway 部署指南

## 前置準備

### 1. 確保專案已推送到 GitHub

如果還沒有，請執行：

```bash
# 初始化 Git（如果還沒有）
git init

# 添加所有檔案
git add .

# 提交
git commit -m "Initial commit for Railway deployment"

# 在 GitHub 建立新儲存庫，然後：
git remote add origin https://github.com/yourusername/your-repo-name.git
git branch -M main
git push -u origin main
```

---

## Railway 部署步驟

### 步驟 1：註冊 Railway

1. 前往 https://railway.app
2. 點擊 "Start a New Project"
3. 選擇 "Login with GitHub"
4. 授權 Railway 存取您的 GitHub 帳號

### 步驟 2：建立新專案

1. 在 Railway 儀表板中，點擊 **"New Project"**
2. 選擇 **"Deploy from GitHub repo"**
3. 選擇您的專案儲存庫
4. Railway 會自動偵測並開始部署

### 步驟 3：設定專案

#### 3.1 設定根目錄

1. 在專案設定中，找到 **"Settings"** 標籤
2. 找到 **"Root Directory"** 設定
3. 設定為：`backend`
4. 這樣 Railway 就知道要部署 `backend` 目錄

#### 3.2 設定環境變數

1. 在專案中，點擊 **"Variables"** 標籤
2. 添加以下環境變數：

```
OPENAI_API_KEY=your_openai_api_key_here
```

**重要**：將 `your_openai_api_key_here` 替換為您的實際 OpenAI API 金鑰

#### 3.3 設定端口（可選）

Railway 會自動設定 `PORT` 環境變數，通常不需要手動設定。

### 步驟 4：等待部署

1. Railway 會自動：
   - 安裝依賴（`npm install`）
   - 執行建置（如果有 `build` 腳本）
   - 啟動應用（`npm start`）

2. 在 **"Deployments"** 標籤中可以看到部署進度

3. 部署完成後，在 **"Settings"** → **"Domains"** 可以看到您的應用 URL

### 步驟 5：取得部署 URL

1. 部署完成後，Railway 會提供一個 URL，例如：
   ```
   https://your-app-name.up.railway.app
   ```

2. 複製這個 URL，稍後會用到

---

## 測試後端

### 方法 1：使用瀏覽器

在瀏覽器中打開：
```
https://your-app-name.up.railway.app/health
```

應該會看到：
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

### 方法 2：使用 curl

```bash
curl https://your-app-name.up.railway.app/health
```

---

## 設定前端連接後端

### 步驟 1：建立環境變數檔案

在 `frontend` 目錄建立 `.env.production`：

```bash
cd frontend
echo "VITE_API_URL=https://your-app-name.up.railway.app" > .env.production
```

**重要**：將 `your-app-name.up.railway.app` 替換為您的實際 Railway URL

### 步驟 2：重新建置前端

```bash
cd frontend
npm run build
```

### 步驟 3：部署前端（可選）

您可以：
- 使用 Vercel 部署前端（推薦）
- 使用 Netlify 部署前端
- 或使用其他靜態網站託管服務

---

## Railway 設定檢查清單

- [ ] GitHub 儲存庫已建立並推送
- [ ] Railway 帳號已註冊
- [ ] 專案已連接到 GitHub 儲存庫
- [ ] Root Directory 設定為 `backend`
- [ ] 環境變數 `OPENAI_API_KEY` 已設定
- [ ] 部署成功，獲得 URL
- [ ] 健康檢查端點可以訪問
- [ ] 前端環境變數已設定

---

## 常見問題

### Q: Railway 顯示部署失敗？

**A: 檢查以下項目：**
1. Root Directory 是否設定為 `backend`
2. `package.json` 中的 `start` 腳本是否正確
3. 環境變數是否正確設定
4. 查看 Railway 的 Logs 標籤查看錯誤訊息

### Q: 如何查看應用日誌？

**A:**
1. 在 Railway 專案中，點擊 **"Deployments"**
2. 選擇最新的部署
3. 點擊 **"View Logs"** 查看即時日誌

### Q: 如何更新應用？

**A:**
1. 修改程式碼
2. 推送到 GitHub：
   ```bash
   git add .
   git commit -m "Update app"
   git push
   ```
3. Railway 會自動偵測變更並重新部署

### Q: Railway 免費方案有限制嗎？

**A:**
- 免費方案每月有 $5 的額度
- 對於小型應用通常足夠
- 如果超過額度，需要升級到付費方案

### Q: 如何設定自訂網域？

**A:**
1. 在 Railway 專案中，點擊 **"Settings"**
2. 找到 **"Domains"** 區塊
3. 點擊 **"Generate Domain"** 或 **"Custom Domain"**
4. 按照提示設定 DNS

---

## 下一步

部署完成後：

1. **測試後端 API**
   - 使用健康檢查端點確認後端正常運行

2. **部署前端**
   - 使用 Vercel 或其他服務部署前端
   - 設定 `VITE_API_URL` 環境變數

3. **在手機上測試**
   - 打開前端 URL
   - 測試錄音和翻譯功能

---

## 快速指令參考

```bash
# 檢查 Git 狀態
git status

# 推送到 GitHub
git add .
git commit -m "Deploy to Railway"
git push

# 查看 Railway 日誌（需要 Railway CLI）
railway logs

# 設定環境變數（需要 Railway CLI）
railway variables set OPENAI_API_KEY=your_key
```

---

## Railway CLI（可選）

如果您想使用命令列管理 Railway：

```bash
# 安裝 Railway CLI
npm install -g @railway/cli

# 登入
railway login

# 連結專案
railway link

# 部署
railway up

# 查看日誌
railway logs

# 設定環境變數
railway variables set OPENAI_API_KEY=your_key
```

---

完成後，您的後端就會在網際網路上運行，可以在任何網路環境下使用！
