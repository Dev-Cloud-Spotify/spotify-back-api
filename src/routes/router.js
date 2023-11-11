//router.js

import express from 'express';

const router = express.Router();

import songRoutes from './song.routes';
import albumRoutes from './album.routes';

router.use('/songs', songRoutes);
router.use('/albums', albumRoutes);

export default router;
