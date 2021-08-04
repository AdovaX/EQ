module.exports = app => {
    const Upload = require("../controllers/fileupload.controller.js");
    
    var router = require("express").Router();
    
    router.post("/resumeUpload", Upload.resumeUpload);  
  
     app.use('/uploads', router); 
};