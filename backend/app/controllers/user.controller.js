const db = require("../models");
const companyTb = db.companyTb;
const usersTb = db.user;
const contractorTb = db.contractownerTb;
const spocTb = db.spocTb;
const delegateTb = db.delegateTb;
const ChatTbs = db.ChatTbs; 
var Sequelize = require("sequelize"); 

const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const IncomingForm = require('formidable').IncomingForm; 
var fs = require('fs');
const path = require('path') 
const AWS = require('aws-sdk');
const awsConfig= require('../../config/AWS.config');
const BUCKET_NAME =awsConfig.Bucket_Name;

const s3 = new AWS.S3({
  accessKeyId: awsConfig.Access_Key_ID,
  secretAccessKey: awsConfig.Secret_Access_Key, 
});


exports.updateUserProfile= async (req, res) => {
    if (!req.body.Company_id) {
     res.status(400).send({
       message: "Content can not be empty!"
     });
     return;
   } 
   
   const userData = {
    User_firstname: req.body.User_firstname,
    User_secondname: req.body.User_secondname,
    User_designation: req.body.User_designation,
    User_phonenumber : req.body.User_phone,
    User_phonenumber2 : req.body.User_phone2,
    User_email : req.body.User_email,
    }; 
    console.log("Profile update function");
    console.log(userData);
        await usersTb.update(userData, {
          where: { User_id: req.body.User_id }
        }).then(num => {
            if (num == 1) {
              console.log("Profile updated");
              var result = {
                "status" : "Success"
              }
              res.status(200).send(JSON.stringify(result));
            } else {
              var result = {
                "status" : "Failed"
              }
              res.status(200).send(JSON.stringify(result));
            }
          })
          .catch(err => {
            var errorMsg = {
              error : 0
            }
            //res.status(500).send(errorMsg);
            return false;
          });
      
       
  };  

exports.getProfile= async (req, res) => {
  if (!req.body.User_id) {
   res.status(400).send({
     message: "Content can not be empty!"
   });
   return;
 }  
 

 await usersTb.findOne({
    where: {
      User_id: req.body.User_id
    },
    include: {
      model: companyTb ,
      include: {
        model: usersTb ,
        required: true
      }
    }, 
  }).then(data =>{
   
    console.log(data.Profile_photo);
    res.status(200).send(data);
  }).catch(err => {
    res.status(200).send(err);
  });    
};  

exports.profilePhotoUpdate = async (req, res) => {  

  var form = new IncomingForm();   
  await profilePicS3Upload();

  async function profilePicS3Upload(){

    form.parse(req, async (err, fields, files) => {
      const uploadFile = (fileName) => { 
        const fileContent = fs.createReadStream(fileName.file.path);
        var newname = Math.floor(Math.random() * 100000)+fileName.file.name;
            
        const params = {
            Bucket: BUCKET_NAME+'/Profile_Photos',
            Key: newname,  
            Body: fileContent
        };
         
        s3.upload(params, function(err, data) {
            if (err) {
                throw err;
            }
            console.log(`Profile Photos successfully. ${data.Location}`);
            console.log(data);
            var profilePhoto = {
              "Profile_photo" : data.Location  
            };
              usersTb.update(profilePhoto, {
              where: { User_id: fields.User_id }
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

        });
    };
    uploadFile(files);
    });


  }
  
};


exports.sendMsg= async (req, res) => {
  if (!req.body.User_id) {
   res.status(400).send({
     message: "Content can not be empty!"
   });
   return;
 }  
 var msgs = {
  "Sender_id" : req.body.User_id,
  "Reciver_id" : req.body.LManager_id,
  "Message" : req.body.Message,
  "Requirement_id" : req.body.Requirement_id,
  "Resource_id" : req.body.Resource_id,
 }
  
 await ChatTbs.create(msgs)
 .then(data => {
   res.send(data);
 })
 .catch(err => {
   res.status(500).send({
     message:
       err.message || "Some error occurred while creating the Tutorial."
   });
 });  
};  

exports.getMsg= async (req, res) => {
  if (!req.body.User_id) {
   res.status(400).send({
     message: "Content can not be empty!"
   });
   return;
 }    
await ChatTbs.findAll({ where: 
  {
    [Op.or]: [{
                Sender_id: req.body.User_id,
                Reciver_id:req.body.LManager_id,
                Requirement_id:req.body.Requirement_id,
                Resource_id:req.body.Resource_id, 
                }, 
                {
                Sender_id: req.body.LManager_id, 
                Requirement_id:req.body.Requirement_id,
                Resource_id:req.body.Resource_id,
                Reciver_id:req.body.User_id,
                }, 
    ] 
}  
}).then(data => { 
   res.send(data);
 })
 .catch(err => {
   console.log(err);
   res.status(500).send({
     message:
       err.message || "Some error occurred while creating the Tutorial."
   });
 });  
};  

exports.getTotalMessages = (req, res) => { 

  ChatTbs.findAll({ where: {
    Reciver_id : req.body.User_id
  } })
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
exports.getChatHistory = (req, res) => { 

  ChatTbs.findAll({
    attributes: ['Sender_id'],
    group: ['Sender_id'], 
     where: {
    Reciver_id : req.body.User_id
  },
  include: {
    model: usersTb ,
    required: false,
    where: {
      User_id: {[Op.col]: 'ChatTbs.Sender_id'}
    } ,
    include: {
      model: companyTb ,
      required: false,
    }
  }  })
    .then(data => {
      data.map(data => data.Sender_id)
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

exports.getSingleChat = (req, res) => { 
 
  ChatTbs.findAll({ where:  {
    [Op.or]: [{
                Sender_id: req.body.Sender_id,
                Reciver_id:req.body.User_id, 
                }, 
                {
                Sender_id: req.body.User_id,  
                Reciver_id:req.body.Sender_id, 
                }, 
    ] 
}  ,
  include: {
    model: usersTb ,
    required: false,
  }})
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