import mongoose from 'mongoose';

const AlbumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: false,
  },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
  coverImage: { type: String, required: false },
},
{
  timestamps: true,
});

// Middleware to remove associated songs and update album reference when an album is deleted
AlbumSchema.pre('remove', async function(next) {
  try {
    // Assuming your Song model is named 'Song'
    const Song = mongoose.model('Song');

    // Remove the album reference from associated songs
    await Song.updateMany(
      { _id: { $in: this.songs } },
      { $unset: { album: 1 } } // Unset the album field
    );

    // Delete the associated songs
    await Song.deleteMany({ _id: { $in: this.songs } });

    next();
  } catch (error) {
    next(error);
  }
});

const Album = mongoose.model('Album', AlbumSchema);

export default Album;
