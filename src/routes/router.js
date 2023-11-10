//router.js

import express from 'express';

const router = express.Router();

import exempleRoutes from './exemple.routes';

router.use('/exemple', exempleRoutes);

export default router;