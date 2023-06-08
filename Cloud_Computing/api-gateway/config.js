'use strict';
const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const {
    // Aktifkan kalau localhost
    // PORT,
    // HOST,
    // HOST_URL,
    API_KEY,
    AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID
} = process.env;

// Aktifkan kalau localhost
// assert(PORT, 'PORT is required');
// assert(HOST, 'HOST is required');

module.exports = {
    // Aktifkan kalau localhost
    // port: PORT,
    // host: HOST,
    // url: HOST_URL,
    firebaseConfig: {
        apiKey: API_KEY,
        authDomain: AUTH_DOMAIN,
        projectId: PROJECT_ID,
        storageBucket: STORAGE_BUCKET,
        messagingSenderId: MESSAGING_SENDER_ID,
        appId: APP_ID
    }
}