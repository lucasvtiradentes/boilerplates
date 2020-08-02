// LAST EDIT: 15/06/2020

// EXPORTAR FUNÇÕES ####################################################################################################
   module.exports =  {
      getCurrentSelectedStatus,
      getTotalOrders,
      getTotalOrdersByDateAndStatus, // MOD_datetime | MOD_website
      getTotalPages,
      getOrdersTable,                // MOD_table | MOD_array,
      getMarkets,
      runFunctionInAllOrderPages     // MOD_web
   }

// DEFINIR FUNÇÕES #####################################################################################################
   function getTotalPages(page){

      let INT_numPaginas = 1;
      let el_numPgs = page.getElementsByClassName('paginator');

         if (el_numPgs){
            let el_links = el_numPgs[0].getElementsByTagName('A');
            el_numPgs = el_numPgs[0].getElementsByClassName('end');
               if (el_links.length > 0 && el_numPgs[0]){
                  INT_numPaginas = el_numPgs[0].innerText;
               }
         }

      return INT_numPaginas;
   }
   
   function getTotalOrders(page){
      
      if (!page){return}
      
      let id_totalOrders;
      let totalOrders;
      id_totalOrders = page.getElementById('changelist-search');

      if (!id_totalOrders){return}

      id_totalOrders = id_totalOrders.innerText;
      id_totalOrders = id_totalOrders.toString();
      id_totalOrders = id_totalOrders.trim();
      totalOrders = id_totalOrders.split(' resultado ');

         if (totalOrders.length.toString() == "1") {
            totalOrders = id_totalOrders.split(' resultados ');
         }

      return totalOrders[0];
      
   }

   async function getTotalOrdersByDateAndStatus(statusNumber, dateToCheck = 'today'){

      // DEP: MOD_datetime(getCurrentDate) | MOD_website(getSiteContent)

         if (dateToCheck === 'today'){
            dateToCheck = MOD_datetime.getCurrentDate();
         }

      const ARR_date = dateToCheck.split('/');
      const day = ARR_date[0];
      const month = ARR_date[1];
      const year = ARR_date[2];

      const URL_link = `https://admin.appsuper.com.br/orders/order/?ordered_at__day=${day}&ordered_at__month=${month}&ordered_at__year=${year}&status__exact=${statusNumber}`
      let pageOrders = await MOD_website.getSiteContent(URL_link);

      return getTotalOrders(pageOrders);

   }

   function getCurrentSelectedStatus(page){

      if (!page){return}

      const selectedStatus = page.getElementsByClassName("selected");
         if (selectedStatus[0]){
            return selectedStatus[0].innerText
         }
   }

   async function getOrdersTable(page){

      // DEP: MOD_table (table2Array), MOD_array (deleteColumns, deleteLines)
      let ARR_tabela;
      let el_tabela;

      el_tabela = page.getElementById('result_list');

         if (el_tabela){
            ARR_tabela = MOD_table.table2Array(el_tabela);
            ARR_tabela = MOD_array.deleteColumns(ARR_tabela, [0]);
            ARR_tabela = MOD_array.deleteLines(ARR_tabela, [0]);
            return ARR_tabela;
         }

   }
   

   async function getMarkets(){

      // DEP: MOD_web

      let pg_supermercados = await MOD_web.getSiteContent('https://admin.appsuper.com.br/orders/order/');
      let el_dropdownlist = pg_supermercados.getElementsByClassName('admin-filter-Mercados')[0].getElementsByClassName('form-control')[0];
      let arr_supermercados = new Array();

      if (el_dropdownlist) {
         let supermercado_iteracao;
         let supermercado_id;
         let supermercado_nome;

            for(let x = 1; x < el_dropdownlist.length; x++) {
               supermercado_iteracao = el_dropdownlist[x];
               supermercado_nome = supermercado_iteracao.innerText;
               supermercado_id = supermercado_iteracao.getAttribute('value');
               supermercado_id = supermercado_id.replace('?market_id=', '');
               arr_supermercados.push([supermercado_nome, supermercado_id])
            }

         return arr_supermercados;

      }

   }

   async function runFunctionInAllOrderPages(baseLink, functionToRun, opt_args){

      // DEP: MOD_web (getSiteContent)

      const page = await MOD_web.getSiteContent(baseLink);
      const pagesCount = getTotalPages(page);

      for(let x=pagesCount; 1 <= x; x--){

         let it_url = `${baseLink}&p=${x}`;
         let it_page = MOD_web.getSiteContent(it_url);

            if (opt_args){
               await functionToRun(opt_args);
            } else {
               await functionToRun();
            }
      }
   }
// #####################################################################################################################

