import { chromium, expect } from '@playwright/test';
import userData from './data/userData.json'
// const userData = require('./data/userData.json')
const adminData = require('./data/adminData.json')
const expectedString = require('./data/expectedStringData.json')
const CreateNewAccount = require('./pageObject/manageAccountsFlow/createNewAccount/createNewAccount')
const Notification = require('./pageObject/notification/notification')
const LoginPage = require('./pageObject/loginPage/loginPage')
const SecurePageForLogin = require('./pageObject/loginPage/securePageForLogin')
const globalSetup = async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const createNewAccount = CreateNewAccount.createInstance(page)
    const notification = Notification.createInstance(page)
    const loginPage = LoginPage.createInstance(page)
    const securePageForLogin = SecurePageForLogin.createInstance(page)
    try {
        await page.goto(userData.url)

        await loginPage.login(userData.username, userData.password, userData.location)
        expect(await securePageForLogin.flashLoginSuccessfull()).toContain(expectedString.expectTextForLoginSuccessfull)

        await loginPage.lookForLogoutBtn()

        await page.context().storageState({ path: "./LoginAuthCQ.json" })

    } catch (error) {
        let count = 0;

        await page.goto(userData.url)
        await loginPage.login(adminData.adminUsername, adminData.adminPassword, userData.location)
        expect(await securePageForLogin.flashLoginSuccessfull()).toContain(expectedString.expectTextForLoginSuccessfull)

        await createNewAccount.goToSystemAdministrationPage()
        await createNewAccount.goToManageAccountsPage()
        await createNewAccount.addPersonDetails(adminData.familyName, adminData.givenName, adminData.gender)
        await createNewAccount.addUserAccountDetails(adminData.givenName, adminData.privilegeLevelText, adminData.password, adminData.confirmPassword)
        await createNewAccount.addCapablitiesToUserAccount(adminData.capabilities)
        await createNewAccount.addProviderDetails(adminData.idenfier, adminData.providerRoleText)
        await createNewAccount.saveDetailsBtn()
        expect(await notification.flashNotification()).toContain(expectedString.expectTextForSucessfullyCreatedUser)

        if (count === 0) {
            count++
            await globalSetup()
        }
    }
    await browser.close();
};

export default globalSetup;