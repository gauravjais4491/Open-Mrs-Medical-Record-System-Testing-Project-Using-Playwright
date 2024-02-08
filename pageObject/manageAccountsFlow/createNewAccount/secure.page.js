class SecurePageForCreateNewAccount {
    constructor(page) {
        this.page = page
    }
    static createInstance(page) {
        return new SecurePageForCreateNewAccount(page)
    }
    get passwordLessThanEightCharacter() {
        return this.page.getByText('At least 8 character(s) are required')
    }
    get passwordNotMatch() {
        return this.page.getByText(`Passwords don't match`)
    }

    async flashPasswordNotMatch() {
        let notificationText = null;
        notificationText = await this.passwordNotMatch.textContent();
        return notificationText
    }
    async flashPasswordLessThanEightCharacter() {
        let notificationText = null;
        notificationText = (await this.passwordLessThanEightCharacter.textContent()).trim();
        return notificationText
    }

}
module.exports = SecurePageForCreateNewAccount;