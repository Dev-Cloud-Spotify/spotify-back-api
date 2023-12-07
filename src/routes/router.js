//router.js

import express from 'express';

const router = express.Router();

import songRoutes from './song.routes';
import albumRoutes from './album.routes';
import artistRoutes from './artist.routes';
import userRoutes from './user.routes';
import playlistRoutes from './playlist.routes';

router.use('/songs', songRoutes);
router.use('/albums', albumRoutes);
router.use('/artists', artistRoutes);
router.use('/users', userRoutes);
router.use('/playlists', playlistRoutes);

export default router;
