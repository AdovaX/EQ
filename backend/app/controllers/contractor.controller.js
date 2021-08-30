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
  
const loginData = {
  User_firstname: req.body.Delegate_name, 
  User_designation: req.body.Delegate_designation,
  User_phonenumber: req.body.Delegate_phone, 
  Company_id: req.body.Company_id,  
 User_email: req.body.Delegate_email, 
 User_password: passwordHash, 
};
 
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
  usersTb.findAll({where : {Company_id:req.body.Company_id, User_status:1,User_roles_id:3},
    })
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
 
const loginData = { 
  User_firstname: req.body.Spoc_name, 
  User_designation: req.body.Spoc_designation,
  User_phonenumber: req.body.Spoc_phone, 
  Company_id: req.body.Company_id, 
 User_email: req.body.Spoc_email, 
 User_password: passwordHash, 
};
 
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
  usersTb.findAll({where : {Company_id:req.body.Company_id , User_roles_id:4 , User_status:1},
    })
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
    "User_status" : 0, 
  }

  usersTb.update(data, {
    where: { User_id: req.body.User_id }
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
    "User_status" : 0, 
  }

  usersTb.update(data, {
    where: { User_id: req.body.User_id }
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
