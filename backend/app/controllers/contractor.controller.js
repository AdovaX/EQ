const db = require("../models");
const companyTb = db.companyTb;
const usersTb = db.user;
const contractorTb = db.contractownerTb;
const spocTb = db.spocTb;
const delegateTb = db.delegateTb;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
var fs = require('fs');
const IncomingForm = require('formidable').IncomingForm; 
const AWS = require('aws-sdk');
const awsConfig= require('../../config/AWS.config');
const BUCKET_NAME =awsConfig.Bucket_Name;

const s3 = new AWS.S3({
  accessKeyId: awsConfig.Access_Key_ID,
  secretAccessKey: awsConfig.Secret_Access_Key, 
});
   
exports.updateCompany = async (req, res) => {

  var form = new IncomingForm(); 

  form.parse(req, async (err, fields, files) => {
    const uploadFile = (fileName) => { 
      const fileContent = fs.createReadStream(fileName.file.path);
      var newname = Math.floor(Math.random() * 100000)+fileName.file.name;
          
      const params = {
          Bucket: BUCKET_NAME+'/Logos',
          Key: newname,  
          Body: fileContent
      };
       
      s3.upload(params, function(err, data) {
          if (err) {
              throw err;
          }
          console.log(`Logo uploaded successfully. ${data.Location}`);

          const companyData = {
            C_short_name: fields.C_short_name,
            C_full_name: fields.C_full_name,
            Website: fields.Website,
            No_employees: fields.No_employees,
            Founded : fields.Founded,
            About : fields.About,
            Company_email : fields.Company_email,  
            Company_logo : data.Location,
       
         };
         
           companyTb.update(companyData, {
            where: { Company_id: fields.Company_id }
          }).then(num => {
              if (num == 1) {
               res.send({
                 status: true
               });
              } else {
                res.status(200).send("Updated successfully");
              }
            })
            .catch(err => {
              res.status(500).send({
                message: "Error updating Tutorial with id="
              });
            });


      });
  };
  uploadFile(files);
  });
 
   
   
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
exports.getDelegatesById = (req, res) => {
  if (!req.body.Company_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }  
  usersTb.findByPk(req.body.User_id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

exports.getSpocById = (req, res) => {
  if (!req.body.Company_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }  
  usersTb.findByPk(req.body.User_id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

exports.editDelegateData = async (req, res) => {
  if (!req.body.Company_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }  
  var editDelegate = {
    "User_firstname" : req.body.User_firstname,
    "User_email" : req.body.User_email,
    "User_designation" : req.body.User_designation,
    "User_phonenumber" : req.body.User_phonenumber, 
    "Company_id" : req.body.Company_id, 
  }
  var passwordHash = 0;
  if(req.body.User_password){
    passwordHash = bcrypt.hashSync(req.body.User_password , 10);

  }
  if(passwordHash != 0){
     
    editDelegate['User_password']=passwordHash

  } console.log(editDelegate);
  await usersTb.update(editDelegate, {
    where: { User_id: req.body.User_id , Company_id : req.body.Company_id }
  }).then(num => {
      if (num == 1) {
        res.send({
          Status: true
        });
      } else {
        res.send({
          Status: false
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};
exports.editSpocData = async (req, res) => {
  if (!req.body.Company_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }  
  var editSpoc = {
    "User_firstname" : req.body.User_firstname,
    "User_email" : req.body.User_email,
    "User_designation" : req.body.User_designation,
    "User_phonenumber" : req.body.User_phonenumber, 
    "Company_id" : req.body.Company_id, 
  }
  var passwordHash = 0;
  if(req.body.User_password){
    passwordHash = bcrypt.hashSync(req.body.User_password , 10);

  }
  if(passwordHash != 0){
     
    editSpoc['User_password']=passwordHash

  } console.log(editSpoc);
  await usersTb.update(editSpoc, {
    where: { User_id: req.body.User_id , Company_id : req.body.Company_id }
  }).then(num => {
      if (num == 1) {
        res.send({
          Status: true
        });
      } else {
        res.send({
          Status: false
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};