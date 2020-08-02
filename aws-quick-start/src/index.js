// #####################################################################################################################
   const AWS = require('aws-sdk');
   const MOD_aws = require('../src/libraries/aws.js');

// #####################################################################################################################
   main();

// #####################################################################################################################
   async function main(){

      // SET SOME CONSTANTS ____________________________________________________
         const bucketName = 'lvt-file-saver';
         const fileName = 'testa.txt';
         
      // LOG IN INTO AWS S3 ____________________________________________________
         // MOD_aws.setAwsCredentialsFromEnvFile();
         // MOD_aws.setAwsCredentialsFromObject("", "");
         MOD_aws.setAwsCredentialsFromJsonFile('./src/configs/credentials.json');

      // CHECK IF USER IS LOGED IN _____________________________________________
         MOD_aws.checkIfUserIsAuthenticated();
         const s3 = MOD_aws.getAwsS3DefaultInstance();

      // TEST SOME FUNCTIONS ___________________________________________________
         await MOD_aws.appendTextToFile(s3, bucketName, fileName, 'testanda\ntestandooaa');
         console.log(await MOD_aws.getFileContent(s3, bucketName, fileName));
   }

// #####################################################################################################################