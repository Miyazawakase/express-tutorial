# Installation

```
npm install
```

# Start

```
npm run start
```

# 说明

### basic use

页面`index.html`在`http://localhost:3001/home`  
`index.html`里向`http://localhost:3001/add`提交了个表单，值可以从 req 的 body 里取出

> get 的参数可以从 req.query 取出, post 的从 body 取出

```js
app.post("/add", (req, res) => {
  // req.body
  res.send(`Hello ${req.body.username}!`);
});
```

### multipart/form-data

页面`multipart.html`在`http://localhost:3001/home_multi`

> 具体请参考 public/multipart.html 和 index.js

1. 如果提交的是纯文本 form-data，可以这么处理

```js
app.post("/multi_text", upload.none(), (req, res) => {
  const formData = req.body;
  console.log("formData:", formData);
  res.json({ code: 200, message: "success", data: formData });
});
```

2. 如果提交的是单个文件 form-data，可以这么处理

```js
app.post("/multi_file", upload.single("myFile"), (req, res) => {
  const file = req.file;
  const filename = file.originalname;

  console.log("filename:", filename);

  // fs.writeFile(
  //   path.resolve(__dirname, "./files") + "/" + `${nanoid(16)}_${filename}`,
  //   file.buffer,
  //   {},
  //   () => {
  //     console.log("write file:", filename, "success");
  //   }
  // );

  res.json({ code: 200, message: "success", data: file.originalname });
});
```

3. 复杂的场景可以这么处理

```js
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

    // files.forEach((file) => {
    //   const filename = `${nanoid(16)}_${file.originalname}`;
    //   fs.writeFile(
    //     path.resolve(__dirname, "./files") + "/" + filename,
    //     file.buffer,
    //     {},
    //     () => {
    //       console.log("write file:", filename, "success");
    //     }
    //   );
    // });

    res.json({
      code: 200,
      message: "success",
      data: { username, files: files.map((file) => file.originalname) },
    });
  }
);
```
