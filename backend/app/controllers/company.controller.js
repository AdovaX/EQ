const db = require("../models");
const companyTb = db.companyTb;
const contractorTb = db.contractownerTb;
const usersTb = db.user;
const userrolesTb = db.userroles;
const BranchesTb = db.BranchesTb;
const bankdetailsTb = db.bankdetailsTb;
const GovermentTbs = db.GovermentTbs;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');

function sendMail(reciverMail){
  const myEmail = "dkdev006@gmail.com";
  const emailPass = "1532587Adova";
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: myEmail,
      pass: emailPass
    }
  });
  
  var mailOptions = {
    from: myEmail,
    to: reciverMail,
    subject: 'Greetings from ExpertQ',
    text: 'You have successfully Registred to ExpertQ.'
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response + " || " +reciverMail);
    }
  });
}





exports.create =  async(req, res) => {
  var role ="";
  var User_password ="";
  var User_email ="";
  var Roles_id =2;
  
  if (!req.body.User_email) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }  
    User_email = req.body.User_email;
    role = req.body.role;
    User_password = req.body.User_password;


    var passwordHash = bcrypt.hashSync(req.body.User_password , 10);
    const companyData = {
      C_short_name: req.body.C_short_name,
      C_full_name: req.body.C_full_name,
      Website: req.body.Website,
      No_employees: req.body.No_employees,
    }; 
    const loginData = {
      User_email: req.body.User_email,
      User_password: passwordHash,
      User_designation:  req.body.User_designation,
      User_phonenumber:req.body.User_phone
    };
 
   async function insertCompany() {
     return await  companyTb.create(companyData)
     .then(data => { 
         return data;
     })
     .catch(err => {
         return err.message ;
     });
   }

   async function insertLogin(Company_id , User_roles_id) {
    loginData.Company_id =Company_id;
    loginData.User_roles_id =User_roles_id;
     
     return await  usersTb.create(loginData)
     .then(data => { 
       sendMail(data.User_email);
       return data;
     })
     .catch(err => {
         return err.message ; 
     });
   }
  
  
   const company =  await insertCompany();
   const login =  await insertLogin(company.Company_id ,Roles_id); 

   if(login.User_id){
     var respos = {
       "status" : "Success"
     }
     res.send(company); 
   }else{
     var respos = {
       "status" : "Failed"
     }
     res.status(500).send(respos);
   } 
   };  
      


  exports.findAll = (req, res) => {
    companyTb.findAll()
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
  exports.findOne = (req, res) => {
    const Company_id = req.params.Company_id;
  
    companyTb.findByPk(Company_id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + Company_id
        });
      });
  };
  exports.update = (req, res) => {
    const Company_id = req.params.Company_id;
  
    companyTb.update(req.body, {
      where: { Company_id: Company_id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with id=${Company_id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + Company_id
        });
      });
  };
  exports.delete = async (req, res) => {
    const Company_id = req.params.Company_id;
  
    companyTb.destroy({
      where: { Company_id: Company_id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete   with id=${Company_id}. Maybe it was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete   with id=" + Company_id
        });
      });
  };
 

  exports.getRoles = (req, res) => {
    userrolesTb.findAll()
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
  exports.addBranch = (req, res) => {
    // Validate request
    if (!req.body.Company_id) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
   
    const branch = {
      Company_city: req.body.Company_city,
      Company_city_address: req.body.Company_city_address,
      Company_gmap: req.body.Company_gmap,
      Company_GSTIN: req.body.Company_GSTIN,
      Company_state: req.body.Company_state,
      Company_id: req.body.Company_id, 
      User_id: req.body.User_id, 
    };
  
    // Save Tutorial in the database
    BranchesTb.create(branch)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log(err);
        var c = {
          'status' : 'Failed'
        }
        res.send(c);
      });
  };

  exports.getBranches = (req, res) => {
    if (!req.body.Company_id) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    BranchesTb.findAll({ where: {Company_id:req.body.Company_id} })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log(err);
        var c = {
          "Status" : "Failed"
        }
        res.send(c);
      });
  };

  exports.addBank = (req, res) => {
    // Validate request
    if (!req.body.Company_id) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
   
    const bank = {
      Bank_name: req.body.Bank_name,
      Bank_branch: req.body.Bank_branch,
      Bank_accountNumber: req.body.Bank_accountNumber,
      Bank_address: req.body.Bank_address, 
      Bank_IFSC: req.body.Bank_IFSC, 
      Company_id: req.body.Company_id, 
      User_id: req.body.User_id, 
    };
  
    // Save Tutorial in the database
    bankdetailsTb.create(bank)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log(err);
        var c = {
          'status' : 'Failed'
        }
        res.send(c);
      });
  };
  exports.getBanks = (req, res) => {
    if (!req.body.Company_id) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    bankdetailsTb.findAll({ where: {Company_id:req.body.Company_id} })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log(err);
        var c = {
          "Status" : "Failed"
        }
        res.send(c);
      });
  };

  exports.updatePreferences = (req, res) => {
    if (!req.body.Company_id) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    const preferences = {
      "Enable_masking" : req.body.Enable_masking,
      "Freelancers" : req.body.Freelancers,
      "Tiers_maching" : JSON.stringify(req.body.Tiers_maching)
    }
    console.log(preferences);
  
    companyTb.update(preferences, {
      where: { Company_id: req.body.Company_id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            Status: "Success"
          });
        } else {
          res.send({
            Status: 'Falied'
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: err
        });
      });
  };

  exports.getPreferences = (req, res) => {
    if (!req.body.Company_id) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    companyTb.findOne({ where: {Company_id:req.body.Company_id} })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log(err);
        var c = {
          "Status" : "Failed"
        }
        res.send(c);
      });
  };

  exports.addGovIds = (req, res) => {
    // Validate request
    if (!req.body.Company_id) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
   
    const gov = {
      Company_TAN: req.body.Company_TAN,
      Company_CIN: req.body.Company_CIN,
      Company_PAN: req.body.Company_PAN, 
      Company_id: req.body.Company_id, 
      User_id: req.body.User_id, 
    };
  
    // Save Tutorial in the database
    GovermentTbs.create(gov)
      .then(data => { 
        res.send(data);
      })
      .catch(err => {
        console.log(err);
        var c = {
          'status' : 'Failed'
        }
        res.send(c);
      });
  };

  exports.getGovernmentData = (req, res) => {
    if (!req.body.Company_id) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    GovermentTbs.findAll({ where: {Company_id:req.body.Company_id} })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log(err);
        var c = {
          "Status" : "Failed"
        }
        res.send(c);
      });
  };
