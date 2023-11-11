const AWS = require('aws-sdk');
const fs = require('fs');
//AWS bucket : ynovspotifybucket
//mdp : Ynov2023!
//username :kouci
//Pour lancer le script : node AWS.js ! ATTENTION : pour les besoins de test, j'ai mis le chemin de mon fichier audio en dur dans le script. Il faut donc le changer pour que ça fonctionne chez vous.
//Ce compte AWS est associé à ma carte bancaire, DEOCONNEZ PAS hein !
// Configurez le SDK AWS avec vos clés d'accès
AWS.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: 'eu-west-3', // par exemple, 'us-east-1'
});

// Créez une instance du service S3
const s3 = new AWS.S3();

// Spécifiez le nom du seau (bucket) et le nom du fichier dans S3
const bucketName = 'ynovspotifybucket';
const fileName = 'myAudioFile.m4a';

// Configurations pour l'opération de téléchargement vers S3
const uploadParams = {
  Bucket: bucketName,
  Key: fileName,
  Body: fs.createReadStream(
    'C:/Users/HP/Desktop/spotify/spotify-back-api/src/assets/audio/vivaldi_hiver_opus8.m4a'
  ),
};

// Téléchargez le fichier vers S3
s3.upload(uploadParams, (err, data) => {
  if (err) {
    console.error('Erreur lors du téléchargement vers S3 :', err);
  } else {
    console.log(
      'Fichier téléchargé avec succès dans S3. URL du fichier :',
      data.Location
    );
  }
});
