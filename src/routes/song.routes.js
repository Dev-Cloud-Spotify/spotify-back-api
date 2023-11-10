import express from 'express';
const router = express.Router();
import songController from '../controllers/song.controllers';

router.get('/test', songController.test);
router.post('/createSong', songController.createSong);
router.get('/getSongs', songController.getSongs);
router.get('/getSongById/:id', songController.getSongById);
router.put('/updateSongById/:id', songController.updateSongById);
router.delete('/deleteSongById/:id', songController.deleteSongById);

export default router;