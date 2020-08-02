// #####################################################################################################################
   const puppeteer = require('puppeteer');

   const MOD_aws = require('../../../src/scripts/libraries/aws.js');
   const MOD_pup = require('../../../src/scripts/libraries/pup.js');

// #####################################################################################################################
   module.exports = {

      showAllAvailableCommands,
      setUpBotListeningToCommands,

      getPuppeteerObjects,
      
      setUpAwsCredentials

   }

// #####################################################################################################################

   function showAllAvailableCommands(DEFAULT_OBJECT){ // ===============================================================

      const bot_commands = DEFAULT_OBJECT['bot_commands'];
      
         for(let x=0; x<bot_commands.length; x++){
            const command_obj = bot_commands[x];
            console.log(`${command_obj['command']} -> ${command_obj.command_type} -> ${command_obj['function_to_run'].name}`);
         }

   }

   function setUpBotListeningToCommands(DEFAULT_OBJECT){ // ============================================================

      const bot = DEFAULT_OBJECT['bot'];
      const bot_commands = DEFAULT_OBJECT['bot_commands'];

      for(let x=0; x<bot_commands.length; x++){

         const command_obj = bot_commands[x];
         const command = command_obj.command;
         const command_type = command_obj.command_type;
         const command_function = command_obj.function_to_run;

            if (command_type === 'single'){
               setUpBotCommand_single(bot, command, command_function, DEFAULT_OBJECT)
            } else if (command_type === 'with_arguments'){
               setUpBotCommand_withArguments(bot, command, command_function, DEFAULT_OBJECT)
            } else if (command_type === 'word'){
               setUpBotCommand_word(bot, command, command_function, DEFAULT_OBJECT)
            }
            
      }

      // bot.on('message', function(msg){
      //    MOD_commands.defaultCheckMessage(msg, BOT_DICTIONARY, DEFAULT_OBJECT)
      // });

      bot.on('callback_query', function onCallbackQuery(callbackQuery) {
      
         const data = JSON.parse(callbackQuery.data);
         
         const opts = {
            chat_id: callbackQuery.message.chat.id,
            message_id: callbackQuery.message.message_id,
         };
   
         if (data.command === 'markets') {
            bot.sendMessage(opts.chat_id, `o ${data.selected} é top!`);
            bot.answerCallbackQuery(callbackQuery.id);
         }
   
        });

   }

   function setUpBotCommand_single(bot, command, functionToRun, functionArguments){

      const command_reg = new RegExp("\\" + command);

      bot.onText(command_reg, function(msg){
         functionToRun(msg, functionArguments)
      })

   }
   
   function setUpBotCommand_withArguments(bot, command, functionToRun, functionArguments){

      const command_reg = new RegExp("\\" + command + " (.+)");

      bot.onText(command_reg, function(msg, match){
         functionToRun(msg, match, functionArguments)
      })
   }

   function setUpBotCommand_word(bot, command, functionToRun, functionArguments){

      const command_reg = new RegExp(command);

      bot.onText(command_reg, function(msg){
         functionToRun(msg, functionArguments)
      })
   }

// #####################################################################################################################

   async function getPuppeteerObjects(){ // ============================================================================

      const OBJ_browser = await puppeteer.launch({
         // headless: false,
         defaultViewport: null,
         args: ['--no-sandbox', 
               '--disable-setuid-sandbox',
               '--start-maximized']
      });

      const PAG_super = await MOD_pup.getFirstBrowserWindow(OBJ_browser); 
      await MOD_pup.fixPageTimeOutError(PAG_super);

      const OBJ_puppeteer = {
         browser: OBJ_browser,
         pg_super: PAG_super
      }

      return OBJ_puppeteer;

   }


// #####################################################################################################################

   async function setUpAwsCredentials(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION){ // ========================
      MOD_aws.setAwsCredentialsFromObject(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION);
      const s3 = MOD_aws.getAwsS3DefaultInstance();
      return s3;
   }

// #####################################################################################################################