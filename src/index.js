import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import colors from '@colors/colors';
import router from './routes/router.js';

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());

const cluster = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`

// Connect to MongoDB
mongoose.connect(cluster);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB'.cyan);
});

app.use('/api', router);

// ASCII art 'Spotify API'
const spotify = `
 ██████╗██████╗  █████╗ ████████╗██╗███████╗██╗   ██╗
██╔════╝██╔══██╗██╔══██╗╚══██╔══╝██║██╔════╝╚██╗ ██╔╝
╚█████╗ ██████╔╝██║  ██║   ██║   ██║█████╗   ╚████╔╝ 
 ╚═══██╗██╔═══╝ ██║  ██║   ██║   ██║██╔══╝    ╚██╔╝
██████╔╝██║     ╚█████╔╝   ██║   ██║██║        ██║
╚═════╝ ╚═╝      ╚════╝    ╚═╝   ╚═╝╚═╝        ╚═╝
`;

const API=`
 █████╗ ██████╗ ██╗
██╔══██╗██╔══██╗██║
███████║██████╔╝██║
██╔══██║██╔═══╝ ██║
██║  ██║██║     ██║
╚═╝  ╚═╝╚═╝     ╚═╝
`

app.listen(port, () => {
  console.log(`Server is running on port ${port}`.magenta);
  console.log(spotify.green)
  console.log(API.yellow)
});
