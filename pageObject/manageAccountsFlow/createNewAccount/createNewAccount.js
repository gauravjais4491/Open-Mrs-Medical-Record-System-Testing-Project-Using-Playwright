class CreateNewAccount {
    constructor(page) {
        this.page = page;
    }
    static createInstance(page) {
        return new CreateNewAccount(page)
    }
    get systemAdministrationButton() {
        return this.page.getByText("System Administration")
    }
    get manageAccountButton() {
        return this.page.getByText('Manage Accounts')
    }
    get addNewAccountButton() {
        return this.page.getByText('Add New Account')
    }
    get adminFamilyName() {
        return this.page.getByLabel('Family Name')
    }
    get adminGivenName() {
        return this.page.getByLabel('Given Name')
    }
    adminGender(gender) {
        return this.page.getByText(gender, { exact: true })
    }
    get addUserAccount() {
        return this.page.locator(`#adminui-addUserAccount`)
    }
    get userName() {
        return this.page.getByLabel('Username')
    }
    get privilegeLevel() {
        return this.page.getByLabel('Privilege Level')
    }
    get password() {
        return this.page.getByLabel('Password', { exact: true })
    }
    get confirmPassword() {
        return this.page.getByLabel('Confirm Password')
    }
    addCapablities(capabilities) {
        return this.page.locator(`[id="adminui-capabilities-Application: ${capabilities}"]`)
    }
    get providerDetails() {
        return this.page.locator('#adminui-addProviderAccount')
    }
    get identifer() {
        return this.page.getByLabel('Identifier')
    }
    get providerRole() {
        return this.page.getByLabel('Provider Role')
    }
    get saveDetails() {
        return this.page.locator(`#save-button`)
    }

    async goToSystemAdministrationPage() {
        await this.systemAdministrationButton.click()
        return this
    }
    async goToManageAccountsPage() {
        await this.manageAccountButton.click()
        return this
    }
    async addPersonDetails(familyName, givenName, gender) {
        await this.addNewAccountButton.click()
        await this.adminFamilyName.fill(familyName)
        await this.adminGivenName.fill(givenName)
        await this.adminGender(gender).click()
        return this
    }
    async addUserAccountDetails(givenName, privilegeLevelText, password, confirmPassword) {
        await this.addUserAccount.click()
        await this.userName.fill(givenName)
        await this.privilegeLevel.click()
        await this.privilegeLevel.selectOption(privilegeLevelText)
        await this.password.fill(password)
        await this.confirmPassword.fill(confirmPassword)
        return this
    }
    async addCapablitiesToUserAccount(capabilities) {
        for (const item of capabilities) {
            await this.addCapablities(item).click()
        }
        return this
    }
    async addProviderDetails(idenfier, providerRoleText) {
        await this.providerDetails.click()
        await this.identifer.fill(idenfier)
        await this.providerRole.click()
        await this.providerRole.selectOption(providerRoleText)
        return this

    }
    async saveDetailsBtn() {
        await this.saveDetails.click()
        return this
    }
}
module.exports = CreateNewAccount;