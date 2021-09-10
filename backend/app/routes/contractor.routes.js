module.exports = app => {
    const contractor = require("../controllers/contractor.controller.js");
 
   var router = require("express").Router();
  
   router.put("/updateCompany", contractor.updateCompany);   
   router.post("/delegateCreation", contractor.CreateDelegate);  
   router.post("/delegateList", contractor.getDelegates);  
 
   router.post("/spocCreation", contractor.CreateSpoc);  
   router.post("/spocList", contractor.getSpocs);  

   router.put("/spocDeletion", contractor.deleteSpoc); 
   router.put("/delegateDeletion", contractor.deleteDelegate);  
   router.post("/getDelegatesById", contractor.getDelegatesById);  
   router.post("/editDelegateData", contractor.editDelegateData);  
 
   //app.use('/spoc/signup', router);
   app.use('/contractor', router);
};  