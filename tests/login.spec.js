const { expect } = require("@playwright/test")
const { customTest } = require('../fixtures/loginFixture')
const userData = require('../data/userData.json')
const expectedString = require('../data/expectedStringData.json')
const adminData = require('../data/adminData.json')

customTest.beforeEach(async ({ context }) => {
    await context.clearCookies()
})


customTest('should login', async ({ loginPage, securePageForLogin }, testInfo) => {
    console.log(testInfo.title);
    await loginPage.login(userData.username, userData.password, userData.location)
    expect(await securePageForLogin.flashLoginSuccessfull()).toContain(expectedString.expectTextForLoginSuccessfull)
})

customTest('should login with admin', async ({ loginPage, securePageForLogin }, testInfo) => {
    console.log(testInfo.title);
    await loginPage.login(adminData.adminUsername, adminData.adminPassword, userData.location)
    expect(await securePageForLogin.flashLoginSuccessfull()).toContain(expectedString.expectTextForLoginSuccessfull)
})


customTest.afterEach('Clean Up', async ({ browser }) => {
    await browser.close()
})