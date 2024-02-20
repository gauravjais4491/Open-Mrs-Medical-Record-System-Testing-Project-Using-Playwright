class SecurePageForSechduleAppointment{
    constructor(page) {
        this.page = page
    }
    static createInstance(page){
        return new SecurePageForSechduleAppointment(page)
    }
    flashAlert(){
        return this.page.locator('#miniPatientAppointmentRequests')
    }
}
module.exports = SecurePageForSechduleAppointment