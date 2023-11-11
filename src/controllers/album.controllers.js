import { isValidObjectId } from 'mongoose';
import Album from '../models/album.models';

const albumController = {
  // Create a new album : http://localhost:3000/api/albums/createAlbum
  async createAlbum(req, res) {
    const { title, artist, songs, coverImage } = req.body;
    const newAlbum = new Album({ title, artist, songs, coverImage });
    const albumCreated = await newAlbum.save();
    res
      .status(201)
      .json({ albumCreated, message: `Album ${albumCreated.title} created` });
  },
  // Get all albums : http://localhost:3000/api/albums/getAllAlbums
  async getAlbums(req, res) {
    const albums = await Album.find();
    res.json(albums);
  },

  // Get album by id : http://localhost:3000/api/albums/getAlbumById/654fc2a5c49e5935e8bd6a8b
  async getAlbumById(req, res) {
    try {
      const { id } = req.params;
      if (!isValidObjectId(id)) {
        return res.status(404).json({ message: 'Album not found' });
      }
      const album = await Album.findById(id);

      res.status(200).json({
        album,
        message: `Album ${album.title} with id ${req.params.id}found`,
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  // Delete album by id http://localhost:3000/api/albums/deleteAlbum/654fb7ec0c030c4f983df8e4
  async deleteAlbumById(req, res) {
    try {
      const deletedAlbum = await Album.findByIdAndDelete(req.params.id);
      const message = `Album with id ${req.params.id} and title ${deletedAlbum.title} deleted`;
      res.json({ deletedAlbum, message });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Update album by id : http://localhost:3000/api/albums/updateAlbum/654fb9a109fa233f90f23f9e
  async updateAlbumById(req, res) {
    const updatedAlbum = await Album.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedAlbum);
  },
};

export default albumController;
