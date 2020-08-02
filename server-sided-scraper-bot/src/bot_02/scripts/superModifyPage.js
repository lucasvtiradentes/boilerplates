// LAST EDIT: 15/06/2020

// EXPORTAR FUNÇÕES ####################################################################################################
   module.exports =  {

      getMarket,
      getName,
      getEmail,
      getCpf,
      getPhone,
      getOrderDateTime,
      getOrderNumber,
      
      getDeliveryMethod,

      getCollectedBy,

      getTotalWeight,
      getTotalOrderItensQuantity,
      getTotalOccurrences,
      getTotalCollectedItens,
      getInitialPrice,
      getServiceTax,
      getDeliveryTax,
      getSumTaxes,
      getFinalPrice,
      getFinalPriceWithTaxes,

      getAllItens,
      getAllMissingItens,

      getOrderSteps,
      getFraudPreventionComment,
      getFraudPreventionUser,

      getOrderId,
      getAllModifyPageProperties,
      
   }

// DEFINIR FUNÇÕES #####################################################################################################

   function getMarket(page){

      if (!page) {return}

      let market = page.getElementsByClassName('field-origin_market');
         if (market[0]){
            return market[0].getElementsByClassName('readonly')[0].innerText;
         }

   }

   function getName(page){
      
      if (!page) {return}

      let el_tmp = page.getElementsByClassName('field-user_detail')[0];
         if (el_tmp){
            let el_todosCampos = el_tmp.getElementsByClassName('readonly')[0];
            let el_campoProriedade = el_todosCampos.getElementsByTagName('P')[0];
            let STR_Nome = el_campoProriedade.innerText;
            STR_Nome = STR_Nome.replace('Nome:: ', '');
            return STR_Nome;
         }

   }

   function getEmail(page){

      if (!page) {return}

      let el_tmp = page.getElementsByClassName('field-user_detail')[0];
         if (el_tmp){
            let el_todosCampos = el_tmp.getElementsByClassName('readonly')[0];
            let el_campoProriedade = el_todosCampos.getElementsByTagName('P')[1];
            let STR_Email = el_campoProriedade.innerText;
            STR_Email = STR_Email.replace('Email: ', '');
            return STR_Email;
         }
   }

   function getCpf(page){

      if (!page) {return}

      let el_tmp = page.getElementsByClassName('field-user_detail')[0];
         if (el_tmp){
            let el_todosCampos = el_tmp.getElementsByClassName('readonly')[0];
            let el_campoProriedade = el_todosCampos.getElementsByTagName('P')[2];
            let STR_Cpf = el_campoProriedade.innerText;
            STR_Cpf = STR_Cpf.replace('CPF: ', '');
            return STR_Cpf;
         }
   }

   function getPhone(page){

      if (!page) {return}

      let el_tmp = page.getElementsByClassName('field-user_detail')[0];
         if (el_tmp){
            let el_todosCampos = el_tmp.getElementsByClassName('readonly')[0];
            let el_campoProriedade = el_todosCampos.getElementsByTagName('P')[3];
            let STR_Telefone = el_campoProriedade.innerText;
            STR_Telefone = STR_Telefone.replace('Telefone: ', '');
            return STR_Telefone;
         }

   }

   function getOrderDateTime(page){

      if (!page) {return}

      let el_tmp = page.getElementsByClassName('field-ordered_at')[0];
         if(el_tmp){
            let el_dataHoraPedido = el_tmp.getElementsByClassName('readonly')[0];
            return el_dataHoraPedido.innerText;
         }

   }

   function getOrderNumber(page){

      if (!page) {return}

      let el_tmp = page.getElementsByClassName('field-order_number')[0];
         if(el_tmp) {
            let STR_pedido = el_tmp.getElementsByClassName('readonly')[0];
               if(STR_pedido){
                  return STR_pedido.innerText;
               }
         }

   }

// #####################################################################################################################

   function getDeliveryMethod(page){

      if (!page) {return}

      let el_tmp = page.getElementsByClassName('module')[1];
         if(el_tmp){
            let el_tipoEntrega_linha = el_tmp.getElementsByClassName('field-delivery_type')[0]
            if (el_tipoEntrega_linha){
               let el_tipoEntrega = el_tipoEntrega_linha.getElementsByClassName('readonly')[0]
               return el_tipoEntrega.innerText;
            }
         }

   }

// #####################################################################################################################

   function getCollectedBy(page){

      if (!page) {return}

      let el_tmp = page.getElementsByClassName('module')[2];
         if(el_tmp){
            let el_linha = el_tmp.getElementsByClassName('field-collected_by')[0];
            let propriedade = el_linha.getElementsByTagName('strong')[0];
            return propriedade.innerText;
         }

   }

