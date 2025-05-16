import multer from "multer";


const storage = multer.diskStorage({
  destination: function (req, img, cb) {
    cb(null, "public/img");
  },
  filename: function (req, img, cb) {
    cb(null, img.originalname);
  },
});

const upload = multer({ storage: storage });
export const cargarImagen = upload.single("img");


