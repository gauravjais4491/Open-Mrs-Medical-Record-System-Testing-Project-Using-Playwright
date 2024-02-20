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
        await use(SechduleAppointment.createInstance(page))
    },

    addPatient: async ({ page }, use) => {
        await use(AddPatient.createInstance(page))
    },

    page: async ({ page }, use) => {
        await use(page)
    },

    notification: async ({ page }, use) => {
        await use(Notification.createInstance(page));
    },

    startVisit: async ({ page }, use) => {
        await use(StartVisit.createInstance(page))
    },

    homePage: async ({ page }, use) => {
        await use(HomePage.createInstance(page))
    },

    patientRecordPage: async ({ page }, use) => {
        await use(PatientRecordPage.createInstance(page))
    },

    deletePatient: async ({ page }, use) => {
        await use(DeletePatient.createInstance(page))
    },

    securePageForSechduleAppointment: async ({ page }, use) => {
        await use(SecurePageForSechduleAppointment.createInstance(page))
    },

    deleteData: async ({ page }, use) => {
        await use(DeleteData.createInstance(page))
    },

    saveData: async ({ page }, use) => {
        await use(SaveData.createInstance(page))
    }
})