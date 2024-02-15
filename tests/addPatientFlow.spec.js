const { test, expect } = require("@playwright/test")
const userData = require('../data/userData.json')
const expectedString = require('../data/expectedStringData.json')
const { customTest } = require('../fixtures/addPatient-Fixtures')


customTest("Add Patient Flow", async ({ securePageForAddPatient, testDataForAddPatient, addPatient, notification, page, sechduleAppointment }, testInfo) => {
    console.log(testInfo.title);
    await test.step("should go to add patient details page", async () => {
        await page.goto(userData.url)
        await addPatient.goToPatientDetailsPage()
        expect.soft(await securePageForAddPatient.flashNotification()).toContain(expectedString.expectTextForAddPatientDetailsPage);
    });

    await test.step('should add patient details', async () => {
        await addPatient.addPatientName(testDataForAddPatient.firstName, testDataForAddPatient.middleName, testDataForAddPatient.lastName)
        await addPatient.addGender(testDataForAddPatient.patientGender)
        await addPatient.addBirthday(testDataForAddPatient.birthDayDate, testDataForAddPatient.birthDayMonth, testDataForAddPatient.birthDayYear)
        await addPatient.addAddress(testDataForAddPatient.address, testDataForAddPatient.address2, testDataForAddPatient.city, testDataForAddPatient.state, testDataForAddPatient.country, testDataForAddPatient.postalCode)
        await addPatient.addPhoneNumber(testDataForAddPatient.patientPhoneNumber)
        await addPatient.addRelationType(testDataForAddPatient.relativeOccupation, testDataForAddPatient.relativeName)
        await addPatient.confirmDetails()
        expect.soft(await notification.flashNotification()).toContain(expectedString.expectTextForSucessfullyPatientRegistered)
    });

    // await test.step("should schedule appointment", async () => {
    //     await sechduleAppointment.open()
    //     await sechduleAppointment.addAppointmentDetails('Infectious Disease (New Patient)')
    //     await expect.soft(SecurePageForSechduleAppoinment.flashAlert).toBeExisting()
    //     await expect.soft(SecurePageForSechduleAppoinment.flashAlert).toHaveTextContaining('Infectious Disease (New Patient)')
    //     await sechduleAppointment.StartVisit()
    //     await notification.flashNotification(expectedString.expectTextForSucessfullySechduledAppointment)
    // });
})