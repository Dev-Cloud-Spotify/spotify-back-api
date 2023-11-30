import express from 'express';
const router = express.Router();
import songController from '../controllers/song.controllers';
import uploadAWSMiddleware from '../middlewares/uploadAWS.middlewares';

import multer from 'multer';
const upload = multer({ dest: 'uploads/'});


router.get('/test', songController.test);
router.post('/createSong',
    // upload.single('audioFile'),
    uploadAWSMiddleware,
    songController.createSong
);
router.get('/getSongs', songController.getSongs);
router.get('/getSongById/:id', songController.getSongById);
router.put('/updateSongById/:id', songController.updateSongById);
router.delete('/deleteSongById/:id', songController.deleteSongById);
router.get('/countNumberOfSongs', songController.countNumberOfSongs);
router.get('/getTotalNumberOfListens', songController.getTotalNumberOfListens);
router.get('/getSongsWithoutAlbum', songController.getSongsWithoutAlbum);

export default router;
