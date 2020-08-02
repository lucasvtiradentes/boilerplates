let el_button = document.getElementById('button-test');
let url = "https://minhaconta2.cielo.com.br/minha-conta/home";

el_button.addEventListener('click', function(){
   // let window = Chrome.windows.create({"url": url, "incognito": true})
   let cielo = window.open(url, "Cielo");
})

var creating = browser.windows.create({
   url: ["https://developer.mozilla.org",
         "https://addons.mozilla.org"]
 });