import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * 使用 Whisper API 將音檔轉換為英文文字
 * @param {Buffer} audioBuffer - 音檔的 Buffer
 * @param {string} filename - 檔案名稱（用於判斷格式）
 * @returns {Promise<string>} 英文文字
 */
export async function transcribeAudio(audioBuffer, filename) {
  try {
    // OpenAI SDK 在 Node.js 中可以直接接受 File 物件（Node.js 18+）
    // 或使用 File-like 物件
    let file;
    
    if (typeof File !== 'undefined') {
      // Node.js 18+ 支援 File API
      file = new File([audioBuffer], filename, {
        type: getMimeType(filename)
      });
    } else {
      // 對於較舊的 Node.js 版本，建立 File-like 物件
      const { Readable } = await import('stream');
      file = {
        name: filename,
        type: getMimeType(filename),
        stream: () => Readable.from([audioBuffer]),
        arrayBuffer: async () => audioBuffer.buffer,
        text: async () => '',
        size: audioBuffer.length
      };
    }

    // 調用 Whisper API
    const transcription = await openai.audio.transcriptions.create({
      file: file,
      model: 'whisper-1',
      language: 'en', // 指定英文
      response_format: 'text'
    });

    return transcription.trim();
  } catch (error) {
    console.error('Whisper API 錯誤:', error);
    throw new Error(`語音轉文字失敗: ${error.message}`);
  }
}

/**
 * 根據檔案名稱判斷 MIME 類型
 */
function getMimeType(filename) {
  const ext = filename.toLowerCase().split('.').pop();
  const mimeTypes = {
    'wav': 'audio/wav',
    'mp3': 'audio/mpeg',
    'm4a': 'audio/mp4',
    'webm': 'audio/webm',
    'ogg': 'audio/ogg'
  };
  return mimeTypes[ext] || 'audio/wav';
}
