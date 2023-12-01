const AWS = require('aws-sdk');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();
// require('dotenv').config();

AWS.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: 'eu-west-3',
});

const s3 = new AWS.S3();

const uploadAWSMiddleware = (req, res, next) => {
  console.log('uploadAWSMiddleware()'.yellow);
  // console.log(process.env.accessKeyId)
  // console.log(process.env.secretAccessKey)

  console.log('req.body', req.body)

  const { title } = req.body; // Assuming title is a unique identifier for the file
  const fileName = `${title}.m4a`;
  console.log('req.file', req.file)

  const filePath = req.file.path;
  console.log('filePath', filePath)

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
      next(); // Proceed to the next middleware or route handler
    }
  });
};

module.exports = uploadAWSMiddleware;
