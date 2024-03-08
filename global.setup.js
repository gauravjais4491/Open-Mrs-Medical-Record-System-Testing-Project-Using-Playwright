import { chromium, expect } from '@playwright/test';
import userData from './data/userData.json'
import adminData from './data/adminData.json'
import expectedString from './data/expectedStringData.json'
import CreateNewAccount from './pageObject/manageAccountsFlow/createNewAccount/createNewAccount'
import Notification from './pageObject/notification/notification'
import LoginPage from './pageObject/loginPage/loginPage'
import SecurePageForLogin from './pageObject/loginPage/securePageForLogin'
import HomePage from './pageObject/homePageFlow/homePage.js'
import AddPatient from './pageObject/addPatient/addPatientDetails'
import SaveData from './HandleJsonData/saveData.js'
import registerPatientData from './data/registerPatient.json';
import createAccountData from './data/createAccount.json'
const globalSetup = async () => {
    const locatorForHomeIcon = '#breadcrumbs > li> a > i'
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page)
    const securePageForLogin = new SecurePageForLogin(page)
    const homePage = new HomePage(page)
    const addPatient = new AddPatient(page)
    const saveData = new SaveData(page)
    const createNewAccount = new CreateNewAccount(page)
    const notification = new Notification(page)
    await page.goto('https://demo.openmrs.org/openmrs/login.htm',{waitUntil:'networkidle0'})
    try {
        await loginPage.login(userData.username, userData.password, userData.location)
        expect(await securePageForLogin.flashLoginSuccessfull()).toContain(expectedString.expectTextForLoginSuccessfull)
        await loginPage.lookForLogoutBtn()

        await page.context().storageState({ path: "./LoginAuthCQ.json" })
        for (let i = 0; i < 3; i++) {
            await homePage.goToPatientDetailsPage()
            await addPatient.addPatientName(registerPatientData.firstName, registerPatientData.middleName, registerPatientData.lastName)
            await addPatient.addGender(registerPatientData.patientGender)
            await addPatient.addBirthday(registerPatientData.birthDayDate, registerPatientData.birthDayMonth, registerPatientData.birthDayYear)
            await addPatient.addAddress(registerPatientData.address, registerPatientData.address2, registerPatientData.city, registerPatientData.state, registerPatientData.country, registerPatientData.postalCode)
            await addPatient.addPhoneNumber(registerPatientData.patientPhoneNumber)
            await addPatient.addRelationType(registerPatientData.relativeOccupation, registerPatientData.relativeName)
            await addPatient.confirmDetails()
            const patientId = await addPatient.getPatientId()
            await saveData.savePatientIdToJson(patientId);
            await page.locator(locatorForHomeIcon).click()
        }
    } catch (error) {

        await page.goto('https://demo.openmrs.org/openmrs/login.htm')
        let count = 0;
        await loginPage.login(adminData.adminUsername, adminData.adminPassword, adminData.location)
        await loginPage.lookForLogoutBtn()
        expect(await securePageForLogin.flashLoginSuccessfull()).toContain(expectedString.expectTextForLoginSuccessfull)

        await createNewAccount.goToSystemAdministrationPage()
        await createNewAccount.goToManageAccountsPage()
        await createNewAccount.addPersonDetails(createAccountData.familyName, createAccountData.givenName, createAccountData.gender)
        await createNewAccount.addUserAccountDetails(createAccountData.givenName, createAccountData.privilegeLevelText, createAccountData.password, createAccountData.confirmPassword)
        await createNewAccount.addCapablitiesToUserAccount(createAccountData.capabilities)
        await createNewAccount.addProviderDetails(createAccountData.idenfier, createAccountData.providerRoleText)
        await createNewAccount.saveDetailsBtn()
        expect(await notification.flashNotification()).toContain(expectedString.expectTextForSucessfullyCreatedUser)

        if (count === 0) {
            count++
            await globalSetup()
        }
    }
    await browser.close()
};

export default globalSetup;