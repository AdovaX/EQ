const db = require("../models");
const spocTb = db.spocTb;
const delegateTb = db.delegateTb;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const companyTb = db.companyTb;



exports.checkManagerType =  async(req, res) => {
  if (!req.body.email) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }  
 async function isSpoc(email) {
  return await spocTb.findOne({ where: {Spoc_email : email},
    include: {
      model: companyTb ,
      required: true
    }, }).then(data => {
        if (data.Spoc_email === email && bcrypt.compareSync(req.body.password, data.Spoc_password)) {
          var id = data.Spoc_id;
          id = id.toString();
          var auth = {
            "status": "SPOC",
            "Spoc_id" : id
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
async function isDelegate(email) {
  return await delegateTb.findOne({ where: {Delegate_email : email},
    include: {
      model: companyTb ,
      required: true
    } }).then(data => {
        if (data.Delegate_email === email && bcrypt.compareSync(req.body.password, data.Delegate_password)) {
          var id = data.Delegate_id;
          id = id.toString();
          var auth = {
            "status": "DELEGATE",
            "Delegate_id" : id
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

const spocFlag =  await isSpoc(req.body.email);
const delegateFlag =await isDelegate(req.body.email);

if(!spocFlag && !delegateFlag){ 
  var result = {
    status : 'FALSE'
  }  
  res.status(401).send(result); 
   }else if(spocFlag[0] ){ 
     res.status(200).send(spocFlag);
     return true;
   }else if(delegateFlag[0]){
    res.status(200).send(delegateFlag);
    return true;
   }
   else{ 
    res.status(401).send("Contact Admin - Not Working\n");
    return false;
 
   } 
};


exports.getMyCompany= async (req, res) => {
  if (!req.body.Spoc_id) {
   res.status(400).send({
     message: "Content can not be empty!"
   });
   return;
 }  
 async function getCompanyData() {
  return await spocTb.findAll({
    where: {
      Spoc_id: req.body.Spoc_id
    },
    include: {
      model: companyTb ,
      required: true
    },

  });   
} 
const myCompanyData =  await getCompanyData(); 
     res.status(200).send(myCompanyData);
     return; 
};  



exports.updateProfile = (req, res) => {
  if (!req.body.Spoc_id) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    } 

const profileData = {
  Spoc_name: req.body.Spoc_name,
  Spoc_email: req.body.Spoc_email,
  Spoc_designation: req.body.Spoc_designation, 
  Spoc_phone: req.body.Spoc_phone 
  }; 
  console.log(profileData);

  spocTb.update(profileData, {
    where: { Spoc_id: req.body.Spoc_id }
  }).then(num => {
      if (num == 1) {
        res.send({
          status: "true"
        });
      } else {
        res.send({
          status: "false"
        });
      }
    }).catch(err => {
      res.status(500).send({
        message: err
      });
    });
};