// IMPORTAR MÓDULOS ####################################################################################################
   const fs = require('fs');

// EXPORTAR FUNÇÕES ####################################################################################################
   module.exports = {

      verificarExistenciaArquivo,
      apagarArquivo,
      criarArquivoVazio,
      adicionarStringNoArquivoTexto,
      obterConteudoArquivoTexto,

      verificarExistenciaPasta,
      criarPasta
   }

// DEFINIR FUNÇÕES #####################################################################################################
   async function adicionarStringNoArquivoTexto(ARG_STR_CaminhoArquivo, ARG_STR_StringADD){
      if (!ARG_STR_StringADD){return}
      ARG_STR_StringADD =  ARG_STR_StringADD + '\n';
      fs.appendFileSync(ARG_STR_CaminhoArquivo, ARG_STR_StringADD);
   }

   function obterConteudoArquivoTexto(ARG_STR_CaminhoArquivo){
      const STR_dados = fs.readFileSync(ARG_STR_CaminhoArquivo, 'utf8');
      return STR_dados;
   }

   function criarPasta(ARG_STR_CaminhoPasta){
      if (!fs.existsSync(ARG_STR_CaminhoPasta)){
         fs.mkdirSync(ARG_STR_CaminhoPasta);
      }
   }

   function verificarExistenciaPasta(ARG_STR_CaminhoPasta){
      return fs.existsSync(ARG_STR_CaminhoPasta);
   }

   function criarArquivoVazio(ARG_STR_CaminhoArquivo, ARG_BOL_SubstituirConteudoAnteriorCasoExista){
      if (!ARG_STR_CaminhoArquivo){return}
      let STR_OpcaoSubstituir = ARG_BOL_SubstituirConteudoAnteriorCasoExista ? 'w' : 'a'; // 'a' nao substitui o antigo, 'w' substitui
      fs.closeSync(fs.openSync(ARG_STR_CaminhoArquivo, STR_OpcaoSubstituir)) 
   }

   function verificarExistenciaArquivo(ARG_STR_CaminhoArquivo){
      return fs.existsSync(ARG_STR_CaminhoArquivo);
   }

   function apagarArquivo(ARG_STR_CaminhoArquivo){
      try {
         fs.unlinkSync(ARG_STR_CaminhoArquivo)
         return true;
      } catch(err) {
         return false;
      }
   }