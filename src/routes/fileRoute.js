import { Router} from "express"
import { uploadFile, getFile} from "../controllers/fileController.js";
import { upload } from "../utils/multer.js";


const fileRoute = Router()


//define routes
fileRoute.post("/upload", upload.single('file'), uploadFile)
fileRoute.get('/getfile/:fileName', getFile);






export default fileRoute;