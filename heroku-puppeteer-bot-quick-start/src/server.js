// IMPORTAR MÓDULOS ####################################################################################################
   const express = require('express');
   const { readFile } = require('fs');

// DEFINIR CONSTANTES ##################################################################################################
   const port = process.env.PORT || 8080; // 3000
   const server = express();

// CONFIGURAR SERVIDOR #################################################################################################
   // server.use('/pages', express.static(__dirname + '/pages'))
   server.use('/analysis', express.static(__dirname + '/analysis'))
   server.use(express.static(__dirname + '/pages'))
   
// DEFINIR ROTAS #######################################################################################################
   server.get('/', async function(request, response) {
      readFile('./src/pages/index.html', 'utf8', function(error, page){
         if (error){response.status(500).send('Servidor com problema')}
         response.send(page);
      });
   });

   server.get('/bot', function(request, response){
      readFile('./src/analysis/bot_results.txt', 'utf8', function(error, page){
         if (error){response.status(500).send('Servidor com problema')}

         if (page){
            const conteudoFormatado = page.split('\n');
            response.send(conteudoFormatado);
         } else {
            response.send(`Não achei o bagulho!`);
         }
      });
   });

// DEFINIR PORTAS ######################################################################################################
   server.listen(port, function() {
      console.log('server listening on port ' + port)
   })

// EXECUTAR PORTA ######################################################################################################
   require('../src/bot/index.js')
