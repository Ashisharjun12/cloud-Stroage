import express from "express";
import errorHandler from "./middlewares/ErrorHandler.js";
import photoRoute from "./routes/photoRoute.js";
import fileRoute from "./routes/fileRoute.js";

const app = express();

//important middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//custom middlewares
app.use(errorHandler);

//define routes
app.use("/api/v1/photo", photoRoute);
app.use("/api/v1/file" , fileRoute);



//error handler
app.use(errorHandler)


export default app;
