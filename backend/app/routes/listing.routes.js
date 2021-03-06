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
    router.post("/introVideo", LManager.introVideo);  
    router.post("/getDomainLists", LManager.getDomainLists); 
    router.post("/getJobRoleLists", LManager.getJobRoleLists); 
    router.post("/getTechnologyByParent", LManager.getTechnologyByParent); 
    router.post("/getTechnologyLists", LManager.getTechnologyLists); 
    router.post("/toogleActive", LManager.toogleActive); 
    router.post("/updateFrom", LManager.updateFrom); 
    router.post("/updateTo", LManager.updateTo); 
    router.post("/getEducationLists", LManager.getEducationLists); 
    router.post("/getResourceData", LManager.getResourceData); 
    router.post("/editResource", LManager.editResource);  
    router.post("/getEduStreams", LManager.getEduStreams);  
    router.post("/getEduMtech", LManager.getEduMtech);  
    router.post("/profilePhotoChange", LManager.profilePhotoChange);  
    router.post("/resourceRequests", LManager.resourceRequests);  
    router.post("/approveResources", LManager.approveResources);  
    router.post("/listofApprovedResources", LManager.listofApprovedResources);  
    router.post("/get_introVideo", LManager.get_introVideo);  
  
     app.use('/listing', router);
};