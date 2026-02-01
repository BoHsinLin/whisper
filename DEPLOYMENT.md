# 部署指南

## Vercel 部署設定

專案已包含 `vercel.json` 設定檔，Vercel 會自動偵測並使用正確的設定。

### 在 Vercel 部署前端

1. 前往 https://vercel.com
2. 使用 GitHub 登入
3. 點擊「Add New...」→「Project」
4. 選擇您的 GitHub 儲存庫
5. Vercel 會自動偵測 `vercel.json` 設定
6. **重要**：設定 Environment Variables：
   - `VITE_API_URL` = `https://whisper-8kjc.onrender.com`（您的後端 URL）
7. 點擊「Deploy」

### Vercel 自動設定

`vercel.json` 已包含以下設定：
- Root Directory: 自動處理（透過 buildCommand）
- Build Command: `cd frontend && npm install && npm run build`
- Output Directory: `frontend/dist`
- Framework: Vite

## Render 部署設定

### 後端部署到 Render

1. 前往 https://render.com
2. 建立 Web Service
3. 連接 GitHub 儲存庫
4. 設定：
   - **Name**: `whisper-backend`
   - **Root Directory**: `backend` ⚠️ **必須設定**
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`
5. 設定 Environment Variables：
   - `OPENAI_API_KEY` = 您的 OpenAI API 金鑰

## 環境變數設定

### Vercel (前端)

在 Vercel 專案設定 → Environment Variables 添加：

```
VITE_API_URL=https://whisper-8kjc.onrender.com
```

### Render (後端)

在 Render 專案設定 → Environment Variables 添加：

```
OPENAI_API_KEY=your_openai_api_key_here
```

## 測試

### 測試後端

```
https://whisper-8kjc.onrender.com/health
```

應該看到：
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

### 測試前端

打開 Vercel 提供的 URL，應該可以看到完整的應用介面。

## 故障排除

### Vercel 404 錯誤

- 確認 `vercel.json` 存在於根目錄
- 確認 Environment Variables 已設定
- 檢查 Build Logs 是否有錯誤

### Render 部署失敗

- 確認 Root Directory 設定為 `backend`
- 確認環境變數 `OPENAI_API_KEY` 已設定
- 檢查 Logs 查看錯誤訊息
