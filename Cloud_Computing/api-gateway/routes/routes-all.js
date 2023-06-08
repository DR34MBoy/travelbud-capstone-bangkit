const express = require('express');
const {
  getAllPlaces,
  getPlace
} = require('../controllers/placeController');

const {
  getAllUsers,
  getUser
} = require('../controllers/userController');

const {
  getAllRatings,
  getRating
} = require('../controllers/ratingController');

const {
  FEtoML,
  MLtoFE
} = require('../controllers/otherController');

const router = express.Router();

// router.post('/place', addPlace);

router.get('/places', getAllPlaces);
router.get('/place/:id', getPlace);

router.get('/users', getAllUsers)
router.get('/user/:id', getUser);

router.get('/ratings', getAllRatings)
router.get('/rating/:id', getRating);

router.post('/FE2ML', FEtoML)
router.post('/ML2FE', MLtoFE)

module.exports = {
    routes: router
}