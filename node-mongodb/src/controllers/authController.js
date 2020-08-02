const express = require('express');
const User = require('../../src/models/user.js');

const router = express.Router();


router.post('/register', async function(request, response){

   try {

      const { email } = request.body;

         if (await User.findOne({email})){
            return response.status(400).send({error: "User already exists"})
         } else {
            const user = await User.create(request.body);
            return response.send({user});
         }

   } catch(e){
      response.status(400).send({error: 'Registration Failed'});
   }
});

router.post('/authenticate', async function(request, response){
   const {email, password} = request.body;
   const user = await User.findOne({email}).select('+password');

   if (!user){
      return response.status(400).send({erro: "User not found"});
   }

   if (password !== user.password){
      return response.status(400).send({erro: "Invalid password"});
   }

   user.password = undefined;
   
   response.send({user})
});

module.exports = function(server){
   server.use('/auth', router)
}