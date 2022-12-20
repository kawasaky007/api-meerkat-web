const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: 'meerkat-team',
  api_key: '472391169189496',
  api_secret: 'BZrLCUdHUSx3DlA2T4SyI13qR2Y',
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'Antest',
    allowedFormats: ['jpg', 'png'],

  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
