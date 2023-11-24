//Exemple controller
import Album from '../models/album.models.js';
import Song from '../models/song.models.js';

const songController = {
  test: (req, res) => {
    res.send('Controller test Ok');
  },
  // pour ajouter une song depuis insomnia/postman : http://localhost:3000/api/songs/createSong
  createSong: async (req, res) => {
    console.log('createSong()'.cyan)

    const { title, releaseDate, album, artist, coverImage } = req.body;
    const newSong = new Song({
      title,
      // autor,
      releaseDate,
      duration: 180, //TODO: calculer la durée de la chanson
      url: req.s3Url, // Use the S3 URL from the request object
      coverImage,
      album,
      artist,
    });

    try {
      const savedSong = await newSong.save();
      //add song id to album
      await Album.findByIdAndUpdate(album, {
        $push: { songs: savedSong._id },
      });
      res.status(201).json(savedSong);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // get all songs :  http://localhost:3000/api/songs/getSongs

  //pour récupérer toutes les songs : http://localhost:3000/api/songs/getSongs

  getSongs: async (req, res) => {
    console.log('getSongs()'.cyan)
    const songs = await Song.find();
    res.json(songs);
  },

  //Get song without album
  getSongsWithoutAlbum: async (req, res) => {
    try {
        const songsWithoutAlbum = await Song.find({ album: null });
        res.json(songsWithoutAlbum);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
},
  // Get song by id: http://localhost:3000/api/songs/getSongById/654f9f20696fb35925863ae7
   getSongById: async(req, res) => {
    console.log('getSongById()'.cyan)
    try {
      const { id } = req.params;
      if (!isValidObjectId(id)) {
        return res.status(404).json({ message: 'Invalid song ID' });
      }
      const song = await Song.findById(id);

      if (!song) {
        return res.status(404).json({ message: 'Song not found' });
      }

      res.status(200).json({
        song,
        message: `Song '${song.title}' with ID ${id} found`,
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateSongById: async (req, res) => {
    console.log('updateSongById()'.cyan)
    const { title, url, albums, artist, coverImage } = req.body;
    const updatedSong = await Song.findByIdAndUpdate(
      req.params.id,
      { title, artist, url, albums, coverImage },
      { new: true }
    );
    res.json(updatedSong);
  },

  //supprimer une song : http://localhost:3000/api/songs/deleteSongById/654f9ddbccd3ac9b34aecc88
  deleteSongById: async (req, res) => {
    console.log('deleteSongById()'.cyan)
    try {
      const deletedSong = await Song.findByIdAndDelete(req.params.id);
      const message = `Song with id ${req.params.id} and title '${deletedSong.title}' deleted`;
      res.json({ deletedSong, message });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  countNumberOfSongs: async (req, res) => {
    console.log('countNumberOfSongs()'.cyan)
    try {
      const numberOfSongs = await Song.countDocuments();
      res.json({ numberOfSongs });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getTotalNumberOfListens: async (req, res) => {
    console.log('getTotalNumberOfListens()'.cyan)
    try {
      const numberOfListens = await Song.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: '$listens' },
          },
        },
      ]);
      res.json({ numberOfListens });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

};

export default songController;
