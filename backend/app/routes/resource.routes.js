module.exports = app => {
    const resource = require("../controllers/resource.controller");
   
    var router = require("express").Router();
   
    router.post("/getRequirementData", resource.getRequirementData);    
  
    //app.use('/spoc/signup', router);
    app.use('/resource', router);
};