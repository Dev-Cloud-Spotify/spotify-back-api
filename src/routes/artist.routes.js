import express from 'express';
const router = express.Router();
import artistController from '../controllers/artist.controllers';

router.get('/getArtists', artistController.getArtists);
router.get('/getArtistById/:id', artistController.getArtistById);
router.post('/createArtist', artistController.createArtist);
router.put('/updateArtistById/:id', artistController.updateArtist);
router.delete('/deleteArtistById/:id', artistController.deleteArtistById);
router.put('/pushAlbumIntoArtist/:id', artistController.pushAlbumIntoArtist);

export default router;
