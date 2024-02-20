class SecurePageForAddPatient {
    constructor(page) {
        this.page = page
    }

    static createInstance(page) {
        return new SecurePageForAddPatient(page);
    }
}

module.exports = SecurePageForAddPatient;