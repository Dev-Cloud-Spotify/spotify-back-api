import mongoose, { Mongoose } from 'mongoose';

const AlbumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref:'Artist' , required: false },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref:'Song' }],
  converImage : { type: String, required: false },
});

const Album = mongoose.model('Album', AlbumSchema);

export default Album;