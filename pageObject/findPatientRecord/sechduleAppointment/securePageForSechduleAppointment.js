class SecurePageForSechduleAppointment{
    constructor(page) {
        this.page = page
    }
    flashAlert(){
        return this.page.locator('#miniPatientAppointmentRequests')
    }
}
module.exports = SecurePageForSechduleAppointment