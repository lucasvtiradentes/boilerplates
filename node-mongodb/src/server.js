const express = require('express');
const bodyParser = require('body-parser');
const { request } = require('express');

const server = express();
const port = 3000;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));

server.get('/', function(request, response){
   response.send('ok')
})

require('./controllers/authController.js')(server);

server.listen(port, function(){
   console.log(`server running on port ${port}`)
})