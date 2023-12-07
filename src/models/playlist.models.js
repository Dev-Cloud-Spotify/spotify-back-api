import mongoose from "mongoose";

const PlaylistSchema = new mongoose.Schema({
    title: { type: String, required: true },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song', required: false }],
},
{
  timestamps: true,
});
const Playlist = mongoose.model('Playlist', PlaylistSchema);

export default Playlist;