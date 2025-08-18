import multer from "multer";
import path from "path";

const uploadDir = "./uploads";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const filterExcelProducts = (req, file, cb) => {
  const allowedFileTypes = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel.template.macroEnabled.12",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type for excel products"));
  }
};

const filterImage = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type for profile image"));
  }
};

const filterProductPictures = (req, file, cb) => {
  const allowedFileTypes = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel.template.macroEnabled.12",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"));
  }
};
const uploadImage = multer({
  storage: storage,
  fileFilter: filterImage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});
const uploadExcel = multer({
  storage: storage,
  fileFilter: filterProductPictures,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
});

const uploadProducts = multer({
  storage: storage,
  fileFilter: filterExcelProducts,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
});

export { uploadImage, uploadExcel, uploadProducts };
