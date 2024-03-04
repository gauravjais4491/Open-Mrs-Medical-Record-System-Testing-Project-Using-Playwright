class StartVisit {
    constructor(page) {
        this.page = page
    }
    get visitBtn() {
        return this.page.getByRole('link', { name: 'Start Visit' })
    }
    get visitConfirm() {
        return this.page.getByRole('button', { name: 'Confirm' })
    }
    async visit() {
        await this.visitBtn.click()
        await this.visitConfirm.click()
    }
}
module.exports = StartVisit;