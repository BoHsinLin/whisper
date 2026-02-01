import { useState } from 'react';
import Recorder from './components/Recorder.jsx';
import StatusIndicator from './components/StatusIndicator.jsx';
import ResultDisplay from './components/ResultDisplay.jsx';
import { transcribeAudio } from './services/api.js';
import './App.css';

const STATUS = {
  IDLE: 'idle',
  RECORDING: 'recording',
  UPLOADING: 'uploading',
  TRANSCRIBING: 'transcribing',
  DONE: 'done',
  ERROR: 'error'
};

function App() {
  const [status, setStatus] = useState(STATUS.IDLE);
  const [textEn, setTextEn] = useState('');
  const [textZh, setTextZh] = useState('');
  const [error, setError] = useState('');

  const handleRecordingComplete = async (audioFile) => {
    try {
      setStatus(STATUS.UPLOADING);
      setError('');
      setTextEn('');
      setTextZh('');

      // 上傳並轉錄
      setStatus(STATUS.TRANSCRIBING);
      const result = await transcribeAudio(audioFile);

      setTextEn(result.text_en);
      setTextZh(result.text_zh);
      setStatus(STATUS.DONE);
    } catch (err) {
      console.error('轉錄錯誤:', err);
      setError(err.message || '轉錄失敗，請重試');
      setStatus(STATUS.ERROR);
    }
  };

  const handleRecordingStart = () => {
    setStatus(STATUS.RECORDING);
    setError('');
  };

  const handleReset = () => {
    setStatus(STATUS.IDLE);
    setTextEn('');
    setTextZh('');
    setError('');
  };

  const isProcessing = [STATUS.UPLOADING, STATUS.TRANSCRIBING].includes(status);

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">🎤 Whisper 語音轉文字翻譯</h1>
        <p className="subtitle">說英文 → 自動轉文字 → 翻譯成中文</p>

        <Recorder
          onRecordingComplete={handleRecordingComplete}
          onRecordingStart={handleRecordingStart}
          disabled={isProcessing}
        />

        <StatusIndicator status={status} />

        {error && (
          <div className="error-message">
            <span>❌ {error}</span>
            <button className="retry-button" onClick={handleReset}>
              重試
            </button>
          </div>
        )}

        {(textEn || textZh) && (
          <>
            <ResultDisplay textEn={textEn} textZh={textZh} />
            <button className="reset-button" onClick={handleReset}>
              重新錄音
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
