class PatientRecordPage {
    constructor(page) {
        this.page = page
    }
    static createInstance(page) {
        return new PatientRecordPage(page)
    }
    get searchBox() {
        return this.page.getByPlaceholder('Search by ID or Name')
    }
    async searchPatient(patientId) {
        await this.searchBox.waitFor()
        // let id = await this.page.locator(`td:has-text('Recent')`).allInnerTexts()
        // for (let i = 0; i < id.length; i++) {
        //     let patientId = id[i].substring(0, 6)
        //     console.log(patientId);
        // }
        await this.searchBox.fill(patientId)
        await this.page.keyboard.press('Enter')
    }
}
module.exports = PatientRecordPage