'use strict';
const firebase = require('../ref-setup/db');
const firestore = firebase.firestore();
const axios = require('axios');

const register = async (req, res, next) => {
    try {
        const input = req.body;

        const user_ref = await firestore.collection('users_profile').doc((input.Username).toString());
        const variable = await firestore.collection('variables').doc("ID");

        const user_data = await user_ref.get();
        const id_ref = await variable.get();

        var id = id_ref.data().num_ID;

        if(user_data.exists) {
            res.status(404).send('Username already exist');
        }
        else {
            await firestore.collection('users_profile').doc((input.Username).toString()).set(input);
            await firestore.collection('users_profile').doc((input.Username).toString()).update({User_Id: id});

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
        const user_ref = await firestore.collection('users_profile').doc((input.Username).toString());
        const data = await user_ref.get();
        if (data.exists) {
            if (data.data().Password == input.Password) {
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

const recommend = async (req, res, next) => {
    try {
        const input = req.body;
        const response = await axios.post('https://travelbud-c23ps150-izjdbv7e4q-as.a.run.app/predict/' + input.User_Id)
        res.send(response.data);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const search = async (req, res, next) => {
    try {
        const inputData = req.body;
        const response = await axios.post('https://travelbud-c23ps150-izjdbv7e4q-as.a.run.app/search', inputData)
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
    
        const response = await axios.post('https://travelbud-c23ps150-izjdbv7e4q-as.a.run.app/filter', inputFilter);
        const responseData = response.data;
        
        res.json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    register,
    login,
    recommend,
    search,
    filter
} 