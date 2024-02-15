class LoginPage {
    constructor(page) {
        this.page = page
    }
    static createInstance(page) {
        return new LoginPage(page)
    }
    get inputUsername() {
        return this.page.locator('#username')
    }

    get inputPassword() {
        return this.page.locator('#password')
    }

    inputLocation(location) {
        return this.page.getByText(location)
    }

    get btnSubmit() {
        return this.page.locator("#loginButton")
    }
    get logoutBtn() {
        return this.page.locator(`.icon-signout.small`)
    }

    async login(username, password, location) {
        await this.inputUsername.fill(username);
        await this.inputPassword.fill(password);
        await this.inputLocation(location).click()
        await this.btnSubmit.click();
    }
    async lookForLogoutBtn() {
        await this.logoutBtn.waitFor()
    }
}

module.exports = LoginPage;