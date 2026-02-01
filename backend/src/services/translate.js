import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * 使用 GPT 模型將英文翻譯成繁體中文
 * @param {string} textEn - 英文文字
 * @returns {Promise<string>} 繁體中文翻譯
 */
export async function translateToChinese(textEn) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: '你是一個專業的英文到繁體中文翻譯助手。請將英文文字準確、自然地翻譯成繁體中文，保持原意並符合中文表達習慣。'
        },
        {
          role: 'user',
          content: `請將以下英文翻譯成繁體中文：\n\n${textEn}`
        }
      ],
      temperature: 0.3,
      max_tokens: 1000
    });

    const translatedText = completion.choices[0].message.content.trim();
    return translatedText;
  } catch (error) {
    console.error('GPT 翻譯錯誤:', error);
    throw new Error(`翻譯失敗: ${error.message}`);
  }
}
