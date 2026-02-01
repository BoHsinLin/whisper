import { useState } from 'react';
import './ResultDisplay.css';

export default function ResultDisplay({ textEn, textZh }) {
  const [copied, setCopied] = useState({ en: false, zh: false });

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied({ ...copied, [type]: true });
      setTimeout(() => {
        setCopied({ ...copied, [type]: false });
      }, 2000);
    } catch (error) {
      console.error('複製失敗:', error);
      alert('複製失敗，請手動選擇文字複製');
    }
  };

  if (!textEn && !textZh) {
    return null;
  }

  return (
    <div className="result-display">
      {textEn && (
        <div className="result-section">
          <div className="result-header">
            <h3>英文逐字稿</h3>
            <button
              className="copy-button"
              onClick={() => copyToClipboard(textEn, 'en')}
              title="複製"
            >
              {copied.en ? '✓ 已複製' : '📋 複製'}
            </button>
          </div>
          <div className="result-text english">{textEn}</div>
        </div>
      )}

      {textZh && (
        <div className="result-section">
          <div className="result-header">
            <h3>中文翻譯</h3>
            <button
              className="copy-button"
              onClick={() => copyToClipboard(textZh, 'zh')}
              title="複製"
            >
              {copied.zh ? '✓ 已複製' : '📋 複製'}
            </button>
          </div>
          <div className="result-text chinese">{textZh}</div>
        </div>
      )}
    </div>
  );
}
