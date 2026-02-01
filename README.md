# Whisper 語音轉文字翻譯系統

一個使用 OpenAI Whisper API 和 GPT 模型的語音轉文字翻譯 Web 應用程式。使用者可以在手機上錄製英文語音，系統會自動轉換成英文文字並翻譯成繁體中文。

## 功能特色

- 🎤 網頁錄音功能（使用 MediaRecorder API）
- 🔊 語音轉文字（使用 OpenAI Whisper API）
- 🌐 自動翻譯（使用 GPT-3.5 模型）
- 📱 響應式設計，支援手機瀏覽器
- 📋 一鍵複製結果

## 系統架構

```
手機瀏覽器 → React 前端 → Node.js 後端 → Whisper API → GPT API
```

## 專案結構

```
app_018_whisper/
├── frontend/          # React + Vite 前端應用
├── backend/           # Node.js + Express 後端 API
├── .gitignore
└── README.md
```

## 安裝步驟

### 1. 後端設定

```bash
cd backend
npm install
```

建立 `.env` 檔案（參考 `.env.example`）：

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
```

### 2. 前端設定

```bash
cd frontend
npm install
```

## 執行方式

### 開發模式

**終端機 1 - 啟動後端：**
```bash
cd backend
npm run dev
```

後端伺服器會運行在 `http://localhost:3000`

**終端機 2 - 啟動前端：**
```bash
cd frontend
npm run dev
```

前端應用會運行在 `http://localhost:5173`

### 生產模式

**後端：**
```bash
cd backend
npm start
```

**前端：**
```bash
cd frontend
npm run build
npm run preview
```

## 使用方式

1. 在瀏覽器中開啟前端應用（建議使用手機瀏覽器或開發者工具的裝置模擬）
2. 點擊「開始錄音」按鈕
3. 對著麥克風說英文
4. 點擊「停止錄音」
5. 等待系統處理（上傳 → 轉錄 → 翻譯）
6. 查看英文逐字稿和中文翻譯結果
7. 可以點擊「複製」按鈕複製文字

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

## 環境需求

- Node.js 18+ 
- OpenAI API 金鑰

## 注意事項

1. **API 金鑰**：需要有效的 OpenAI API 金鑰才能使用 Whisper 和 GPT 服務
2. **麥克風權限**：瀏覽器會要求麥克風存取權限
3. **檔案格式**：支援 wav, mp3, m4a, webm, ogg 格式
4. **檔案大小**：限制 25MB（Whisper API 限制）
5. **網路連線**：需要穩定的網路連線以呼叫 OpenAI API

## 故障排除

### 無法錄音
- 確認瀏覽器已授予麥克風權限
- 檢查瀏覽器是否支援 MediaRecorder API

### API 錯誤
- 確認 `.env` 檔案中的 `OPENAI_API_KEY` 設定正確
- 檢查 API 金鑰是否有足夠的額度

### CORS 錯誤
- 確認後端 CORS 設定正確
- 確認前端代理設定正確（`vite.config.js`）

## 授權

ISC
