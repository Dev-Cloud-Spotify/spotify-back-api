//Exemple controller
import Song from '../models/song.models';

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

  // get all songs :  http://localhost:3000/api/songs/getSongs
  getSongs: async (req, res) => {
    const songs = await Song.find();
    res.json(songs);
  },

  //get a song by id : http://localhost:3000/api/songs/getSongById/654f9f20696fb35925863ae7
  getSongById: async (req, res) => {
    const song = await Song.findById(req.params.id);
    res.json(song);
  },

  updateSongById: async (req, res) => {
    const { title, autor, url, albums } = req.body;
    const updatedSong = await Song.findByIdAndUpdate(
      req.params.id,
      { title, autor, url, albums },
      { new: true }
    );
    res.json(updatedSong);
  },

  //supprimer une song : http://localhost:3000/api/songs/deleteSongById/654f9ddbccd3ac9b34aecc88
  deleteSongById: async (req, res) => {
    try {
      const deletedSong = await Song.findByIdAndDelete(req.params.id);
      const message = `Song with id ${req.params.id} and title '${deletedSong.title}' deleted`;
      res.json({ deletedSong, message });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

export default songController;
