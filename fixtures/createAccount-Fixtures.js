const base = require('@playwright/test')
import CreateNewAccount from '../pageObject/manageAccountsFlow/createNewAccount/createNewAccount'
import Notification from '../pageObject/notification/notification'
import SecurePageForCreateNewAccount from '../pageObject/manageAccountsFlow/createNewAccount/secure.page'
import GenerateData from '../data/GenerateData'

exports.customTest = base.test.extend({
    createNewAccount: async ({ page, createInstanceForNewAccount }, use) => {
        await page.goto('/');
        await createInstanceForNewAccount.goToSystemAdministrationPage()
        await createInstanceForNewAccount.goToManageAccountsPage()
        await use(createInstanceForNewAccount);
    },
    createInstanceForNewAccount: async ({ page }, use) => {
        await use(CreateNewAccount.createInstance(page))
    },
    notification: async ({ page }, use) => {
        await use(Notification.createInstance(page));
    },

    // why to pass argument
    generateData: async ({ page }, use) => {
        await use(GenerateData.createInstance(page))
    },
    securePageForCreateNewAccount: async ({ page }, use) => {
        await use(SecurePageForCreateNewAccount.createInstance(page))
    }
})