const { test, expect, chromium } = require("@playwright/test")
const userData = require('../data/userData.json')
const expectedString = require('../data/expectedStringData.json')
const adminData = require('../data/adminData.json')
const LoginPage = require('../pageObject/loginPage/loginPage.js')
const SecurePageForLogin = require('../pageObject/loginPage/securePageForLogin')


test.only('should login', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    await context.clearCookies()
    const page = await context.newPage();
    const loginPage = LoginPage.createInstance(page)
    const securePageForLogin = SecurePageForLogin.createInstance(page)
    await page.goto(userData.url)
    await loginPage.login(userData.username, userData.password, userData.location)
    expect.soft(await securePageForLogin.flashLoginSuccessfull()).toContain(expectedString.expectTextForLoginSuccessfull)
})

test('should login with admin', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    await context.clearCookies()
    const page = await context.newPage();
    const loginPage = LoginPage.createInstance(page)
    const securePageForLogin = SecurePageForLogin.createInstance(page)
    await page.goto(userData.url)
    await loginPage.login(adminData.adminUsername, adminData.adminPassword, userData.location)
    expect.soft(await securePageForLogin.flashLoginSuccessfull()).toContain(expectedString.expectTextForLoginSuccessfull)
})

