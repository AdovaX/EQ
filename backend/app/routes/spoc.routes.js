module.exports = app => {
    const spoc = require("../controllers/spoc.controller.js");
   
    var router = require("express").Router();
   
    router.post("/userCheck", spoc.checkManagerType); 
    router.post("/getMyCompany", spoc.getMyCompany);     
    router.put("/updateProfile", spoc.updateProfile);   
  
    //app.use('/spoc/signup', router);
    app.use('/spoc', router);
};