const firebase = require('../ref-setup/db');
const firestore = firebase.firestore();
const axios = require('axios');

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
        const placesArray = [];
        for (let index = 0; index < input.length; index++) {
            Place_Id = (input[index].Place_Id).toString();
            const place = await firestore.collection('tourism_with_id').doc(Place_Id);
            const data = await place.get();
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

const test = async (req, res, next) => {
    try {
        // Make a GET request to the Flask API
        const response = await axios.get('http://localhost:5000/api');
    
        // Handle the response from the Flask API
        // You can process the response data or send it back to the client
        res.json(response.data);
      } catch (error) {
        // Handle any errors that occur during the request
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
}

module.exports = {
    passData,
    recommend,
    register,
    login,
    test
}