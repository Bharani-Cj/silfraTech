const express = require("express");
const app = express();
const router = require("./Routers/userRoutes");
const cors = require("cors");
app.use(express.json());
app.use(cors());

app.use("/users", router);

app.all("*", (req, res) => {
  res.status(401).json({
    status: "Fail",
    message: "No routes found",
  });
});
module.exports = app;
