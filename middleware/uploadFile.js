import multer from "multer";
import fs from "fs";
import path from "path";

const uploadDir = "./uploads";

const storage = multer.diskStorage(
  {
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
  },
  {
    filename: (req, file, db) => {
      const uniqieSuffix =
        Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqieSuffix + path.extname(file.originalname));
    },
  }
);

const filterFiles = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"));
  }
};
