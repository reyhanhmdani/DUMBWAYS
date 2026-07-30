import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  // folter tujuan penyimpanan
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },

  // kita pakai timestamp untuk nama file yang kita simpan dengan original nama file nya
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// yang boleh hanya gambar
const namaFileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Tipe file tidak diizinkan! hanya image."));
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: namaFileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // Maksimal 5MB (↑ 5 * 1024 KB * 1024 byte)
  },
});
