// IMPORTAR MÓDULO DE VARIÁVEIS AMBIENTES ##############################################################################
   const dotenv = require('dotenv');
   const result = dotenv.config();

      if (result.error) {
         throw "O '.env' não foi encontrado o arquivo!";
      }

// OBTER VARIÁVEIS AMBIENTES ###########################################################################################
   const username = process.env.username;
   const password = process.env.password;
   const userAge = process.env.userAge;
   const showConsole = process.env.showConsole;

// EXPORTAR VARIÁVEIS AMBIENTES ########################################################################################
   module.exports = {
      username,
      password,
      userAge,
      showConsole
   }