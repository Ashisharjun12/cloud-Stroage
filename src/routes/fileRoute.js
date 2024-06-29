import { Router } from "express";
import { upload } from "../utils/multer.js";
import { uploadMultipleFiles, uploadSingleFile } from "../controllers/fileController.js";

const fileRoute = Router()





//define routes
fileRoute.post('/uploadSingle' ,upload.single('file'), uploadSingleFile)
fileRoute.post('/uploadMultiple',upload.array('files',10) , uploadMultipleFiles)











export default fileRoute;