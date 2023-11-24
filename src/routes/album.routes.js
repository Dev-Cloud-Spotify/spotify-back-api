import express from 'express';
const router = express.Router();
import albumController from '../controllers/album.controllers';

router.get('/getAlbums', albumController.getAlbums);
router.get('/getAlbumById/:id', albumController.getAlbumById);
router.post('/createAlbum', albumController.createAlbum);
router.put('/updateAlbum/:id', albumController.updateAlbumById);
router.delete('/deleteAlbum/:id', albumController.deleteAlbumById);
router.get('/countNumberOfAlbums', albumController.countNumberOfAlbums);

export default router;
