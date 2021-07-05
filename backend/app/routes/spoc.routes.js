module.exports = app => {
    const spoc = require("../controllers/spoc.controller.js");
   
    var router = require("express").Router();
   
    router.post("/userCheck", spoc.checkManagerType); 
  
    //app.use('/spoc/signup', router);
    app.use('/spoc', router);
};