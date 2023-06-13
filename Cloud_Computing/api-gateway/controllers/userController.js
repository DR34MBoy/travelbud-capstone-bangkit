'use strict';
const firebase = require('../ref-setup/db');
const User = require('../models/user');
const firestore = firebase.firestore();

const getAllUsers = async (req, res, next) => { 
    try {
        const users = await firestore.collection('users');
        const data = await users.get();
        const usersArray = [];
        if(data.empty) {
            res.status(404).send('No users record found');
        }else {
            data.forEach(doc => {
                const users = new User(
                    doc.data().User_Id,
                    doc.data().Location,
                    doc.data().Age,
                );
                usersArray.push(users);
            });
            res.send(usersArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await firestore.collection('users_profile').doc(id);
        const data = await user.get();
        if(!data.exists) {
            res.status(404).send('User does not exist');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllUsers,
    getUser
}