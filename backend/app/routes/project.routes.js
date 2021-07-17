module.exports = app => {
    const project = require("../controllers/project.controller.js");
   
    var router = require("express").Router();
   
    router.get("/getDomains", project.getDomains);  
    router.get("/getTechnology", project.getTechnology);  
    router.get("/getEducation", project.getEducation);   
    router.post("/createassignment", project.createAssignment); 
    router.post("/getAssignmentsById", project.getAssignmentsById); 
    router.post("/getProjectById", project.getProjectById); 
   
    app.use('/project', router);
};