module.exports = app => {
    const users = require("../controllers/user.controller.js");
   
    var router = require("express").Router();
   
    router.post("/updateProfile", users.updateUserProfile);  
    router.post("/getProfileData", users.getProfile);  
  
    //app.use('/spoc/signup', router);
    app.use('/users', router);
};