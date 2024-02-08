class SecurePageForAddPatient {
    constructor(page) {
        this.page = page
    }

    static createInstance(page) {
        return new SecurePageForAddPatient(page);
    }

    get flashAlert() {
        return this.page.locator('#content > h2')
    }
    async flashNotification() {
        let notificationText = null;
        notificationText = await this.flashAlert.textContent();
        console.log(notificationText);
        return notificationText;
    }
}

module.exports = SecurePageForAddPatient;