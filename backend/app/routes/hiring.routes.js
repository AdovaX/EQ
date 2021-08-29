module.exports = app => {
    const HManager = require("../controllers/hiring.controller.js");
   
    var router = require("express").Router();
    
    router.put("/updateProfile", HManager.updateProfile);    
    router.post("/getMyCompany", HManager.getMyCompany);   
    router.post("/getResources_all", HManager.getResources_all);  
    router.post("/searchByKeywords", HManager.searchByKeywords);   
    router.post("/createproject", HManager.createProject);   
    router.post("/projectList", HManager.listofProjects);    
    router.post("/searchProjectById", HManager.searchProjectById);   
    router.post("/myResources", HManager.myResources);   
  
     app.use('/hiring', router);
};