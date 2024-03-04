class ScheduleAppointment {
    constructor(page) {
        this.page = page
    }
    get appointmentBtn() {
        return this.page.getByRole('link', { name: 'Request Appointment' })
    }
    get providerName() {
        return this.page.locator('#provider')
    }
    get appointmentType() {
        return this.page.locator('#appointment-type')
    }
    suggessionItem(inputText) {
        return this.page.getByText(inputText)
    }
    get saveAppointment() {
        return this.page.getByRole('button', { name: 'Save' })
    }
    async addAppointmentDetails(appointmentType, provideName) {
        await this.appointmentBtn.click()
        await this.appointmentType.fill(appointmentType)
        await this.suggessionItem(appointmentType).click()
        await this.providerName.fill(provideName)
        await this.suggessionItem(provideName).click()
        await this.saveAppointment.click()
    }
}
module.exports = ScheduleAppointment;