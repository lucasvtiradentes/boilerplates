// IMPORTAR MÓDULOS ####################################################################################################
   const fs = require('fs')

// EXPORTAR FUNÇÕES ####################################################################################################
   module.exports = {
      importarConfiguracoes,
      salvarNovasConfiguracoes
   }

// DEFINIR FUNÇÕES #####################################################################################################
   function importarConfiguracoes(ARG_STR_CaminhoJson){

      try {
         const jsonString = fs.readFileSync(ARG_STR_CaminhoJson);
         const jsonObject = JSON.parse(jsonString);
         return jsonObject;
      } catch(err) {
         console.log(err)
         return;
      }
      
   }

   function salvarNovasConfiguracoes(ARG_STR_CaminhoJson, OBJ_NovasConfigs){

      try {
         const jsonStringfied = JSON.stringify(OBJ_NovasConfigs, null, 2);
         fs.writeFileSync(ARG_STR_CaminhoJson, jsonStringfied);
      } catch(err) {
         console.log(err)
         return;
      }
      
   }