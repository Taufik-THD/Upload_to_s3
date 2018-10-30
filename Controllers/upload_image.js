const AWS = require('aws-sdk')
const BUCKET_NAME = process.env.BUCKET_NAME
const IAM_USER_KEY = process.env.IAM_USER_KEY
const IAM_USER_SECRET = process.env.IAM_USER_SECRET
const Busboy = require('busboy');

function uploadToS3(file, cb) {
  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    Bucket: BUCKET_NAME,
  })

  s3bucket.createBucket(function () {

    var params = {
      Bucket: BUCKET_NAME,
      Key: file.name,
      Body: file.data,
      ACL: 'public-read'
    }

    s3bucket.upload(params, function (err, data) {

      if (err) {
        console.log('error in callback')
        console.log(err)
      }

      cb(data)

    })

  })

}

module.exports = {

  upload(req, res, next){

    const element1 = req.body.element1
    const busboy = new Busboy({ headers: req.headers })

    busboy.on('finish', function() {
      console.log('Upload finished')

      const file = req.files.element2
      const result = uploadToS3(file, (response) => {
        console.log(response, ' ====>>>> response kukubima pasti bisa, unchh !! :*');

        res.status(201).json(response['Location'])
      })

    })

    req.pipe(busboy)

  }

}
