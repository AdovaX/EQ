module.exports = app => {
    const company = require("../controllers/company.controller.js");
    const Login = require("../controllers/login.controller.js");
  
    var router = require("express").Router();
  
    //router.post("/", spoc.create); 
    router.post("/signup", company.create); 
    router.get("/companylist", company.findAll); 
    router.get("/roles", company.getRoles); 
    router.get("/searchbyid/:Company_id", company.findOne); 
    router.delete("/delete/:Company_id", company.delete); 
    router.post("/login", Login.mainLogin); 
    router.post("/addBranch", company.addBranch); 
    router.post("/getBranches", company.getBranches); 
    router.post("/addBank", company.addBank); 
    router.post("/getBanks", company.getBanks); 
    router.post("/updatePreferences", company.updatePreferences); 
    router.post("/getPreferences", company.getPreferences); 
    router.post("/addGovIds", company.addGovIds); 
    router.post("/getGovernmentData", company.getGovernmentData); 
  
    //app.use('/spoc/signup', router);
    app.use('/company', router);
};