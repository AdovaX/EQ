module.exports = app => {
    const users = require("../controllers/user.controller.js");
   
    var router = require("express").Router();
   
    router.post("/updateProfile", users.updateUserProfile);  
    router.post("/getProfileData", users.getProfile);  
    router.post("/profilePhotoUpdate", users.profilePhotoUpdate);  
    router.post("/sendMsg", users.sendMsg);  
    router.post("/getMsg", users.getMsg);  
    router.post("/getTotalMessages", users.getTotalMessages);  
    router.post("/getChatHistory", users.getChatHistory);  
    router.post("/getSingleChat", users.getSingleChat);  
  
    //app.use('/spoc/signup', router);
    app.use('/users', router);
};