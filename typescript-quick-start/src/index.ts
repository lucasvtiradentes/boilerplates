// #####################################################################################################################
   import express from 'express';
   import functions from './functions.js';

// #####################################################################################################################
   const app = express();
   const PORT = process.env.PORT || 3333;

// #####################################################################################################################
   app.get('/', function(req, res){
      return res.send('hello word 2 kk dkk 45')
   })

   functions.showPerson({name: "Lucas", age:23, job: {salary: 12000, enterprise: "appsuper"}})
   console.log(functions.age);
   console.log(functions.username);

// #####################################################################################################################
   app.listen(PORT)

// #####################################################################################################################