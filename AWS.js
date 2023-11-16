const AWS = require('aws-sdk');
const fs = require('fs');
require('dotenv').config();
//AWS bucket : ynovspotifybucket
//mdp : Ynov2023!
//username :kouci
//Pour lancer le script : node AWS.js ! ATTENTION : pour les besoins de test, j'ai mis le chemin de mon fichier audio en dur dans le script. Il faut donc le changer pour que ça fonctionne chez vous.
//Ce compte AWS est associé à ma carte bancaire, DEOCONNEZ PAS hein !
// Configurez le SDK AWS avec vos clés d'accès!
AWS.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: 'eu-west-3', // par exemple, 'us-east-1'
});

console.log('Début du téléchargement vers S3...');
// console.log(process.env.AWS_ACCESS_KEY_ID);
// 

// Créez une instance du service S3
const s3 = new AWS.S3();

// Spécifiez le nom du seau (bucket) et le nom du fichier dans S3
const bucketName = 'ynovspotifybucket';
const fileName = 'nonJaimePasCa.m4a';

// Configurations pour l'opération de téléchargement vers S3
const uploadParams = {
  Bucket: bucketName,
  Key: fileName,
  Body: fs.createReadStream(
    'C:/Users/thoma/Downloads/Joe_hi.m4a'
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
