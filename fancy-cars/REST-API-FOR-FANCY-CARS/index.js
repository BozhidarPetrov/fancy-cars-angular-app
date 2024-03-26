const express = require("express");
const router = require("./config/routes");
const cors = require("./middlewares/cors");

const databaseConfiguration = require("./config/database");
start();

async function start() {
  await databaseConfiguration();

  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(router);
  app.get("/", (req, res) => res.json({ message: "REST service operational" }));

  app.listen(3030, () => console.log("REST service started on port 3030"));
}
