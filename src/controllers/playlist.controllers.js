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

        await createLastListensPlaylist();
        await createMostListenedSongsPLaylist();
        await updateLikedSongsPlaylist();
        
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
            const songs = await Song.find();
            const playlist = await Playlist.findOne({ title: 'All Songs' })
            if (!playlist) {
                const newPlaylist = new Playlist({ title: 'All Songs', songs: songs });
                await newPlaylist.save();
                return res.json(newPlaylist);
            }
          //push all non push songs in database to AllSongs playlist
            songs.forEach(async (song) => {
                if (!playlist.songs.includes(song._id)) {
                playlist.songs.push(song._id);
                }
            });
            await playlist.save();
            
          //update playlist updatedAt
            playlist.updatedAt = Date.now();
          res.json(playlist);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      },

      getLikedSongsPlaylist: async (req, res) => {
        console.log('getLikedSongsPlaylist()'.cyan);
        try {
            const songs = await Song.find();
            const likedSongs = songs.filter(song => song.liked === true);
            const playlist = await Playlist.findOne({ title: 'Liked Songs' })
            if (!playlist) {
                const newPlaylist = new Playlist({ title: 'Liked Songs', songs: likedSongs });
                await newPlaylist.save();
                return res.json(newPlaylist);
            }
          //push all non push songs in database to AllSongs playlist
            songs.forEach(async (song) => {
                if (!playlist.songs.includes(song._id)) {
                playlist.songs.push(song._id);
                }
            });
            await playlist.save();
            
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
       
      },


};


// playlist 20 dernières musique du plus recent au plus ancien
const createLastListensPlaylist = async () => {
  try {
    console.log('createLastListensPlaylist()'.cyan);
    //if playlist title "Last Listens" exists, delete it
    const playlist = await Playlist.findOne({ title: 'Last Listens' });
    if (playlist) {
      await Playlist.findByIdAndDelete(playlist._id);
    }
    //créer playlist "Last Listens" avec les 20 dernières chansons écoutées
    const songs = await Song.find().sort({ updatedAt: -1 }).limit(20);
    const newPlaylist = new Playlist({ title: 'Last Listens', songs });
    await newPlaylist.save();

    //update playlist updatedAt
    newPlaylist.updatedAt = Date.now();
    await newPlaylist.save();

    return newPlaylist;
    } catch (error) {
    console.error('Error in createLastListensPlaylist:', error);
    throw error; // rethrow the error to be caught in the getPlaylists catch block
    }
};

//musiques les plus écoutées
const createMostListenedSongsPLaylist = async () => {
  try {
    console.log('createMostListenedSongsPLaylist()'.cyan);
    //if playlist title "Most Listened Songs" exists, delete it
    const playlist = await Playlist.findOne({ title: 'Most Listened Songs' });
    if (playlist) {
      await Playlist.findByIdAndDelete(playlist._id);
    }
    //créer playlist "Most Listened Songs" avec les 20 chansons les plus écoutées
    const songs = await Song.find().sort({ listens: -1 }).limit(20);
    const newPlaylist = new Playlist({ title: 'Most Listened Songs', songs });
    await newPlaylist.save();

    //update playlist updatedAt
    newPlaylist.updatedAt = Date.now();
    await newPlaylist.save();

    return newPlaylist;
    } catch (error) {
    console.error('Error in createMostListenedSongsPLaylist:', error);
    throw error; // rethrow the error to be caught in the getPlaylists catch block
    }
};

const updateLikedSongsPlaylist = async () => {
  try {
    console.log('updateLikedSongsPlaylist()'.cyan);
    const likedSongPlaylist = await Playlist.findOne({ title: 'Liked Songs' });
    if(!likedSongPlaylist) {
      return;
    }
    //update playlist updatedAt
    likedSongPlaylist.updatedAt = Date.now();
    await likedSongPlaylist.save();
    } catch (error) {
    console.error('Error in updateLikedSongsPlaylist:', error);
    throw error; // rethrow the error to be caught in the getPlaylists catch block
    }
}  



export default playlistController;

