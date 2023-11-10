//exemple route
const express = require('express');
const router = express.Router();

const exempleController = require('../controllers/Exemple.controller');

router.get('/test', exempleController.test);
router.post('/exemple', exempleController.createExemple);

module.exports = router;