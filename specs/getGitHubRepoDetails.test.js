const puppeteer = require('puppeteer');
const testData = require('../config/globalConfig');

describe('GitHub', () => {
    beforeEach(async () => {
        jest.setTimeout(30000);
        // testData.globalJestTimeout;
    });

    it('page title should be "qaloop · GitHub"', async () => {
        const browser = await puppeteer.launch();

        const page = await browser.newPage();
        await page.goto(testData.gitHubURL, { waitUntil: 'networkidle0' });
        console.log('User is navigated to site');

        await page.screenshot({
            path: './screenshots/Overview.png'
        });

        const title = await page.title();
        await expect(title).toBe('qaloop · GitHub');
        console.log('Page title is: ' + title);
    });

    it('should display "Repositories"', async () => {
        const browser = await puppeteer.launch();

        const page = await browser.newPage();
        await page.goto(testData.gitHubURL, { waitUntil: 'networkidle0' });
        console.log('User is navigated to site');

        await page.click('nav > a:nth-child(2)');

        await page.waitForNavigation();

        await page.screenshot({
            path: './screenshots/Repositories.png'
        });

        const title = await page.title();
        await expect(title).toContain('Repositories');
        console.log('Page title is: ' + title);
    });

    it('should click "protractor-jasmine-typescript" repository', async () => {
        const browser = await puppeteer.launch();

        const page = await browser.newPage();
        await page.goto(testData.gitHubURL, { waitUntil: 'networkidle0' });
        console.log('User is navigated to site');

        const linkText = await page.$x('//a[contains(text(), "protractor-jasmine-typescript")]');
        await linkText[0].click()

        await page.waitForNavigation();

        await page.screenshot({
            path: './screenshots/protractor-jasmine-typescript.png'
        });

        const title = await page.title();
        await expect(title).toContain('qaloop/protractor-jasmine-typescript');
        console.log('Page title is: ' + title);
    });

    fit('should get all repository details', async () => {
        const browser = await puppeteer.launch();

        const page = await browser.newPage();
        await page.goto(testData.gitHubURL, { waitUntil: 'networkidle0' });
        console.log('User is navigated to site');

        await page.click('nav > a:nth-child(2)');

        await page.waitForNavigation();

        const repoName = await page.evaluate(() => Array.from(document.querySelectorAll('h3 > a'), element => element.innerText));
        const repoDescription = await page.evaluate(() => Array.from(document.querySelectorAll('div.col-9.d-inline-block > div:nth-child(2) > p'), element => element.innerText));
        const repoTopics = await page.evaluate(() => Array.from(document.querySelectorAll('div.topics-row-container.d-inline-flex.flex-wrap.flex-items-center.f6.my-1 > a'), element => element.innerText));
        const repoProgrammingLanguage = await page.evaluate(() => Array.from(document.querySelectorAll('span.mr-3[itemprop=programmingLanguage]'), element => element.innerText));
        const repoLicense = await page.evaluate(() => Array.from(document.querySelectorAll('span.mr-3'), element => element.innerText));

        console.dir(repoName);
        console.dir(repoDescription);
        console.dir(repoTopics);
        console.dir(repoProgrammingLanguage);
        console.dir(repoLicense);

        await page.screenshot({
            path: './screenshots/all-repo-details.png'
        });
    });
});