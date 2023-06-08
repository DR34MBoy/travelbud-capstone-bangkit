const firebase = require('../db');
const Tourism_rating = require('../models/tourism_rating');
const firestore = firebase.firestore();

const getAllRatings = async (req, res, next) => { 
    try {
        const ratings = await firestore.collection('tourism_rating');
        const data = await ratings.get();
        const ratingsArray = [];
        if(data.empty) {
            res.status(404).send('No users rating record found');
        }else {
            data.forEach(doc => {
                const ratings = new Tourism_rating(
                    doc.data().User_Id,
                    doc.data().Place_Id,
                    doc.data().Place_Ratings,
                );
                ratingsArray.push(ratings);
            });
            res.send(ratingsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getRating = async (req, res, next) => {
    try {
        const id = req.params.id;
        const rating = await firestore.collection('tourism_rating').doc(id);
        const data = await rating.get();
        if(!data.exists) {
            res.status(404).send('User rating not exist');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllRatings,
    getRating
}