# GitHub + Render 部署完整步驟

## 步驟 1：推送到 GitHub

### 1.1 初始化 Git（如果還沒有）

```powershell
git init
git add .
git commit -m "Initial commit for Render deployment"
```

### 1.2 在 GitHub 建立新儲存庫

1. 前往 https://github.com/new
2. 填寫儲存庫名稱（例如：`whisper-app`）
3. 選擇 **Public**（公開，免費）
4. **不要**勾選 "Initialize with README"（因為我們已經有檔案）
5. 點擊 "Create repository"

### 1.3 連接並推送

GitHub 會顯示指令，執行：

```powershell
git remote add origin https://github.com/yourusername/whisper-app.git
git branch -M main
git push -u origin main
```

**注意**：將 `yourusername` 和 `whisper-app` 替換為您的實際值

---

## 步驟 2：在 Render 部署後端

### 2.1 註冊 Render

1. 前往 https://render.com
2. 點擊 "Get Started for Free"
3. 選擇 **"Sign up with GitHub"**
4. 授權 Render 存取您的 GitHub 帳號

### 2.2 建立 Web Service

1. 在 Render 儀表板，點擊 **"New +"** 按鈕
2. 選擇 **"Web Service"**
3. 選擇您的 GitHub 儲存庫

### 2.3 設定專案（重要！）

填寫以下資訊：

| 欄位 | 值 |
|------|-----|
| **Name** | `whisper-backend` |
| **Region** | 選擇最接近的位置 |
| **Branch** | `main` |
| **Root Directory** | `backend` ⚠️ **必須設定** |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | `Free` |

### 2.4 設定環境變數

在 **"Environment Variables"** 區塊：

1. 點擊 **"Add Environment Variable"**
2. 添加：
   - **Key**: `OPENAI_API_KEY`
   - **Value**: 您的 OpenAI API 金鑰

### 2.5 部署

1. 點擊 **"Create Web Service"**
2. 等待部署完成（2-5 分鐘）
3. 部署完成後，會獲得 URL，例如：
   ```
   https://whisper-backend.onrender.com
   ```

### 2.6 測試後端

在瀏覽器打開：
```
https://whisper-backend.onrender.com/health
```

應該看到：
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

---

## 步驟 3：設定前端連接後端

### 3.1 建立環境變數檔案

```powershell
cd frontend
echo "VITE_API_URL=https://whisper-backend.onrender.com" > .env.production
```

**重要**：將 `whisper-backend.onrender.com` 替換為您的實際 Render URL

### 3.2 重新建置前端

```powershell
npm run build
```

### 3.3 更新並推送到 GitHub

```powershell
cd ..
git add .
git commit -m "Add frontend environment variable"
git push
```

---

## 步驟 4：部署前端（可選）

### 選項 A：Vercel（推薦，免費）

```powershell
# 安裝 Vercel CLI
npm install -g vercel

# 部署
cd frontend
vercel
```

### 選項 B：Netlify（免費）

```powershell
# 安裝 Netlify CLI
npm install -g netlify-cli

# 部署
cd frontend
npm run build
netlify deploy --prod --dir=dist
```

---

## 快速檢查清單

### GitHub
- [ ] Git 已初始化
- [ ] 檔案已提交
- [ ] GitHub 儲存庫已建立
- [ ] 程式碼已推送到 GitHub

### Render
- [ ] Render 帳號已註冊
- [ ] Web Service 已建立
- [ ] Root Directory 設定為 `backend`
- [ ] 環境變數 `OPENAI_API_KEY` 已設定
- [ ] 部署成功
- [ ] 健康檢查可以訪問

### 前端
- [ ] `.env.production` 已建立
- [ ] `VITE_API_URL` 已設定為 Render URL
- [ ] 前端已重新建置
- [ ] 前端已部署（可選）

---

## 常見問題

### Q: Render 部署失敗？

**檢查：**
1. Root Directory 是否為 `backend`
2. Build Command 是否為 `npm install`
3. Start Command 是否為 `npm start`
4. 環境變數是否正確設定
5. 查看 Render 的 Logs 標籤

### Q: 如何查看 Render 日誌？

在 Render 專案中，點擊 **"Logs"** 標籤

### Q: Render 會休眠嗎？

是的，免費方案會在 15 分鐘無活動後休眠。首次請求需要等待幾秒喚醒。

### Q: 如何更新應用？

```powershell
# 修改程式碼後
git add .
git commit -m "Update app"
git push
```

Render 會自動重新部署（如果啟用 Auto-Deploy）

---

## 完成！

部署完成後，您就可以在任何網路環境下使用應用了！

- 後端 URL: `https://whisper-backend.onrender.com`
- 前端 URL: （根據您選擇的部署方式）
