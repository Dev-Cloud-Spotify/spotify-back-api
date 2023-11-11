//Exemple controller
import Song from '../models/song.models.js';

const songController = {
  test: (req, res) => {
    res.send('Controller test Ok');
  },
  // pour ajouter une song depuis insomnia/postman : http://localhost:3000/api/songs/createSong
  createSong: async (req, res) => {
    const { title, autor, date_out, url, album, artist } = req.body;
    const newSong = new Song({ title, autor, date_out, url, album, artist });

    try {
      const savedSong = await newSong.save();
      res.status(201).json(savedSong);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  //pour récupérer toutes les songs : http://localhost:3000/api/songs/getSongs
  getSongs: async (req, res) => {
    const songs = await Song.find();
    res.json(songs);
  },

  //pour récupérer une Song par son ID : http://localhost:3000/api/songs/getSongs/
  getSongById: async (req, res) => {
    const song = await Song.findById(req.params.id);
    res.json(song);
  },

  updateSongById: async (req, res) => {
    const { name, lastName, albums } = req.body;
    const updatedSong = await Song.findByIdAndUpdate(
      req.params.id,
      { name, lastName, albums },
      { new: true }
    );
    res.json(updatedSong);
  },

  deleteSongById: async (req, res) => {
    const deletedSong = await Song.findByIdAndDelete(req.params.id);
    res.json(deletedSong);
  },
};

export default songController;
