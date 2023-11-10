import express from 'express';
const router = express.Router();
import albumController from '../controllers/album.controllers';

router.get('/getAllArtists', albumController.getAlbums);
router.get('/getArtistById/:id', albumController.getAlbumById);
router.post('/createArtist', albumController.createAlbum);
router.put('/updateArtist/:id', albumController.updateAlbumById);
router.delete('/deleteArtist/:id', albumController.deleteAlbumById);

export default router;