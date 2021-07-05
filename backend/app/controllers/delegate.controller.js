const db = require("../models");
const companyTb = db.companyTb; 
const spocTb = db.spocTb;
const delegateTb = db.delegateTb;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');


exports.getMyCompany= async (req, res) => {
    if (!req.body.Delegate_id) {
     res.status(400).send({
       message: "Content can not be empty!"
     });
     return;
   }  
   async function getCompanyData() {
    return await delegateTb.findAll({
      where: {
        Delegate_id: req.body.Delegate_id
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
    if (!req.body.Delegate_id) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      } 

 const profileData = {
    Delegate_name: req.body.Delegate_name,
    Delegate_email: req.body.Delegate_email,
    Delegate_designation: req.body.Delegate_designation, 
    Delegate_phone: req.body.Delegate_phone 
    }; 
    console.log(profileData);
  
    delegateTb.update(profileData, {
      where: { Delegate_id: req.body.Delegate_id }
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