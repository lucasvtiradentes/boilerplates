// IMPORTAR FUNÇÕES ####################################################################################################
   const { app, BrowserWindow } = require('electron')

// EXECUTAR FUNÇÕES ####################################################################################################
   app.whenReady().then(createWindow)

// DEFINIR FUNÇÕES #####################################################################################################
   function createWindow () {
      let win = new BrowserWindow({
         width: 800,
         height: 600,
         webPreferences: {
            nodeIntegration: true
         }
      })
      win.loadFile('index.html')
   }
