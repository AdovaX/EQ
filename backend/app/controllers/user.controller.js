const db = require("../models");
const companyTb = db.companyTb;
const usersTb = db.user;
const contractorTb = db.contractownerTb;
const spocTb = db.spocTb;
const delegateTb = db.delegateTb;
const ChatTbs = db.ChatTbs; 
var Sequelize = require("sequelize"); 
const requirementTb = db.requirement;
const resourceTb = db.resourceTb;

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

exports.getTotalMessages =async (req, res) => { 

  await ChatTbs.count({ where: {
    Reciver_id : req.body.User_id,
    Status : 'Unseen'
  } })
    .then(data => {
      console.log("COUNT" + data);
      var c = {
        'Count' : data
      }
      res.send(c);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
exports.getChatHistory =async (req, res) => { 
uids = [];
await ChatTbs.findAll({  
     where: {
      [Op.or]: [{
        Sender_id: req.body.User_id, 
        }, 
        { 
        Reciver_id:req.body.User_id,
        }, 
] 
  }, 
  })
    .then(data => {  
      if(data.length > 0){ 
      var datas = [];
      data.forEach(element => {
        var c = {
          'Sender_id' : element.Sender_id,
          'Reciver_id' : element.Reciver_id,
          'Requirement_id' : element.Requirement_id,
          'Resource_id' : element.Resource_id,
        }
        datas.push(c);
      });  
        usersData(datas);  
      }else{
        var c = {
          'Count' : 0
        }
        res.send(c);
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });

    async function usersData(val){ 
      var uniqueRequirementIds = [];
      var uniqueUsers = [];
      var uniqueResources = [];

      val.forEach(el =>{
        if(!uniqueRequirementIds.includes(el.Requirement_id)){  
          uniqueRequirementIds.push(el.Requirement_id);  
       }
       console.log('uniqueRequirementIds'+ uniqueRequirementIds)
       if(!uniqueUsers.includes(el.Sender_id)){  
        uniqueUsers.push(el.Sender_id);  
      }
      console.log('uniqueUsers'+ uniqueUsers);
      if(!uniqueResources.includes(el.Resource_id)){  
        uniqueResources.push(el.Resource_id);  
     }
     console.log('uniqueResources'+ uniqueResources);
      })
      await usersTb.findAll({ where: {
        User_id : {
          [Op.or]: uniqueUsers
        }
      }, 
      include: 
        [{
          model: requirementTb ,
          required: true,
          where: {Requirement_id: {
            [Op.or]:uniqueRequirementIds
          } }  
        },
        {
         model: companyTb ,
         required: false
       }
      ], 
     }).then(data => {
       console.log(data)
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving tutorials."
          });
        }); 
      //res.send(val);  
    }
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

exports.msgSeen = (req, res) => { 
  var Seen = {

    "Status" : 'Seen',  
  } 
  ChatTbs.update(Seen, {
    where: { 
      Requirement_id : req.body.Requirement_id, 
      Resource_id : req.body.Resource_id, 
      Sender_id : req.body.Sender_id, 
      User_id : req.body.User_id,
    }
  })
    .then(num => {
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