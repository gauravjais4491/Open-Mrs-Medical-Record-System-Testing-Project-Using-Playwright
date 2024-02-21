const faker = require('faker');
class GenerateData {
    constructor(page) {
        this.page = page
        this.usernameRegex = /^[a-zA-Z0-9._-]{2,50}$/;
    }
    async generateGivenName() {
        let randomName = faker.name.findName();
        let isValidUsername = this.usernameRegex.test(randomName);
        while (!isValidUsername) {
            randomName = faker.internet.userName().toLowerCase();
            isValidUsername = this.usernameRegex.test(randomName);
        }
        return randomName;
    }
}

module.exports = GenerateData;