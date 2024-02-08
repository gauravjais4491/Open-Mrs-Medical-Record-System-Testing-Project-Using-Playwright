import { chromium, expect } from '@playwright/test';
const adminData = require('./data/adminData.json')
const globalSetup = async () => {
    const timeAssertion = expect.configure({ timeout: 30000 })
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const a = "sjhd"
    try {
        await context.tracing.start({ screenshots: true, snapshots: true });
        await page.goto('https://demo.openmrs.org/openmrs/login.htm')
        await page.getByPlaceholder("Enter your username").pressSequentially(adminData.adminUsername)
        // await page.getByPlaceholder("Enter your password").pressSequentially(adminData.adminPassword)
        await page.locator(`input:near(:text("Password:"))`).first().pressSequentially(adminData.adminPassword)
        await page.getByText("Registration Desk").click()
        await page.locator("#loginButton").click()
        await page.locator(`.icon-signout.small`).waitFor()
        await timeAssertion(page.locator('.icon-signout.small')).toBeVisible()
        await page.context().storageState({ path: "./LoginAuthCQ.json" })
        await context.tracing.stop({
            path: './test-results/setup-trace.zip',
        });
        await browser.close();
    } catch (error) {
        await context.tracing.stop({
            path: './test-results/setup-trace.zip',
        });
        await browser.close();
        throw error;
    }

};

export default globalSetup;