import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

import cloudinary from "../services/cloudinary/cloudinary.config.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "profile_pictures",
    allowed_formats: ["jpg", "png", "jpeg", "gif"],
  },
});

const uploadProfilePic = multer({ storage: storage });

export default uploadProfilePic;
