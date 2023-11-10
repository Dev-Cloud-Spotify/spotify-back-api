//Exemple controller
import Song from '../models/song.models';

const songController = {

    test: (req, res) => {
        res.send('Controller test Ok');
    },

    createSong: async (req, res) => {
        const { name, lastName, albums } = req.body;
        const newSong = new Song({ name, lastName, albums });
        await newSong.save();
        res.status(201).json(newSong);
    },

    getSongs: async (req, res) => {
        const songs = await Song.find();
        res.json(songs);
    },

    getSongById: async (req, res) => {
        const song = await Song.findById(req.params.id);
        res.json(song);
    },

    updateSongById: async (req, res) => {
        const { name, lastName, albums } = req.body;
        const updatedSong = await Song.findByIdAndUpdate(req.params.id, { name, lastName, albums }, { new: true });
        res.json(updatedSong);
    },

    deleteSongById: async (req, res) => {
        const deletedSong = await Song.findByIdAndDelete(req.params.id);
        res.json(deletedSong);
    },

    
};

export default songController;