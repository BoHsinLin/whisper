# 手機部署指南

本指南說明如何將 Whisper 語音轉文字翻譯應用部署到手機上。

## 方法一：PWA（推薦 - 可安裝到主畫面）

### 步驟 1：建置前端

```bash
cd frontend
npm run build
```

建置完成後，檔案會在 `frontend/dist` 目錄中。

### 步驟 2：部署後端

後端需要部署到一個可以從手機訪問的伺服器。選項：

#### 選項 A：使用 ngrok（快速測試）

1. 安裝 ngrok：https://ngrok.com/download
2. 啟動後端：
   ```bash
   cd backend
   npm start
   ```
3. 在另一個終端機啟動 ngrok：
   ```bash
   ngrok http 3000
   ```
4. 複製 ngrok 提供的 HTTPS URL（例如：`https://abc123.ngrok.io`）

#### 選項 B：部署到雲端服務

- **Heroku**：免費方案可用
- **Railway**：免費方案可用
- **Render**：免費方案可用
- **Vercel**：適合前端，後端需要 Node.js 支援

### 步驟 3：設定環境變數

在 `frontend` 目錄建立 `.env.production` 檔案：

```env
VITE_API_URL=https://your-backend-url.com
```

例如使用 ngrok：
```env
VITE_API_URL=https://abc123.ngrok.io
```

### 步驟 4：重新建置前端

```bash
cd frontend
npm run build
```

### 步驟 5：部署前端

#### 選項 A：使用 Vercel（推薦）

1. 安裝 Vercel CLI：`npm i -g vercel`
2. 在 `frontend` 目錄執行：`vercel`
3. 按照提示完成部署

#### 選項 B：使用 Netlify

1. 安裝 Netlify CLI：`npm i -g netlify-cli`
2. 在 `frontend` 目錄執行：`netlify deploy --prod --dir=dist`

#### 選項 C：使用本地伺服器（同網域）

如果手機和電腦在同一個 Wi-Fi 網路：

1. 找到電腦的 IP 位址：
   - Windows: `ipconfig`（查看 IPv4 位址）
   - Mac/Linux: `ifconfig` 或 `ip addr`
2. 在 `frontend` 目錄啟動簡單 HTTP 伺服器：
   ```bash
   # 使用 Python
   python -m http.server 8080
   
   # 或使用 Node.js
   npx serve -s dist -l 8080
   ```
3. 在手機瀏覽器訪問：`http://YOUR_IP:8080`

### 步驟 6：在手機上安裝

1. 在手機瀏覽器打開部署的前端 URL
2. 點擊瀏覽器的「添加到主畫面」或「安裝應用程式」
3. 應用程式會像原生 App 一樣安裝

## 方法二：使用 Capacitor（打包成原生 App）

### 安裝 Capacitor

```bash
cd frontend
npm install @capacitor/core @capacitor/cli
npm install @capacitor/ios @capacitor/android
npx cap init
```

### 建置並同步

```bash
npm run build
npx cap sync
```

### 開啟原生專案

```bash
# iOS
npx cap open ios

# Android
npx cap open android
```

然後在 Xcode 或 Android Studio 中編譯和部署。

## 方法三：簡單本地測試（開發用）

### 在同一個 Wi-Fi 網路中

1. **啟動後端**（在電腦上）：
   ```bash
   cd backend
   npm start
   ```

2. **啟動前端**（在電腦上）：
   ```bash
   cd frontend
   npm run dev -- --host
   ```

3. **找到電腦的 IP 位址**：
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig`

4. **在手機瀏覽器訪問**：
   ```
   http://YOUR_IP:5000
   ```

5. **設定後端 CORS**（如果需要）：
   在 `backend/src/server.js` 中，更新 CORS 設定允許手機 IP。

## 注意事項

1. **HTTPS 要求**：
   - 手機瀏覽器需要 HTTPS 才能使用麥克風（PWA 要求）
   - 使用 ngrok 或部署到支援 HTTPS 的服務

2. **後端 CORS**：
   - 確保後端允許前端網域的請求
   - 檢查 `backend/src/server.js` 中的 CORS 設定

3. **環境變數**：
   - 生產環境需要設定 `VITE_API_URL`
   - 後端需要設定 `OPENAI_API_KEY`

4. **圖示檔案**：
   - 需要建立實際的 PNG 圖示（192x192 和 512x512）
   - 可以使用線上工具生成：https://realfavicongenerator.net/

## 快速測試清單

- [ ] 後端已部署並可訪問
- [ ] 前端已建置（`npm run build`）
- [ ] 環境變數已設定（`VITE_API_URL`）
- [ ] 前端已部署到可訪問的 URL
- [ ] 手機可以訪問前端 URL
- [ ] 麥克風權限已授予
- [ ] 可以錄音並看到結果

## 故障排除

### 無法訪問後端 API
- 檢查 `VITE_API_URL` 是否正確
- 確認後端 CORS 設定允許前端網域
- 檢查後端是否正常運行

### 無法錄音
- 確認使用 HTTPS（PWA 要求）
- 檢查瀏覽器麥克風權限
- 確認瀏覽器支援 MediaRecorder API

### PWA 無法安裝
- 確認使用 HTTPS
- 檢查 `manifest.json` 是否正確
- 確認圖示檔案存在
