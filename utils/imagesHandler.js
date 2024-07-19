const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage ({

    destination: (req, res, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const imagesUploader = multer({ storage: storage });
module.exports = { imagesUploader };