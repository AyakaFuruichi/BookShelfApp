import path from "path";
import express from "express";
import apiRoutes from "./api-routes/index.mjs";
import "./helpers/db.mjs";

const app = express();
const port = process.env.PORT || 8080;

import cors from "cors";


app.use(express.static('build'));

app.use(express.json());
app.use(cors());

app.use("/api", apiRoutes);

app.get('*', (req, res) => {
  const pathIndex = path.resolve('build', 'index.html');
  res.sendFile(pathIndex);
});

app.use(function (req, res) {
  res.status(404).send("Page Not Found");
});

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).json({ msg: "Error !!!" });
});

app.listen(port, () => {
  console.log(`Server start: http://localhost:${port}`);
});
