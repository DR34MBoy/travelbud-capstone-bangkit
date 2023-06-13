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
    // try {
    //     const input = req.body;
    //     const response = await fetch('http://127.0.0.1:5000/predict/' + input.User_Id, METHODS: {"POST"})

    //     response.then((data) => {
    //         console.log(data);
    //     });

    //     // response.then((data) => {
    //     //     console.log(data);
    //     //     const placesArray = [];
    //     //     for (let index = 0; index < data.length; index++) {
    //     //         Place_Id = ((data[index]).Place_Id).toString();
    //     //         const place = firestore.collection('tourism_with_id').doc(Place_Id);
    //     //         const data = place.get();
    //     //         placesArray.push(data.data());
    //     //     }
    //     //     res.send(placesArray)
    //     // });
        
    // } catch (error) {
    //     res.status(400).send(error.message);
    // }
}

const recommend2 = async (req, res, next) => {
    const input = req.body;
        const postData = JSON.stringify({ key: 'Place_Id' }); // Replace with your POST data
      
        const options = {
          hostname: 'localhost',
          port: 5000, // Replace with the Flask API port
          path: '/predict/'+ input.User_Id, // Replace with the POST endpoint of your Flask API
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': postData.length,
          },
        };
      
        const request = http.request(options, (response) => {
          let responseData = '';
      
          response.on('data', (chunk) => {
            responseData += chunk;
          });
      
          response.on('end', () => {
            // Parse the JSON response
            const jsonResponse = JSON.parse(responseData);
            console.log(jsonResponse.length);

            const placesArray = [];
            for (let index = 0; index < jsonResponse.length; index++) {
                Place_Id = ((jsonResponse[index]).Place_Id).toString();
                const place = await firestore.collection('tourism_with_id').doc(Place_Id);
                const data = await place.get();
                placesArray.push(data.data());
            }
            console.log(placesArray);
            res.send(placesArray)
      
            // Assign the field value to a variable
            const fieldValue = jsonResponse.field;
      
            // Use the assigned variable
            console.log('Field Value:', fieldValue);
      
            // Return a custom JSON response
            res.json({ fieldValue });
          });
        });
      
        request.on('error', (error) => {
          console.error('An error occurred:', error.message);
          res.status(500).json({ error: 'An error occurred' });
        });
      
        // Send the POST data
        request.write(postData);
        request.end();

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

module.exports = {
    passData,
    recommend,
    register,
    login,
    search,
    recommend2
} 