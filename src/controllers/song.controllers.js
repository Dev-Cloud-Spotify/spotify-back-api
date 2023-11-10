//Exemple controller
import song from '../models/song.models';

const songController = {

    test: (req, res) => {
        res.send('Controller test Ok');
    },

    createSong: async (req, res) => {
        const { name, lastName, albums } = req.body;
        const newSong = new song({ name, lastName, albums });
        await newSong.save();
        res.status(201).json(newSong);
    },

    getAllSongs: async (req, res) => {
        const songs = await song.find();
        res.json(songs);
    },

    getSongById: async (req, res) => {
        const song = await song.findById(req.params.id);
        res.json(song);
    },

    updateSongById: async (req, res) => {
        const { name, lastName, albums } = req.body;
        const updatedSong = await song.findByIdAndUpdate(req.params.id, { name, lastName, albums }, { new: true });
        res.json(updatedSong);
    },

    deleteSongById: async (req, res) => {
        const deletedSong = await song.findByIdAndDelete(req.params.id);
        res.json(deletedSong);
    },

    
};

export default songController;