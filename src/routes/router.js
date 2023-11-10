//router.js

import express from 'express';

const router = express.Router();

import songRoutes from './song.routes';

router.use('/songs', songRoutes);

export default router;