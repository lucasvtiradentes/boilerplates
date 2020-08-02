
// FUNÇÕES PRINCIPAIS ##################################################################################################
   console.log('===================================================');
   console.log('\n\n');
   console.log('INJETOU AQUI NO CIELO');
   console.log('\n\n');
   console.log('===================================================');
   
// FUNÇÕES PRINCIPAIS ##################################################################################################
   function login(ARG_STR_Login, ARG_STR_Senha){

      let el_login = document.getElementsByClassName('inputContainer');
      let el_password = document.getElementsByClassName('inputContainer');
      let el_button = document.getElementsByClassName('flui-button large primary block')

         if (el_login[0]){
            el_login = el_login[0].getElementsByTagName('input')
            el_login[0].value = ARG_STR_Login
         } 

         if (el_password[1]){
            el_password = el_password[1].getElementsByTagName('input')
            el_password[0].value = ARG_STR_Senha
         } 

         if (el_button[0]){
            el_button[0].click();
         }
   }
 
   function getLinkParameters() {
      var vars = new Object();
      var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
         vars[key] = value;
      });
      return vars;
   }
   
   let OBJ_parameters = getLinkParameters();
   let user = OBJ_parameters['user'];
   let pass = OBJ_parameters['pass'];
   
   if (user && pass){
      login(user, pass);
   }

