class HomePage {
    constructor(page) {
        this.page = page
    }
    get patientRecordBtn() {
        return this.page.getByRole('link', { name: 'Find Patient Record' })
    }
    get registerPatientBtn() {
        return this.page.getByText('Register a patient')
    }
    async goToPatientRecordPage() {
        await this.patientRecordBtn.click()
    }
    async goToPatientDetailsPage() {
        await this.registerPatientBtn.last().click()
    }
}
module.exports = HomePage