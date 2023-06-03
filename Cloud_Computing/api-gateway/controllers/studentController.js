'use strict';

const firebase = require('../db');
const Tourism_place = require('../models/student');
const firestore = firebase.firestore();

const addPlace = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('tourism_with_id').doc((data.placeID).toString()).set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllPlaces = async (req, res, next) => {
    try {
        const tourism_places = await firestore.collection('tourism_with_id');
        const data = await tourism_places.get();
        const placesArray = [];
        if(data.empty) {
            res.status(404).send('No student record found');
        }else {
            data.forEach(doc => {
                const tourism_place = new Tourism_place(
                    doc.data().placeID,
                    doc.data().placeName,
                    doc.data().description,
                    doc.data().category,
                    doc.data().city,
                    doc.data().price,
                    doc.data().rating,
                );
                placesArray.push(tourism_place);
            });
            res.send(placesArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getPlace = async (req, res, next) => {
    try {
        const id = req.params.id;
        const place = await firestore.collection('tourism_with_id').doc(id);
        const data = await place.get();
        if(!data.exists) {
            res.status(404).send('Student with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const student =  await firestore.collection('students').doc(id);
        await student.update(data);
        res.send('Student record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('students').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    updateStudent,
    deleteStudent,
    addPlace,
    getAllPlaces,
    getPlace
}