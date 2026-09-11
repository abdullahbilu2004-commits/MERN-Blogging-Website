// import multer from 'multer'

// const upload = multer({storage: multer.diskStorage({})});

// export default upload;

import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadFolder = './uploads';

// Ensure uploads folder exists
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

export default upload;
