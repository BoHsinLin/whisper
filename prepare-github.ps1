# GitHub 準備腳本 (PowerShell)

Write-Host "🚀 準備推送到 GitHub" -ForegroundColor Green
Write-Host ""

# 檢查 Git
Write-Host "📋 檢查 Git 狀態..." -ForegroundColor Yellow
if (-not (Test-Path ".git")) {
    Write-Host "⚠️  未初始化 Git，正在初始化..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git 已初始化" -ForegroundColor Green
} else {
    Write-Host "✅ Git 已初始化" -ForegroundColor Green
}

# 檢查 .gitignore
if (-not (Test-Path ".gitignore")) {
    Write-Host "📝 建立 .gitignore..." -ForegroundColor Yellow
    @"
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.production

# Build outputs
dist/
build/
*.log

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Temporary files
*.tmp
*.temp
"@ | Out-File -FilePath .gitignore -Encoding utf8
    Write-Host "✅ .gitignore 已建立" -ForegroundColor Green
}

# 檢查檔案結構
Write-Host ""
Write-Host "🔍 檢查專案結構..." -ForegroundColor Yellow
$checks = @(
    @{Path="backend/package.json"; Name="後端 package.json"},
    @{Path="backend/src/server.js"; Name="後端伺服器"},
    @{Path="frontend/package.json"; Name="前端 package.json"},
    @{Path="frontend/src/App.jsx"; Name="前端應用"}
)

$allOk = $true
foreach ($check in $checks) {
    if (Test-Path $check.Path) {
        Write-Host "✅ $($check.Name) 存在" -ForegroundColor Green
    } else {
        Write-Host "❌ $($check.Name) 不存在" -ForegroundColor Red
        $allOk = $false
    }
}

if (-not $allOk) {
    Write-Host ""
    Write-Host "⚠️  專案結構不完整，請檢查上述檔案" -ForegroundColor Red
    exit 1
}

# 檢查是否有未提交的變更
Write-Host ""
Write-Host "📦 檢查變更..." -ForegroundColor Yellow
$status = git status --porcelain 2>&1
if ($status) {
    Write-Host "發現未提交的變更：" -ForegroundColor Yellow
    git status --short
    Write-Host ""
    $add = Read-Host "是否要添加所有檔案到 Git？(Y/N)"
    if ($add -eq "Y" -or $add -eq "y") {
        git add .
        Write-Host "✅ 檔案已添加到暫存區" -ForegroundColor Green
    }
} else {
    Write-Host "✅ 沒有未提交的變更" -ForegroundColor Green
}

# 檢查是否有遠端儲存庫
Write-Host ""
Write-Host "🔗 檢查遠端儲存庫..." -ForegroundColor Yellow
$remote = git remote -v 2>&1
if ($remote -match "origin") {
    Write-Host "✅ 已設定遠端儲存庫" -ForegroundColor Green
    Write-Host $remote
} else {
    Write-Host "⚠️  尚未設定遠端儲存庫" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "請在 GitHub 建立新儲存庫，然後執行：" -ForegroundColor Cyan
    Write-Host '  git remote add origin https://github.com/yourusername/your-repo-name.git' -ForegroundColor White
    Write-Host '  git branch -M main' -ForegroundColor White
    Write-Host '  git push -u origin main' -ForegroundColor White
}

# 顯示下一步指示
Write-Host ""
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host "✅ 準備完成！" -ForegroundColor Green
Write-Host ""
Write-Host "下一步：" -ForegroundColor Yellow
Write-Host "1. 在 GitHub 建立新儲存庫（如果還沒有）" -ForegroundColor White
Write-Host "2. 設定遠端儲存庫（如果還沒有）" -ForegroundColor White
Write-Host "3. 推送到 GitHub：" -ForegroundColor White
Write-Host "   git add ." -ForegroundColor Gray
Write-Host "   git commit -m 'Initial commit'" -ForegroundColor Gray
Write-Host "   git push -u origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "4. 前往 https://render.com 部署後端" -ForegroundColor White
Write-Host "5. 參考 RENDER_DEPLOY.md 的詳細步驟" -ForegroundColor White
Write-Host ""
Write-Host "詳細步驟請參考：RENDER_DEPLOY.md" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Cyan
