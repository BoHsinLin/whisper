# Render 部署指南

## 前置準備

### 1. 確保專案已推送到 GitHub

如果還沒有，請執行：

```bash
# 初始化 Git（如果還沒有）
git init

# 添加所有檔案
git add .

# 提交
git commit -m "Initial commit for Render deployment"

# 在 GitHub 建立新儲存庫，然後：
git remote add origin https://github.com/yourusername/your-repo-name.git
git branch -M main
git push -u origin main
```

---

## Render 部署步驟

### 步驟 1：註冊 Render

1. 前往 https://render.com
2. 點擊 "Get Started for Free"
3. 選擇 "Sign up with GitHub"
4. 授權 Render 存取您的 GitHub 帳號

### 步驟 2：建立 Web Service

1. 在 Render 儀表板中，點擊 **"New +"** 按鈕
2. 選擇 **"Web Service"**
3. 選擇 **"Connect account"** 或直接選擇您的 GitHub 儲存庫

### 步驟 3：設定專案

#### 3.1 基本設定

填寫以下資訊：

- **Name**: `whisper-backend`（或您喜歡的名稱）
- **Region**: 選擇最接近您的位置（例如：Singapore）
- **Branch**: `main`（或您的主要分支）
- **Root Directory**: `backend` ⚠️ **重要：必須設定為 `backend`**
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

#### 3.2 環境變數設定

在 **"Environment Variables"** 區塊，點擊 **"Add Environment Variable"**，添加：

```
OPENAI_API_KEY = your_openai_api_key_here
```

**重要**：將 `your_openai_api_key_here` 替換為您的實際 OpenAI API 金鑰

#### 3.3 進階設定（可選）

- **Auto-Deploy**: 保持啟用（推送到 GitHub 自動部署）
- **Plan**: 選擇 **"Free"**（免費方案）

### 步驟 4：部署

1. 點擊 **"Create Web Service"**
2. Render 會開始部署，您可以看到部署日誌
3. 等待部署完成（通常需要 2-5 分鐘）

### 步驟 5：取得部署 URL

部署完成後，Render 會提供一個 URL，例如：
```
https://whisper-backend.onrender.com
```

**注意**：免費方案會休眠（15 分鐘無活動後），首次請求可能需要等待幾秒喚醒。

---

## 測試後端

### 方法 1：使用瀏覽器

在瀏覽器中打開：
```
https://whisper-backend.onrender.com/health
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
curl https://whisper-backend.onrender.com/health
```

---

## 設定前端連接後端

### 步驟 1：建立環境變數檔案

在 `frontend` 目錄建立 `.env.production`：

```bash
cd frontend
echo "VITE_API_URL=https://whisper-backend.onrender.com" > .env.production
```

**重要**：將 `whisper-backend.onrender.com` 替換為您的實際 Render URL

### 步驟 2：重新建置前端

```bash
cd frontend
npm run build
```

### 步驟 3：部署前端（可選）

您可以：
- 使用 Vercel 部署前端（推薦，免費）
- 使用 Netlify 部署前端（免費）
- 使用 GitHub Pages 部署前端（免費）

---

## Render 設定檢查清單

- [ ] GitHub 儲存庫已建立並推送
- [ ] Render 帳號已註冊
- [ ] Web Service 已建立
- [ ] Root Directory 設定為 `backend`
- [ ] Build Command 設定為 `npm install`
- [ ] Start Command 設定為 `npm start`
- [ ] 環境變數 `OPENAI_API_KEY` 已設定
- [ ] 部署成功，獲得 URL
- [ ] 健康檢查端點可以訪問
- [ ] 前端環境變數已設定

---

## 常見問題

### Q: Render 顯示部署失敗？

**A: 檢查以下項目：**
1. Root Directory 是否設定為 `backend`
2. `package.json` 中的 `start` 腳本是否正確
3. 環境變數是否正確設定
4. 查看 Render 的 Logs 標籤查看錯誤訊息

### Q: 如何查看應用日誌？

**A:**
1. 在 Render 專案中，點擊 **"Logs"** 標籤
2. 可以看到即時日誌和部署日誌

### Q: 如何更新應用？

**A:**
1. 修改程式碼
2. 推送到 GitHub：
   ```bash
   git add .
   git commit -m "Update app"
   git push
   ```
3. Render 會自動偵測變更並重新部署（如果啟用 Auto-Deploy）

### Q: Render 免費方案會休眠嗎？

**A:**
- 是的，免費方案會在 15 分鐘無活動後休眠
- 首次請求需要等待幾秒喚醒服務
- 如果不想休眠，可以升級到付費方案

### Q: 如何防止休眠？

**A:**
1. 使用外部服務定期 ping 您的 URL（例如：UptimeRobot）
2. 升級到付費方案
3. 或使用 Railway（免費方案不會休眠）

### Q: 如何設定自訂網域？

**A:**
1. 在 Render 專案中，點擊 **"Settings"**
2. 找到 **"Custom Domains"** 區塊
3. 點擊 **"Add Custom Domain"**
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
git commit -m "Deploy to Render"
git push

# 查看 Render 日誌（需要 Render CLI）
render logs
```

---

## Render CLI（可選）

如果您想使用命令列管理 Render：

```bash
# 安裝 Render CLI
npm install -g render-cli

# 登入
render login

# 查看服務
render services list

# 查看日誌
render logs <service-id>
```

---

## 與 Railway 比較

| 特性 | Render | Railway |
|------|--------|---------|
| 免費方案 | ✅ 有 | ✅ 有（$5 額度） |
| 休眠 | ⚠️ 會休眠 | ✅ 不休眠 |
| 部署速度 | 中等 | 快速 |
| 設定複雜度 | 簡單 | 簡單 |

**建議**：如果預算允許，Railway 更好（不休眠）。如果完全免費，Render 也不錯。

---

完成後，您的後端就會在網際網路上運行，可以在任何網路環境下使用！
