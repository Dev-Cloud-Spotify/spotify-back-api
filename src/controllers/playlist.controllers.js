import Playlist from "../models/playlist.models";

const playlistController = {
    //create a new playlist
    createPlaylist: async (req, res) => {
        console.log('createPlaylist()'.cyan);
        try {
            const { title, songs } = req.body;
            const newPlaylist = new Playlist({ title, songs });
            const playlistCreated = await newPlaylist.save();
            res.status(201).json({ playlistCreated, message: `Playlist ${playlistCreated.title} created` });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    //get all playlists
    getPlaylists: async (req, res) => {
        console.log('getPlaylists()'.cyan);
        try {
            const playlists = await Playlist.find();
            res.json(playlists);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    //get playlist by id
    getPlaylistById: async (req, res) => {
        console.log('getPlaylistById()'.cyan);
        try {
            const playlist = await Playlist.findById(req.params.id).populate('songs');
            res.json(playlist);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    //update playlist by id
    updatePlaylist: async (req, res) => {
        console.log('updatePlaylist()'.cyan);
        try {
            const playlist = await Playlist.findById(req.params.id);
            if (req.body.title) {
                playlist.title = req.body.title;
            }
            if (req.body.songs) {
                playlist.songs = req.body.songs;
            }
            const updatedPlaylist = await playlist.save();
            res.json(updatedPlaylist);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    //delete playlist by id
    deletePlaylistById: async (req, res) => {
        console.log('deletePlaylistById()'.cyan);
        try {
            const deletedPlaylist = await Playlist.findByIdAndDelete(req.params.id);
            res.json(deletedPlaylist);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    //add song to playlist
    addSongToPlaylist: async (req, res) => {
        console.log('addSongToPlaylist()'.cyan);
        try {
            const { id } = req.params;
            const { songId } = req.body;
            console.log(req.body);
    
            // Vérifie si songId existe déjà dans la playlist
            const playlist = await Playlist.findById(id);
            if (playlist.songs.includes(songId)) {
                return res.status(400).json({ message: 'La chanson existe déjà dans la playlist.' });
            }
    
            playlist.songs.push(songId);
            const updatedPlaylist = await playlist.save();
            res.json(updatedPlaylist);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur interne du serveur.' });
        }
    },
    //remove song from playlist
    removeSongFromPlaylist: async (req, res) => {
        console.log('removeSongFromPlaylist()'.cyan);
        try {
            const { id } = req.params;
            const { songId } = req.body;
            const playlist = await Playlist.findById(id);
            playlist.songs.pull(songId);
            const updatedPlaylist = await playlist.save();
            res.json(updatedPlaylist);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    //get number of playlists
    countNumberOfPlaylists: async (req, res) => {
        console.log('countNumberOfPlaylists()'.cyan);
        try {
            const numberOfPlaylists = await Playlist.countDocuments();
            res.json({ numberOfPlaylists });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};
export default playlistController;

