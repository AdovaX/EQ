const db = require("../models");
const companyTb = db.companyTb;
const usersTb = db.user;
const contractorTb = db.contractownerTb;
const spocTb = db.spocTb;
const delegateTb = db.delegateTb;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');




exports.updateUserProfile= async (req, res) => {
    if (req.body.User_id <0 || req.body.User_email =="") {
     res.status(400).send({
       message: "Content can not be empty!"
     });
     return;
   } 
   
   const userData = {
    User_firstname: req.body.User_firstname,
    User_secondname: req.body.User_secondname,
    User_designation: req.body.User_designation,
    User_phonenumber : req.body.User_phone,
    User_phonenumber2 : req.body.User_phone2,
    User_email : req.body.User_email,
    }; 
    console.log("Profile update function");
    console.log(userData);
        await usersTb.update(userData, {
          where: { User_id: req.body.User_id }
        }).then(num => {
            if (num == 1) {
              console.log("Profile updated");
              var result = {
                "status" : "Success"
              }
              res.status(200).send(JSON.stringify(result));
            } else {
              var result = {
                "status" : "Failed"
              }
              res.status(200).send(JSON.stringify(result));
            }
          })
          .catch(err => {
            var errorMsg = {
              error : 0
            }
            //res.status(500).send(errorMsg);
            return false;
          });
      
       
  };  

exports.getProfile= async (req, res) => {
  if (!req.body.User_id) {
   res.status(400).send({
     message: "Content can not be empty!"
   });
   return;
 }  
  
 await usersTb.findOne({
    where: {
      User_id: req.body.User_id
    },
    include: {
      model: companyTb ,
      include: {
        model: usersTb ,
        required: true
      }
    }, 
  }).then(data =>{
    res.status(200).send(data);
  }).catch(err => {
    res.status(200).send(err);
  });   
 
 
};  
