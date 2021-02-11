const express = require('express'),
  path = require('path'),
  cors = require('cors'),
  multer = require('multer'),
  bodyParser = require('body-parser');
  createError = require('http-errors');
  fileSys = require('fs');

// File upload settings
const PATH = '../../assets';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, PATH)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({storage: storage})

// Express settings
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/api', function (req, res) {
  res.end('File catcher');
});

app.get('/api/files', function (req, res) {
  const getFiles = new Promise(
    (resolve, reject) => {
      var fls = [];
      fileSys.readdir(PATH, function (err, files) {
        //handling error
        if (err) {
            reject(err);
        }
        //listing all files using forEach
        files.forEach(function (file) {
            var pth = path.join(PATH, file);
            if (file !== '.gitkeep') {
                fls.push({
                    extension: path.parse(pth).ext.replace('.','').toUpperCase(),
                    fileName: path.parse(pth).name,
                    path: '/../assets/'+file,
                });
                // Do whatever you want to do with the file
                console.log(fls);
            }
        });
        resolve(fls);
      });

    }
  );
  getFiles.then(data => res.json(data)).catch(err=>res.send(err));
});

// POST File
app.post('/api/upload', upload.single('files'), function (req, res) {
  if (!req.file) {
    console.log("No file is available!");
    return res.send({
      success: false
    });

  } else {
    console.log('File is available!');
    return res.send({
      success: true
    })
  }
});

// Create PORT
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log('Connected to port ' + PORT)
})

// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
