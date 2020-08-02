// IMPORTAR MÓDULOS ####################################################################################################
   const express = require('express');
   const { readFile } = require('fs');

// IMPORTAR CONSTANTES #################################################################################################
   const app = express();
   const port = process.env.PORT || 3000;

// IMPORTAR CONSTANTES #################################################################################################
   app.get('/', function(request, response){
      readFile('./src/index.html', 'utf8', function(error, page){
         if (error){response.status(500).send('Servidor com problema')}
         response.send(page);
      });
   });

   app.listen(port, function() {
      console.log(`Example app listening at http://localhost:${port}`);
   });