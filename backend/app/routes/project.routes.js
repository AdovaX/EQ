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
    router.post("/addBookmark", project.addBookmark); 
    router.post("/getBookmark", project.getBookmark); 
    router.post("/removeBookmark", project.removeBookmark); 
    router.post("/setInterview", project.setInterview); 
    router.post("/mailInterview", project.mailInterview); 
    router.post("/getInterviewResources", project.getInterviewResources); 
    router.post("/changeInterviewStatus", project.changeInterviewStatus); 
    router.post("/shortListResource", project.shortListResource); 
    router.post("/getShortListResource", project.getShortListResource); 
    router.post("/getapprovedResources", project.getapprovedResources); 
    router.post("/getTimesheet", project.getTimesheet); 
    router.post("/approveTimesheet", project.approveTimesheet); 
    router.post("/rejectTimesheet", project.rejectTimesheet); 

    app.use('/project', router);
};