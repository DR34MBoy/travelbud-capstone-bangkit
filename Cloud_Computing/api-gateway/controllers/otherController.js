const firebase = require('../db');
const firestore = firebase.firestore();

const FEtoML = async (req, res, next) => {
    try {
        const data = req.body;
        res.send(data);

    } catch (error) {
        res.status(400).send(error.message);
    }
}

const MLtoFE = async (req, res, next) => {
    try {
        const input = req.body;
        const placesArray = [];
        for (let index = 0; index < input.length; index++) {
            Place_ID = (input[index].Place_ID).toString()
            const place = await firestore.collection('tourism_with_id').doc(Place_ID);
            const data = await place.get();
            placesArray.push(data.data());
        }
        res.send(placesArray)
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    FEtoML,
    MLtoFE
}