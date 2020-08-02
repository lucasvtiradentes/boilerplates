// #####################################################################################################################
   const mongodb = require('mongodb')
   const MOD_mongodb = require('./mongodb.js');

// #####################################################################################################################
   require('dotenv').config();
   
// #####################################################################################################################
   main();

// #####################################################################################################################
   async function main(){

      const db_username = process.env.DATABASE_USERNAME || "username";
      const db_password = process.env.DATABASE_PASSWORD || "password";
      const db_name = process.env.DATABASE_NAME || "db_name";

      const collection_name = "messages";
      const db_url = `mongodb+srv://${db_username}:${db_password}@appsuper-market-chatbot-snmfd.mongodb.net/${db_name}?retryWrites=true&w=majority`      //"mongodb://localhost:27017/";
      const db_options = {
         useNewUrlParser: true,
         useUnifiedTopology: true
      };

      const client = await MOD_mongodb.initMongoClient(db_url, db_options);

         if (!client){
            console.log('connection not stablished!');
            return;
         }
         
      const db = await MOD_mongodb.selectDatabase(client, db_name);
      const collection = await MOD_mongodb.selectCollection(db, collection_name);

      const addedDocument = await MOD_mongodb.addDocument(collection, {market: "Mateus Renascença", orderId: "202012457565", phone: "91985174224"})
      console.log(addedDocument);

      const itens = await MOD_mongodb.showAllDocuments(collection);
      if (itens){console.log(itens)}

      // const user = await MOD_mongodb.findDocuments(collection, {email: "lucasvtiradentes@gmail.com"});
      // if (user){console.log(user)}

      client.close()
      
   }

// #####################################################################################################################
