const base = require('@playwright/test')
const createNewAccount = require('../pageObject/manageAccountsFlow/createNewAccount/createNewAccount')
const notification = require('../pageObject/notification/notification')
const securePageForCreateNewAccount = require('../pageObject/manageAccountsFlow/createNewAccount/secure.page')
const userData = require('../data/userData.json')
const securePageForAddPatient = require('../pageObject/addPatientFlow/addPatient/secureAddPatient')
const addPatient = require('../pageObject/addPatientFlow/addPatient/addPatientDetails')
const sechduleAppointment = require('../pageObject/addPatientFlow/sechduleAppointment/sechduleAppointment.js')

exports.customTest = base.test.extend({
    createNewAccount: async ({ page, createInstanceForNewAccount }, use) => {
        await page.goto(userData.url);
        await createInstanceForNewAccount.goToSystemAdministrationPage()
        await createInstanceForNewAccount.goToManageAccountsPage()
        await use(createInstanceForNewAccount);
    },
    createInstanceForNewAccount: async ({ page }, use) => {
        await use(createNewAccount.createInstance(page))
    },
    notification: async ({ page }, use) => {
        await use(notification.createInstance(page));
    },
    securePageForCreateNewAccount: async ({ page }, use) => {
        await use(securePageForCreateNewAccount.createInstance(page))
    }
})