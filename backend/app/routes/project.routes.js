module.exports = app => {
    const project = require("../controllers/project.controller.js");
   
    var router = require("express").Router();
   
    router.get("/getDomains", project.getDomains);  
    router.get("/getTechnology", project.getTechnology);  
    router.get("/getEducation", project.getEducation);   
    router.get("/getRoles", project.getRoles);   
    router.post("/createassignment", project.createAssignment); 
    router.post("/getAssignmentsById", project.getAssignmentsById); 
    router.post("/getProjectById", project.getProjectById); 
    router.post("/ProjectMatching", project.projectMatching); 
    router.post("/updateProjectStatus", project.updateProjectStatus); 
    router.post("/updateStart", project.updateStart); 
    router.post("/updateEnd", project.updateEnd); 
    router.post("/getRequirementData", project.getRequirementData); 
   
    app.use('/project', router);
};