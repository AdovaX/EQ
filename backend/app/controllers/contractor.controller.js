const db = require("../models");
const companyTb = db.companyTb;
const usersTb = db.user;
const contractorTb = db.contractownerTb;
const spocTb = db.spocTb;
const delegateTb = db.delegateTb;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');

   
exports.updateCompany = async (req, res) => {
  if (!req.body.C_full_name) {
   res.status(400).send({
     message: "Content can not be empty!"
   });
   return;
 } 
 const companyData = {
     C_short_name: req.body.C_short_name,
     C_full_name: req.body.C_full_name,
     Website: req.body.Website,
     No_employees: req.body.No_employees,
     Founded : req.body.Founded,
     About : req.body.About,
     Company_email : req.body.Company_email,  

  };
  async function updateCompanyProfile() {
     return await companyTb.update(companyData, {
         where: { Company_id: req.body.Company_id }
       }).then(num => {
           if (num == 1) {
            res.send({
              status: true
            });
           } else {
            res.send({
              status: false
            });
           }
         })
         .catch(err => {
           res.status(500).send({
             message: "Error updating Tutorial with id="
           });
         });
   }
   const isUpdated =  await updateCompanyProfile();
   if(isUpdated){
     res.status(200).send("Updated successfully");
   }
};  
   
exports.updateContractor= async (req, res) => {
  if (!req.body.Contractor_id) {
   res.status(400).send({
     message: "Content can not be empty!"
   });
   return;
 } 
 
 const contractorData = {
  Contractor_firstName: req.body.Contractor_firstName,
  Contractor_secondName: req.body.Contractor_secondName,
  Contract_designation: req.body.Contract_designation,
  Contract_phone : req.body.Contractor_phone
  }; 
  const userData ={ 
  User_email: req.body.Contractor_email,  
  }
  async function updateContractorProfile() {
     return await contractorTb.update(contractorData, {
         where: { Contractor_id: req.body.Contractor_id }
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


  async function updateUserMail() {
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

  const isUpdated =  await updateContractorProfile();
  const isUserUpdated =  await updateUserMail();
   if(isUpdated){
     var result = {
       "status" : "Success"
     }
     res.status(200).send(JSON.stringify(result));
   }else{
    var result = {
      "status" : "Failed"
    }
    res.status(200).send(JSON.stringify(result));

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
      model: companyTb ,
      include: {
        model: contractorTb ,
        required: true
      }
    }, 
  });   
} 
const myCompanyData =  await getCompanyData(); 
     res.status(200).send(myCompanyData);
     return; 
};  



exports.CreateDelegate= async (req, res) => {
  var Company_id ="";
  var User_roles_id =3;
  if (!req.body.Company_id) {
   res.status(400).send({
     message: "Content can not be empty!"
   });
   return;
 }  
 Company_id = req.body.Company_id; 
 var passwordHash = bcrypt.hashSync(req.body.Delegate_password , 10);
 const delegateData = {
  Delegate_name: req.body.Delegate_name, 
  Delegate_designation: req.body.Delegate_designation,
  Delegate_phone: req.body.Delegate_phone, 
  Company_id: req.body.Company_id,
  Delegate_status: req.body.Delegate_status 
};
const loginData = { 
 User_email: req.body.Delegate_email, 
 User_password: passwordHash, 
};
async function insertDelegate(uid){
  delegateData.User_id = uid;
  delegateData.User_roles_id = User_roles_id;
  
  delegateTb.create(delegateData)
  .then(data => {   
    return data; 
  })
  .catch(err => {
    res.status(400).send(err);  
    return;
  });
}
async function insertLogin(Company_id , User_roles_id) {
  loginData.Company_id =Company_id;
  loginData.User_roles_id =User_roles_id;
   
   return await  usersTb.create(loginData)
   .then(data => {  
    // sendMail(data.User_email);
      return data;
   })
   .catch(err => {
       return err.message ; 
   });
 }
 try {
  const login =  await insertLogin(Company_id , User_roles_id);
  const delegate =  await insertDelegate(login.User_id);
    var respos = {
    "status" : "Success"
  }
 res.send(respos);
} catch (error) {
  res.send(error);
}
};  

 

exports.getDelegates = async (req, res) => { 
  if (!req.body.Company_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }  
  delegateTb.findAll({where : {Company_id:req.body.Company_id, Delegate_active:1},
    include: {
      model: usersTb ,
      required: true
    }})
    .then(data => {
      res.status(200).send(data); 

    })
    .catch(err => {
      res.send(err);

    });

};
  





exports.CreateSpoc= async (req, res) => {
  var User_roles_id =4;
  if (!req.body.Company_id) {
   res.status(400).send({
     message: "Content can not be empty!"
   });
   return;
 }  
var Company_id = req.body.Company_id; 
 var passwordHash = bcrypt.hashSync(req.body.Spoc_password , 10);
 const SpocData = {
  Spoc_name: req.body.Spoc_name, 
  Spoc_designation: req.body.Spoc_designation,
  Spoc_phone: req.body.Spoc_phone, 
  Company_id: req.body.Company_id,
  Spoc_status: req.body.Spoc_status 
};
const loginData = { 
 User_email: req.body.Spoc_email, 
 User_password: passwordHash, 
};
async function insertSpoc(uid){
  SpocData.User_id = uid;
  SpocData.User_roles_id = User_roles_id;
  
  spocTb.create(SpocData)
  .then(data => {   
    return data; 
  })
  .catch(err => {
    res.status(400).send(err);  
    return;
  });
}
async function insertLogin(Company_id , User_roles_id) {
  loginData.Company_id =Company_id;
  loginData.User_roles_id =User_roles_id;
   
   return await  usersTb.create(loginData)
   .then(data => {  
    // sendMail(data.User_email);
      return data;
   })
   .catch(err => {
       return err.message ; 
   });
 }
 try {
  const login =  await insertLogin(Company_id , User_roles_id);
  const delegate =  await insertSpoc(login.User_id);
    var respos = {
    "status" : "Success"
  }
 res.send(respos);
} catch (error) {
  res.send(error);
}
};  

   

exports.getSpocs = async (req, res) => { 
  if (!req.body.Company_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }  
  spocTb.findAll({where : {Company_id:req.body.Company_id , Spoc_active :1},
    include: {
      model: usersTb ,
      required: true
    }})
    .then(data => {
      res.status(200).send(data); 

    })
    .catch(err => {
      res.send(err);

    });

};
  
exports.deleteSpoc = (req, res) => {
  if (!req.body.Company_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  } 
  var data ={
    "Spoc_active" : 0, 
  }

  spocTb.update(data, {
    where: { Spoc_id: req.body.Spoc_id }
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
        message: "Error updating Tutorial with id=" + id
      });
    });
};
  
exports.deleteDelegate = (req, res) => {
  if (!req.body.Company_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  } 
  var data ={
    "Delegate_active" : 0, 
  }

  delegateTb.update(data, {
    where: { Delegate_id: req.body.Delegate_id }
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
        message: "Error updating Tutorial with id=" + id
      });
    });
};
