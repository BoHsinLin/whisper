import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import transcribeRoutes from './routes/transcribe.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 中間件
// CORS 設定：允許所有來源（雲端部署時建議限制特定網域）
// 可以透過環境變數 ALLOWED_ORIGINS 設定允許的網域（用逗號分隔）
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',')
  : '*';

app.use(cors({
  origin: allowedOrigins === '*' ? '*' : (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// 根路徑
app.get('/', (req, res) => {
  res.json({
    message: 'Whisper 語音轉文字翻譯 API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /health',
      transcribe: 'POST /api/transcribe'
    }
  });
});

// 路由
app.use('/api', transcribeRoutes);

// 健康檢查端點
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// 錯誤處理中間件
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
