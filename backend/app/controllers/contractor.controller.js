const db = require("../models");
const companyTb = db.companyTb;
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
              return true;
           } else {
              return false;
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
  Contractor_email: req.body.Contractor_email, 
  Contract_designation: req.body.Contract_designation,
  Contract_phone : req.body.Contractor_phone
  }; 
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
           res.status(500).send({
             message: "Error updating"
           });
         });
   }
   const isUpdated =  await updateContractorProfile();
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
  if (!req.body.Contractor_id) {
   res.status(400).send({
     message: "Content can not be empty!"
   });
   return;
 }  
 async function getCompanyData() {
  return await contractorTb.findAll({
    where: {
      Contractor_id: req.body.Contractor_id
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

exports.CreateDelegate= async (req, res) => {
  if (!req.body.Company_id) {
   res.status(400).send({
     message: "Content can not be empty!"
   });
   return;
 }  
 var passwordHash = bcrypt.hashSync(req.body.Delegate_password , 10);

 const delegateData = {
  Delegate_name: req.body.Delegate_name,
  Delegate_email: req.body.Delegate_email,
  Delegate_designation: req.body.Delegate_designation,
  Delegate_phone: req.body.Delegate_phone,
  Delegate_password: passwordHash,
  Company_id: req.body.Company_id,
  Delegate_status: req.body.Delegate_status 
};
 
  delegateTb.create(delegateData)
  .then(data => {  
  // var respos = {
  //   "status" : "Success"
  // }
  res.status(200).send(data); 
       
  })
  .catch(err => {
      return err.message ;
  });
 
 
};  

exports.getDelegates = async (req, res) => { 
  if (!req.body.Company_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }  
  delegateTb.findAll({where : {Company_id:req.body.Company_id, Delegate_active:1}})
    .then(data => {
      res.status(200).send(data); 

    })
    .catch(err => {
      res.send(err);

    });

};
  

 

exports.CreateSpoc= async (req, res) => {
  if (!req.body.Company_id) {
   res.status(400).send({
     message: "Content can not be empty!"
   });
   return;
 }  
 var passwordHash = bcrypt.hashSync(req.body.Spoc_password , 10);

 const spocData = {
  Spoc_name: req.body.Spoc_name,
  Spoc_email: req.body.Spoc_email,
  Spoc_designation: req.body.Spoc_designation,
  Spoc_phone: req.body.Spoc_phone,
  Spoc_password: passwordHash,
  Company_id: req.body.Company_id,
  Spoc_status: req.body.Spoc_status 
};
 
spocTb.create(spocData)
  .then(data => {  
  // var respos = {
  //   "status" : "Success"
  // }
  res.status(200).send(data); 
       
  })
  .catch(err => {
      return err.message ;
  });
 
 
};  

exports.getSpocs = async (req, res) => { 
  if (!req.body.Company_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }  
  spocTb.findAll({where : {Company_id:req.body.Company_id , Spoc_active :1}})
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
