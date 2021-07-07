const db = require("../models");
const spocTb = db.spocTb;
const delegateTb = db.delegateTb;
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
  if (!req.body.Spoc_id) {
   res.status(400).send({
     message: "Content can not be empty!"
   });
   return;
 }  
 async function getCompanyData() {
  return await spocTb.findAll({
    where: {
      Spoc_id: req.body.Spoc_id
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



exports.updateProfile = (req, res) => {
  if (!req.body.Spoc_id) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    } 

const profileData = {
  Spoc_name: req.body.Spoc_name,
  Spoc_email: req.body.Spoc_email,
  Spoc_designation: req.body.Spoc_designation, 
  Spoc_phone: req.body.Spoc_phone 
  }; 
  console.log(profileData);

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
};
 
exports.createListingManager = async (req, res) => {
  if (!req.body.Company_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  var passwordHash = bcrypt.hashSync(req.body.LManager_password , 10);
  // Create a Tutorial
  const LData = {
    LManager_name: req.body.LManager_name,
    LManager_email: req.body.LManager_email,
    LManager_password: passwordHash,
    LManager_designation: req.body.LManager_designation,
    LManager_phone: req.body.LManager_phone,
    LManager_active: req.body.LManager_active,
    LManager_status: req.body.LManager_status, 
    Company_id: req.body.Company_id, 
  };
 
  LManagerTb.create(LData)
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


exports.getListingManagers = (req, res) => {
  if (!req.body.Company_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  LManagerTb.findAll({ where: {
    Company_id: req.body.Company_id , LManager_active:1
      },
      include: {
        model: companyTb ,
        required: true
      }, })
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
    "LManager_active" : 0, 
  }

  LManagerTb.update(data, {
    where: { LManager_id: req.body.LManager_id }
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

  var passwordHash = bcrypt.hashSync(req.body.HManager_password , 10);
  // Create a Tutorial
  const HData = {
    HManager_name: req.body.HManager_name,
    HManager_email: req.body.HManager_email,
    HManager_password: passwordHash,
    HManager_designation: req.body.HManager_designation,
    HManager_phone: req.body.HManager_phone,
    HManager_active: req.body.HManager_active,
    HManager_status: req.body.HManager_status, 
    Company_id: req.body.Company_id, 
  };
 
  HManagerTb.create(HData)
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

exports.getHiringManagers = (req, res) => {
  if (!req.body.Company_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  HManagerTb.findAll({ where: {
    Company_id: req.body.Company_id , HManager_active:1
      },
      include: {
        model: companyTb ,
        required: true
      }, })
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
    "HManager_active" : 0, 
  }

  HManagerTb.update(data, {
    where: { HManager_id: req.body.HManager_id }
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