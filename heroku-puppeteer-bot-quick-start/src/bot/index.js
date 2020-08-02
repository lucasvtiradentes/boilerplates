// IMPORTAR MÓDULOS ####################################################################################################
   const path = require('path');
   const puppeteer = require('puppeteer');

// IMPORTAR BIBLIOTECAS ################################################################################################
   const MOD_filesystem = require('../../src/bot/scripts/filesystem.js');
   const MOD_datetime = require('../../src/bot/scripts/datetime.js');
   const MOD_pup = require('../../src/bot/scripts/pup.js');
   const MOD_superOrdersPage = require('../../src/bot/scripts/superOrdersPage.js');

// DEFINIR CONSTANTES ##################################################################################################
   const TEMPO_DE_ATUALIZACAO = 1; // segundos
   const CAMINHO_PASTA_RESULTADOS = path.join(__dirname, '../analysis');
   const CAMINHO_ARQUIVO_RESULTADOS = path.join(CAMINHO_PASTA_RESULTADOS, '/bot_results.txt');

// EXECUAR FUNÇÕES #####################################################################################################
   main();

// FUNÇÃO PRINCIPAL ####################################################################################################
   async function main(){

      prepararPastasEArquivos();
      const times = await definirQuantidadeDeVezesExecutada();

      console.log(times);

      const OBJ_browser = await puppeteer.launch({
         defaultViewport: null,
         args: ['--no-sandbox', 
                '--disable-setuid-sandbox',
                '--start-maximized']
      });

      const PAG_super = await MOD_pup.getFirstBrowserWindow(OBJ_browser);
      const OBJ_puppeteer = {
         browser: OBJ_browser,
         pg_super: PAG_super
      }

      await logarnoSuper(PAG_super);
      await repeatFunction(OBJ_puppeteer, times)
   }

// DEFINIR FUNÇÕES SECUNDÁRIAS #########################################################################################
   async function prepararPastasEArquivos(){

      const BOL_PastaExiste = MOD_filesystem.verifyFolderExistance(CAMINHO_PASTA_RESULTADOS);
      const BOL_ArquivoExiste = MOD_filesystem.verifyFileExistance(CAMINHO_ARQUIVO_RESULTADOS);

         if (!BOL_PastaExiste){
            console.log('-> Pasta de resultados criada!');
            MOD_filesystem.createFolder(CAMINHO_PASTA_RESULTADOS);
         }

         if (!BOL_ArquivoExiste){
            console.log('-> Arquivo de resultados criado!');
            MOD_filesystem.createEmptyFile(CAMINHO_ARQUIVO_RESULTADOS, 'a');
         }

   }

   async function definirQuantidadeDeVezesExecutada(){

      const BOL_ArquivoExiste = MOD_filesystem.verifyFileExistance(CAMINHO_ARQUIVO_RESULTADOS);

      if (!BOL_ArquivoExiste){
         return 0;
      } else {
         let STR_Arquivo = MOD_filesystem.readFileContent(CAMINHO_ARQUIVO_RESULTADOS);
         let ARR_Arquivo = STR_Arquivo.split('\n');
         return Number(ARR_Arquivo.length) - 1;
      }

   }

   async function logarnoSuper(PAG_super){

      // 'https://admin.appsuper.com.br/orders/order/'
      const url = 'https://admin.appsuper.com.br/login/';
      await MOD_pup.openLinkInSpecifiedWindow(PAG_super, url);

      await MOD_pup.typeIntoAnElement(PAG_super, '#id_username', 'centraldeanalise@appsuper.com.br');
      await MOD_pup.typeIntoAnElement(PAG_super, '#id_password', 'a1b1275qw');
      await MOD_pup.clickElement(PAG_super, 'input[value="Acessar"]');
      await MOD_pup.waitPageLoad(PAG_super);    
      
   }


// FUNÇÃO DE REPETIR ###################################################################################################

   async function repeatFunction(OBJ_puppeteer, times){
      
      const vez_atual = Number(times) + 1;
      const data_atual = MOD_datetime.getCurrentDate();
      const hora_atual = MOD_datetime.getCurrentTime();

      const PAG_super = OBJ_puppeteer['pg_super'];
      const OBJ_browser = OBJ_puppeteer['browser'];

      await MOD_pup.openLinkInSpecifiedWindow(PAG_super, 'https://admin.appsuper.com.br/orders/order/?ordered_at__day=16&ordered_at__month=06&ordered_at__year=2020&status__exact=13');
      
      const ordersNumber = await MOD_pup.insertAndRunFunctionOnAPage(PAG_super, MOD_superOrdersPage.getTotalOrders, 'getTotalOrders(document)');
      const linha_colocar_no_arquivo = `${data_atual} - ${hora_atual} - ${vez_atual} -> Pedidos: ${ordersNumber}`;
      console.log(linha_colocar_no_arquivo);
      MOD_filesystem.addTextToFile(CAMINHO_ARQUIVO_RESULTADOS, linha_colocar_no_arquivo);

      await repeatFunction(OBJ_puppeteer, times + 1)
   }

// #####################################################################################################################
