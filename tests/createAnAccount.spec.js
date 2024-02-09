const { expect } = require("@playwright/test")
const json = require('../data/userData.json')
const userData = JSON.parse(JSON.stringify(json))
const { customTest } = require('../fixtures/createAccount-Fixtures')
const expectedString = require('../data/expectedStringData.json')

customTest('should create an account', async ({ createNewAccount, notification }) => {
    await createNewAccount.addPersonDetails(userData.FamilyName, userData.GivenName, userData.gender)
    await createNewAccount.addUserAccountDetails(userData.GivenName, userData.privilegeLevelText, userData.password, userData.confirmPassword)
    await createNewAccount.addCapablitiesToUserAccount(userData.capabilities)
    await createNewAccount.addProviderDetails(userData.idenfier, userData.providerRoleText)
    await createNewAccount.saveDetailsBtn()
    expect.soft(await notification.flashNotification()).toContain(expectedString.expectTextForSucessfullyCreatedUser)
})

customTest('should create an account with password less than eight character', async ({ createNewAccount, securePageForCreateNewAccount }) => {
    await createNewAccount.addPersonDetails(userData.FamilyName, userData.GivenName, userData.gender)
    await createNewAccount.addUserAccountDetails(userData.GivenName, userData.privilegeLevelText, userData.passwordLessThanEightDigit.password, userData.passwordLessThanEightDigit.confirmPassword)
    expect.soft(await securePageForCreateNewAccount.flashPasswordLessThanEightCharacter()).toContain(expectedString.expectTextForPasswordLessThanEightCharacters)
})

customTest('should create an account with password and confirm password not matching', async ({ createNewAccount, securePageForCreateNewAccount }) => {
    await createNewAccount.addPersonDetails(userData.FamilyName, userData.GivenName, userData.gender)
    await createNewAccount.addUserAccountDetails(userData.GivenName, userData.privilegeLevelText, userData.differentPassword.password, userData.differentPassword.confirmPassword)
    expect.soft(await securePageForCreateNewAccount.flashPasswordNotMatch()).toContain(expectedString.expectTextForPasswordNotMatch)
})
