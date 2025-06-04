import multer from "multer";
const storage = multer.memoryStorage(); // this will create a buffer which store the filePath  of the image
const upload = multer({ storage });
export default upload;