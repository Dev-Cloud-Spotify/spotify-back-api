import Playlist from "../models/playlist.models";
import Song from "../models/song.models";

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
            const playlists = await Playlist.find().populate({
                path: 'songs',
                options: { limit: 4 }, // Limit the populated songs to the first 4
                sort: { createdAt: -1 }, // Sort by descending createdAt
            }).sort({ updatedAt: -1 }); // Sort by descending updatedAt
            res.json(playlists);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    //get playlist by id
    getPlaylistById: async (req, res) => {
        console.log('getPlaylistById()'.cyan);
        try {
            //populate artist and album in song
            const playlist = await Playlist.findById(req.params.id)
            .populate({
                path: 'songs',
                populate: [
                  { path: 'artist', model: 'Artist' },
                  { path: 'album', model: 'Album' },
                ],
              });
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

    //create a new playlist All Songs and push all songs in database to it
    createPlaylistAllSongs: async (req, res) => {
        console.log('createPlaylistAllSongs()'.cyan);
        try {
          // Fetch all songs from the database
          const allSongs = await Song.find();
      
          // Create a new playlist named "All Songs" and add all songs to it
          const newPlaylist = new Playlist({ title: 'All Songs', songs: allSongs });
          const playlistCreated = await newPlaylist.save();
      
          res.status(201).json({ playlistCreated, message: `Playlist ${playlistCreated.title} created` });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      },

      //get AllSongs playlist
      getAllSongsPlaylist: async (req, res) => {
        console.log('getAllSongsPlaylist()'.cyan);
        try {
          const playlist = await Playlist.findOne({ title: 'All Songs' }).populate('songs');
          //update playlist updatedAt
            playlist.updatedAt = Date.now();
          res.json(playlist);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      },

      //get 6 most recent playlists
      getRecentsPlaylist: async (req, res) => {
        console.log('getRecentsPlaylist()'.cyan);
        try {
          const playlists = await Playlist.find()
          .populate({
                path: 'songs',
                options: { limit: 4 }, // Limit the populated songs to the first 4
                sort: { createdAt: -1 }, // Sort by descending createdAt
            })
            .limit(6)
            .sort({ updatedAt: -1 });
          res.json(playlists);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
       
      }

        
};
export default playlistController;

