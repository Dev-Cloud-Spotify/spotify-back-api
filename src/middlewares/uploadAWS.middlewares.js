import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import ffmpeg from 'fluent-ffmpeg';
const { getAudioDurationInSeconds } = require('get-audio-duration')
dotenv.config();

AWS.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: 'eu-west-3',
});

const s3 = new AWS.S3();

const uploadAWSMiddleware = (req, res, next) => {
  console.log('uploadAWSMiddleware()'.yellow);

  console.log('req.body', req.body);

  const { title } = req.body; // Assuming title is a unique identifier for the file
  //concaténer le titre avec la date pour avoir un nom de fichier unique car AWS ne permet pas d'avoir 2 fichiers avec le même nom
  const date = Date.now();
  const fileName = `${title}_${date}.m4a`;
  // console.log('req.file', req.file);

  const filePath = req.file.path;
  const fileExtension = path.extname(filePath);
  console.log('File extension:', fileExtension);
  if (fileExtension !== '.m4a') {
    console.log(
      'File extension not allowed -> conversion starting...',
      fileExtension
    );
    const convertedFilePath = `${title}.m4a`;
    ffmpeg(filePath)
      .toFormat('m4a')
      .on('end', () => {
        console.log('conversion ended');
        console.log('convertedFilePath is', convertedFilePath);
      });

      //get the duration of the audio file
      getAudioDurationInSeconds(filePath)
      .then((duration) => {
        console.log('duration', duration);
        req.body.duration = duration;
      })
      

  }

  const uploadParams = {
    Bucket: 'spotifybucketynov',
    Key: fileName,
    // Body: fs.createReadStream(req.body.audioFile),
    Body: fs.createReadStream(filePath),
  };

  // console.log('uploadParams', uploadParams)

  s3.upload(uploadParams, (err, data) => {
    if (err) {
      console.error('Error uploading to S3:', err);
      res.status(500).json({ message: 'Error uploading to S3' });
    } else {
      req.s3Url = data.Location; // Attach S3 URL to the request object
      req.CFurl = `${process.env.cloudFrontUrl}/${fileName}`;

      deleteFileFromStorage(filePath);

      next(); // Proceed to the next middleware or route handler
    }
  });
};

const deleteFileFromStorage = (filePath) => {
  console.log('deleteFileFromStorage()'.yellow);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    //file removed
    console.log('File removed from storage'.green);
  });
};

module.exports = uploadAWSMiddleware;
