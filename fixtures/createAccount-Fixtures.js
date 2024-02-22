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
    page: async ({ page}, use) => {
        await use(page)
    },
    createInstanceForNewAccount: async ({ page }, use) => {
        await use(new CreateNewAccount(page))
    },
    notification: async ({ page }, use) => {
        await use(new Notification(page));
    },

    // why to pass argument
    generateData: async ({ page }, use) => {
        await use(new GenerateData(page))
    },
    securePageForCreateNewAccount: async ({ page }, use) => {
        await use(new SecurePageForCreateNewAccount(page))
    }
})