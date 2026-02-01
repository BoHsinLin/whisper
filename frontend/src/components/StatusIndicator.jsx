import './StatusIndicator.css';

const statusMessages = {
  idle: '準備就緒',
  recording: '正在錄音...',
  uploading: '正在上傳音檔...',
  transcribing: '正在轉錄和翻譯...',
  done: '完成',
  error: '發生錯誤'
};

export default function StatusIndicator({ status }) {
  const isLoading = ['uploading', 'transcribing'].includes(status);

  return (
    <div className={`status-indicator ${status}`}>
      {isLoading && <div className="spinner"></div>}
      <span className="status-text">{statusMessages[status] || status}</span>
    </div>
  );
}
