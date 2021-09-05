module.exports = app => {
    const resource = require("../controllers/resource.controller");
   
    var router = require("express").Router();
   
    router.post("/getRequirementData", resource.getRequirementData);  
    router.post("/updateTimesheet", resource.updateTimesheet);    
    router.post("/getTimesheetResource", resource.getTimesheetResource);  
    router.post("/timesheetOk", resource.timesheetOk);    
  
    //app.use('/spoc/signup', router);
    app.use('/resource', router);
};