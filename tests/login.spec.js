const { expect, chromium } = require("@playwright/test")
const { customTest } = require('../fixtures/loginFixture')
const userData = require('../data/userData.json')
const expectedString = require('../data/expectedStringData.json')
const adminData = require('../data/adminData.json')


customTest('should login', async ({ loginPage, securePageForLogin, context, page },testInfo) => {
    await context.clearCookies()
    await page.goto(userData.url)
    await loginPage.login(userData.username, userData.password, userData.location)
    expect.soft(await securePageForLogin.flashLoginSuccessfull()).toContain(expectedString.expectTextForLoginSuccessfull)
    console.log(testInfo.title);
})

customTest('should login with admin', async ({ loginPage, securePageForLogin, context, page },testInfo) => {
    await context.clearCookies()
    await page.goto(userData.url)
    await loginPage.login(adminData.adminUsername, adminData.adminPassword, userData.location)
    expect.soft(await securePageForLogin.flashLoginSuccessfull()).toContain(expectedString.expectTextForLoginSuccessfull)
    console.log(testInfo.title);
})

