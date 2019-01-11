const puppeteer = require('puppeteer');

async function noHeadless() {

    const browser = await puppeteer.launch({ headless: false }); // default is true
    await console.log('Launching test');

    const page = await browser.newPage();

    await page.goto('https://scrapethissite.com/pages/forms/');
    await console.log('User navigated to site');

    const dimensions = await page.evaluate(() => {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            deviceScaleFactor: window.devicePixelRatio
        };
    });

    console.log('Dimensions is: ', dimensions);

    await browser.close();
    await console.log('Browser closed');

}

noHeadless();