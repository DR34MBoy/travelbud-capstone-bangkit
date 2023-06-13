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
  test
} = require('../controllers/otherController');

const router = express.Router();

// router.post('/place', addPlace);

router.get('/places', getAllPlaces);
router.get('/place/:id', getPlace);

router.get('/users', getAllUsers)
router.get('/user/:id', getUser);

router.get('/ratings', getAllRatings)
router.get('/rating/:id', getRating);

router.post('/recommendPass', passData)
router.post('/search', passData)
router.post('/recommend', recommend)
router.post('/register', register)
router.post('/login', login)

router.post('/py-test', test)


module.exports = {
    routes: router
}