// #####################################################################################################################

   function getTotalWeight(page){

      if (!page) {return}

      let el_tmp = page.getElementsByClassName('module')[5];
         if(el_tmp){
            let el_linha = el_tmp.getElementsByClassName('field-total_weight')[0];
            let propriedade = el_linha.getElementsByClassName('readonly')[0];
            return propriedade.innerText;
         }

   }

   function getTotalOrderItensQuantity(page){

      if (!page) {return}

      let el_tmp = page.getElementsByClassName('module')[5];
         if(el_tmp){
            let el_linha = el_tmp.getElementsByClassName('field-total_items_count')[0];
            let propriedade = el_linha.getElementsByClassName('readonly')[0];
            return propriedade.innerText;
         }

   }

   function getTotalOccurrences(page){

      if (!page) {return}

      let el_tmp = page.getElementsByClassName('module')[5];
         if(el_tmp){
            let el_linha = el_tmp.getElementsByClassName('field-occurrences_count')[0];
            let propriedade = el_linha.getElementsByClassName('readonly')[0];
            return propriedade.innerText;
         }

   }

   function getTotalCollectedItens(page){

      if (!page) {return}

      let el_tmp = page.getElementsByClassName('module')[5];
         if(el_tmp){
            let el_linha = el_tmp.getElementsByClassName('field-items_collected_count')[0];
            let propriedade = el_linha.getElementsByClassName('readonly')[0];
            return propriedade.innerText;
         }

   }


   function getInitialPrice(page){

      if (!page) {return}

      let el_tmp = page.getElementsByClassName('module')[5];
         if(el_tmp){
            let el_linha = el_tmp.getElementsByClassName('field-full_price')[0];
            let propriedade = el_linha.getElementsByClassName('readonly')[0];
            return propriedade.innerText;
         }

   }

   function getServiceTax(page){

      if (!page) {return}
      
      let el_tmp = page.getElementsByClassName('module')[5];
         if(el_tmp){
            let el_linha = el_tmp.getElementsByClassName('field-service_tax')[0];
            let propriedade = el_linha.getElementsByClassName('readonly')[0];
            return propriedade.innerText;
         }

   }

   function getDeliveryTax(page){

      if (!page) {return}

      let el_tmp = page.getElementsByClassName('module')[5];
         if(el_tmp){
            let el_linha = el_tmp.getElementsByClassName('field-delivery_tax_total')[0];
            let propriedade = el_linha.getElementsByClassName('readonly')[0];
            return propriedade.innerText;
         }

   }

   function getSumTaxes(page){

      if (!page) {return}

      let el_tmp = page.getElementsByClassName('module')[5];
         if(el_tmp){
            let el_linha = el_tmp.getElementsByClassName('field-super_tax')[0];
            let propriedade = el_linha.getElementsByClassName('readonly')[0];
            return propriedade.innerText;
         }

   }


   function getFinalPrice(page){

      if (!page) {return}

      let el_tmp = page.getElementsByClassName('module')[5];
         if(el_tmp){
            let el_linha = el_tmp.getElementsByClassName('field-total_price')[0];
            let propriedade = el_linha.getElementsByClassName('readonly')[0];
            return propriedade.innerText;
         }

   }

   function getFinalPriceWithTaxes(page){

      if (!page) {return}

      let el_tmp = page.getElementsByClassName('module')[5];
         if(el_tmp){
            let el_linha = el_tmp.getElementsByClassName('field-total_price_with_tax')[0];
            let propriedade = el_linha.getElementsByClassName('readonly')[0];
            return propriedade.innerText;
         }

   }


// #####################################################################################################################

   async function getAllItens(page){

      // DEP: MOD_table / MOD_array

      if (!page) {return}

      var el_tmp = page.getElementsByClassName('module')[6];
         if (el_tmp){
            let el_tabela = el_tmp.getElementsByTagName('table')[0];
            let INT_linhas = el_tabela.rows.length-1;
            let INT_colunas = el_tabela.rows[0].cells.length;
            let ARR_modificada;
            let ARR_original = MOD_table.tabela2Array(el_tabela);
            ARR_modificada = MOD_array.apagarLinhasArray(ARR_original, [0, INT_linhas-1, INT_linhas]);
            ARR_modificada = MOD_array.apagarColunasArray(ARR_modificada, [2, 3, 4, 10]); // , 11
            return ARR_modificada;
         }

   }


   async function getAllMissingItens(ARG_ARR_ItensPedido){

      if (!ARG_ARR_ItensPedido){return}

      let ARR_ItensOcorrencia = new Array();
         for(let x=0; x<ARG_ARR_ItensPedido.length; x++){
            let STR_ItemOcorrencia = ARG_ARR_ItensPedido[x][7];
            STR_ItemOcorrencia = STR_ItemOcorrencia.trim();
            STR_ItemOcorrencia = STR_ItemOcorrencia.replace(" ", "");
                if (STR_ItemOcorrencia !== "-"){
                  console.log(x + " -> " + STR_ItemOcorrencia );
                  ARR_ItensOcorrencia.push(ARG_ARR_ItensPedido[x]);
               }
         }

         if (ARR_ItensOcorrencia.length > 0) {
            return ARR_ItensOcorrencia;
         } else {
            return undefined;
         }

   }


