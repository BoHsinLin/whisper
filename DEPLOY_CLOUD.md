# 雲端部署指南 - 不同網路也能使用

本指南說明如何將應用部署到雲端，讓您可以在任何網路環境下使用。

## 架構說明

```
手機（任何網路）
    ↓
前端（Vercel/Netlify）
    ↓
後端（Railway/Render）
    ↓
OpenAI API
```

---

## 步驟一：部署後端到雲端

### 選項 A：Railway（推薦，最簡單）🚂

#### 1. 註冊 Railway
- 前往 https://railway.app
- 使用 GitHub 登入（免費）

#### 2. 建立新專案
1. 點擊 "New Project"
2. 選擇 "Deploy from GitHub repo"
3. 選擇您的專案（或先推送到 GitHub）

#### 3. 設定專案
1. 選擇 `backend` 目錄作為根目錄
2. Railway 會自動偵測 Node.js

#### 4. 設定環境變數
在 Railway 專案設定中添加：
```
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
NODE_ENV=production
```

#### 5. 部署
Railway 會自動部署，完成後會提供一個 URL，例如：
```
https://your-app.railway.app
```

#### 6. 更新 CORS 設定
確保後端允許前端網域的請求（見下方）

---

### 選項 B：Render（免費方案）☁️

#### 1. 註冊 Render
- 前往 https://render.com
- 使用 GitHub 登入

#### 2. 建立 Web Service
1. 點擊 "New +" → "Web Service"
2. 連接您的 GitHub 儲存庫
3. 設定：
   - **Name**: whisper-backend
   - **Root Directory**: backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

#### 3. 設定環境變數
在 Environment Variables 中添加：
```
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
```

#### 4. 部署
Render 會自動部署，提供 URL：
```
https://whisper-backend.onrender.com
```

---

### 選項 C：Heroku（需要信用卡，但免費）🟣

#### 1. 安裝 Heroku CLI
```bash
# Windows
# 下載安裝程式：https://devcenter.heroku.com/articles/heroku-cli

# 或使用 npm
npm install -g heroku
```

#### 2. 登入
```bash
heroku login
```

#### 3. 建立應用
```bash
cd backend
heroku create whisper-backend
```

#### 4. 設定環境變數
```bash
heroku config:set OPENAI_API_KEY=your_openai_api_key_here
```

#### 5. 部署
```bash
git init  # 如果還沒有
git add .
git commit -m "Initial commit"
git push heroku main
```

---

## 步驟二：更新後端 CORS 設定

後端需要允許前端網域的請求。更新 `backend/src/server.js`：

```javascript
import cors from 'cors';

// 允許的來源（根據您的前端網域調整）
const allowedOrigins = [
  'http://localhost:5000',
  'http://localhost:5173',
  'https://your-frontend.vercel.app',
  'https://your-frontend.netlify.app',
  // 添加其他前端網域
];

app.use(cors({
  origin: function (origin, callback) {
    // 允許沒有 origin 的請求（例如移動應用）
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

或者更簡單的方式（允許所有來源，適合開發）：
```javascript
app.use(cors({
  origin: '*',  // 生產環境建議限制特定網域
  credentials: true
}));
```

---

## 步驟三：部署前端

### 選項 A：Vercel（推薦）▲

#### 1. 安裝 Vercel CLI
```bash
npm install -g vercel
```

#### 2. 登入
```bash
vercel login
```

#### 3. 設定環境變數
在 `frontend` 目錄建立 `.env.production`：
```env
VITE_API_URL=https://your-backend.railway.app
```

例如：
```env
VITE_API_URL=https://whisper-backend.onrender.com
```

#### 4. 建置
```bash
cd frontend
npm run build
```

#### 5. 部署
```bash
vercel
```

按照提示完成部署，會得到一個 URL，例如：
```
https://whisper-frontend.vercel.app
```

#### 6. 設定生產環境變數（可選）
在 Vercel 專案設定中，添加環境變數：
```
VITE_API_URL=https://your-backend.railway.app
```

---

### 選項 B：Netlify

#### 1. 安裝 Netlify CLI
```bash
npm install -g netlify-cli
```

#### 2. 登入
```bash
netlify login
```

#### 3. 設定環境變數
在 `frontend` 目錄建立 `.env.production`：
```env
VITE_API_URL=https://your-backend.railway.app
```

#### 4. 建置
```bash
cd frontend
npm run build
```

#### 5. 部署
```bash
netlify deploy --prod --dir=dist
```

#### 6. 設定環境變數（在 Netlify 儀表板）
在 Site settings → Environment variables 中添加：
```
VITE_API_URL = https://your-backend.railway.app
```

---

## 步驟四：測試

1. **在手機瀏覽器打開前端 URL**
   ```
   https://your-frontend.vercel.app
   ```

2. **測試功能**
   - 點擊「開始錄音」
   - 允許麥克風權限
   - 說英文
   - 查看結果

3. **安裝 PWA**（可選）
   - 在瀏覽器中點擊「安裝應用程式」
   - 應用會出現在主畫面

---

## 完整範例

### 後端部署到 Railway

1. **推送到 GitHub**（如果還沒有）：
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/whisper-app.git
   git push -u origin main
   ```

2. **在 Railway 部署**：
   - 連接 GitHub 儲存庫
   - 選擇 `backend` 目錄
   - 設定環境變數
   - 獲得 URL：`https://whisper-backend.railway.app`

### 前端部署到 Vercel

1. **設定環境變數**：
   ```bash
   cd frontend
   echo "VITE_API_URL=https://whisper-backend.railway.app" > .env.production
   ```

2. **建置和部署**：
   ```bash
   npm run build
   vercel
   ```

3. **獲得 URL**：`https://whisper-frontend.vercel.app`

---

## 環境變數檢查清單

### 後端環境變數
- [ ] `OPENAI_API_KEY` - OpenAI API 金鑰
- [ ] `PORT` - 端口（通常自動設定）
- [ ] `NODE_ENV=production` - 生產環境標記

### 前端環境變數
- [ ] `VITE_API_URL` - 後端 API URL（必須是 HTTPS）

---

## 常見問題

### Q: 為什麼需要 HTTPS？
A: 手機瀏覽器需要 HTTPS 才能使用麥克風 API。所有雲端服務都提供 HTTPS。

### Q: 後端 URL 會變嗎？
A: 
- Railway: 可以設定自訂網域，否則 URL 固定
- Render: 免費方案會休眠，URL 可能變慢
- Heroku: 可以設定自訂網域

### Q: 如何更新應用？
A: 
- 後端：推送程式碼到 GitHub，雲端服務會自動重新部署
- 前端：重新執行 `vercel` 或 `netlify deploy`

### Q: 費用多少？
A: 
- Railway: 免費方案每月 $5 額度
- Render: 免費方案可用（會休眠）
- Vercel: 免費方案足夠個人使用
- Netlify: 免費方案足夠個人使用

---

## 快速部署腳本

建立 `deploy.sh`（Mac/Linux）或 `deploy.ps1`（Windows）自動化部署流程。

---

## 下一步

1. 選擇後端服務（推薦 Railway）
2. 選擇前端服務（推薦 Vercel）
3. 按照步驟部署
4. 在手機上測試
5. 安裝 PWA 到主畫面

完成後，您就可以在任何網路環境下使用應用！
