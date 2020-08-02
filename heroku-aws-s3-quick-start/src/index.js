// IMPORTAR MÓDULOS ####################################################################################################
   const fs = require('fs');
   const s3fs = require('s3fs');
   const multiparty = require('connect-multiparty');

// #####################################################################################################################
 
   const multipartyMiddleware = multiparty();
   const myBucket = new s3fs('lvtNewBucket', {
      acessKeyId: '',
      secretAcessKey: '',
   });

