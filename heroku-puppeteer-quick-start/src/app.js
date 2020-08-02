// IMPORTAR MÓDULOS ####################################################################################################
    const puppeteer = require('puppeteer');
    const validUrl = require('valid-url');

// IMPORTAR MÓDULOS ####################################################################################################
    module.exports = {
        main,
        mainPuppeter,
        parseUrl
    }

// IMPORTAR MÓDULOS ####################################################################################################
    async function main(req, res){
        
        const urlOriginal = req.query.url;
        const urlToScreenshot = parseUrl(urlOriginal);

            if (validUrl.isWebUri(urlToScreenshot)) {
                await mainPuppeter(urlToScreenshot, req, res)
            } else {
                res.send(`erro no link ${urlOriginal}`);
            }
    }

// IMPORTAR MÓDULOS ####################################################################################################
    async function mainPuppeter(urlToScreenshot, req, res){

        console.log('Screenshotting: ' + urlToScreenshot);

        const browser = await puppeteer.launch({
            defaultViewport: null,
            args: ['--no-sandbox', 
                   '--disable-setuid-sandbox',
                   '--start-maximized']
        });

        try {
            const page = await browser.newPage();
            await page.goto(urlToScreenshot);
            await page.screenshot().then(function(buffer) {
                res.setHeader('Content-Disposition', 'attachment;filename="' + urlToScreenshot + '.png"');
                res.setHeader('Content-Type', 'image/png');
                res.send(buffer);
            });
        } catch (error) {
            res.send(`erro no puppeteer`);
        }

        await browser.close();
    }
    
    function parseUrl(url) {
        url = decodeURIComponent(url)
            if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
                url = 'http://' + url;
            }
        return url;
    };
