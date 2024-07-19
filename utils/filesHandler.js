const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage ({

    destination: (req, res, cb) => {
        cb(null, 'public/files');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const fileUploader = multer({ storage: storage });
module.exports = { fileUploader };