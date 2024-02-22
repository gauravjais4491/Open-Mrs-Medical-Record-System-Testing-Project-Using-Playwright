const { expect } = require("@playwright/test")
const expectedString = require('../data/expectedStringData.json')
const { customTest } = require('../fixtures/findPatientRecord-Fixtures')
import patientRecordData from '../data/patientRecord.json'
import Notification from '../pageObject/notification/notification.js'
let notification
customTest.beforeEach(async ({ homePage, page }) => {
    notification = new Notification(page)
    await page.goto('/')
    await homePage.goToPatientRecordPage()

})

customTest("Schedule Appointment", async ({ sechduleAppointment, securePageForSechduleAppointment, patientRecordPage, deleteData }) => {
    await patientRecordPage.searchPatient(patientRecordData.patientId1)
    await expect(await securePageForSechduleAppointment.flashAlert()).not.toBeVisible()
    await sechduleAppointment.addAppointmentDetails(patientRecordData.appointmentType, patientRecordData.provideName)
    // expect(await notification.flashNotification()).toContain(expectedString.expectTextForSucessfullySechduledAppointment)
    await expect(await securePageForSechduleAppointment.flashAlert()).toBeVisible()
    await deleteData.deletePropertyFromJsonFile(patientRecordData.patientId1)
});

customTest("Start Visit", async ({ startVisit, patientRecordPage, deleteData }, testInfo) => {
    console.log(testInfo.title);
    await patientRecordPage.searchPatient(patientRecordData.patientId2)
    await startVisit.visit()
    await notification.flashNotification(expectedString.expectTextForSucessfullyVisitStarted)
    expect(await notification.flashNotification()).toContain(expectedString.expectTextForSucessfullyVisitStarted)
    await deleteData.deletePropertyFromJsonFile(patientRecordData.patientId2)
});

customTest('Delete Patient', async ({ deletePatient, patientRecordPage, deleteData }, testInfo) => {
    console.log(testInfo.title);
    await patientRecordPage.searchPatient(patientRecordData.patientId3)
    await deletePatient.delete(patientRecordData.reason)
    expect(await notification.flashNotification()).toContain(expectedString.expectTextForDeletePatientSucessfully)
    await deleteData.deletePropertyFromJsonFile(patientRecordData.patientId3)
})