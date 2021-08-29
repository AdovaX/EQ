module.exports = app => {
    const users = require("../controllers/user.controller.js");
   
    var router = require("express").Router();
   
    router.post("/updateProfile", users.updateUserProfile);  
    router.post("/getProfileData", users.getProfile);  
    router.post("/profilePhotoUpdate", users.profilePhotoUpdate);  
  
    //app.use('/spoc/signup', router);
    app.use('/users', router);
};