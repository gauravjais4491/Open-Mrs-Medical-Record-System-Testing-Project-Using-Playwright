const base = require('@playwright/test')
const { chromium } = require('playwright');
import LoginPage from '..//pageObject/loginPage/loginPage'
import SecurePageForLogin from '../pageObject/loginPage/securePageForLogin'


exports.customTest = base.test.extend({
    browser: async ({ }, use) => {
        const browser = await chromium.launch();
        await use(browser)
    },
    context: async ({ browser }, use) => {
        const context = await browser.newContext();
        await use(context)
    },
    page: async ({ context }, use) => {
        const page = await context.newPage()
        await use(page)
    },
    loginPage: async ({ page }, use) => {
        await page.goto('/')
        await use(new LoginPage(page))
    },
    securePageForLogin: async ({ page }, use) => {
        await use(new SecurePageForLogin(page))
    }
})