import { isValidObjectId } from 'mongoose';
import Album from '../models/album.models';
import Song from '../models/song.models';
import Artist from '../models/artist.models';


const albumController = {
  // Create a new album : http://localhost:3000/api/albums/createAlbum
  createAlbum: async (req, res) => {
    console.log('createAlbum()'.cyan)
    const { title, artist, songs, coverImage } = req.body;
    const newAlbum = new Album({ title, artist, songs, coverImage });
    const albumCreated = await newAlbum.save();
    //add album id to artist
    const artistToUpdate = await Artist.findById(artist);
    artistToUpdate.albums.push(albumCreated._id);
    await artistToUpdate.save();
    
    res
      .status(201)
      .json({ albumCreated, message: `Album ${albumCreated.title} created` });
  },
  // Get all albums : http://localhost:3000/api/albums/getAllAlbums
  getAlbums: async (req, res) => {
    console.log('getAlbums()'.cyan)
    const albums = await Album.find().populate('artist');
    res.json(albums);
  },

  getAlbumSongs: async (req, res) => {
    console.log('getAlbumSongs()'.cyan)
    try {
      const { id } = req.params;
      if (!isValidObjectId(id)) {
        return res.status(404).json({ message: 'Album not found' });
      }
      const album = await Album.findById(id).populate('songs');
      res.status(200).json(album.songs);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Get album by id : http://localhost:3000/api/albums/getAlbumById/654fc2a5c49e5935e8bd6a8b
  getAlbumById: async (req, res) => {
    console.log('getAlbumById()'.cyan)
    try {
      const { id } = req.params;
      if (!isValidObjectId(id)) {
        return res.status(404).json({ message: 'Album not found' });
      }
      const album = await Album.findById(id)
        .populate('artist')
        .populate({
          path: 'songs',
          populate: {
            path: 'album',
            model: 'Album',
          },
        });


      res.status(200).json(album);
        } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  // Delete album by id http://localhost:3000/api/albums/deleteAlbumById/654fb7ec0c030c4f983df8e4
  deleteAlbumById: async (req, res) => {
    console.log('deleteAlbumById()'.cyan)
    try {
      const oldAlbum = await Album.findById(req.params.id);

      const deletedAlbum = await Album.findByIdAndDelete(req.params.id);
      //unset the album field from associated songs
      await Song.updateMany(
        { _id: { $in: deletedAlbum.songs } },
        { $unset: { album: 1 } }
      );
      //remove the album from the artist
      const artist= await Artist.findById(oldAlbum.artist);
      artist.albums.pull(req.params.id);
      await artist.save();

      const message = `Album with id ${req.params.id} and title ${deletedAlbum.title} deleted`;
      res.json({ deletedAlbum, message });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Update album by id : http://localhost:3000/api/albums/updateAlbumById/654fb9a109fa233f90f23f9e
  updateAlbumById: async (req, res) => {
    console.log('updateAlbumById()'.cyan)
    const updatedAlbum = await Album.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedAlbum);
  },

  countNumberOfAlbums: async (req, res) => {
    console.log('countNumberOfAlbums()'.cyan)
    try {
      const numberOfAlbums = await Album.countDocuments();
      res.json({ numberOfAlbums });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

};

export default albumController;
