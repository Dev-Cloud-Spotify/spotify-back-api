import { isValidObjectId } from 'mongoose';
import Artist from '../models/artist.models.js';

const artistController = {
  getArtists: async (req, res) => {
    try {
      const artists = await Artist.find();
      res.json(artists);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getArtistById: async (req, res) => {
    try {
      const artist = await Artist.findById(req.params.id);
      res.json(artist);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  createArtist: async (req, res) => {
    try {
      const artist = new Artist(req.body);
      const createdArtist = await artist.save();
      res.status(201).json(createdArtist);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateArtist: async (req, res) => {
    try {
      const artist = await Artist.findById(req.params.id);
      if (req.body.name) {
        artist.name = req.body.name;
      }
      if (req.body.lastName) {
        artist.lastName = req.body.lastName;
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
  deleteArtist: async (req, res) => {
    try {
      const artist = await Artist.findById(req.params.id);
      await artist.remove();
      res.json({ message: 'Artist deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  //http://localhost:3000/api/artists/pushAlbumIntoArtist/654fe05338af9f28eef9d4d3
  pushAlbumIntoArtist: async (req, res) => {
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

//AWS bucket : ynovspotifybucket
//mdp : Ynov2023!
//username :kouci
