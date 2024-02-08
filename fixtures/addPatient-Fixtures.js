const base = require('@playwright/test')
const notification = require('../pageObject/notification/notification')
const securePageForAddPatient = require('../pageObject/addPatientFlow/addPatient/secureAddPatient')
const addPatient = require('../pageObject/addPatientFlow/addPatient/addPatientDetails')
const sechduleAppointment = require('../pageObject/addPatientFlow/sechduleAppointment/sechduleAppointment.js')

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
    notification: async ({ page }, use) => {
        await use(notification.createInstance(page));
    },
    securePageForAddPatient: async ({ page }, use) => {
        await use(securePageForAddPatient.createInstance(page))
    },
    addPatient: async ({ page }, use) => {
        await use(addPatient.createInstance(page))
    },
    sechduleAppointment: async ({ page }, use) => {
        await use(sechduleAppointment.createInstance(page))
    },

})