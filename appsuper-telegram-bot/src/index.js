// FIX 'node-telegram-bot-api' ISSUE ###################################################################################
   process.env.NTBA_FIX_319 = 1;

// IMPORT MODULES ######################################################################################################
   const telegramBot = require('node-telegram-bot-api');
   const MOD_bot = require('./scripts/components/bot.js');
   const MOD_functions = require('../src/scripts/components/functions.js');
   const MOD_commands = require('../src/scripts/components/commands.js');

// IMPORT VARIABLES ####################################################################################################
   require('dotenv').config()
   
// SET CONSTANTS #######################################################################################################
   const BOT_TOKEN = process.env.BOT_TOKEN || 'your_key_here';

// #####################################################################################################################
   const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
   const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
   const AWS_REGION = process.env.AWS_REGION;
   const AWS_BUCKET = process.env.AWS_BUCKET;

// #####################################################################################################################
   main()

// #####################################################################################################################
   async function main(){

      // SETUP BOT OBJECTS _____________________________________________________
         const bot_commands = MOD_commands.getBotCommandsArray();
         const bot = new telegramBot(BOT_TOKEN, {polling: true});
         const s3 = await MOD_bot.setUpAwsCredentials(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION)
         const pup = await MOD_bot.getPuppeteerObjects();
         await MOD_functions.logIntoSuper(pup['pg_super']);

         const DEFAULT_OBJECT = {bot: bot, s3: s3, AWS_BUCKET: AWS_BUCKET, pup: pup, bot_commands: bot_commands};

      // SETUP BOT COMMANDS ____________________________________________________
         console.log('## AVAILABLE BOT COMMANDS #################');
         MOD_bot.setUpBotListeningToCommands(DEFAULT_OBJECT);
         MOD_bot.showAllAvailableCommands(DEFAULT_OBJECT);

      // WAITING FOR CONTACT ___________________________________________________
         console.log('## WAITING FOR CONTACT ####################');

   }

// #####################################################################################################################