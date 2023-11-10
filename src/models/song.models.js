// models/music.js
import mongoose, { Mongoose } from 'mongoose';

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  autor: { type: String, required:true},
  date_out: { type: Date, required: true },
  url: { type: String, required:false},
  album: { type: Mongoose.Schema.Types.ObjectId, ref:'Album' , required: false },
  artist: { type: Mongoose.Schema.Types.ObjectId, ref:'Album' , required: false },
  listens: { type: Number, default: 0},
});

const Song = mongoose.model('Song', songSchema);

export default Song;