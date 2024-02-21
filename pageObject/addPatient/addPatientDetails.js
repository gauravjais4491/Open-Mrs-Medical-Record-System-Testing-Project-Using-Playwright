class AddPatient {
    constructor(page) {
        this.page = page
    }
    get NextButton() {
        return this.page.locator(`#next-button`)
    }
    get FirstName() {
        return this.page.locator(`[name="givenName"]`)
    }
    get MiddleName() {
        return this.page.locator(`[name="middleName"]`)
    }
    get FamilyName() {
        return this.page.locator(`[name="familyName"]`)
    }
    get Gender() {
        return this.page.locator(`#gender-field`)
    }
    get BirthdayDate() {
        return this.page.locator("#birthdateDay-field")
    }
    get BirthdayMonth() {
        return this.page.locator(`#birthdateMonth-field`)
    }
    get BirthdayYear() {
        return this.page.locator(`#birthdateYear-field`)
    }
    get Address() {
        return this.page.locator(`#address1`)
    }
    get Address2() {
        return this.page.locator(`#address2`)
    }
    get City() {
        return this.page.locator(`#cityVillage`)
    }
    get State() {
        return this.page.locator(`#stateProvince`)
    }
    get Country() {
        return this.page.locator(`#country`)
    }
    get PostalCode() {
        return this.page.locator(`#postalCode`)
    }
    get PhoneNumber() {
        return this.page.locator(`[name="phoneNumber"]`)
    }
    get RelationshipType() {
        return this.page.locator(`#relationship_type`)
    }
    get PersonName() {
        return this.page.getByPlaceholder('Person Name')
    }
    get Confirm() {
        return this.page.locator(`#submit`)
    }
    get patientIdBtn() {
        return this.page.locator('.float-sm-right').locator('>span')
    }
    get CancelSubmission() {
        return this.page.locator(`#cancelSubmission`)
    }

    async addPatientName(firstName, middleName, familyName) {
        await this.FirstName.fill(firstName);
        await this.MiddleName.fill(middleName);
        await this.FamilyName.fill(familyName);
        await this.NextButton.click()
    }
    async addGender(patientGender) {
        await this.Gender.selectOption(patientGender)
        await this.NextButton.click()
    }
    async addBirthday(birthdateDate, birthdateMonth, birthdateYear) {
        await this.BirthdayDate.fill(birthdateDate)
        await this.BirthdayMonth.click()
        await this.BirthdayMonth.selectOption(birthdateMonth)
        await this.BirthdayYear.fill(birthdateYear)
        await this.NextButton.click()
    }
    async addAddress(address, address2, city, state, country, postalcode) {
        await this.Address.fill(address)
        await this.Address2.fill(address2)
        await this.City.fill(city)
        await this.State.fill(state)
        await this.Country.fill(country)
        await this.PostalCode.fill(postalcode)
        await this.NextButton.click()
    }
    async addPhoneNumber(phoneNumber) {
        await this.PhoneNumber.fill(phoneNumber)
        await this.NextButton.click()
    }
    async addRelationType(relativeOccupation, relativeName) {
        await this.RelationshipType.click()
        await this.RelationshipType.selectOption(relativeOccupation)
        await this.PersonName.fill(relativeName)
        await this.NextButton.click()
    }
    async confirmDetails() {
        await this.Confirm.click()
    }
    async getPatientId() {
        return (await this.patientIdBtn.textContent()).trim()
    }
}

module.exports = AddPatient;