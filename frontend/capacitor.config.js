import { defineConfig } from '@capacitor/cli';

export default defineConfig({
  appId: 'com.whisper.translate',
  appName: 'Whisper 語音翻譯',
  webDir: 'dist',
  server: {
    // 開發時可以指向本地伺服器
    // url: 'http://localhost:5000',
    // cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#667eea',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false
    }
  }
});
