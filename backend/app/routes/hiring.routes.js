module.exports = app => {
    const HManager = require("../controllers/hiring.controller.js");
   
    var router = require("express").Router();
    
    router.put("/updateProfile", HManager.updateProfile);    
    router.post("/getMyCompany", HManager.getMyCompany);   
    router.post("/getResources_all", HManager.getResources_all);  
    router.post("/searchByKeywords", HManager.searchByKeywords);   
  
     app.use('/hiring', router);
};