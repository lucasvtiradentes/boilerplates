// IMPORTAR MÓDULOS ####################################################################################################
   const puppeteer = require('puppeteer');

// EXECUTAR FUNÇÕES ####################################################################################################
   helloWorld();

// DEFINIR FUNÇÕES #####################################################################################################
   async function helloWorld() {
      
      const browser = await puppeteer.launch(); // {headless: false}
      const page = await browser.newPage();
      
      await page.goto('https://en.wikipedia.org/wiki/%22Hello,_World!%22_program');
      const firstPar = await page.$eval('#mw-content-text p', el => el.innerText);
      console.log(firstPar);
      
      await browser.close();
   }