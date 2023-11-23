import express from 'express';
const router = express.Router();
import songController from '../controllers/song.controllers';
import uploadAWSMiddleware from '../middlewares/uploadAWS.middlewares';

router.get('/test', songController.test);
router.post('/createSong', uploadAWSMiddleware, songController.createSong);
router.get('/getSongs', songController.getSongs);
router.get('/getSongById/:id', songController.getSongById);
router.put('/updateSongById/:id', songController.updateSongById);
router.delete('/deleteSongById/:id', songController.deleteSongById);
router.get('/countNumberOfSongs', songController.countNumberOfSongs);
router.get('/getTotalNumberOfListen', songController.getTotalNumberOfListen);

export default router;
