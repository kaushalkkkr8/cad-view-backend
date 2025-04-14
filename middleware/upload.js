import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null,  file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.dwg', '.dxf'];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(ext)) {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Only DWG or DXF files are allowed'), false); // Reject file
  }
};
export const upload = multer({
  storage,
  fileFilter,
});
