import { Router} from "express"
import { fileUpload } from "../controllers/fileController.js";


const fileRoute = Router()


//define routes
fileRoute.post("/upload",fileUpload)






export default fileRoute;