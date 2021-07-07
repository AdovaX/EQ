const db = require("../models");
const companyTb = db.companyTb;  
const LManagerTb = db.LManagerTb;
const HManagerTb = db.HManagerTb;
const delegateTb = db.delegateTb;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');

 

exports.checkManagerType =  async(req, res) => {
    if (!req.body.email) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }  
   async function isListing(email) {
    return await LManagerTb.findOne({ where: {LManager_email : email},
      include: {
        model: companyTb ,
        required: true
      }, }).then(data => {
          if (data.LManager_email === email && bcrypt.compareSync(req.body.password, data.LManager_password)) {
            var id = data.LManager_id;
            id = id.toString();
            var auth = {
              "status": "LM_MANAGER",
              "LManager_id" : id
            } 
            var result = new Array();
            result.push(auth);
            result.push(data); 
            return result;
          } else {
             return false;
          }
        })
        .catch(err => {
          return false;
        }); 
  }
  async function isHiring(email) {
    return await HManagerTb.findOne({ where: {HManager_email : email},
      include: {
        model: companyTb ,
        required: true
      } }).then(data => {
          if (data.HManager_email === email && bcrypt.compareSync(req.body.password, data.HManager_password)) {
            var id = data.HManager_id;
            id = id.toString();
            var auth = {
              "status": "HM_MANAGER",
              "HManager_id" : id
            }  
            var result = new Array();
            result.push(auth);
            result.push(data); 
            return result;
          } else {
             return false;
          }
        })
        .catch(err => { 
          return false;
        }); 
  }
  
  const LManagerFlag =  await isListing(req.body.email);
  const HManagerFlag =await isHiring(req.body.email);
  
  if(!LManagerFlag && !HManagerFlag){ 
    var result = {
      status : 'FALSE'
    }  
    res.status(401).send(LManagerFlag); 
     }else if(LManagerFlag[0] ){ 
       res.status(200).send(LManagerFlag);
       return true;
     }else if(HManagerFlag[0]){
      res.status(200).send(HManagerFlag);
      return true;
     }
     else{ 
      res.status(401).send("Contact Admin - Not Working\n");
      return false;
   
     } 
  };