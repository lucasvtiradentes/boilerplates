// #####################################################################################################################

// #####################################################################################################################
   module.exports = {
      createDefaultMessageObject,
      addInlineMenu,
      addInterfaceMenu
   }

// #####################################################################################################################

   function createDefaultMessageObject(msg){
      return {
         reply_to_message_id: msg.message_id,
         reply_markup: {
            keyboard: [],
            inline_keyboard: []
         }
      };
   }

   function addInterfaceMenu(message_opts, keyboardText){ // ===========================================================

      if (!message_opts){return}

      const inLineMenu_content = message_opts.reply_markup.keyboard;
      const message_object = keyboardText;
      let inLineMenu_new_content = new Array();

         if (inLineMenu_content.length === 0){
            inLineMenu_new_content.push(message_object)
         } else {
            let previous_content = inLineMenu_content[0];

               for(let x=0; x<previous_content.length; x++){
                  let it_message_obj = previous_content[x];
                  inLineMenu_new_content.push(it_message_obj)
               }

            inLineMenu_new_content.push(message_object)
         }

      message_opts.reply_markup.keyboard = [inLineMenu_new_content]
      return message_opts;

   }


   function addInlineMenu(message_opts, buttonText, ButtonObjData){ // =================================================

      if (!message_opts){return}

      const inLineMenu_content = message_opts.reply_markup.inline_keyboard;
      const message_object = {text: buttonText, callback_data: JSON.stringify(ButtonObjData)};
      let inLineMenu_new_content = new Array();

         if (inLineMenu_content.length === 0){
            inLineMenu_new_content.push(message_object)
         } else {
            let previous_content = inLineMenu_content[0];

               for(let x=0; x<previous_content.length; x++){
                  let it_message_obj = previous_content[x];
                  inLineMenu_new_content.push(it_message_obj)
               }

            inLineMenu_new_content.push(message_object)
         }

      message_opts.reply_markup.inline_keyboard = [inLineMenu_new_content]

      return message_opts;
   }


// #####################################################################################################################