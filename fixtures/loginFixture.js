const base = require('@playwright/test')
const { chromium } = require('playwright');
import LoginPage from '..//pageObject/loginPage/loginPage'
import SecurePageForLogin from '../pageObject/loginPage/securePageForLogin'
import BrowserInstance from '../browserInstance.js';

exports.customTest = base.test.extend({
    browserInstance: async ({ }, use) => {
        await use(new BrowserInstance(chromium))
    },
    context: async ({ browserInstance }, use) => {
        const context = await browserInstance.createContext()
        await use(context)
    },
    page: async ({ context }, use) => {
        const page = await context.newPage()
        await page.goto('/')
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