// #####################################################################################################################

   async function getOrderSteps(page){

      // DEP: MOD_table / MOD_array

      if (!page){return}
      if (!page.getElementsByClassName('module')){return}

      let el_tmp = page.getElementsByClassName('module')[7];
         if(el_tmp){
            let ARR_modificada;
            let el_tabela = el_tmp.getElementsByTagName('table')[0];
            let ARR_tabela = MOD_table.tabela2Array(el_tabela);
            let INT_linhas = el_tabela.rows.length;
            ARR_modificada = await MOD_array.apagarLinhasArray(ARR_tabela, [0, INT_linhas-1, INT_linhas-2])
            return ARR_modificada;
         }

   }

   async function getFraudPreventionComment(ARG_ARRStatusPedido){

      if (!ARG_ARRStatusPedido){return}

         for(let x=0; x<ARG_ARRStatusPedido.length; x++){
            let tmp_statusPedido = ARG_ARRStatusPedido[x][1];
               if (tmp_statusPedido == "Pagamento autorizado" || tmp_statusPedido == "Cancelado"){
                  return ARG_ARRStatusPedido[x][2];
               }
         }
   }

   async function getFraudPreventionUser(ARG_ARRStatusPedido){

      if (!ARG_ARRStatusPedido){return}

         for(let x=0; x<ARG_ARRStatusPedido.length; x++){
            let tmp_statusPedido = ARG_ARRStatusPedido[x][1];
               if (tmp_statusPedido == "Pagamento autorizado" || tmp_statusPedido == "Cancelado"){
                  return ARG_ARRStatusPedido[x][3];
               }
         }

   }

// #####################################################################################################################

   function getOrderId(page){

      if (!page) {return}

      let el_tmp = page.getElementsByClassName('object-tools')[0];
         if(el_tmp){
            let el_tmpLI = el_tmp.getElementsByTagName("LI")[0];
            let el_tmpLI_a = el_tmpLI.getElementsByTagName("A")[0];
            let id = el_tmpLI_a.getAttribute("href");
            id = id.replace('/orders/order/analysis/', '')
            return id;
         }

   }

   
   async function getAllModifyPageProperties(page){

      let ARR_ItensCompra = await getAllItens(page);
      let ARR_EtapasPedido = await getOrderSteps(page);

      let OBJ_AbaModificar = {

         // ---------------------------------------------------------------------------------------------------
            name: getName(page),
            email: getEmail(page),
            cpf: getCpf(page),
            phone: getPhone(page),
            orderedAt: getOrderDateTime(page),
            orderNumber: getOrderNumber(page),

         // ----------------------------------------------------------------------------------------------------
            deliveryType: getDeliveryMethod(page),

         // ----------------------------------------------------------------------------------------------------
            collectedBy: getCollectedBy(page),

         // ----------------------------------------------------------------------------------------------------
            totalWeight: getTotalWeight(page),
            orderItensQuantity: getTotalOrderItensQuantity(page),
            totalOccurrrences: getTotalOccurrences(page),
            totalCollected: getTotalCollectedItens(page),

         // ----------------------------------------------------------------------------------------------------
            initialPrice: getInitialPrice(page),
            serviceTax: getServiceTax(page),
            deliveryTax: getDeliveryTax(page),
            sumTaxes: getSumTaxes(page),
            finalPrice: getFinalPrice(page),
            finalPriceWithTaxes: getFinalPriceWithTaxes(page),

         // ----------------------------------------------------------------------------------------------------
            orderItens: ARR_ItensCompra,
            missingItens: await getAllMissingItens(ARR_ItensCompra),

         // ----------------------------------------------------------------------------------------------------
            orderSteps: ARR_EtapasPedido,
            fraudPreventionComment: await getFraudPreventionComment(ARR_EtapasPedido),
            fraudPreventionUser: await getFraudPreventionUser(ARR_EtapasPedido),

         // ----------------------------------------------------------------------------------------------------
            orderId: getOrderId(page)

      }

      return OBJ_AbaModificar;

   }

// #####################################################################################################################