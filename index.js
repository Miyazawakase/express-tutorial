const fs = require("fs");
const path = require("path");
const { nanoid } = require("nanoid");

const express = require("express");

const bodyParser = require("body-parser");
const multer = require("multer");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
const upload = multer();
const port = 3001;

app.post("/add", (req, res) => {
  console.log("username:", req.body.username);
  res.send(`Hello ${req.body.username}!`);
});

app.post("/multi_text", upload.none(), (req, res) => {
  const formData = req.body;
  console.log("formData:", formData);
  res.json({ code: 200, message: "success", data: formData });
});

app.post("/multi_file", upload.single("myFile"), (req, res) => {
  const file = req.file;
  const filename = `${nanoid(16)}_${file.originalname}`;

  console.log("filename:", filename);

  fs.writeFile(
    path.resolve(__dirname, "./files") + "/" + `${nanoid(16)}_${filename}`,
    file.buffer,
    {},
    () => {
      console.log("write file:", filename, "success");
    }
  );

  res.json({ code: 200, message: "success", data: file.originalname });
});

app.post(
  "/multi_fields",
  upload.fields([
    { name: "username", maxCount: 1 },
    { name: "myFiles", maxCount: 10 },
  ]),
  (req, res) => {
    const formData = req.body;
    const files = req.files["myFiles"];

    console.log("formData:", formData);
    console.log("files:", files);

    const username = formData.username;

    files.forEach((file) => {
      const filename = `${nanoid(16)}_${file.originalname}`;
      fs.writeFile(
        path.resolve(__dirname, "./files") + "/" + filename,
        file.buffer,
        {},
        () => {
          console.log("write file:", filename, "success");
        }
      );
    });

    res.json({
      code: 200,
      message: "success",
      data: { username, files: files.map((file) => file.originalname) },
    });
  }
);

app.get("/home", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/index.html"));
});

app.get("/home_multi", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/multipart.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
