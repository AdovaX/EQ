module.exports = app => {
    const spoc = require("../controllers/spoc.controller.js");
   
    var router = require("express").Router();
   
    router.post("/userCheck", spoc.checkManagerType); 
    router.post("/getMyCompany", spoc.getMyCompany);     
    router.put("/updateProfile", spoc.updateProfile);   
    router.post("/createListingManager", spoc.createListingManager);  
    router.post("/getListingManagers", spoc.getListingManagers);   
    router.put("/LMDeletion", spoc.LMDeletion);   

    router.post("/createHiringManager", spoc.createHiringManager); 
    router.post("/getHiringManagers", spoc.getHiringManagers);   
    router.put("/HMDeletion", spoc.HMDeletion);   
  
    //app.use('/spoc/signup', router);
    app.use('/spoc', router);
};