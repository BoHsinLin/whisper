# 在不同 App 平台使用指南

本指南說明如何將 Whisper 語音轉文字翻譯應用打包成不同平台的 App。

## 方案比較

| 方案 | 優點 | 缺點 | 適用場景 |
|------|------|------|----------|
| **PWA** | 簡單、無需審核、跨平台 | 功能有限、需要網路 | 快速部署、網頁應用 |
| **Capacitor** | 原生功能、可上架商店 | 需要開發環境、需審核 | 正式 App、需要原生功能 |
| **Tauri** | 輕量、安全 | 主要支援桌面 | 桌面應用 |

---

## 方案一：PWA（Progressive Web App）✅ 已設定

### 什麼是 PWA？
- 可以安裝到手機主畫面的網頁應用
- 像原生 App 一樣使用
- 不需要上架 App Store 或 Google Play

### 如何使用

1. **部署前端到 HTTPS 網站**
   - 使用 Vercel、Netlify 等服務
   - 或使用 ngrok（測試用）

2. **在手機瀏覽器打開網站**

3. **安裝到主畫面**
   - **iOS Safari**：點擊分享按鈕 → 「加入主畫面」
   - **Android Chrome**：點擊選單 → 「安裝應用程式」或「加入主畫面」

4. **完成！** 應用會出現在主畫面，像原生 App 一樣

### 優點
- ✅ 不需要開發環境
- ✅ 不需要 App Store 審核
- ✅ 跨平台（iOS、Android、桌面）
- ✅ 自動更新

### 限制
- ⚠️ 需要 HTTPS
- ⚠️ 功能受限於瀏覽器 API
- ⚠️ iOS 支援較有限

---

## 方案二：Capacitor（原生 App）📱

### 什麼是 Capacitor？
- 將 Web 應用打包成原生 iOS/Android App
- 可以上架到 App Store 和 Google Play
- 可以使用原生功能（相機、通知等）

### 安裝步驟

#### 1. 安裝 Capacitor

```bash
cd frontend
npm install @capacitor/core @capacitor/cli
npm install @capacitor/ios @capacitor/android
```

#### 2. 初始化 Capacitor

```bash
npx cap init
```

會詢問：
- **App name**: Whisper 語音翻譯
- **App ID**: com.whisper.translate（或自訂）
- **Web dir**: dist

#### 3. 建置前端

```bash
npm run build
```

#### 4. 添加平台

```bash
# Android
npx cap add android

# iOS（需要 Mac）
npx cap add ios
```

#### 5. 同步檔案

```bash
npx cap sync
```

#### 6. 開啟原生專案

```bash
# Android
npx cap open android

# iOS
npx cap open ios
```

#### 7. 編譯和部署

- **Android**：在 Android Studio 中編譯 APK 或 AAB
- **iOS**：在 Xcode 中編譯並上傳到 App Store

### 設定 API URL

在 `frontend/src/services/api.js` 中，設定生產環境的後端 URL：

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://your-backend-url.com';
```

### 權限設定

#### Android (`android/app/src/main/AndroidManifest.xml`)

```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.INTERNET" />
```

#### iOS (`ios/App/App/Info.plist`)

```xml
<key>NSMicrophoneUsageDescription</key>
<string>需要麥克風權限以錄製語音</string>
```

---

## 方案三：Tauri（桌面應用）🖥️

### 什麼是 Tauri？
- 使用 Rust 和 Web 技術建立桌面應用
- 比 Electron 更輕量、更安全
- 支援 Windows、macOS、Linux

### 安裝步驟

```bash
cd frontend
npm install --save-dev @tauri-apps/cli
npm install @tauri-apps/api
npx tauri init
```

### 建置

```bash
npm run build
npx tauri build
```

---

## 推薦流程

### 快速測試 → PWA
1. 使用 ngrok 暴露後端
2. 部署前端到 Vercel
3. 在手機瀏覽器安裝 PWA

### 正式發布 → Capacitor
1. 部署後端到雲端服務
2. 設定環境變數
3. 使用 Capacitor 打包
4. 上架到 App Store / Google Play

---

## 環境變數設定

### 開發環境
不需要額外設定，使用 `localhost`

### 生產環境

在 `frontend` 目錄建立 `.env.production`：

```env
VITE_API_URL=https://your-backend-url.com
```

然後重新建置：
```bash
npm run build
```

---

## 常見問題

### Q: PWA 和原生 App 有什麼區別？
A: PWA 是網頁應用，原生 App 是真正的應用程式。PWA 更容易部署，原生 App 功能更強大。

### Q: 需要 Mac 才能開發 iOS App 嗎？
A: 是的，iOS 開發需要 Mac 和 Xcode。Android 可以在 Windows/Mac/Linux 開發。

### Q: 可以同時使用多種方案嗎？
A: 可以！PWA 和 Capacitor 可以共用同一套程式碼。

### Q: 後端需要部署在哪裡？
A: 可以部署到任何支援 Node.js 的服務：
- Railway（推薦，免費）
- Render（免費）
- Heroku（有免費方案）
- Vercel（適合前端，後端需要特殊設定）

---

## 下一步

選擇適合您的方案，然後按照對應的步驟操作。如果需要幫助，請參考：
- `DEPLOY.md` - 部署指南
- `QUICK_START.md` - 快速開始
