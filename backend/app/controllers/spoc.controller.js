const db = require("../models");
const spocTb = db.spocTb;
const delegateTb = db.delegateTb;
const usersTb = db.user;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const companyTb = db.companyTb;
const LManagerTb = db.LManagerTb;
const HManagerTb = db.HManagerTb;



exports.checkManagerType =  async(req, res) => {
  if (!req.body.email) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }  
 async function isSpoc(email) {
  return await spocTb.findOne({ where: {Spoc_email : email},
    include: {
      model: companyTb ,
      required: true
    }, }).then(data => {
        if (data.Spoc_email === email && bcrypt.compareSync(req.body.password, data.Spoc_password)) {
          var id = data.Spoc_id;
          id = id.toString();
          var auth = {
            "status": "SPOC",
            "Spoc_id" : id
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
async function isDelegate(email) {
  return await delegateTb.findOne({ where: {Delegate_email : email},
    include: {
      model: companyTb ,
      required: true
    } }).then(data => {
        if (data.Delegate_email === email && bcrypt.compareSync(req.body.password, data.Delegate_password)) {
          var id = data.Delegate_id;
          id = id.toString();
          var auth = {
            "status": "DELEGATE",
            "Delegate_id" : id
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

const spocFlag =  await isSpoc(req.body.email);
const delegateFlag =await isDelegate(req.body.email);

if(!spocFlag && !delegateFlag){ 
  var result = {
    status : 'FALSE'
  }  
  res.status(401).send(result); 
   }else if(spocFlag[0] ){ 
     res.status(200).send(spocFlag);
     return true;
   }else if(delegateFlag[0]){
    res.status(200).send(delegateFlag);
    return true;
   }
   else{ 
    res.status(401).send("Contact Admin - Not Working\n");
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
      model: spocTb ,
      include: {
        model: companyTb ,
        required: true
      }
    },

  });   
} 
const myCompanyData =  await getCompanyData(); 
     res.status(200).send(myCompanyData);
      
};  



exports.updateProfile = async (req, res) => {
  if (!req.body.Spoc_id) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    } 

const profileData = {
  Spoc_name: req.body.Spoc_name,
  Spoc_email: req.body.User_email,
  Spoc_designation: req.body.Spoc_designation, 
  Spoc_phone: req.body.Spoc_phone 
  }; 
  const userData ={ 
    User_email: req.body.User_email,  
    }

  async function updateSpoc() {
  spocTb.update(profileData, {
    where: { Spoc_id: req.body.Spoc_id }
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
    const isUpdatedSpoc= await updateSpoc();
    const isSpocMailUpdated =await userMailUpdate();

    if(isUpdatedSpoc == true && isSpocMailUpdated == true){
      return true;

    }else{
      return false;
    }

};
 
exports.createListingManager = async (req, res) => {
  if (!req.body.Company_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  var Company_id = req.body.Company_id; 
  var passwordHash = bcrypt.hashSync(req.body.User_password , 10);
  var User_roles_id =5;
   
  
 

  const loginData = { 
    User_email: req.body.User_email, 
    User_password: passwordHash, 
    User_firstname: req.body.LManager_name,
    User_designation: req.body.LManager_designation,
    User_phonenumber: req.body.LManager_phone, 
    Company_id: req.body.Company_id, 
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


exports.getListingManagers = (req, res) => {
  if (!req.body.Company_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  usersTb.findAll({ where: {
    Company_id: req.body.Company_id ,  User_roles_id:5 , User_status:1
      } , })
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


exports.LMDeletion = (req, res) => {
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
        message: "Error updating  with id"
      });
    });
};


exports.createHiringManager = async (req, res) => {
  if (!req.body.Company_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  var Company_id = req.body.Company_id; 
  var passwordHash = bcrypt.hashSync(req.body.User_password , 10);
  var User_roles_id =6; 
   

  const loginData = { 
    User_firstname: req.body.HManager_name, 
    User_designation: req.body.HManager_designation,
    User_phonenumber: req.body.HManager_phone,
    User_email: req.body.User_email, 
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

exports.getHiringManagers = (req, res) => {
  if (!req.body.Company_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  usersTb.findAll({ where: {
    Company_id: req.body.Company_id , User_roles_id:6 , User_status:1
      },  })
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


exports.HMDeletion = (req, res) => {
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
      console.log(err);
      res.status(500).send({
        message: "Error updating  with id"
      });
    });
};