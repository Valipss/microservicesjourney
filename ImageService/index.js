const express = require('express');
const multer = require('multer');
const upload = multer({ dest: "uploads/" });
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/upload_files", upload.single("image"), uploadFiles);

function uploadFiles(req, res) {
  console.log(req.file.filename);
  res.json({ message: "uploaded", token: req.file.filename });
}

app.listen(process.env.DOCKER_PORT, () => {
  console.log(`App start on port ` + process.env.DOCKER_PORT);
})