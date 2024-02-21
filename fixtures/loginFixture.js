const base = require('@playwright/test')
import LoginPage from '..//pageObject/loginPage/loginPage'
import SecurePageForLogin from '../pageObject/loginPage/securePageForLogin'


exports.customTest = base.test.extend({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page))
    },
    securePageForLogin: async ({ page }, use) => {
        await use(new SecurePageForLogin(page))
    }
})