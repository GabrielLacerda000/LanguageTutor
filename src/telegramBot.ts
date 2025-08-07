// telegramBot.ts
import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  const welcomeMessage = `
    Olá! 👋

    Sou a Lumi, sua assistente pessoal de idiomas.  

    E eu vou sugerir melhorias de forma inteligente! 💡  
    `;

  bot.sendMessage(chatId, welcomeMessage, { parse_mode: 'Markdown' });
});


bot.onText(/\/tutor (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const messageText = match?.[1];

  if (!messageText) {
    return bot.sendMessage(chatId, 'Por favor, envie uma mensagem após o comando /tutor.');
  }

  try {
    const response = await fetch('http://localhost:3000/tutor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: messageText,
        language: 'português'
      })
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json();
    const corrected = data.result || 'Nenhuma sugestão encontrada.';
    bot.sendMessage(chatId, corrected);
  } catch (err) {
    console.error(err);
    bot.sendMessage(chatId, 'Erro ao processar a mensagem. Tente novamente.');
  }
});
