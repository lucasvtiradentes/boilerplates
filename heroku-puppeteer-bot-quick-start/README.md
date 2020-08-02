# headless-chrome

* LINK DO TUTORIAL: https://timleland.com/headless-chrome-on-heroku/

## ETAPAS
* npm install
---
* git init
* git add .
* git commit -m "initial release"
---
* heroku create APPNAMEHERE
* heroku apps
* heroku git:remote -a APPNAMEHERE
---
* heroku buildpacks:add https://github.com/jontewks/puppeteer-heroku-buildpack
* heroku buildpacks:add heroku/nodejs
---
* git push heroku master

## RESUMO

* EM resumo pra funcionar:
   * browser deve estar configurado com `'--no-sandbox', '--disable-setuid-sandbox'`
   * deve ser instalado os dois buildpacks mostrados acima