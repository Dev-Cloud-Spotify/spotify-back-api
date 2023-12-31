// models/artist.models.js
import mongoose from 'mongoose';

const artistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: false },
    artistImage: { type: String, required: false},
    albums: [{ type: mongoose.Schema.Types.ObjectId, ref:'Album' , required: false }],
},
{
    timestamps: true,
});

const Artist = mongoose.model('Artist', artistSchema);

export default Artist;