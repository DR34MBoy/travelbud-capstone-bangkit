const { Firestore } = require('@google-cloud/firestore');
const path = require('path')
const fs = require('fs')
require('environment/dotenv').config();

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

console.log(CREDENTIALS)

const firestore = new Firestore({
    projectId: CREDENTIALS.project_id,
    credentials: {
        client_email: CREDENTIALS.client_email,
        private_key: CREDENTIALS.private_key
    }
});

const sample_collection = firestore.collection('tourism_with_id');

const createMenuItem = async (record) => {
    try {
        await sample_collection.doc((record.Place_Id).toString()).set(record);
        console.log('Records created.');
    } catch (error) {
        console.log(`Error at createRecord --> ${error}`);
    }
};

let database = require('./tourism_with_id.json');

for (let index = 0; index < database.length; index++) {
    let element = database[index];
    element['isActive'] = true;
    createMenuItem(element);
}