const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;


const colors = require('@colors/colors');

app.use(bodyParser.json());


const cluster = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`
// Connect to MongoDB
mongoose.connect(cluster);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB'.cyan);
});

const router = require('./routes/router');
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
