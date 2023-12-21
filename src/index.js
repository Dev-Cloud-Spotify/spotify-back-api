import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import multer from 'multer';

import http from 'http';
import socketIO from 'socket.io';

dotenv.config();

import '@colors/colors';
import router from './routes/router.js';

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST'],
  },
});

app.use(express.json());
app.use(bodyParser.json([]));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(
  // {
  //   origin: '*',
  //   methods: ['GET', 'POST', 'PUT', 'DELETE'],
  // }
));

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

//sockets
//connect socket
io.on('connection', (socket) => {
  console.log('A user connected'.bgGreen.black);

  //change track
  socket.on('changeTrack', (data) => {
    console.log('Received changeTrack:');
    io.emit('changeTrack', data);
  });

  //change playlist
  socket.on('changePlaylist', (data) => {
    console.log('changePlaylist !');
    io.emit('changePlaylist', data);
  });

  //changeIsPlaying
  socket.on('changeIsPlaying', (data) => {
    console.log('changeIsPlaying !');
    io.emit('changeIsPlaying', data);
  });

  //changeTime
  socket.on('changeTime', (data) => {
    console.log('changeTime !');
    io.emit('changeTime', data);
  });

  //disconnect socket
  socket.on('disconnect', () => {
    console.log('User disconnected'.bgRed.black);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`.magenta);
  console.log(spotify.green)
  console.log(API.yellow)
});
