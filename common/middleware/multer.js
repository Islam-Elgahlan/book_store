const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "_" + file.originalname);
  },
});

function fileFilter(req , file , cb) {
    if(file.mimetype == 'image/jpeg' || file.mimetype == "image/jpg" || file.mimetype == "image/tiff"){
        cb(null , true)
    } else {
        cb( new Error('invalid-file-type'))
    }
}

const uploads = multer({ fileFilter ,storage });
module.exports = uploads;