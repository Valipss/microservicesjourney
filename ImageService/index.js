const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: fileStorageEngine });

app.post("/upload_files", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send("File uploaded");
});

app.get("/show_image", (req, res) => {
  let ddzzdzd = "images/1b0b0b7d-e887-4534-8e63-d9091552d9f9.png";
  var img = new Image();
  img.src = ddzzdzd;
  document.body.appendChild(img);
});

function searchImages() {

}

app.listen(process.env.DOCKER_PORT, () => {
  console.log(`App start on port ` + process.env.DOCKER_PORT);
})