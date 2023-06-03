const express = require('express');
const {
  addPlace,
  getAllPlaces,
  getPlace
} = require('../controllers/placeController');

const {
  getAllPlaces, //ini juga diubah ya
  getUser
} = require('../controllers/userController');

const router = express.Router();

router.post('/place', addPlace);
router.get('/places', getAllPlaces);
router.get('/place/:id', getPlace);

router.get('/user/:id', getUser);

module.exports = {
    routes: router
}