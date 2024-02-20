const fs = require('fs/promises');

class SaveData {
    constructor(page) {
        this.page = page
    }
    static createInstance(page) {
        return new SaveData(page)
    }

    async savePatientIdToJson(patientId) {
        const filePath = './data/patientRecord.json';
        try {
            let jsonData = await fs.readFile(filePath, 'utf-8');
            let data = JSON.parse(jsonData);
            let count = 1;
            let propertyName = 'patientId1';
            while (data.hasOwnProperty(propertyName)) {
                count++;
                propertyName = `patientId${count}`;
            }
            data[propertyName] = patientId;
            let updatedJsonData = JSON.stringify(data, null, 4);
            await fs.writeFile(filePath, updatedJsonData);
        } catch (error) {
            throw error;
        }
    }
}
module.exports = SaveData