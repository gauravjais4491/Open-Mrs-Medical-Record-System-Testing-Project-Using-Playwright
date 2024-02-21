const { expect, chromium } = require("@playwright/test")
const { customTest } = require('../fixtures/loginFixture')
const userData = require('../data/userData.json')
const expectedString = require('../data/expectedStringData.json')
const adminData = require('../data/adminData.json')

customTest.beforeEach(async ({ context, page }) => {
    await context.clearCookies()
    await page.goto('/')
})


customTest('should login', async ({ loginPage, securePageForLogin }) => {
    await loginPage.login(userData.username, userData.password, userData.location)
    expect(await securePageForLogin.flashLoginSuccessfull()).toContain(expectedString.expectTextForLoginSuccessfull)
})

customTest('should login with admin', async ({ loginPage, securePageForLogin }) => {
    await loginPage.login(adminData.adminUsername, adminData.adminPassword, userData.location)
    expect(await securePageForLogin.flashLoginSuccessfull()).toContain(expectedString.expectTextForLoginSuccessfull)
})
