const { expect, chromium } = require("@playwright/test")
const { customTest } = require('../fixtures/loginFixture')
const userData = require('../data/userData.json')
const expectedString = require('../data/expectedStringData.json')
const adminData = require('../data/adminData.json')

customTest.beforeEach(async ({ context, page }) => {
    await context.clearCookies()
    await page.goto('/')
})


customTest('should login', async ({ loginPage }) => {
    await loginPage.login(userData.username, userData.password, userData.location)
})

customTest('should login with admin', async ({ loginPage }) => {
    await loginPage.login(adminData.adminUsername, adminData.adminPassword, userData.location)
})


customTest.afterEach(async ({ securePageForLogin }) => {
    expect(await securePageForLogin.flashLoginSuccessfull()).toContain(expectedString.expectTextForLoginSuccessfull)
})
