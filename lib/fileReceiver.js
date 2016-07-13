"use strict";
var express = require('express');
var multer = require('multer');
var resolve = require('path').resolve;
var router = express.Router();

var dest = resolve(process.cwd(), './');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dest); // Absolute path. Folder must exist, will not be created for you.
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

module.exports = () => {
  let catcher = multer({storage:storage});
  router.use('/', (req, res, next) => {
    // res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    // res.status(200).send();
    next();
  });
  router.post('/',
    catcher.single('file'),
    (req, res) => {
      // console.log(req.file);
      res.status(200);
      res.send('ok');
    }
  );

  return router;
};
