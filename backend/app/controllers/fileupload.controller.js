
var formidable = require('formidable');
var http = require('http');
var fs = require('fs');
const IncomingForm = require('formidable').IncomingForm;
const { existsSync, writeFileSync } = require('fs')



exports.resumeUpload = (req, res) => {
    var form = new IncomingForm()

    form.on('file', (field, files) => {
      console.log("in");

      var oldpath = files.path;
      var newpath = './uploads/' + Math.floor(Math.random() * 100000) +files.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        console.log("yoyo");

      }); 


    })
    form.on('end', () => {
        console.log("done" + req.body);
      res.json()
    })
    form.parse(req)
  };
   