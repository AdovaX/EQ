const db = require("../models");
const spocTb = db.spocTb;
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
 async function isSpoc(email) {
  return await spocTb.findOne({ where: {Spoc_email : email} }).then(data => {
        if (data.Spoc_email === email && bcrypt.compareSync(req.body.password, data.Spoc_password)) {
          var result = {
            "status": "SPOC",
            "spoc_id" : data.Spoc_id
          }
           return result;
        } else {
           return false;
        }
      })
      .catch(err => {
        return false;
      }); 
}
async function isDelegate(email) {
 return await delegateTb.findOne({ where: {Delegate_email : email} }).then(data => {
       if (data.Delegate_email === email && bcrypt.compareSync(req.body.password, data.Delegate_password)) {
         var result = {
           "status": "DELEGATE",
           "delegate_id" : data.Delegate_id
         }
          return result;
       } else {
          return false;
       }
     }).catch(err => {
       return false;
     }); 
}
const spocFlag =  await isSpoc(req.body.email);
const delegateFlag =await isDelegate(req.body.email);

   if(spocFlag.status === "SPOC"){ 
     res.status(200).send(spocFlag);
   }else if(delegateFlag.status === "DELEGATE"){
    res.status(200).send(delegateFlag);
   }else{
    var result = {
      status : 'FALSE'
    }
    res.status(401).send(result);
    return false;

   }

  
};