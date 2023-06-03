const express = require('express');
const {
       updateStudent,
       deleteStudent,
       addPlace,
       getAllPlaces,
       getPlace,
      } = require('../controllers/studentController');

const router = express.Router();

router.put('/student/:id', updateStudent);
router.delete('/student/:id', deleteStudent);
router.post('/place', addPlace);
router.get('/places', getAllPlaces);
router.get('/place/:id', getPlace);



module.exports = {
    routes: router
}