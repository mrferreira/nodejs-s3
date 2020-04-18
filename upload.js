const fs = require('fs');
require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.testing' : '.env'
});
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey
});

const uploadFile = (fileName) => {
    console.log('starting upload file')
    // Read content from the file
    const fileContent = fs.readFileSync(fileName);

    // Setting up S3 upload parameters
    const params = {
        Bucket: process.env.BUCKETNAME+'/pets',
        Key: 'cat.jpg', // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};

uploadFile('cat.jpg')
