const express = require('express');
const {
        addPlace,
        getAllPlaces,
        getPlace
      } = require('../controllers/placeController');

const router = express.Router();

router.post('/place', addPlace);
router.get('/places', getAllPlaces);
router.get('/place/:id', getPlace);



module.exports = {
    routes: router
}