import { chromium, expect } from '@playwright/test';


import DeleteData from './HandleJsonData/deleteData.js'
import patientRecordData from './data/patientRecord.json'

const globalTeardown = async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const deleteData = new DeleteData(page);
    try {
        for (let i = 1; i <= 3; i++) {
            const patientId = Object.keys(patientRecordData)
            console.log(patientId);
            // await deleteData.deletePropertyFromJsonFile(patientId);
        }
    } catch (error) {
        console.error('Error during global teardown:', error);
        throw error;
    }
};

export default globalTeardown;