const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path')
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = "./uploads/"
    fs.mkdirSync(path, { recursive: true })
    return cb(null, path)
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: fileStorageEngine });

app.post("/upload_files", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send({ status: 'Uploaded', token: req.file.filename });
});

app.get("/:token", (req, res) => {
  let filepath = "/uploads/" + req.params.token;
  res.sendFile(__dirname + filepath);
});

app.listen(process.env.DOCKER_PORT, () => {
  console.log(`App start on port ` + process.env.DOCKER_PORT);
})