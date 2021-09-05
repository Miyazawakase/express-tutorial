# Installation

```
npm install
```

# Start

```
npm run start
```

# 说明

`index.html`里向`http://localhost:3000/add`提交了个表单，值可以从 req 的 body 里取出

> get 的参数可以从 req.query 取出, post 的从 body 取出

```
app.post("/add", (req, res) => {
  // req.body
  res.send(`Hello ${req.body.username}!`);
});
```
