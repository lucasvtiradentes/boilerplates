// IMPORTAR MÓDULOS ####################################################################################################

// IMPORTAR BIBLIOTECAS ################################################################################################

// IMPORTAR COMPONENTES ################################################################################################

// IMPORTAR CONFIGURAÇÕES ##############################################################################################
   const CONFIGS1 = require('./configs/configs.js');
   const CONFIGS2 = require('./configs/configs_env.js');
   const CONFIGS3 = require('./configs/configs_json.js').importarConfiguracoes('./src/configs/configs.json');

// DEFINIR VARIÁVEIS ###################################################################################################
   process.title = "Título do Programa";

// DEFINIR VARIÁVEIS ###################################################################################################
   const ARUMENTOS = process.argv;
   const TITULO = process.title;
   const PASTA_ATUAL = process.cwd();

// CHECAR CONDIÇÕES DE EXECUÇÃO ########################################################################################
   if (ARUMENTOS.length <= 2) {
      console.log("Usage: " + __filename + " path/to/directory");
      // process.exit(-1);
   }

// EXECUTAR FUNÇÕES ####################################################################################################
   executarFuncaoPrincipal();
   obterNomeUsuario()

// DEFINIR FUNÇÕES #####################################################################################################
   function executarFuncaoPrincipal(){

      console.log('\n' + 'CONFIGURAÇÕES NORMAIS: ');
      console.table(CONFIGS1);

      console.log('\n' + 'CONFIGURAÇÕES COM ARQUIVO .ENV');
      console.table(CONFIGS2);

      console.log('\n' + 'CONFIGURAÇÕES COM ARQUIVO .JSON');
      console.table(CONFIGS3);

      console.log('\n' + 'ARGUMENTOS');
      console.log(ARUMENTOS);
      
      console.log('\n' + 'TÍTULO DO PROGRAMA');
      console.log(TITULO);
      
      console.log('\n' + 'PASTA DO ARQUIVO');
      console.log(PASTA_ATUAL);
   }

   function obterNomeUsuario(){

      console.log('\n' + 'Digite o seu nome: ');
      process.stdin.setEncoding('utf8');
      process.stdin.on('readable', () => {
         let STR_nome = process.stdin.read();
         if (STR_nome !== null){
           console.log(`Nome do usuário é ${STR_nome}`)
         }
      })

   }
