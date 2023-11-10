import Album from '../models/album.models';

const albumController = {
    // Create a new album
    async createAlbum(req, res) {
        const { title, artist, songs, converImage } = req.body;
        const newAlbum = new Album({ title, artist, songs, converImage });
        const albumSaved = await newAlbum.save();
        res.status(201).json(albumSaved);
    },
    // Get all albums
    async getAlbums(req, res) {
        const albums = await Album.find();
        res.json(albums);
    },
    // Get album by id
    async getAlbumById(req, res) {
        const album = await Album.findById(req.params.albumId);
        res.status(200).json(album);
    },
    // Delete album by id
    async deleteAlbumById(req, res) {
        const { albumId } = req.params;
        await Album.findByIdAndDelete(albumId);
        // code 200 is ok too
        res.status(204).json();
    },
    // Update album by id
    async updateAlbumById(req, res) {
        const updatedAlbum = await Album.findByIdAndUpdate(
        req.params.albumId,
        req.body,
        {
            new: true,
        }
        );
        res.status(200).json(updatedAlbum);
    },
};

export default albumController;