// IMPORTAR MÓDULOS ####################################################################################################
   const express = require('express');
   const { readFile } = require('fs');

// DEFINIR CONSTANTES ##################################################################################################
   const server = express();
   const port = process.env.PORT || 3000;

// DEFINIR PASTAS ACESSÍVEIS #######################################################################################################
   server.use('/analysis', express.static(__dirname + '/analysis'))
   server.use(express.static(__dirname + '/public'))

// DEFINIR ROTAS #######################################################################################################
   server.get('/', function(request, response){
      readFile('./src/pages/index.html', 'utf8', function(error, page){
         if (error){response.status(500).send('Servidor com problema')}
         response.send(page);
      });
   });

   server.get('/bot01', function(request, response){
      readFile('./src/bot_01/analysis/results.txt', 'utf8', function(error, page){
         if (error){response.status(500).send('Servidor com problema')}
         const conteudoFormatado = page.split('\n');
         response.send(conteudoFormatado);
      });
   });

// ESCUTAR PORTAS ######################################################################################################
   server.listen(port, function() {
      console.log(`Example server listening at http://localhost:${port}`);
   });

// EXECUTAR BOTS #######################################################################################################
   require('../src/bot_01/index.js')
   require('../src/bot_02/index.js')