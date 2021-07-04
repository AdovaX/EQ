module.exports = app => {
    const contractor = require("../controllers/contractor.controller.js");
 
   var router = require("express").Router();
 
   router.put("/updateProfile", contractor.updateContractor);  
   router.put("/updateCompany", contractor.updateCompany);  
   router.post("/getMyCompany", contractor.getMyCompany);  
   router.post("/delegateCreation", contractor.CreateDelegate);  
   router.post("/delegateList", contractor.getDelegates);  
 
   router.post("/spocCreation", contractor.CreateSpoc);  
   router.post("/spocList", contractor.getSpocs);  

   router.put("/spocDeletion", contractor.deleteSpoc); 
   router.put("/delegateDeletion", contractor.deleteDelegate);  
 
   //app.use('/spoc/signup', router);
   app.use('/contractor', router);
};  