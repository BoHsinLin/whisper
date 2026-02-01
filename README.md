# Whisper 語音轉文字翻譯系統

一個使用 OpenAI Whisper API 和 GPT 模型的語音轉文字翻譯 Web 應用程式。使用者可以在手機上錄製英文語音，系統會自動轉換成英文文字並翻譯成繁體中文。

## 功能特色

- 🎤 網頁錄音功能（使用 MediaRecorder API）
- 🔊 語音轉文字（使用 OpenAI Whisper API）
- 🌐 自動翻譯（使用 GPT-3.5 模型）
- 📱 響應式設計，支援手機瀏覽器
- 📋 一鍵複製結果
- 🌍 可在任何網路環境下使用

## 系統架構

```
手機瀏覽器 → React 前端 (Vercel) → Node.js 後端 (Render) → Whisper API → GPT API
```

## 專案結構

```
app_018_whisper/
├── frontend/          # React + Vite 前端應用
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   └── services/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── backend/           # Node.js + Express 後端 API
│   ├── src/
│   │   ├── server.js
│   │   ├── routes/
│   │   ├── services/
│   │   └── middleware/
│   └── package.json
├── vercel.json        # Vercel 部署設定
└── README.md
```

## 快速開始

### 本地開發

#### 後端

```bash
cd backend
npm install
# 建立 .env 檔案
echo "OPENAI_API_KEY=your_key_here" > .env
npm run dev
```

後端運行在 `http://localhost:3000`

#### 前端

```bash
cd frontend
npm install
npm run dev
```

前端運行在 `http://localhost:5000`

### 部署

#### 後端部署到 Render

1. 前往 https://render.com
2. 建立 Web Service
3. 連接 GitHub 儲存庫
4. 設定：
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment Variables: `OPENAI_API_KEY`

#### 前端部署到 Vercel

1. 前往 https://vercel.com
2. 連接 GitHub 儲存庫
3. Vercel 會自動偵測 `vercel.json` 設定
4. 設定 Environment Variables：
   - `VITE_API_URL` = 您的後端 URL（例如：`https://whisper-8kjc.onrender.com`）

## 環境變數

### 後端 (.env)

```
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
```

### 前端 (Vercel Environment Variables)

```
VITE_API_URL=https://your-backend-url.onrender.com
```

## API 端點

### POST /api/transcribe

上傳音檔並進行轉錄和翻譯。

**請求：**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: `audio` (檔案)

**回應：**
```json
{
  "success": true,
  "data": {
    "text_en": "I want to improve my English speaking skills.",
    "text_zh": "我想提升我的英語口說能力。"
  }
}
```

### GET /health

健康檢查端點。

**回應：**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

## 技術棧

### 前端
- React 18
- Vite
- Axios
- MediaRecorder API

### 後端
- Node.js
- Express
- OpenAI SDK
- Multer（檔案上傳）

## 使用方式

1. 在手機瀏覽器打開前端 URL（Vercel 部署的網址）
2. 點擊「開始錄音」按鈕
3. 允許瀏覽器麥克風權限
4. 對著麥克風說英文
5. 點擊「停止錄音」
6. 等待系統處理（上傳 → 轉錄 → 翻譯）
7. 查看英文逐字稿和中文翻譯結果
8. 可以點擊「複製」按鈕複製文字

## 注意事項

1. **API 金鑰**：需要有效的 OpenAI API 金鑰才能使用 Whisper 和 GPT 服務
2. **麥克風權限**：瀏覽器會要求麥克風存取權限
3. **檔案格式**：支援 wav, mp3, m4a, webm, ogg 格式
4. **檔案大小**：限制 25MB（Whisper API 限制）
5. **網路連線**：需要穩定的網路連線以呼叫 OpenAI API
6. **HTTPS**：手機瀏覽器需要 HTTPS 才能使用麥克風

## 授權

ISC
