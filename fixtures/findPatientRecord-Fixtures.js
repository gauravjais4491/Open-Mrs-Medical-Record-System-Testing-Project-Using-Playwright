const base = require('@playwright/test')
import Notification from '../pageObject/notification/notification.js'
import SechduleAppointment from '../pageObject/findPatientRecord/sechduleAppointment/sechduleAppointment.js'
import StartVisit from '../pageObject/findPatientRecord/startVisitFlow/startVisit.js'
import HomePage from '../pageObject/homePageFlow/homePage.js'
import PatientRecordPage from '../pageObject/findPatientRecord/patientRecordPage.js'
import DeletePatient from '../pageObject/findPatientRecord/deletePatientFlow/deletePatient.js'
import AddPatient from '../pageObject/addPatient/addPatientDetails'
import SecurePageForSechduleAppointment from '../pageObject/findPatientRecord/sechduleAppointment/securePageForSechduleAppointment.js'
import DeleteData from '../HandleJsonData/deleteData.js'
import SaveData from '../HandleJsonData/saveData.js'


exports.customTest = base.test.extend({
    sechduleAppointment: async ({ page }, use) => {
        await use(new SechduleAppointment(page))
    },

    addPatient: async ({ page }, use) => {
        await use(new AddPatient(page))
    },

    page: async ({ page }, use) => {
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
    },

    saveData: async ({ page }, use) => {
        await use(new SaveData(page))
    }
})