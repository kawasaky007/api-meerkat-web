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
function getPosition(string, subString, index) {
  return string.split(subString, index).join(subString).length;
}
const uploadCloud = multer({ storage });
export const deleteImage = async (images) => {
  let tmpString= images.slice(images.lastIndexOf("/v"))
  let firstCut = getPosition(tmpString,'/',2);
  let lastCut = tmpString.lastIndexOf(".");
  let data = tmpString.slice(firstCut + 1, lastCut)

  cloudinary.uploader.destroy(data,
    function (error, result) {
      // console.log('result', result)
    }
  )
};
module.exports = uploadCloud;
