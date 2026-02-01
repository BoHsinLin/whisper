# 快速部署指南 - 5 分鐘上線

## 最簡單的方法：Railway + Vercel

### 後端部署（Railway）🚂

1. **前往 Railway**：https://railway.app
2. **登入**：使用 GitHub 帳號
3. **建立專案**：
   - 點擊 "New Project"
   - 選擇 "Deploy from GitHub repo"
   - 選擇您的專案
4. **設定**：
   - Root Directory: `backend`
   - 添加環境變數：
     ```
     OPENAI_API_KEY=your_key_here
     ```
5. **完成**：獲得 URL，例如 `https://xxx.railway.app`

### 前端部署（Vercel）▲

1. **安裝 Vercel CLI**：
   ```bash
   npm install -g vercel
   ```

2. **設定環境變數**：
   ```bash
   cd frontend
   echo "VITE_API_URL=https://xxx.railway.app" > .env.production
   ```

3. **建置和部署**：
   ```bash
   npm run build
   vercel
   ```

4. **完成**：獲得 URL，例如 `https://xxx.vercel.app`

### 在手機上使用

1. 打開手機瀏覽器
2. 訪問前端 URL
3. 安裝 PWA（可選）
4. 開始使用！

---

## 一鍵部署腳本

### Windows (PowerShell)

```powershell
# deploy-backend.ps1
Write-Host "部署後端到 Railway..." -ForegroundColor Green
Write-Host "1. 前往 https://railway.app" -ForegroundColor Yellow
Write-Host "2. 連接 GitHub 儲存庫" -ForegroundColor Yellow
Write-Host "3. 設定 Root Directory: backend" -ForegroundColor Yellow
Write-Host "4. 添加環境變數: OPENAI_API_KEY" -ForegroundColor Yellow

# deploy-frontend.ps1
$backendUrl = Read-Host "請輸入後端 URL (例如: https://xxx.railway.app)"
Set-Location frontend
"VITE_API_URL=$backendUrl" | Out-File -FilePath .env.production -Encoding utf8
npm run build
vercel
```

### Mac/Linux

```bash
# deploy-backend.sh
echo "部署後端到 Railway..."
echo "1. 前往 https://railway.app"
echo "2. 連接 GitHub 儲存庫"
echo "3. 設定 Root Directory: backend"
echo "4. 添加環境變數: OPENAI_API_KEY"

# deploy-frontend.sh
read -p "請輸入後端 URL: " backend_url
cd frontend
echo "VITE_API_URL=$backend_url" > .env.production
npm run build
vercel
```
