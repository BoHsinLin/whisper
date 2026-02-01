import express from 'express';
import upload from '../middleware/upload.js';
import { transcribeAudio } from '../services/whisper.js';
import { translateToChinese } from '../services/translate.js';

const router = express.Router();

/**
 * POST /api/transcribe
 * 接收音檔，進行語音轉文字和翻譯
 */
router.post('/transcribe', upload.single('audio'), async (req, res, next) => {
  try {
    // 檢查是否有上傳檔案
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: '請上傳音檔'
      });
    }

    const audioBuffer = req.file.buffer;
    const filename = req.file.originalname;

    console.log(`開始處理音檔: ${filename}, 大小: ${audioBuffer.length} bytes`);

    // Step 1: 使用 Whisper 轉文字
    console.log('正在使用 Whisper 轉換語音...');
    const textEn = await transcribeAudio(audioBuffer, filename);
    console.log('Whisper 結果:', textEn);

    // Step 2: 翻譯成中文
    console.log('正在翻譯成中文...');
    const textZh = await translateToChinese(textEn);
    console.log('翻譯結果:', textZh);

    // Step 3: 返回結果
    res.json({
      success: true,
      data: {
        text_en: textEn,
        text_zh: textZh
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;
