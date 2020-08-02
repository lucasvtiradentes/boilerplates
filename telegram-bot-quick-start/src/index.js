   const telegramBot = require('node-telegram-bot-api');
   
// IMPORTAR VARIÁVEIS ##################################################################################################
   require('dotenv').config()
   
// DEFINIR VARIÁVEIS ###################################################################################################
   const BOT_TOKEN = process.env.BOT_TOKEN || 'your_key_here';
   const bot = new telegramBot(BOT_TOKEN, {polling: true});

// #####################################################################################################################
   bot.onText(/\/echo (.+)/, checkEchoMessage);
   bot.on('message', checkAnyOtherMessage);

   async function checkEchoMessage(msg, match){
      const chatId = msg.chat.id;
      const resp = match[1];
      
      console.log(`${chatId} -> ${resp}`);
      bot.sendMessage(chatId, resp);
   }

   async function checkAnyOtherMessage(msg){
      const chatId = msg.chat.id;
      bot.sendMessage(chatId, 'Received your message');
   }
// #####################################################################################################################
