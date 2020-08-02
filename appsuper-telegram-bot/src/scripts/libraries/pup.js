// LAST EDIT: 15/06/2020

// IMPORTAR BIBLIOTECAS ################################################################################################
   const puppeteer = require('puppeteer');

// EXPORTAR FUNÇÕES ####################################################################################################
   module.exports = {

      getDefaultPuppeteerBrowserSettings,
      openBrowser,
      closeBrowser,
      getFirstBrowserWindow,
      openLinkInNewWindow,
      openLinkInSpecifiedWindow,
      fixPageTimeOutError, 

      typeIntoAnElement,
      clickElement,
      pressButton,
      getCurrentUrl,
      waitPageLoad,

      setPageContent,
      insertFunctionIntoAPage,
      runJsCommandOnPage,
      insertAndRunFunctionOnAPage,

      printPageContent,
      takeScreenShot
      
   }

// DEFINIR FUNÇÕES #####################################################################################################

   function getDefaultPuppeteerBrowserSettings(){

      return {
         headless: ARG_BOL_NavegadorOculto,
         defaultViewport: null,
         // userDataDir: GLOBAL_VAR.GBL_ARQUIVOS_SESSAO_USUARIO_NAVEGADOR,
         handleSIGINT: false,
         ignoreHTTPSErrors: true, 
         args: ARR_args,
         ignoreDefaultArgs: ['--enable-automation']
      };

   }

   async function openBrowser(ARG_BOL_NavegadorOculto){

      let OBJ_lounchOptions;

      const ARR_args =  [
         '--no-sandbox',
         '--disable-setuid-sandbox',
         // '--log-level=3', // fatal only
         //'--start-maximized',
         // '--enable-features=NetworkService',
         // '--no-default-browser-check',
         // '--no-experiments',
         // '--ignore-gpu-blacklist',
         // '--ignore-certificate-errors',
         // '--ignore-certificate-errors-spki-list',
         // '--disable-gpu',
         // '--disable-extensions',
         // '--disable-default-apps',
         // '--disable-setuid-sandbox',
         // '--disable-infobars',
         // '--disable-web-security',
         // '--disable-site-isolation-trials',
      ];

      if (!ARG_BOL_NavegadorOculto){

         if (process.env.PKG === 'true'){
         
            let STR_CaminhoPuppeteer = path.join(process.cwd(), "./chromium/chrome-win/chrome.exe");

            OBJ_lounchOptions = {
               headless: ARG_BOL_NavegadorOculto,
               defaultViewport: null,
               executablePath: STR_CaminhoPuppeteer,
               // userDataDir: GLOBAL_VAR.GBL_ARQUIVOS_SESSAO_USUARIO_NAVEGADOR,
               handleSIGINT: false,
               ignoreHTTPSErrors: true, 
               args: ARR_args,
               ignoreDefaultArgs: ['--enable-automation']
            };
      
         } else {
         
            OBJ_lounchOptions = {
               headless: ARG_BOL_NavegadorOculto,
               defaultViewport: null,
               // userDataDir: GLOBAL_VAR.GBL_ARQUIVOS_SESSAO_USUARIO_NAVEGADOR,
               // handleSIGINT: false,
               // ignoreHTTPSErrors: true, 
               args: ARR_args,
               // ignoreDefaultArgs: ['--enable-automation']
            };
      
         }

      }

      let TMP_browser = await puppeteer.launch(OBJ_lounchOptions);

      return TMP_browser
   }
   
   async function closeBrowser(browse){
      await browse.close()
   }

   async function getFirstBrowserWindow(ARG_OBJ_Navegador){

      let OBJ_PaginaTMP = (await ARG_OBJ_Navegador.pages())[0];
      return OBJ_PaginaTMP;

   }

   async function openLinkInNewWindow(ARG_OBJ_Navegador, ARG_STR_UrlAbre){
      
      if (!ARG_STR_UrlAbre || !ARG_OBJ_Navegador){return}
      let TMP_page = await ARG_OBJ_Navegador.newPage();
      await TMP_page.goto(ARG_STR_UrlAbre);
      await TMP_page.setDefaultNavigationTimeout(0); 
      // await TMP_page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36');
      return TMP_page;
   }

   async function openLinkInSpecifiedWindow(ARG_OBJ_Pagina, ARG_STR_UrlAbre){
      
      if (!ARG_STR_UrlAbre || !ARG_OBJ_Pagina){return}
      await ARG_OBJ_Pagina.goto(ARG_STR_UrlAbre, { waitUntil: 'networkidle2' }); 
      await ARG_OBJ_Pagina.setDefaultNavigationTimeout(0); 
      return ARG_OBJ_Pagina;
   }

   async function fixPageTimeOutError(ARG_page){
      await ARG_page.setDefaultNavigationTimeout(0); 
   }



   async function typeIntoAnElement(page, element, value, waitForIt = false){

         if (waitForIt){
            await page.waitForSelector(element)
         }

      await page.focus(element);
      await page.keyboard.type(value); 
   }

   async function clickElement(page, element, waitForIt = false){

         if (waitForIt){
            await page.waitForSelector(element)
         }
         
      await page.evaluate(function(element){
         document.querySelector(element).click()
      }, element);

   }
   
   async function pressButton(page, button){
      await page.keyboard.press(button)
   }

   async function getCurrentUrl(page){

      const url = await page.evaluate(function(){
         return window.location.href;
      });

      return url;
   }

   async function waitPageLoad(page){
      
      await page.waitForNavigation({ waitUntil: 'networkidle2' })
   }


















   async function setPageContent(page, content){
      await page.setContent(content)
   }

   async function insertFunctionIntoAPage(page, functionToAdd){
      await page.addScriptTag({ 
         content: `\n${functionToAdd}\n`
      });
   }

   async function runJsCommandOnPage(page, command){

      var result = await page.evaluate(function(command){
         
         const result = eval(command);
         console.log(result);

         return result;

      }, command);

      return result;

   }

   async function insertAndRunFunctionOnAPage(page, functionToAdd, command){
      
      await insertFunctionIntoAPage(page, functionToAdd)
      const command_result = await runJsCommandOnPage(page, command);
      
      return command_result;
   }







   async function printPageContent(page, pathToPdf){
      await page.pdf({ path: pathToPdf, format: 'A4' })
   }

   async function takeScreenShot(ARG_OBJ_Pagina, ARG_STR_CaminhoImagem){
      if (!ARG_OBJ_Pagina){return}
      await ARG_OBJ_Pagina.screenshot({path: ARG_STR_CaminhoImagem});
   }
