// DEFINE AÇÃO AO CLICKAR EM BOTÕES ####################################################################################
document.getElementById('btn_01').addEventListener('click', function(){
  chrome.tabs.create({url:chrome.runtime.getURL("./features_icon/page_01/index.html")});
});

document.getElementById('btn_02').addEventListener('click', function(){
  chrome.tabs.create({url:chrome.runtime.getURL("./features_icon/page_02/index.html")});
});