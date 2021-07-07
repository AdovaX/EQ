module.exports = app => {
    const spoc = require("../controllers/spoc.controller.js");
   
    var router = require("express").Router();
   
    router.post("/userCheck", spoc.checkManagerType); 
    router.post("/getMyCompany", spoc.getMyCompany);     
    router.put("/updateProfile", spoc.updateProfile);   
    router.post("/createListingManager", spoc.createListingManager);  
    router.post("/getListingManagers", spoc.getListingManagers);   
    router.put("/LMDeletion", spoc.LMDeletion);   
  
    //app.use('/spoc/signup', router);
    app.use('/spoc', router);
};