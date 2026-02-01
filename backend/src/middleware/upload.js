import multer from 'multer';
import path from 'path';

// 設定檔案儲存（使用記憶體儲存，因為我們直接傳給 API）
const storage = multer.memoryStorage();

// 檔案過濾器：只允許音檔格式
const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    'audio/wav',
    'audio/wave',
    'audio/x-wav',
    'audio/mpeg',
    'audio/mp3',
    'audio/mp4',
    'audio/m4a',
    'audio/x-m4a',
    'audio/webm',
    'audio/ogg'
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('不支援的檔案格式。請上傳 wav, mp3, m4a, webm 或 ogg 格式的音檔。'), false);
  }
};

// 設定 multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 25 * 1024 * 1024 // 限制 25MB（Whisper API 限制）
  }
});

export default upload;
