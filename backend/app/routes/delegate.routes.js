module.exports = app => {
    const delegate = require("../controllers/delegate.controller");
 
   var router = require("express").Router();
 
   router.post("/getMyCompany", delegate.getMyCompany);  
   router.put("/updateProfile", delegate.updateProfile);   
 
   //app.use('/spoc/signup', router);
   app.use('/delegate', router);
};  