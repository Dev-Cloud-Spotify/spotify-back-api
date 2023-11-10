//router.js

const express = require('express');
const router = express.Router();

const exempleRoutes = require('./exemple.routes');

router.use('/exemple', exempleRoutes);

module.exports = router;