const base = require('@playwright/test')
const { chromium } = require('playwright');
import CreateNewAccount from '../pageObject/manageAccountsFlow/createNewAccount/createNewAccount'
import Notification from '../pageObject/notification/notification'
import SecurePageForCreateNewAccount from '../pageObject/manageAccountsFlow/createNewAccount/secure.page'
import GenerateData from '../data/GenerateData'
import BrowserInstance from '../browserInstance.js';

exports.customTest = base.test.extend({
    createNewAccount: async ({ createInstanceForNewAccount }, use) => {
        await createInstanceForNewAccount.goToSystemAdministrationPage()
        await createInstanceForNewAccount.goToManageAccountsPage()
        await use(createInstanceForNewAccount);
    },
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
    createInstanceForNewAccount: async ({ page }, use) => {
        await use(new CreateNewAccount(page))
    },
    notification: async ({ page }, use) => {
        await use(new Notification(page));
    },
    generateData: async ({ }, use) => {
        await use(new GenerateData())
    },
    securePageForCreateNewAccount: async ({ page }, use) => {
        await use(new SecurePageForCreateNewAccount(page))
    }
})