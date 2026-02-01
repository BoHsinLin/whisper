 快速開始 - 手機測試

## 最簡單的方法（同一個 Wi-Fi）

### 1. 啟動後端

在一個終端機中：
```bash
cd backend
npm start
```

### 2. 啟動前端（允許外部訪問）

在另一個終端機中：
```bash
cd frontend
npm run dev -- --host
```

### 3. 找到電腦的 IP 位址

**Windows:**
```bash
ipconfig
```
找到「IPv4 位址」，例如：`192.168.1.100`

**Mac/Linux:**
```bash
ifconfig
# 或
ip addr
```

### 4. 在手機瀏覽器訪問

在手機瀏覽器中打開：
```
http://YOUR_IP:5000
```

例如：`http://192.168.1.100:5000`

### 5. 測試功能

- 點擊「開始錄音」
- 允許麥克風權限
- 說英文
- 查看結果

---

## 使用建置版本（更穩定）

### 1. 建置前端

```bash
cd frontend
npm run build
```

### 2. 啟動建置版本

```bash
cd frontend
npx serve -s dist -l 8080 --host
```

### 3. 在手機訪問

```
http://YOUR_IP:8080
```

---

## 注意事項

⚠️ **重要**：手機和電腦必須在同一個 Wi-Fi 網路中

⚠️ **後端 API**：如果手機無法連接到後端，需要：
1. 檢查防火牆設定
2. 或使用 ngrok 將後端暴露到網際網路

---

## 使用 ngrok（推薦 - 支援 HTTPS）

### 1. 安裝 ngrok

下載：https://ngrok.com/download

### 2. 啟動後端

```bash
cd backend
npm start
```

### 3. 啟動 ngrok

```bash
ngrok http 3000
```

### 4. 複製 HTTPS URL

例如：`https://abc123.ngrok.io`

### 5. 設定前端環境變數

在 `frontend` 目錄建立 `.env.production`：
```env
VITE_API_URL=https://abc123.ngrok.io
```

### 6. 重新建置

```bash
cd frontend
npm run build
```

### 7. 部署前端

使用 Vercel、Netlify 或任何靜態網站託管服務。
