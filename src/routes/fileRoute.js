import { Router} from "express"
import {  getFile, uploadMultipleFile, uploadSingleFile} from "../controllers/fileController.js";
import { upload } from "../utils/multer.js";


const fileRoute = Router()


//define routes
fileRoute.post("/uploadSingle", upload.single('file'), uploadSingleFile)
fileRoute.post('/uploadMultiple' , upload.array("files" , 10), uploadMultipleFile)
fileRoute.get('/getfile/:fileName', getFile);






export default fileRoute;