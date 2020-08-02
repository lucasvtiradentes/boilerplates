// IMPORTAR MÓDULOS ####################################################################################################
   const express = require('express');
   const aws = require('aws-sdk');
   const ejs = require('ejs');

// DEFINIR CONSTANTES ##################################################################################################
   const server = express();
   const S3_BUCKET = process.env.S3_BUCKET;
   const port = process.env.PORT || 3000;

// CONFIGURAR SERVIDOR #################################################################################################
   server.use(express.static('./src/pages'));
   server.engine('html', ejs.renderFile);
   server.listen(port);

// CONFIGURAR SERVIDOR AWS #############################################################################################
   aws.config.region = 'us-east-2';

// DEFINIR ROTAS #######################################################################################################
   server.get('/', function(req, res){
      res.render('index.html')
   });

   server.get('/sign-s3', function(req, res){
      const s3 = new aws.S3();
      const fileName = req.query['file-name'];
      const fileType = req.query['file-type'];
      const s3Params = {
         Bucket: S3_BUCKET,
         Key: fileName,
         Expires: 60,
         ContentType: fileType,
         ACL: 'public-read'
      };

      s3.getSignedUrl('putObject', s3Params, (err, data) => {
         if(err){
            console.log(err);
            return res.end();
         }
         const returnData = {
            signedRequest: data,
            url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
         };
         res.write(JSON.stringify(returnData));
         res.end();
      });
   });

   server.post('/save-details', function(req, res){
      res.send('file uploaded')
   });
// #####################################################################################################################