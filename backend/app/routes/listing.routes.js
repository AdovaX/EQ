module.exports = app => {
    const LManager = require("../controllers/listing.controller.js");
   
    var router = require("express").Router();
    
   
    router.post("/userCheck", LManager.checkManagerType);  
    router.put("/updateProfile", LManager.updateProfile);   
    router.post("/getMyCompany", LManager.getMyCompany);   
    router.post("/createResource", LManager.createResource); 
    router.post("/resourceListing", LManager.resourceListing);  
    router.put("/ResourceDeletion", LManager.deleteResource);  
    router.post("/getTechnologyParents", LManager.getTechnologyParents);  
    router.post("/resumeUpload", LManager.resumeUpload);  
  
     app.use('/listing', router);
};