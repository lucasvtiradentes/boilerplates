// AO INSTALAR A EXTENSAO ######################################################
  chrome.runtime.onInstalled.addListener(function() {
    // alert("ACABOU DE INSTALAR")
  });

// AO DETECTAR NOVA ATUALIZAÇÃO ################################################
  chrome.runtime.onUpdateAvailable.addListener(function(){
    // alert("TEM ATUALIZAÇÃO")
  })

// AO INICIAR O CHROME #########################################################
  chrome.runtime.onStartup.addListener(function(){
    // alert("INICIOU O CHROME")
  })