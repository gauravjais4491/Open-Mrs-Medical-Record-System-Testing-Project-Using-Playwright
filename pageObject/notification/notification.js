class Notification {
    constructor(page) {
        this.page = page;
    }
    get notification() {
        return this.page.locator(`[class="toast-item toast-type-success"] > p`)
    }
    async flashNotification() {
        let notificationText = null;
        while (notificationText === null) {
            try {
                notificationText = await this.notification.textContent({ timeout: 500 });
            } catch (e) {
                continue;
            }
            return notificationText;
        }
    }
}
module.exports = Notification
