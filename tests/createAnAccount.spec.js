const { expect } = require("@playwright/test")
import createAccountData from '../data/createAccount.json'
import { customTest } from '../fixtures/createAccount-Fixtures'
import expectedString from '../data/expectedStringData.json'

let givenName

customTest.beforeEach('should generate given name', async ({ generateData }) => {
    givenName = await generateData.generateGivenName();
})

customTest('should create an account', async ({ createNewAccount, notification }) => {
    await createNewAccount.addPersonDetails(createAccountData.familyName, givenName, createAccountData.gender)
    await createNewAccount.addUserAccountDetails(givenName, createAccountData.privilegeLevelText, createAccountData.password, createAccountData.confirmPassword)
    await createNewAccount.addCapablitiesToUserAccount(createAccountData.capabilities)
    await createNewAccount.addProviderDetails(createAccountData.idenfier, createAccountData.providerRoleText)
    await createNewAccount.saveDetailsBtn()
    expect.soft(await notification.flashNotification()).toContain(expectedString.expectTextForSucessfullyCreatedUser)
})

customTest('should create an account with password less than eight character', async ({ createNewAccount, securePageForCreateNewAccount }) => {
    await createNewAccount.addPersonDetails(createAccountData.familyName, givenName, createAccountData.gender)
    await createNewAccount.addUserAccountDetails(givenName, createAccountData.privilegeLevelText, createAccountData.passwordLessThanEightDigit.password, createAccountData.passwordLessThanEightDigit.confirmPassword)
    expect.soft(await securePageForCreateNewAccount.flashPasswordLessThanEightCharacter()).toContain(expectedString.expectTextForPasswordLessThanEightCharacters)
})

customTest('should create an account with password and confirm password not matching', async ({ createNewAccount, securePageForCreateNewAccount }) => {
    await createNewAccount.addPersonDetails(createAccountData.familyName, givenName, createAccountData.gender)
    await createNewAccount.addUserAccountDetails(givenName, createAccountData.privilegeLevelText, createAccountData.differentPassword.password, createAccountData.differentPassword.confirmPassword)
    expect.soft(await securePageForCreateNewAccount.flashPasswordNotMatch()).toContain(expectedString.expectTextForPasswordNotMatch)
})
