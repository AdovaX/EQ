const db = require("../models");
const companyTb = db.companyTb;  
const LManagerTb = db.LManagerTb;
const HManagerTb = db.HManagerTb;
const delegateTb = db.delegateTb;
const resourceTb = db.resourceTb;
const usersTb = db.user;
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
            var C_id = data.Company_id; 
            C_id = C_id.toString();
            var auth = {
              "status": "LM_MANAGER",
              "LManager_id" : id,
              "Company_id" : C_id
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
            var C_id = data.Company_id; 
            C_id = C_id.toString();
            var auth = {
              "status": "HM_MANAGER",
              "HManager_id" : id,
              "Company_id" : C_id
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

  exports.updateProfile =async (req, res) => {
    if (!req.body.LManager_id) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      } 
  
  const profileData = {
    LManager_name: req.body.LManager_name,  
    LManager_designation: req.body.LManager_designation, 
    LManager_phone: req.body.LManager_phone 
    }; 
    const userData ={ 
      User_email: req.body.User_email,  
      } 
      async function userMailUpdate() {
        return await usersTb.update(userData, {
            where: { User_id: req.body.User_id }
          }).then(num => {
              if (num == 1) {
               // res.send(num);
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
      async function updateLManager() { 
        return await LManagerTb.update(profileData, {
          where: { LManager_id: req.body.LManager_id }
        }).then(num => {
            if (num == 1) {
              res.send(num);
               //return true;
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
      const isupdateLManager= await updateLManager();
      const isHManagerMailUpdated =await userMailUpdate();
  
      if(isupdateLManager == true && isHManagerMailUpdated == true){
        res.send(isHManagerMailUpdated);
        //return true;
      }else{
        return false;
      }
    
  };
   

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
        model: LManagerTb,
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


exports.createResource= async (req, res) => {
  if (!req.body.Company_id) {
   res.status(400).send({
     message: "Content can not be empty!"
   });
   return;
 }  
 var passwordHash = bcrypt.hashSync(req.body.Resource_password , 10);

 const resourceData = {
  Resource_name: req.body.Resource_name,
  Resource_Experience: req.body.Resource_Experience,
  Resource_Email: req.body.Resource_Email,
  Resource_Password: passwordHash,
  Resource_Designation: req.body.Resource_Designation,
  Resource_summery: req.body.Resource_summery,
  Resource_masked: req.body.Resource_masked ,
  Resource_stack: req.body.Resource_stack, 
  Resource_status:req.body.Resource_status,
  Is_remote: req.body.Is_remote,
  Resource_rate: req.body.Resource_rate,
  Availability_status: req.body.Availability_status, 
  Company_id: req.body.Company_id, 
};
console.log(resourceData);
resourceTb.create(resourceData)
  .then(data => {  
  // var respos = {
  //   "status" : "Success"
  // }
  res.status(200).send(data); 
       
  })
  .catch(err => {
    res.status(400).send(err);  
  });
}; 


exports.resourceListing = (req, res) => {
  if (!req.body.Company_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  resourceTb.findAll({ where: {
    Company_id: req.body.Company_id , Resource_active:1
      },})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};


exports.deleteResource = (req, res) => {
  if (!req.body.Company_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  } 
  var data ={
    "Resource_active" : 0, 
  }

  resourceTb.update(data, {
    where: { Resource_id: req.body.Resource_id }
  }).then(num => {
      if (num == 1) {
        res.send({
          status: true
        });
      } else {
        res.send({
          message: 'Cannot Delete'
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating  with id"
      });
    });
};
