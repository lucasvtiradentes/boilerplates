// IMPORTAR MÓDULOS ####################################################################################################
   const express = require('express');
   const puppeterApp = require('../src/app.js');

// IMPORTAR MÓDULOS ####################################################################################################
   const port = process.env.PORT || 8080;
   const server = express();

// IMPORTAR MÓDULOS ####################################################################################################
   server.get('/', async function(req, res) {
      await puppeterApp.main(req, res);
   });

// IMPORTAR MÓDULOS ####################################################################################################
   server.listen(port, function() {
      console.log('server listening on port ' + port)
   })
