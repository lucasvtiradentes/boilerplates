// IMPORTAR MÓDULOS ####################################################################################################
   const path = require('path');

// IMPORTAR BIBLIOTECAS ################################################################################################
   const MOD_filesystem = require('../../src/bot_01/scripts/filesystem.js');
   const MOD_datetime = require('../../src/bot_01/scripts/datetime.js');

// DEFINIR CONSTANTES ##################################################################################################
   const TEMPO_DE_ATUALIZACAO = 1; // segundos
   const CAMINHO_PASTA_RESULTADOS = path.join(__dirname, '../analysis');
   const CAMINHO_ARQUIVO_RESULTADOS = path.join(CAMINHO_PASTA_RESULTADOS, '/bot_01_results.txt')
   let GBL_VezesExecutadas;

// EXECUAR FUNÇÕES #####################################################################################################
   main();

// FUNÇÃO PRINCIPAL ####################################################################################################
   async function main(){
      prepararPastasEArquivos();
      definirQuantidadeDeVezesExecutada();      
      setInterval(repeatFunction, Number(TEMPO_DE_ATUALIZACAO*1000));
   }

// DEFINIR FUNÇÕES SECUNDÁRIAS #########################################################################################
   async function prepararPastasEArquivos(){

      const BOL_ArquivoExiste = MOD_filesystem.verificarExistenciaArquivo(CAMINHO_ARQUIVO_RESULTADOS);
      const BOL_PastaExiste = MOD_filesystem.verificarExistenciaPasta(CAMINHO_PASTA_RESULTADOS);

         if (!BOL_PastaExiste){
            console.log('-> Pasta de resultados criada!');
            MOD_filesystem.criarPasta(CAMINHO_PASTA_RESULTADOS);
         }

         if (!BOL_ArquivoExiste){
            console.log('-> Arquivo de resultados criado!');
            MOD_filesystem.criarArquivoVazio(CAMINHO_ARQUIVO_RESULTADOS, 'a');
         }

   }

   async function definirQuantidadeDeVezesExecutada(){

      const BOL_ArquivoExiste = MOD_filesystem.verificarExistenciaArquivo(CAMINHO_ARQUIVO_RESULTADOS);

      if (!BOL_ArquivoExiste){
         GBL_VezesExecutadas = 0;
      } else {
         let STR_Arquivo = MOD_filesystem.obterConteudoArquivoTexto(CAMINHO_ARQUIVO_RESULTADOS);
         let ARR_Arquivo = STR_Arquivo.split('\n');
         GBL_VezesExecutadas = Number(ARR_Arquivo.length) - 1;
      }

   }

   async function repeatFunction(){
      
      const vez_atual = Number(GBL_VezesExecutadas) + 1;
      const data_atual = MOD_datetime.obterDataAtual();
      const hora_atual = MOD_datetime.obterHoraAtual();
      const linha_colocar_no_arquivo = `${data_atual} - ${hora_atual} - ${vez_atual}`;

      console.log(linha_colocar_no_arquivo); 
      MOD_filesystem.adicionarStringNoArquivoTexto(CAMINHO_ARQUIVO_RESULTADOS, linha_colocar_no_arquivo);

      GBL_VezesExecutadas = GBL_VezesExecutadas + 1;
   }