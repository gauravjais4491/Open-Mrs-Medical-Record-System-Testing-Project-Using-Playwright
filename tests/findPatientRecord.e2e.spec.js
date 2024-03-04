const { expect } = require("@playwright/test")
const expectedString = require('../data/expectedStringData.json')
const { customTest } = require('../fixtures/findPatientRecord-Fixtures')
import patientRecordData from '../data/patientRecord.json'

customTest.beforeEach(async ({ homePage }) => {
    await homePage.goToPatientRecordPage()
})

customTest("Schedule Appointment @sechdule", async ({ sechduleAppointment, notification, securePageForSechduleAppointment, patientRecordPage, deleteData }) => {
    await patientRecordPage.searchPatient(patientRecordData.patientId1)
    await expect(await securePageForSechduleAppointment.flashAlert()).not.toBeVisible()
    await sechduleAppointment.addAppointmentDetails(patientRecordData.appointmentType, patientRecordData.provideName)
    // expect(await notification.flashNotification()).toContain(expectedString.expectTextForSucessfullySechduledAppointment)
    await expect(await securePageForSechduleAppointment.flashAlert()).toBeVisible()
    await deleteData.deletePropertyFromJsonFile(patientRecordData.patientId1)
});

customTest("Start Visit @searchPatient", async ({ startVisit, notification, patientRecordPage, deleteData }, testInfo) => {
    console.log(testInfo.title);
    await patientRecordPage.searchPatient(patientRecordData.patientId2)
    await startVisit.visit()
    expect(await notification.flashNotification()).toContain(expectedString.expectTextForSucessfullyVisitStarted)
    await deleteData.deletePropertyFromJsonFile(patientRecordData.patientId2)
});

customTest('Delete Patient @delete', async ({ deletePatient, notification, patientRecordPage, deleteData }, testInfo) => {
    console.log(testInfo.title);
    await patientRecordPage.searchPatient(patientRecordData.patientId3)
    await deletePatient.delete(patientRecordData.reason)
    expect(await notification.flashNotification()).toContain(expectedString.expectTextForDeletePatientSucessfully)
    await deleteData.deletePropertyFromJsonFile(patientRecordData.patientId3)
})


customTest.afterEach('Clean Up', async ({ browser }) => {
    await browser.close()
})