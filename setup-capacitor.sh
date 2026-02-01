#!/bin/bash

# Capacitor 設定腳本

echo "🚀 開始設定 Capacitor..."

cd frontend

# 安裝 Capacitor
echo "📦 安裝 Capacitor..."
npm install @capacitor/core @capacitor/cli
npm install @capacitor/ios @capacitor/android

# 建置前端
echo "🔨 建置前端..."
npm run build

# 初始化 Capacitor（如果還沒初始化）
if [ ! -f "capacitor.config.js" ]; then
    echo "⚙️  初始化 Capacitor..."
    npx cap init "Whisper 語音翻譯" "com.whisper.translate" --web-dir=dist
fi

# 添加平台
echo "📱 添加平台..."
npx cap add android
npx cap add ios 2>/dev/null || echo "⚠️  iOS 需要 Mac 系統"

# 同步
echo "🔄 同步檔案..."
npx cap sync

echo "✅ 完成！"
echo ""
echo "下一步："
echo "  Android: npx cap open android"
echo "  iOS:     npx cap open ios"
