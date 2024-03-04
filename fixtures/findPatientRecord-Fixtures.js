const base = require('@playwright/test')
const { chromium } = require('playwright');
import Notification from '../pageObject/notification/notification.js'
import SechduleAppointment from '../pageObject/findPatientRecord/sechduleAppointment/sechduleAppointment.js'
import StartVisit from '../pageObject/findPatientRecord/startVisitFlow/startVisit.js'
import HomePage from '../pageObject/homePageFlow/homePage.js'
import PatientRecordPage from '../pageObject/findPatientRecord/patientRecordPage.js'
import DeletePatient from '../pageObject/findPatientRecord/deletePatientFlow/deletePatient.js'
import SecurePageForSechduleAppointment from '../pageObject/findPatientRecord/sechduleAppointment/securePageForSechduleAppointment.js'
import DeleteData from '../HandleJsonData/deleteData.js'


exports.customTest = base.test.extend({
    sechduleAppointment: async ({ page }, use) => {
        await use(new SechduleAppointment(page))
    },
    browser: async ({ }, use) => {
        const browser = await chromium.launch();
        await use(browser)
    },
    context: async ({ browser }, use) => {
        const context = await browser.newContext();
        await use(context)
    },
    page: async ({ context }, use) => {
        const page = await context.newPage()
        await page.goto('/')
        await use(page)
    },

    notification: async ({ page }, use) => {
        await use(new Notification(page));
    },

    startVisit: async ({ page }, use) => {
        await use(new StartVisit(page))
    },

    homePage: async ({ page }, use) => {
        await use(new HomePage(page))
    },

    patientRecordPage: async ({ page }, use) => {
        await use(new PatientRecordPage(page))
    },

    deletePatient: async ({ page }, use) => {
        await use(new DeletePatient(page))
    },

    securePageForSechduleAppointment: async ({ page }, use) => {
        await use(new SecurePageForSechduleAppointment(page))
    },

    deleteData: async ({ page }, use) => {
        await use(new DeleteData(page))
    }
})