const db = require("../models");
const companyTb = db.companyTb; 
const spocTb = db.spocTb;
const usersTb = db.user;
const delegateTb = db.delegateTb;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');


exports.getMyCompany= async (req, res) => {
    if (!req.body.User_id) {
     res.status(400).send({
       message: "Content can not be empty!"
     });
     return;
   }  
   async function getCompanyData() {
    return await usersTb.findAll({
      where: {
        User_id: req.body.User_id
      },
      include: {
        model: delegateTb ,
        include: {
          model: companyTb ,
          required: true
        }
      },
  
    });   
  } 
  const myCompanyData =  await getCompanyData(); 
       res.status(200).send(myCompanyData);
       return; 
  };  


  exports.updateProfile = async(req, res) => {
    if (!req.body.Delegate_id) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      } 

 const profileData = {
    Delegate_name: req.body.Delegate_name, 
    Delegate_designation: req.body.Delegate_designation, 
    Delegate_phone: req.body.Delegate_phone 
    }; 
    const userData ={ 
      User_email: req.body.User_email,  
      }
     
  
     

  async function updateDelegate() {
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
    }

    async function userMailUpdate() {
      return await usersTb.update(userData, {
          where: { User_id: req.body.User_id }
        }).then(num => {
            if (num == 1) {
               return true;
            } else {
               return false;
            }
          })
          .catch(err => {
            var errorMsg = {
              error : 0
            }
            //res.status(500).send(errorMsg);
            return false;
          });
    }
    const isUpdatedDelegate= await updateDelegate();
    const isSpocMailUpdated =await userMailUpdate();

    if(isUpdatedDelegate == true && isSpocMailUpdated == true){
      return true;

    }else{
      return false;
    }
  };