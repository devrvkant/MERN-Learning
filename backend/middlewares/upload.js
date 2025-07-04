import multer from 'multer';
import CloudinaryStorage from 'multer-storage-cloudinary';

import cloudinary from '../services/cloudinary/cloudinary.config';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "profile_pictures",
        allowed_formats: ['jpg', 'png', 'jpeg', 'gif'],
    }
});

const upload = multer({ storage: storage });

export default upload;
