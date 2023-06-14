'use strict';
const firebase = require('../ref-setup/db');
const firestore = firebase.firestore();
const axios = require('axios');
const fetch = require("node-fetch");
const http = require('http');
const { response } = require('express');

const passData= async (req, res, next) => {
    try {
        const data = req.body;
        res.send(data);

    } catch (error) {
        res.status(400).send(error.message);
    }
}

const recommend = async (req, res, next) => {
    try {
        const input = req.body;
        const response = await axios.post('http://127.0.0.1:5000/predict/' + input.User_Id)
        const placesArray = [];
        for (let index = 0; index < data.length; index++) {
            Place_Id = ((data[index]).Place_Id).toString();
            const place = firestore.collection('tourism_with_id').doc(Place_Id);
            const data = place.get();
            placesArray.push(data.data());
        }
            res.send(placesArray)
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const register = async (req, res, next) => {
    try {
        const input = req.body;

        const user_ref = await firestore.collection('users_profile').doc((input.username).toString());
        const variable = await firestore.collection('variables').doc("ID");

        const user_data = await user_ref.get();
        const id_ref = await variable.get();

        var id = id_ref.data().num_ID;

        if(user_data.exists) {
            res.status(404).send('Username already exist');
        }
        else {
            await firestore.collection('users_profile').doc((input.username).toString()).set(input);
            await firestore.collection('users_profile').doc((input.username).toString()).update({User_Id: id});

            id = id + 1;
            await firestore.collection('variables').doc('ID').update({num_ID: id});

            res.send('Record saved successfuly');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const login = async (req, res, next) => {
    try {
        const input = req.body;
        const user_ref = await firestore.collection('users_profile').doc((input.username).toString());
        const data = await user_ref.get();
        if (data.exists) {
            if (data.data().password == input.password) {
                res.send(data.data());
            } else {
                res.status(404).send('Wrong password');
            }
        }
        else {
            res.status(404).send('Username not found');
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
}

const search = async (req, res, next) => {
    try {
        const inputData = req.body;
        const response = await axios.post('http://localhost:5000/api', inputData)
        const responseData = response.data;
        res.json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

const filter = async (req, res, next) => {
    try {
        const inputFilter = req.body;
    
        const response = await axios.post('http://localhost:5000/filter', inputFilter);
        const responseData = response.data; // Extract the response data
        
        res.json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    passData,
    recommend,
    register,
    login,
    search,
    recommend2,
    filter
} 