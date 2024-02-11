const base = require('@playwright/test')
const createNewAccount = require('../pageObject/manageAccountsFlow/createNewAccount/createNewAccount')
const notification = require('../pageObject/notification/notification')
const securePageForCreateNewAccount = require('../pageObject/manageAccountsFlow/createNewAccount/secure.page')
const userData = require('../data/userData.json')
const generateData = require('../data/GenerateData')

exports.customTest = base.test.extend({
    createNewAccount: async ({ page, createInstanceForNewAccount }, use) => {
        await page.goto(userData.url);
        await createInstanceForNewAccount.goToSystemAdministrationPage()
        await createInstanceForNewAccount.goToManageAccountsPage()
        await use(createInstanceForNewAccount);
    },
    // givenName: async ({ createInstanceForGenerateData }, use) => {
    //     await use(createInstanceForGenerateData.generateGivenName())

    // },
    createInstanceForNewAccount: async ({ page }, use) => {
        await use(createNewAccount.createInstance(page))
    },
    notification: async ({ page }, use) => {
        await use(notification.createInstance(page));
    },

    // why to pass argument
    generateData: async ({ page }, use) => {
        await use(generateData.createInstance(page))
    },
    securePageForCreateNewAccount: async ({ page }, use) => {
        await use(securePageForCreateNewAccount.createInstance(page))
    }
})