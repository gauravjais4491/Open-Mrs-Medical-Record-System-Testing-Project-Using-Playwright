class SecurePageForHomePage {
    constructor(page) {
        this.page = page
    }
    static createInstance(page) {
        return new SecurePageForHomePage(page)
    }
    get flashAlert() {
        return this.page.locator('#content').locator('>h2')
    }
    async flashNotification() {
        let notificationText = null;
        notificationText = await this.flashAlert.textContent();
        return notificationText;
    }
}
module.exports = SecurePageForHomePage