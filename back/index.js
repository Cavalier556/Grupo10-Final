import express from "express";
import conectarDB from "./config/db.js";
import config from "./config/global.js";
import cors from "cors";

import router from "./routers/index.js";

const app = express();

conectarDB();

app.use(cors());
app.use(express.json());

app.use("/api", router);
/*app.use("/api/create-user", require("./routers/usuario"));
app.use("/api/login", require("./routers/login"));*/

app.listen(config.port, () => {
  console.log(`El servidor se encuentra en: http://127.0.0.1:${config.port}`);
});
