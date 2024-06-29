import { Router} from "express"
import {     uploadMultiplePhotos,  uploadSinglePhoto} from "../controllers/photoController.js";
import { upload } from "../utils/multer.js";


const photoRoute = Router()


//define routes
//for photos
photoRoute.post("/uploadSingle", upload.single('file'), uploadSinglePhoto)
photoRoute.post('/uploadMultiple' , upload.array("files" , 10), uploadMultiplePhotos)


// fileRoute.get('/getfile/:fileName', getFile);






export default photoRoute;