//router.js

import express from 'express';

const router = express.Router();

import songRoutes from './song.routes';
import albumRoutes from './album.routes';
import artistRoutes from './artist.routes';

router.use('/songs', songRoutes);
router.use('/albums', albumRoutes);
router.use('/artists', artistRoutes);

export default router;
