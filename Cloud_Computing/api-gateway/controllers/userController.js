'use strict';

const firebase = require('../db');
const Tourism_place = require('../models/users');
const firestore = firebase.firestore();

const getAllPlaces = async (req, res, next) => { // ini diubah ya ca
    try {
        const tourism_places = await firestore.collection('tourism_with_id');
        const data = await tourism_places.get();
        const placesArray = [];
        if(data.empty) {
            res.status(404).send('No student record found');
        }else {
            data.forEach(doc => {
                const tourism_place = new Tourism_place(
                    doc.data().Place_Id,
                    doc.data().Place_Name,
                    doc.data().Description,
                    doc.data().Category,
                    doc.data().City,
                    doc.data().Price,
                    doc.data().Rating,
                    doc.data().Coordinate,
                    doc.data().Lat,
                    doc.data().Long,
                );
                placesArray.push(tourism_place);
            });
            res.send(placesArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const place = await firestore.collection('users').doc(id);
        const data = await place.get();
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
    getAllPlaces, // ini juga diubah yaa
    getUser
}