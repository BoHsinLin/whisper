# Capacitor 設定腳本 (PowerShell)

Write-Host "🚀 開始設定 Capacitor..." -ForegroundColor Green

Set-Location frontend

# 安裝 Capacitor
Write-Host "📦 安裝 Capacitor..." -ForegroundColor Yellow
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android

# iOS 需要 Mac，所以跳過
Write-Host "⚠️  iOS 需要 Mac 系統，跳過 iOS 安裝" -ForegroundColor Yellow

# 建置前端
Write-Host "🔨 建置前端..." -ForegroundColor Yellow
npm run build

# 初始化 Capacitor（如果還沒初始化）
if (-not (Test-Path "capacitor.config.js")) {
    Write-Host "⚙️  初始化 Capacitor..." -ForegroundColor Yellow
    npx cap init "Whisper 語音翻譯" "com.whisper.translate" --web-dir=dist
}

# 添加 Android 平台
Write-Host "📱 添加 Android 平台..." -ForegroundColor Yellow
npx cap add android

# 同步
Write-Host "🔄 同步檔案..." -ForegroundColor Yellow
npx cap sync

Write-Host "✅ 完成！" -ForegroundColor Green
Write-Host ""
Write-Host "下一步：" -ForegroundColor Cyan
Write-Host "  npx cap open android"
