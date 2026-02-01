import axios from 'axios';

// 生產環境：使用環境變數或自動偵測
// 開發環境：使用 localhost:3000
const getApiBaseUrl = () => {
  // 如果設定了環境變數，優先使用
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // 生產環境：自動偵測當前主機
  if (import.meta.env.PROD) {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    // 如果前端和後端在同一主機，使用相同端口或後端端口
    return `${protocol}//${hostname}:3000`;
  }
  
  // 開發環境：使用 localhost
  return 'http://localhost:3000';
};

const API_BASE_URL = getApiBaseUrl();

/**
 * 上傳音檔並進行轉錄和翻譯
 * @param {File} audioFile - 音檔檔案
 * @returns {Promise<{text_en: string, text_zh: string}>}
 */
export async function transcribeAudio(audioFile) {
  const formData = new FormData();
  formData.append('audio', audioFile);

  const response = await axios.post(`${API_BASE_URL}/api/transcribe`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    timeout: 120000 // 120 秒超時（Whisper + GPT 可能需要時間）
  });

  if (response.data.success) {
    return response.data.data;
  } else {
    throw new Error(response.data.error || '轉錄失敗');
  }
}
