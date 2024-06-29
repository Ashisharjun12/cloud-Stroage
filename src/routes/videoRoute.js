import { Router } from "express";
import { upload } from "../utils/multer.js";
import { uploadSingleVideo } from "../controllers/videoController.js";

const videoRouter =Router()


//defineRoutes
videoRouter.post('/uploadSingle', upload.single('file'), uploadSingleVideo)




export default videoRouter;