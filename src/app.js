import express from "express";
import errorHandler from "./middlewares/ErrorHandler.js";
import fileRoute from "./routes/fileRoute.js";

const app = express();

//important middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//custom middlewares
app.use(errorHandler);

//define routes
app.use("/api/v1", fileRoute);

export default app;
