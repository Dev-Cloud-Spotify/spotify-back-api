import express from 'express';
const router = express.Router();
import songController from '../controllers/song.controllers';
import uploadAWSMiddleware from '../middlewares/uploadAWS.middlewares';

import multer from 'multer';
const fs = require('fs');
// Function to create the uploads directory if it doesn't exist
const createUploadsDirectory = () => {
    const directory = './src/uploads/';
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
  };
  
  // Create the uploads directory before setting up multer.diskStorage
  createUploadsDirectory();
  
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });

const upload = multer({ storage: storage })


router.get('/test', songController.test);
router.post('/createSong',
    upload.single('audioFile'),
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
