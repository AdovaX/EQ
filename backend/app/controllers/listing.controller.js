const db = require("../models");
const companyTb = db.companyTb;  
const LManagerTb = db.LManagerTb;
const HManagerTb = db.HManagerTb;
const techcategoryTb = db.techcategory;
const technologyTb = db.technology;
const resourceTb = db.resourceTb;
const usersTb = db.user;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt'); 
const domainTb = db.domainTb;
const rolesTb = db.roles;
const educationTb = db.educationTb;


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
  Resource_phone: req.body.Resource_Phone,
  Resource_Password: passwordHash,
  Resource_Designation: req.body.Resource_Designation,
  Resource_summery: req.body.Resource_summery, 
  Resource_stack: req.body.Resource_stack, 
  Resource_status:req.body.Resource_status,
  Is_remote: req.body.Is_remote,
  Resource_rate: req.body.Resource_rate,
  Availability_status: req.body.Availability_status, 
  Company_id: req.body.Company_id, 
};


async function insertResource() {
  return await resourceTb.create(resourceData); 
} 



async function prepareTechnology(r_id) {

  var techologyArr = req.body.Technology_List;
  var Resource_Techs =[];
      techologyArr.forEach((tech) => {
        var  techData = {
          Technology_name : tech.Technology,
          Technology_category_id : tech.Technology_parent,
          Technology_version : tech.Technology_version,
          Technology_level : tech.Technology_level,
          Technology_experience : tech.Technology_experience, 
          Resource_id : r_id, 
        }
        Resource_Techs.push(techData);
      }); 
      return await Resource_Techs;
  } 


  async function prepareDomain(r_id) {
    var domainArr = req.body.Domain_List;
    var Resource_Domains =[];
    domainArr.forEach((domains) => {
          var  domainData = {
            Domain : domains.Domain,
            Domain_duration : domains.Domain_duration, 
            Resource_id : r_id, 
          }
          Resource_Domains.push(domainData);
        }); 
        return await Resource_Domains;
    } 

    async function prepareRole(r_id) {
    var roleArr = req.body.Role_List;
    var Resource_Roles =[];
    roleArr.forEach((role) => {
          var  roleData = {
            Role_name : role.Job_title,
            Role_duration : role.Job_duration, 
            Company_id : req.body.Company_id, 
            Resource_id : r_id, 
          }
          Resource_Roles.push(roleData);
        }); 
        return await Resource_Roles;
    } 

    async function prepareEducation(r_id) {
    var eduArr = req.body.Education_List;
    var Education_lists =[];
    eduArr.forEach((edu) => {
          var  eduData = {
            Qualification : edu.Education,
            Pass_year : edu.Pass_year,  
            Resource_id : r_id, 
          }
          Education_lists.push(eduData);
        }); 
        return await Education_lists;
    } 

 

  insertResource().then((data) =>{ 
    console.log("Resource added"); 
   return  prepareTechnology(data.Resource_id);

  })
  .then((data) =>{

    technologyTb.bulkCreate(data);
    console.log("Technology added");
    return data;  
  })
  .then((data) => {
    
    return  prepareDomain(data[0].Resource_id);
  
  })
  .then((data) =>{

    domainTb.bulkCreate(data);
    console.log("Domain added");
    return data;
  
  })
  .then((data) =>{

    return prepareRole(data[0].Resource_id);

  })
  .then((data) =>{

    rolesTb.bulkCreate(data);
    console.log("Role added");
    return data;

  })
  .then((data) =>{

    return prepareEducation(data[0].Resource_id);

  })
  .then((data) =>{

    educationTb.bulkCreate(data);
    console.log("Education added");
    return data;

  })


  var result = {
    status : "Success"
  }
   res.send(result);
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

exports.getTechnologyParents = (req, res) => {
  if (!req.body.Company_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  } 
  techcategoryTb.findAll()
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

