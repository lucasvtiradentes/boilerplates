// LAST EDIT: 15/06/2020

// EXPORTAR FUNÇÕES ####################################################################################################
   module.exports =  {
      getOrderId, // MOD_web
      getUserId,  // MOD_web
      getOrderAnalysisLink,
      getOrderModifyLink,
      getSearchForOrderLink,
      getFraudPreventionOrderLink,
      openOrderInNewPage
   }
   
// EXPORTAR FUNÇÕES ####################################################################################################

   async function getOrderId(page){

      // DEP: MOD_web (getSiteContent)
      // const STR_url = `https://admin.appsuper.com.br/orders/order/?q=${ARG_STR_NumeroPedido}`;
      // let page = await MOD_web.getSiteContent(STR_url);

      let el_tabela = page.getElementById('result_list');

         if(el_tabela){
            let el_NumPedido = el_tabela.rows[1].getElementsByClassName('field-order_number')[0];
            let el_link = el_NumPedido.getElementsByTagName('A')[0].getAttribute('href');
            let ARR_link = el_link.split('/');
            let STR_IDPedido = ARR_link[3];
            return STR_IDPedido;
         }
   }

   async function getUserId(ARG_STR_email){

      // DEP: MOD_web

      let url_pesquisaUsuario = `https://admin.appsuper.com.br/accounts/user/?q=${ARG_STR_email}`;
      let pg_usuario = await MOD_web.getSiteContent(url_pesquisaUsuario)
      var el_linkemail = pg_usuario.getElementsByClassName('field-email')[0];

         if (el_linkemail) {
            let link_email;
               if (ARG_STR_email == el_linkemail.innerText) {
                  link_email = el_linkemail.innerHTML;
                  link_email = link_email.replace('<a href="/accounts/user/', '')
                  link_email = link_email.split('/')[0]
                  return link_email;
               }
         }

   }

   function getOrderAnalysisLink(STR_ID_pedido){
      return `https://admin.appsuper.com.br/orders/order/analysis/${STR_ID_pedido}`;
   }

   function getOrderModifyLink(STR_ID_pedido){
      return `https://admin.appsuper.com.br/orders/order/${STR_ID_pedido}/change/`;
   }


   function getSearchForOrderLink(STR_IDEmail_Pedido){
      return `https://admin.appsuper.com.br/orders/order/?q=${STR_IDEmail_Pedido}`;
   }

   function getFraudPreventionOrderLink(STR_ID_pedido){
      return `https://af.appsuper.com.br/pedido/${STR_ID_pedido}`;
   }


   async function openOrderInNewPage(order){

      let orderNumber;
      let orderLink;

         if (!order){
            orderNumber = prompt("Digite o número do pedido ou email do cliente: ", "");
         }

         if (!orderNumber) {return}

      let algarismoDigitado = orderNumber.length;
      let algarismosPedidoPadrao = "2020042926794".length;
      let modoAnalise = algarismoDigitado == algarismosPedidoPadrao ? "PEDIDO" : "EMAIL";

         if (modoAnalise == "PEDIDO") {
            let IdPedido = await getOrderId(orderNumber);
            orderLink = getOrderModifyLink(orderNumber);
         } else {
            orderLink = getSearchForOrderLink(orderNumber);
         }

         // chrome.tabs.create({url:orderLink});

   }
    