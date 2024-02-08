class ScheduleAppointment {
    static createInstance(page) {
        return new ScheduleAppointment(page)
    }
    constructor(page) {
        this.page = page
    }
    get appointmentBtn() {
        return this.page.locator(".float-left")
    }
    get appointmentType() {
        return $(`#appointment-type`)
    }
    get SuggessionItem() {
        return $(`[class="ng-scope ng-binding"]`)
    }
    get saveAppointment() {
        return $(`#save-button`)
    }
    get startVisit() {
        return $(`div*=Start Visit`)
    }
    get VisitConfirm() {
        return $(`#start-visit-with-visittype-confirm`)
    }
    async goToAppointmentPage() {
        await this.appointmentBtn.click()
    }

    async addAppointmentDetails(appointmentType) {
        await this.appointmentType.setValue(appointmentType)
        await this.SuggessionItem.click()
        await this.saveAppointment().click()
    }
    async StartVisit() {
        await this.startVisit.click()
        await this.VisitConfirm.click()
    }
}
module.exports = ScheduleAppointment;