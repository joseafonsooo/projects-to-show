const puppeteer = require('puppeteer');
const fs = require("fs");

function collectNews(url, selector, jsonName, parentHref) {
    (async () => {
        const browser = await puppeteer.launch({
            headless: true,
        });
        const page = await browser.newPage();
        await page.goto(url);
        if (parentHref === false) {
            const news = await page.$$eval(selector, elementos =>
                elementos.slice(0, 5).map((el, index) => (
                    {
                        id: index + 1,
                        text: el.innerText.trim(),
                        href: el.href
                    }
                ))
            );
            fs.writeFileSync(jsonName + ".json", JSON.stringify(news, null, 2));
        } else if (parentHref === true) {
            const news = await page.$$eval(selector, elementos =>
                elementos.slice(0, 5).map((el, index) => (
                    {
                        id: index + 1,
                        text: el.innerText.trim(),
                        href: el.parentElement.href
                    }
                ))
            );
            fs.writeFileSync(jsonName + ".json", JSON.stringify(news, null, 2));
        }
        await browser.close();
    })();
}

//From Página um
collectNews('https://www.paginaum.pt/', 'h2 a', 'data/paginaum/news_paginaum', false);
//From Cm Jornal
collectNews('https://www.cmjornal.pt/', 'a h2', 'data/cmjornal/news_cmjornal', true);
//From Público
collectNews('https://www.publico.pt/', 'h2.article__title a', 'data/publico/news_publico', false);
//New York Times
collectNews('https://www.nytimes.com/', 'a.tpl-lbl', 'data/nytimes/news_nytimes', false);
//Diário do Sul
collectNews('https://diariodosul.pt/', 'h2 a', 'data/diariodosul/news_diariodosul', false);
//Évora CM
collectNews('https://www.cm-evora.pt/municipe/agenda-e-noticias/noticias/', '.column-block a', 'data/evoracm/news_evora_cm', false);
