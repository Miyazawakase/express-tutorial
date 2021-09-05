const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs/promises");
const path = require("path");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
const port = 3000;

app.post("/add", (req, res) => {
  //   console.log(req.body.username);
  res.send(`Hello ${req.body.username}!`);
});

app.get("/home", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
