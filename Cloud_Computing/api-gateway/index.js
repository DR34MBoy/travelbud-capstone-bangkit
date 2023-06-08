'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const placeRoutes = require('./routes/routes-all');
const cloud_func = require("firebase-functions")

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api', placeRoutes.routes);


// Aktifkan kalau localhost
// app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));

exports.api = cloud_func.https.onRequest(app) //aktifkan saja kalau mau deploy