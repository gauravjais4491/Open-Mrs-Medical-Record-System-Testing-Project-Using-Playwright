const base = require('@playwright/test')
const { chromium } = require('playwright');
import Notification from '../pageObject/notification/notification'
import AddPatient from '../pageObject/addPatient/addPatientDetails'
import HomePage from '../pageObject/homePageFlow/homePage.js'
import SecurePageForHomePage from '../pageObject/homePageFlow/securePageForHomePage'

exports.customTest = base.test.extend({
    testDataForAddPatient: {
        firstName: "Gaurav",
        middleName: "Kumar",
        lastName: "Jaiswal",
        birthDayDate: "29",
        birthDayMonth: "10",
        birthDayYear: "2022",
        patientGender: "Male",
        address: "TestVagrant Technology",
        address2: "Near Mi Showroom",
        city: "Banglore",
        state: "Karnataka",
        country: "India",
        postalCode: "560008",
        patientPhoneNumber: "1234567890",
        relativeOccupation: "Doctor",
        relativeName: "Noob"
    },
    browser: async ({ }, use) => {
        const browser = await chromium.launch();
        await use(browser)
    },
    context: async ({browser}, use) => {
        const context = await browser.newContext();
        await use(context)
    },
    page: async ({ context }, use) => {
        const page = await context.newPage()
        await page.goto('/')
        await use(page)
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page))
    },
    securePageForHomePage: async ({ page }, use) => {
        await use(new SecurePageForHomePage(page))
    },
    notification: async ({ page }, use) => {
        await use(new Notification(page));
    },
    addPatient: async ({ page }, use) => {
        await use(new AddPatient(page))
    }
})