const { test, expect } = require("@playwright/test")
const expectedString = require('../data/expectedStringData.json')
const { customTest } = require('../fixtures/addPatient-Fixtures')



customTest("Add Patient Flow", async ({ testDataForAddPatient, addPatient, notification, homePage, securePageForHomePage }, testInfo) => {
    console.log(testInfo.title);
    await test.step("should go to add patient details page", async () => {
        await homePage.goToPatientDetailsPage()
        expect(await securePageForHomePage.flashNotification()).toContain(expectedString.expectTextForAddPatientDetailsPage);
    });

    await test.step('should add patient details', async () => {
        await addPatient.addPatientName(testDataForAddPatient.firstName, testDataForAddPatient.middleName, testDataForAddPatient.lastName)
        await addPatient.addGender(testDataForAddPatient.patientGender)
        await addPatient.addBirthday(testDataForAddPatient.birthDayDate, testDataForAddPatient.birthDayMonth, testDataForAddPatient.birthDayYear)
        await addPatient.addAddress(testDataForAddPatient.address, testDataForAddPatient.address2, testDataForAddPatient.city, testDataForAddPatient.state, testDataForAddPatient.country, testDataForAddPatient.postalCode)
        await addPatient.addPhoneNumber(testDataForAddPatient.patientPhoneNumber)
        await addPatient.addRelationType(testDataForAddPatient.relativeOccupation, testDataForAddPatient.relativeName)
        await addPatient.confirmDetails()
        const text = await notification.flashNotification()
        expect(text).toContain(expectedString.expectTextForSucessfullyPatientRegistered)
    });
})

customTest.afterEach('Clean Up', async ({ browser }) => {
    await browser.close()
})