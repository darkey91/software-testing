import React from 'react';
import compareImages from 'resemblejs/compareImages';
import fs from 'fs';

const {url} = require('./config');
const {chromium} = require('playwright');

describe(`Playwright tests`, () => {
    let browser;
    let page;
    let login = 'Aragorn';

    beforeEach(async () => {
        browser = await chromium.launch();
        page = await browser.newPage();
        if (!page) {
            throw new Error("Connection wasn't established");
        }
    });

    afterEach(async () => {
        browser.close();
    });

    test('Login page with input', async () => {
        await page.goto(url + '/login');
        await page.fill('#login', login);
        const screen = await page.screenshot();
        await page.screenshot({path: 'test/playwright/screenshots/actual-login-with-input.png', fullPage: true});
        let data = await compareImages(screen, 'test/playwright/screenshots/login-with-input.png');
        fs.writeFile("./comparing.png", data.getBuffer(),() => {});
        // expect(data.misMatchPercentage).toEqual(0);
    })

    test('Home page without user', async () => {
        await page.goto(url + '/');

        expect(await page.innerText('#main-phrase')).toBe('Hello, Stranger!');
    });

    test('Register user', async () => {
        await page.goto(url + '/register');
        await page.fill('#login', login);
        await page.click('#register-submit');

        await new Promise(res => setTimeout(res, 200));

        expect(await page.innerText('#main-phrase')).toBe(`Hello, Stranger!`);
    });

    test('Login user', async () => {
        await page.goto(url + '/login');
        await page.fill('#login', login);
        await page.click('#login-submit');

        await new Promise(res => setTimeout(res, 200));

        expect(await page.innerText('#main-phrase')).toBe(`Hello, ${login}!`);
    });

    test('Home page with user', async () => {
        await page.goto(url + '/login');
        await page.fill('#login', login);
        await page.click('#login-submit');

        await new Promise(res => setTimeout(res, 200));

        await page.goto(url + '/');
        expect(await page.innerText('#main-phrase')).toBe(`Hello, ${login}!`);
    });
});