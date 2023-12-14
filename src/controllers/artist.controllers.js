import { isValidObjectId } from 'mongoose';
import Artist from '../models/artist.models.js';
import Album from '../models/album.models.js';
import Song from '../models/song.models.js';

const artistController = {
  getArtists: async (req, res) => {
    console.log('getArtists()'.cyan);
    try {
      const artists = await Artist.find();
      res.json(artists);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getArtistById: async (req, res) => {
    console.log('getArtistById()'.cyan);
    try {
      const artist = await Artist.findById(req.params.id);
      res.json(artist);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  createArtist: async (req, res) => {
    console.log('createArtist()'.cyan);
    try {
      const artist = new Artist(req.body);
      const createdArtist = await artist.save();
      res.status(201).json(createdArtist);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateArtist: async (req, res) => {
    console.log('updateArtist()'.cyan);
    try {
      const artist = await Artist.findById(req.params.id);
      if (req.body.name) {
        artist.name = req.body.name;
      }
      if (req.body.lastName) {
        artist.lastName = req.body.lastName;
      }
      if (req.body.artistImage) {
        artist.artistImage = req.body.artistImage;
      }
      if (req.body.albums) {
        artist.albums = req.body.albums;
      }
      const updatedArtist = await artist.save();
      res.json(updatedArtist);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteArtistById: async (req, res) => {
    console.log('deleteArtistById()'.cyan);
    try {
      const deletedartist = await Artist.findByIdAndDelete(req.params.id);
      //remove the artist from the albums
      await Album.updateMany(
        { _id: { $in: deletedartist.albums } },
        { $unset: { artist: 1 } }
      );
      //delete the artist from the songs
      await Song.updateMany(
        { _id: { $in: deletedartist.songs } },
        { $unset: { artist: 1 } }
      );
      res.json({ deletedartist, message: 'Artist deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  //http://localhost:3000/api/artists/pushAlbumIntoArtist/654fe05338af9f28eef9d4d3
  pushAlbumIntoArtist: async (req, res) => {
    console.log('pushAlbumIntoArtist()'.cyan);
    const { AlbumId } = req.body;
    const updatedArtist = await Artist.findByIdAndUpdate(
      req.params.id,
      { $push: { albums: AlbumId } },
      { new: true }
    );
    console.log(updatedArtist);

    res.json({
      updatedArtist,
      message: `Album ${AlbumId} pushed into Artist `,
    });
  },
};

export default artistController;


