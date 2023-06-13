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

// Untuk localhost
// app.use('/api', placeRoutes.routes);

// Untuk deploy
app.use(placeRoutes.routes);


exports.api = cloud_func.region('asia-southeast2').https.onRequest(app)