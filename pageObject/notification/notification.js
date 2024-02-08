class Notification {
    constructor(page) {
        this.page = page;
    }
    createInstance(page) {
        return new Notification(page)
    }
    get notification() {
        return this.page.locator(`[class="toast-item-close"]`).locator('+p');
    }
    async flashNotification() {
        await this.notification.waitFor()
        let notificationText = null;
        notificationText = await this.notification.textContent();
        return notificationText
    }
}
module.exports = new Notification()