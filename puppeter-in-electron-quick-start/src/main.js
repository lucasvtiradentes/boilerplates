const {BrowserWindow, app} = require("electron");
const pie = require("puppeteer-in-electron");
const puppeteer = require("puppeteer-core");
 
async function main(){
  await pie.initialize(app);
  const browser = await pie.connect(app, puppeteer);
 
  const window = new BrowserWindow();
  const url = "https://example.com/";
  await window.loadURL(url);
 
  const page = await pie.getPage(browser, window);
  console.log(page.url());
  window.destroy();
}
 
main();