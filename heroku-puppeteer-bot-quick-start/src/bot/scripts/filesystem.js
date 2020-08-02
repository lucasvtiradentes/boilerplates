// LAST EDIT: 15/06/2020

// IMPORTAR MÓDULOS ####################################################################################################
   const fs = require('fs');

// EXPORTAR FUNÇÕES ####################################################################################################
   module.exports = {

      addTextToFile,
      readFileContent,
      createEmptyFile,
      verifyFileExistance,
      deleteFile,

      createFolder,
      verifyFolderExistance

   }

// DEFINIR FUNÇÕES #####################################################################################################
   async function addTextToFile(ARG_STR_CaminhoArquivo, ARG_STR_StringADD){

      if (process.env.DEBUG === 'true'){console.log('MOD_filesystem: ' + 'addTextToFile')}

      if (!ARG_STR_StringADD){return}
      ARG_STR_StringADD =  ARG_STR_StringADD + '\n';
      fs.appendFileSync(ARG_STR_CaminhoArquivo, ARG_STR_StringADD);
   }

   function readFileContent(ARG_STR_CaminhoArquivo){

      if (process.env.DEBUG === 'true'){console.log('MOD_filesystem: ' + 'readFileContent')}

      const STR_dados = fs.readFileSync(ARG_STR_CaminhoArquivo, 'utf8');
      return STR_dados;
   }

   function createEmptyFile(ARG_STR_CaminhoArquivo, ARG_BOL_SubstituirConteudoAnteriorCasoExista){

      if (process.env.DEBUG === 'true'){console.log('MOD_filesystem: ' + 'createEmptyFile')}

      if (!ARG_STR_CaminhoArquivo){return}
      let STR_OpcaoSubstituir = ARG_BOL_SubstituirConteudoAnteriorCasoExista ? 'w' : 'a'; // 'a' nao substitui o antigo, 'w' substitui
      fs.closeSync(fs.openSync(ARG_STR_CaminhoArquivo, STR_OpcaoSubstituir)) 
   }

   function verifyFileExistance(ARG_STR_CaminhoArquivo){

      if (process.env.DEBUG === 'true'){console.log('MOD_filesystem: ' + 'verifyFileExistance')}
      
      return fs.existsSync(ARG_STR_CaminhoArquivo);
   }

   function deleteFile(ARG_STR_CaminhoArquivo){

      if (process.env.DEBUG === 'true'){console.log('MOD_filesystem: ' + 'deleteFile')}

      try {
         fs.unlinkSync(ARG_STR_CaminhoArquivo)
         return true;
      } catch(err) {
         return false;
      }
   }




   
   function createFolder(ARG_STR_CaminhoPasta){

      if (process.env.DEBUG === 'true'){console.log('MOD_filesystem: ' + 'createFolder')}

      if (!verifyFolderExistance(ARG_STR_CaminhoPasta)){
         fs.mkdirSync(ARG_STR_CaminhoPasta);
      }
   }

   function verifyFolderExistance(ARG_STR_CaminhoPasta){

      if (process.env.DEBUG === 'true'){console.log('MOD_filesystem: ' + 'verifyFolderExistance')}

      return fs.existsSync(ARG_STR_CaminhoPasta);
   }
