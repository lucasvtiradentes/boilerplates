// #####################################################################################################################
   const MOD_superOrdersPage = require('../../../src/scripts/libraries/superOrdersPage.js');
   const MOD_superConvertions = require('../../../src/scripts/libraries/superConvertions.js');
   const MOD_superModifyPage = require('../../../src/scripts/libraries/superModifyPage.js');
      
   const MOD_datetime = require('../../../src/scripts/libraries/datetime.js');
   const MOD_aws = require('../../../src/scripts/libraries/aws.js');
   const MOD_pup = require('../../../src/scripts/libraries/pup.js');
   const MOD_telegram = require('../../../src/scripts/libraries/telegram.js');

// #####################################################################################################################
   module.exports = {
      saveContentToAws,
      getMessageInfo,
      showDefaultAllDoneMessage,

      logIntoSuper,

      command_category_aux,
      command_markets_aux,
      command_download_aux,
      command_orders_aux,
      command_checkOrder_aux
   }

// #####################################################################################################################

   function getMessageInfo(msg, opt_match){ // =========================================================================

      const msg_content = msg.text;
      const msg_split = msg_content.split(' ');
      const msg_firstWord = msg_split[0];
      const msg_restOfContent = msg_content.replace(`${msg_firstWord} `, '');
      const msg_type = msg_content[0] === "/" ? 'command' : 'regular';

      let messageInfo = {
         msg: msg,
         message_id: msg.message_id,
         chat_id: msg.chat.id,
         first_name: msg.chat.first_name,
         last_name: msg.chat.last_name,
         text_type: msg_type,
         text_content: msg_content,
         text_first_word: msg_firstWord,
         text_arguments: msg_restOfContent,
         text_words_array: msg_split,
         text_number_of_words: msg_split.length

      }

      if (opt_match){
         messageInfo = {...messageInfo, text_arguments: opt_match[1]}
      }

      return messageInfo;
   }

   async function saveContentToAws(msg_info, obj){ // ==================================================================

      const chatId = msg_info['chat_id'];
      const TODAY = MOD_datetime.getCurrentDate().replace(/\//g, '.');
      const AWS_BUCKET = obj['AWS_BUCKET'];
      const s3 = obj['s3'];

      const folderName = `${chatId}_${msg_info['first_name']}`;
      const fileName = `${chatId}_${TODAY}.txt`;
      const filePath = `${folderName}/${fileName}`; 
      const fileMsg = `${MOD_datetime.getCurrentTime()} - ${chatId} -> ${msg_info['text_content']} -> ${msg_info['bot_response']}`;

      let folderExist = await MOD_aws.checkFolderExistance(s3, AWS_BUCKET, folderName);
      if (!folderExist){
         await MOD_aws.createFolder(s3, AWS_BUCKET, folderName)
      }

      await MOD_aws.appendTextToFile(s3, AWS_BUCKET, filePath, fileMsg)
   }

   function showDefaultAllDoneMessage(msg_info){ // ====================================================================
      const lineToShow = `   ${MOD_datetime.getCurrentTime()} - ${msg_info['chat_id']} -> ${msg_info['text_content']} -> ${msg_info['bot_response']}`;
      console.log(lineToShow); 
   }

   function getCurrentCommandProperties(obj, msg_info){

      const current_command = msg_info['text_first_word'];
      const all_commands = obj['bot_commands']

      for(let x=0; x<all_commands.length; x++){
         let it_command = all_commands[x].command;

         if (it_command == current_command){
            return all_commands[x];
         }
      }


   }

// #####################################################################################################################

   async function logIntoSuper(PAG_super){ // ==========================================================================

      // 'https://admin.appsuper.com.br/orders/order/'
      const url = 'https://admin.appsuper.com.br/login/';
      await MOD_pup.openLinkInSpecifiedWindow(PAG_super, url);

      await MOD_pup.typeIntoAnElement(PAG_super, '#id_username', 'centraldeanalise@appsuper.com.br');
      await MOD_pup.typeIntoAnElement(PAG_super, '#id_password', 'a1b1275qw');
      await MOD_pup.clickElement(PAG_super, 'input[value="Acessar"]');
      await MOD_pup.waitPageLoad(PAG_super);    
      
   }

// #####################################################################################################################
   
   async function command_category_aux(obj, msg_info){ // ==============================================================

      const bot = obj['bot'];
      const chat_id = msg_info['chat_id']

      let opts = MOD_telegram.createDefaultMessageObject(msg_info['msg']);
      opts = MOD_telegram.addInterfaceMenu(opts, 'Eletrodomésticos');
      opts = MOD_telegram.addInterfaceMenu(opts, 'Perfumaria');
      opts = MOD_telegram.addInterfaceMenu(opts, 'Eletrônicos');

      bot.sendMessage(chat_id, 'Escolhe uma categoria aí irmão!', opts);

   }
   async function command_markets_aux(obj, msg_info){ // ===============================================================

      const bot = obj['bot'];
      const chat_id = msg_info['chat_id']
      let opts = MOD_telegram.createDefaultMessageObject(msg_info['msg']);
      opts = MOD_telegram.addInlineMenu(opts, 'Todos', {'command': 'markets', 'selected': 'todos'})
      opts = MOD_telegram.addInlineMenu(opts, 'Mateus Renascença', {'command': 'markets', 'selected': 'renascença'})
      opts = MOD_telegram.addInlineMenu(opts, 'Mateus Pedreira', {'command': 'markets', 'selected': 'pedreira'})

      bot.sendMessage(chat_id, 'Esses são os mercados cadastrados!', opts);
   }

   async function command_download_aux(obj, msg_info){ // ==============================================================

      const chatId = msg_info['chat_id'];
      const TODAY = MOD_datetime.getCurrentDate().replace(/\//g, '.');
      const AWS_BUCKET = obj['AWS_BUCKET'];
      const s3 = obj['s3'];

      const folderName = `${chatId}_${msg_info['first_name']}`;
      const fileName = `${chatId}_${TODAY}.txt`;
      const filePath = `${folderName}/${fileName}`; 

      let folderExist = await MOD_aws.checkFolderExistance(s3, AWS_BUCKET, folderName);
      if (!folderExist){
         return "nothing to see here"
      } else {
         console.log(`tentando: ${filePath}`);
         const fileContent = await MOD_aws.getFileContent(s3, AWS_BUCKET, filePath);
         return fileContent;
      }

   }

   async function command_orders_aux(obj){ // ==========================================================================

      const pup = obj['pup'];
      const PAG_super = pup['pg_super'];

      const today = MOD_datetime.getCurrentDate();
      const day = today.split('/')[0];
      const month = today.split('/')[1];
      const year = today.split('/')[2];
      
      await MOD_pup.openLinkInSpecifiedWindow(PAG_super, `https://admin.appsuper.com.br/orders/order/?ordered_at__day=${day}&ordered_at__month=${month}&ordered_at__year=${year}&status__exact=13`);
      const ordersNumber = await MOD_pup.insertAndRunFunctionOnAPage(PAG_super, MOD_superOrdersPage.getTotalOrders, 'getTotalOrders(document)');

      return ordersNumber;

   } 

// #####################################################################################################################

   async function command_checkOrder_aux(obj, msg_info){ // ============================================================

      const pup = obj['pup'];
      const PAG_super = pup['pg_super'];
      let input_error = false;
      let response;

      const current_command = getCurrentCommandProperties(obj, msg_info);
      const command_arguments = msg_info['text_words_array'];
      const orderNumber = command_arguments[1] ? command_arguments[1] : "";

      if(command_arguments.length < 2 || command_arguments.length > 3){input_error = true}
      if(orderNumber.length != '2020061983807'.length){input_error = true}
      if (input_error){return false}

      await MOD_pup.openLinkInSpecifiedWindow(PAG_super, `https://admin.appsuper.com.br/orders/order/?q=${orderNumber}`)
      const orderId = await MOD_pup.insertAndRunFunctionOnAPage(PAG_super, MOD_superConvertions.getOrderId, 'getOrderId(document)');
      await MOD_pup.openLinkInSpecifiedWindow(PAG_super, MOD_superConvertions.getOrderModifyLink(orderId));

      const name = await MOD_pup.insertAndRunFunctionOnAPage(PAG_super, MOD_superModifyPage.getName, 'getName(document)');
      const phone = await MOD_pup.insertAndRunFunctionOnAPage(PAG_super, MOD_superModifyPage.getPhone, 'getPhone(document)');
      const all = `nome:     ${name}` + '\n' + 
                  `telefone: ${phone}`;

      if (command_arguments.length == 2){
         response = all;
      } else {
         
         if (command_arguments[2] == '--all'){
            response = all;
         } else if (command_arguments[2] == '--phone'){
            response = `telefone: ${phone}`;
         } else if (command_arguments[2] == '--name'){
            response = `nome: ${name}`;
         } else {
            response = false;
         }
      }

      return response;
   }

// #####################################################################################################################