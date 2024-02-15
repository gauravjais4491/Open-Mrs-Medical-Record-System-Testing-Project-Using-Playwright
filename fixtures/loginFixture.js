const base = require('@playwright/test')
const loginPage = require('..//pageObject/loginPage/loginPage')
const securePageForLogin = require('../pageObject/loginPage/securePageForLogin')


exports.customTest = base.test.extend({
    loginPage: async ({ page }, use) => {
        await use(loginPage.createInstance(page))
    },
    securePageForLogin: async ({ page }, use) => {
        await use(securePageForLogin.createInstance(page))
    }
})