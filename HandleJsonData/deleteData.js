const fs = require('fs/promises');

class DeleteData {
    constructor(page) {
        this.page = page
    }
    static createInstance(page) {
        return new DeleteData(page)
    }
    async deletePropertyFromJsonFile(patientId) {
        const filePath = './data/patientRecord.json'
        try {
            let jsonData = await fs.readFile(filePath, 'utf-8');
            let data = JSON.parse(jsonData);

            const propertyName = Object.keys(data).find(key => data[key] === patientId);
            if (propertyName) {
                delete data[propertyName];
                let updatedJsonData = JSON.stringify(data, null, 4);
                await fs.writeFile(filePath, updatedJsonData);
            }
        } catch (error) {
            throw error;
        }
    }
}
module.exports = DeleteData;