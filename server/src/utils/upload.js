// Upload utility placeholder
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const dir = 'uploads';
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, dir),
  filename: (_, file, cb) =>
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '_')),
});
export const upload = multer({ storage });
export const fileToUrl = (filename) => `/${dir}/${filename}`;
