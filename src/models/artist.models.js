// models/User.js
import mongoose from 'mongoose';

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true, unique: true },
  albums: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Album', required: false },
  ],
});

const Artist = mongoose.model('Artist', artistSchema);

export default Artist;
