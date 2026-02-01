import { useState, useRef } from 'react';
import './Recorder.css';

export default function Recorder({ onRecordingComplete, onRecordingStart, disabled }) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  const startRecording = async () => {
    try {
      // 請求麥克風權限
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // 設定 MediaRecorder
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus' // 使用 webm 格式（廣泛支援）
      });

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        // 建立 Blob
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        
        // 轉換為 File 物件
        const audioFile = new File([audioBlob], `recording-${Date.now()}.webm`, {
          type: 'audio/webm'
        });

        // 停止所有音軌
        stream.getTracks().forEach(track => track.stop());

        // 回調完成
        onRecordingComplete(audioFile);
      };

      // 開始錄音
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // 通知父組件錄音已開始
      if (onRecordingStart) {
        onRecordingStart();
      }

      // 開始計時
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('錄音錯誤:', error);
      alert('無法存取麥克風。請確認已授予麥克風權限。');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="recorder">
      <button
        className={`record-button ${isRecording ? 'recording' : ''}`}
        onClick={isRecording ? stopRecording : startRecording}
        disabled={disabled}
      >
        {isRecording ? (
          <>
            <span className="record-icon stop">⏹</span>
            <span>停止錄音</span>
          </>
        ) : (
          <>
            <span className="record-icon">🎤</span>
            <span>開始錄音</span>
          </>
        )}
      </button>
      {isRecording && (
        <div className="recording-time">
          錄音時間: {formatTime(recordingTime)}
        </div>
      )}
    </div>
  );
}
