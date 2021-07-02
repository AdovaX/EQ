module.exports = app => {
    const spoc = require("../controllers/spoc.controller.js");
   
    var router = require("express").Router();
  
    //router.post("/", spoc.create); 
    router.post("/signup", spoc.create); 
  
    //app.use('/spoc/signup', router);
    app.use('/spoc', router);
};