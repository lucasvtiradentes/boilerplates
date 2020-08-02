// DEFINE FUNÇÕES ######################################################################################################
   let el_buttonSuper = document.getElementById('pdf-super');
   let el_buttonMarket = document.getElementById('pdf-market');
   let el_loginMarket = document.getElementById('login-market');
   let el_loginSuper = document.getElementById('login-super');

   let url_market = "https://minhaconta2.cielo.com.br/minha-conta/home";
   let url_super = "https://admin.braspag.com.br/ReportPagador/TransactionDetails/729c83b7-33c5-4c5f-9146-4b1256c70f54?history=False&printVersion=True";
   let OBJ_parameters = getLinkParameters();
   let el_userform = document.getElementById('userform');
   let order_parameter = OBJ_parameters['order'];

// DEFINE FUNÇÕES ######################################################################################################
   el_loginSuper.addEventListener('click', function(){
      let user = "03320911392";
      let pass = "213141";
      openLinkInNewTab('https://minhaconta2.cielo.com.br/login' + `?user=${user}&pass=${pass}`);
   })

   el_loginMarket.addEventListener('click', function(){
      let user = "03320911392";
      let pass = "213141";
      openLinkInIncognitoWindow('https://minhaconta2.cielo.com.br/login' + `?user=${user}&pass=${pass}`);
   })

   el_buttonSuper.addEventListener('click', function(){
      openLinkInNewTab(url_super);
   })

   el_buttonMarket.addEventListener('click', function(){
      openLinkInIncognitoWindow(url_market);
   })

   el_userform.setAttribute('action', window.location.href)

   if (order_parameter){
      document.getElementById('orderNumer').value = order_parameter;
      searchTransactionPDFS(order_parameter);
   }

// DEFINE FUNÇÕES ######################################################################################################  
  
   function submitForm(ARG_STR_url, ARG_OBJ_parameters, ARG_STR_method) {
      const form = document.createElement('form');
      form.method = ARG_STR_method; // 'get', 'post'
      form.action = ARG_STR_url;
   
      for (const key in ARG_OBJ_parameters) {
         if (ARG_OBJ_parameters.hasOwnProperty(key)) {
            const hiddenField = document.createElement('input');
            hiddenField.type = 'hidden';
            hiddenField.name = key;
            hiddenField.value = ARG_OBJ_parameters[key];
      
            form.appendChild(hiddenField);
         }
      }
   
      document.body.appendChild(form);
      form.submit();
   }

   function openLinkInIncognitoWindow(ARG_STR_url){
      // https://developer.chrome.com/extensions/windows#method-create
      let OBJ_Arguments = {
         "url": ARG_STR_url, 
         // "tabId": 0,
         "incognito": true,
         "type": "normal" // popup // devtools // normal
         // "state": "minimized" // normal // minimized // maximized // fullscreen
      };

      chrome.windows.create(OBJ_Arguments, function(){
         console.log('pimba');
      });

   }

   function openLinkInNewTab(ARG_STR_url){
      // https://developer.mozilla.org/en-US/docs/Web/API/Window/open
      let OBJ_Window = window.open(ARG_STR_url);
      return OBJ_Window;
   }

   function showCurrentTabs(){
      chrome.windows.getCurrent(function(win){
         chrome.tabs.getAllInWindow(win.id, function(tabs){
            console.debug(tabs);
         });
      });
   }
      
   function getLinkParameters() {
      var vars = new Object();
      var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
         vars[key] = value;
      });
      return vars;
   }
   
   function searchTransactionPDFS(ARG_STR_Order){
      if (!ARG_STR_Order){return}

      console.log('pesquisou: ' + ARG_STR_Order);
   }
