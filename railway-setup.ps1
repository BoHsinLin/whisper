# Railway 部署準備腳本 (PowerShell)

Write-Host "🚂 Railway 部署準備" -ForegroundColor Green
Write-Host ""

# 檢查 Git
Write-Host "📋 檢查 Git 狀態..." -ForegroundColor Yellow
$gitStatus = git status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  未初始化 Git，正在初始化..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git 已初始化" -ForegroundColor Green
} else {
    Write-Host "✅ Git 已初始化" -ForegroundColor Green
}

# 檢查是否有 .gitignore
if (-not (Test-Path ".gitignore")) {
    Write-Host "📝 建立 .gitignore..." -ForegroundColor Yellow
    @"
node_modules/
.env
.env.local
*.log
.DS_Store
dist/
build/
"@ | Out-File -FilePath .gitignore -Encoding utf8
    Write-Host "✅ .gitignore 已建立" -ForegroundColor Green
}

# 檢查後端設定
Write-Host ""
Write-Host "🔍 檢查後端設定..." -ForegroundColor Yellow
if (Test-Path "backend/package.json") {
    Write-Host "✅ backend/package.json 存在" -ForegroundColor Green
} else {
    Write-Host "❌ backend/package.json 不存在" -ForegroundColor Red
    exit 1
}

if (Test-Path "backend/src/server.js") {
    Write-Host "✅ backend/src/server.js 存在" -ForegroundColor Green
} else {
    Write-Host "❌ backend/src/server.js 不存在" -ForegroundColor Red
    exit 1
}

# 檢查環境變數範例
Write-Host ""
Write-Host "📝 檢查環境變數設定..." -ForegroundColor Yellow
if (Test-Path "backend/.env.example") {
    Write-Host "✅ backend/.env.example 存在" -ForegroundColor Green
} else {
    Write-Host "⚠️  backend/.env.example 不存在，正在建立..." -ForegroundColor Yellow
    @"
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
"@ | Out-File -FilePath backend/.env.example -Encoding utf8
    Write-Host "✅ backend/.env.example 已建立" -ForegroundColor Green
}

# 顯示下一步指示
Write-Host ""
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host "✅ 準備完成！" -ForegroundColor Green
Write-Host ""
Write-Host "下一步：" -ForegroundColor Yellow
Write-Host "1. 確保程式碼已推送到 GitHub" -ForegroundColor White
Write-Host "2. 前往 https://railway.app 並登入" -ForegroundColor White
Write-Host "3. 建立新專案並選擇 'Deploy from GitHub repo'" -ForegroundColor White
Write-Host "4. 設定 Root Directory 為 'backend'" -ForegroundColor White
Write-Host "5. 在 Variables 中添加 OPENAI_API_KEY" -ForegroundColor White
Write-Host ""
Write-Host "詳細步驟請參考：RAILWAY_DEPLOY.md" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Cyan
