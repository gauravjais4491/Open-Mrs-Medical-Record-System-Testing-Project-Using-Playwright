class DeletePatient {
    constructor(page) {
        this.page = page
    }
    get deletePatientBtn() {
        return this.page.getByRole('link', { name: 'Delete Patient' })
    }
    get reasonTextBox() {
        return this.page.locator('#delete-reason')
    }
    get confirmBtn(){
        return this.page.getByRole('button', { name: "Confirm"})
    }
    async delete(reason){
        await this.deletePatientBtn.click()
        await this.reasonTextBox.fill(reason)
        await this.confirmBtn.click()
    }
}
module.exports = DeletePatient