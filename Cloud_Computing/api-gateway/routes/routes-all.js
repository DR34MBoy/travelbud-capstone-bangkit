'use strict';
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
  passData,
  recommend,
  register,
  login,
  search,
  recommend2,
  filter
} = require('../controllers/otherController');

const router = express.Router();

router.get('/places', getAllPlaces);
router.get('/place/:id', getPlace);

router.get('/users', getAllUsers)
router.get('/user/:id', getUser);

router.get('/ratings', getAllRatings)
router.get('/rating/:id', getRating);

router.post('/search', search)
router.post('/recommend', recommend)
router.post('/recommend2', recommend2)
router.post('/filter', filter)

router.post('/register', register)
router.post('/login', login)

module.exports = {
    routes: router
}