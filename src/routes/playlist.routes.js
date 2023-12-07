import express from 'express';
const router = express.Router();
import playlistController from '../controllers/playlist.controllers';

// Define playlist routes
router.get('/getPlaylists', playlistController.getPlaylists);
router.get('/getPlaylistById/:id', playlistController.getPlaylistById);
router.post('/createPlaylist', playlistController.createPlaylist);
router.put('/updatePlaylist/:id', playlistController.updatePlaylist);
router.delete('/deletePlaylistById/:id', playlistController.deletePlaylistById);
router.put('/addSongToPlaylist/:id', playlistController.addSongToPlaylist);
router.put('/removeSongFromPlaylist/:id', playlistController.removeSongFromPlaylist);
export default router;

