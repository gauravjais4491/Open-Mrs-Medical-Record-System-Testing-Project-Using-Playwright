class SecurePageForLogin {
    constructor(page) {
        this.page = page;
    }
    get flashAlert() {
        return this.page.locator(`.nav-item.logout > a`)
    }
    async flashLoginSuccessfull() {
        let notificationText = null;
        notificationText = (await this.flashAlert.textContent()).trim();
        return notificationText
    }
}
module.exports = SecurePageForLogin;