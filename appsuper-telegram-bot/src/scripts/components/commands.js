// #####################################################################################################################
   const MOD_functions = require('../../../src/scripts/components/functions.js');

// #####################################################################################################################
   module.exports = {
      getBotCommandsArray
   };

// #####################################################################################################################

   function getBotCommandsArray(){ // ==================================================================================

      const ARR_commands = new Array();
   
      addBotCommand(ARR_commands, '/start', 'single', 'text', command_start, []);
      addBotCommand(ARR_commands, '/categories', 'single', 'text', command_categories, []);
      addBotCommand(ARR_commands, '/markets', 'single', 'text', command_markets, []);
      addBotCommand(ARR_commands, '/download', 'single', 'text', command_download, ['--date', '--today']);
      addBotCommand(ARR_commands, '/orders', 'single', 'text', command_orders, ['--all', '--market', '--status']);
   
      addBotCommand(ARR_commands, '/echo', 'with_arguments', 'text', command_echo, ['--bold', '--italic', '--underline']);
      addBotCommand(ARR_commands, '/checkorder', 'with_arguments', 'text', command_checkOrder, ['--all', '--name', '--phone']);
         
      return ARR_commands;

   }

   function addBotCommand(arrCommands, command, command_type, response_type, function_to_run, available_arguments){ // =

      const command_obj = {
         command: command,                            // 
         command_type: command_type,                  // single / arguments
         response_type: response_type,                // text / image / pdf
         function_to_run: function_to_run,            // 
         available_arguments: available_arguments,    //  
      };
   
      arrCommands.push(command_obj)
   
   }

// #####################################################################################################################

   async function defaultCheckMessage(msg, DICTIONARY, obj){// =========================================================

      let msg_info = MOD_functions.getMessageInfo(msg);
      const chatId = msg_info['chat_id'];
      const availableCommands = Object.keys(DICTIONARY);
      const currentCommand = msg_info['text_first_word'];
      const isDefinedCommand = availableCommands.indexOf(currentCommand) > -1 ? true : false;

      const bot_response = `${msg_info['first_name']}, anotado!`
      msg_info = {...msg_info, bot_response: bot_response};

      if (!isDefinedCommand){
         const bot = obj['bot'];
         bot.sendMessage(chatId, bot_response);
         await MOD_functions.saveContentToAws(msg_info, obj);
         MOD_functions.showDefaultAllDoneMessage(msg_info)
      }
   }

// #####################################################################################################################

   async function command_start(msg, obj){
      let msg_info = MOD_functions.getMessageInfo(msg);
      const chatId = msg_info['chat_id'];
      const text_arguments = msg_info['text_arguments'];

      const bot_response = `Olá ${msg_info['first_name']}, eis aqui os comandos disponíveis: ` + '\n\n'+ 
                           `\/start | para ver essa mensagem` + '\n' + 
                           `\/categories | para selecionar uma categoria` + '\n' + 
                           `\/markets | para escolher o mercado que mais lhe agrada` + '\n' + 
                           `\/download | para ver o histórico de mensagens trocadas comigo hoje` + '\n' + 
                           `\/orders | para ver a quantidade de pedidos em análise hoje` + '\n\n' + 
                           `\/echo [Mensagem] | para eu repetir o que você disse` + '\n' + 
                           `\/checkOrder [N° do pedido] {--all --name -- phone} | para verificar informações de um pedido`;

      msg_info = {...msg_info, bot_response: bot_response};
      
      const bot = obj['bot'];
      bot.sendMessage(chatId, bot_response, {reply_to_message_id: msg_info['message_id']});
      await MOD_functions.saveContentToAws(msg_info, obj);
      
      MOD_functions.showDefaultAllDoneMessage(msg_info)   
   }

   async function command_categories(msg, obj){
      let msg_info = MOD_functions.getMessageInfo(msg);
      const chatId = msg_info['chat_id'];
      const text_arguments = msg_info['text_arguments'];

      const bot_response = '#menu to select#'
      
      await MOD_functions.command_category_aux(obj, msg_info);
      const bot = obj['bot'];

      MOD_functions.showDefaultAllDoneMessage(msg_info)   
   }

   async function command_markets(msg, obj){ // ========================================================================
      let msg_info = MOD_functions.getMessageInfo(msg);
      const chatId = msg_info['chat_id'];
      const text_arguments = msg_info['text_arguments'];

      const bot_response = '#menu to select#'
      
      await MOD_functions.command_markets_aux(obj, msg_info);
      const bot = obj['bot'];
      
      MOD_functions.showDefaultAllDoneMessage(msg_info)   
   }

   async function command_download(msg, obj){ // =======================================================================
      let msg_info = MOD_functions.getMessageInfo(msg);
      const chatId = msg_info['chat_id'];
      const text_arguments = msg_info['text_arguments'];

      const bot_response = await MOD_functions.command_download_aux(obj, msg_info);
      msg_info = {...msg_info, bot_response: bot_response};
      
      const bot = obj['bot'];
      bot.sendMessage(chatId, bot_response, {reply_to_message_id: msg_info['message_id']});
      await MOD_functions.saveContentToAws(msg_info, obj);
      
      MOD_functions.showDefaultAllDoneMessage(msg_info)   
   }

   async function command_orders(msg, obj){ // =========================================================================
      let msg_info = MOD_functions.getMessageInfo(msg);
      const chatId = msg_info['chat_id'];
      const text_arguments = msg_info['text_arguments'];

      const bot_response = await MOD_functions.command_orders_aux(obj);
      msg_info = {...msg_info, bot_response: bot_response};
      
      const bot = obj['bot'];
      bot.sendMessage(chatId, bot_response, {reply_to_message_id: msg_info['message_id']});
      await MOD_functions.saveContentToAws(msg_info, obj);
      
      MOD_functions.showDefaultAllDoneMessage(msg_info)   
   }

// #####################################################################################################################

   async function command_echo(msg, match, obj){ // ====================================================================

      let msg_info = MOD_functions.getMessageInfo(msg, match);
      const chatId = msg_info['chat_id'];

      const bot_response = msg_info['text_arguments'];
      msg_info = {...msg_info, bot_response: bot_response};

      const bot = obj['bot'];
      bot.sendMessage(chatId, bot_response, {reply_to_message_id: msg_info['message_id']});
      await MOD_functions.saveContentToAws(msg_info, obj);

      MOD_functions.showDefaultAllDoneMessage(msg_info)
   }

   async function command_checkOrder(msg, match, obj){

      let msg_info = MOD_functions.getMessageInfo(msg, match);
      const chatId = msg_info['chat_id'];
      const text_arguments = msg_info['text_arguments'];

      const bot_response = await MOD_functions.command_checkOrder_aux(obj, msg_info);
      msg_info = {...msg_info, bot_response: bot_response};
      
      const bot = obj['bot'];
      bot.sendMessage(chatId, bot_response, {reply_to_message_id: msg_info['message_id']});
      await MOD_functions.saveContentToAws(msg_info, obj);
      
      MOD_functions.showDefaultAllDoneMessage(msg_info);   

   }

// #####################################################################################################################
