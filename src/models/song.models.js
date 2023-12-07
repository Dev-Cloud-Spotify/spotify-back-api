// models/song.models.js
import mongoose from 'mongoose';

const songSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    // autor: { type: String, required:true},
    releaseDate: { type: Date, required: true },
    duration: { type: Number, required: true },
    url: { type: String, required: false },
    coverImage: { type: String, required: false },
    album: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Album',
      required: false,
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artist',
      required: false,
    },
    listens: { type: Number, default: 0 },
    CFurl: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const Song = mongoose.model('Song', songSchema);

export default Song;
