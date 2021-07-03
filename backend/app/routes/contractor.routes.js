module.exports = app => {
    const contractor = require("../controllers/contractor.controller.js");
 
   var router = require("express").Router();
 
   router.put("/updateProfile", contractor.updateContractor);  
   router.put("/updateCompany", contractor.updateCompany);  
   router.post("/getMyCompany", contractor.getMyCompany);  
 
   //app.use('/spoc/signup', router);
   app.use('/contractor', router);
};  