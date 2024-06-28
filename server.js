import app from "./src/app.js";
import { _config } from "./src/config/config.js";

const startServer = async () => {
  const port = _config.PORT ?? 4000;

  app.get("/", (req, res) => {
    res.json({msg:"server is working...."});
  });

  app.get("/health", (req, res) => {
    res.json({ msg: "hello from health check....." });
  });

  app.listen(port, () => {
    console.log(`server is running at ${port}`);
  });
};

startServer();
