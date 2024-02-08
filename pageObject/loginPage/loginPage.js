class LoginPage {
    constructor(page){
        this.page = page
    }
    static createInstance(page){
        return new LoginPage(page)
    }
    get inputUsername() {
        return this.page.getByPlaceholder("Enter your username")
    }

    get inputPassword() {
        return this.page.getByPlaceholder("Enter your password")
    }

    inputLocation(location) {
        return this.page.getByText(location)
    }

    get btnSubmit() {
        return this.page.locator("#loginButton")
    }

    async login(username, password,location) {
        await this.inputUsername.fill(username);
        await this.inputPassword.fill(password);
        await this.inputLocation(location).click()
        await this.btnSubmit.click();
    }
}

module.exports = LoginPage;