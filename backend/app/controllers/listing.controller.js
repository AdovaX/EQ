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
const resourceRoleTbs = db.resourceRoleTbs;
const rolesTb = db.roles;
const educationTb = db.educationTb;
const resourceDomainTbs = db.resourceDomainTbs;
var fs = require('fs');
const IncomingForm = require('formidable').IncomingForm;


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

  var form = new IncomingForm(); 
  var newpath ="";
  var newvideoPath ="";
  
  form.on('video', (field, files) => {
    console.log("in:video");

    var oldvideoPath = files.path;
    newvideoPath = './uploads/' + Math.floor(Math.random() * 200000) +files.name;
    fs.rename(oldvideoPath, newvideoPath, function (err) {
      if (err) throw err;
      console.log("Video uploaded");  
    });  

  }); 
  form.on('file', (field, files) => {
    console.log("in");
    console.log(files);

    var oldpath = files.path;
    newpath = './uploads/' + Math.floor(Math.random() * 100000) +files.name;
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
      console.log("Resume uploaded");  
    });  

  }); 
  
    

  form.parse(req, (err, fields, files) => {
  
    if (!fields.Company_id) {
     res.status(400).send({
       message: "Content can not be empty!"
     });
     return;
   }  
 var passwordHash = bcrypt.hashSync(fields.Resource_password , 10);
 


async function insertResource() {
 

  const resourceData = {
    Resource_name: fields.Resource_name,
    Resource_Experience: fields.Resource_Experience,
    Resource_Email: fields.Resource_Email,
    Resource_phone: fields.Resource_Phone,
    Resource_Password: passwordHash,
    Resource_Designation: fields.Resource_Designation,
    Resource_summery: fields.Resource_summery, 
    Resource_stack: fields.Resource_stack, 
    Resource_status:fields.Resource_status,
    Is_remote: fields.Is_remote,
    Resource_rate: fields.Resource_rate,
    Availability_status: fields.Availability_status, 
    Company_id: fields.Company_id, 
    Resource_resume:newpath,
    Intro_video :newvideoPath
  };
  return await resourceTb.create(resourceData); 
} 



async function prepareTechnology(r_id) {

  var techologyArr = fields.Technology_List;
  var Resource_Techs =[];
  //console.log(JSON.parse(techologyArr)); 
  for(var tech of JSON.parse(techologyArr)) { 
    var  techData = {
      Technology_name : tech.Technology,
      Technology_category_id : tech.Technology_parent,
      Technology_version : tech.Technology_version,
      Technology_level : tech.Technology_level,
      Technology_experience : tech.Technology_experience, 
      Resource_id : r_id, 
    }
    Resource_Techs.push(techData);
 }
 return await Resource_Techs;
  } 


  async function prepareDomain(r_id) {
    var domainArr = fields.Domain_List;
    var Resource_Domains =[];

  for(var domains of JSON.parse(domainArr)) { 
    var  domainData = {
      Domain : domains.Domain,
      Domain_duration : domains.Domain_duration, 
      Resource_id : r_id, 
    }
    Resource_Domains.push(domainData);
  } 
  return await Resource_Domains;
    } 

    async function prepareRole(r_id) {
    var roleArr = fields.Role_List;
    var Resource_Roles =[];

  for(var role of JSON.parse(roleArr)) { 
    var  roleData = {
      Role_name : role.Job_title,
      Role_duration : role.Job_duration, 
      Company_id : fields.Company_id, 
      Resource_id : r_id, 
    }
    Resource_Roles.push(roleData);

  }  
  return await Resource_Roles;
    } 

    async function prepareEducation(r_id) {
    var eduArr = fields.Education_List;
    var Education_lists =[];
    for(var edu of JSON.parse(eduArr)) { 
      var  eduData = {
        Qualification : edu.Education,
        Pass_year : edu.Pass_year,  
        Resource_id : r_id, 
      }
      Education_lists.push(eduData);

    } 
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

    resourceDomainTbs.bulkCreate(data);
    console.log("Domain added");
    return data;
  
  })
  .then((data) =>{

    return prepareRole(data[0].Resource_id);

  })
  .then((data) =>{

    resourceRoleTbs.bulkCreate(data);
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

  }).catch((err) =>{
    console.log(err);
  });


  var result = {
    status : "Success"
  }
   res.send(result);
  });
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
  technologyTb.findAll({
    where : {
      Technology_category_id:0
    }
  })
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


exports.introVideo = (req, res) => {

  var form = new IncomingForm(); 
  console.log("called from video upload"); 
  var Resource_id = 0;

  form.parse(req, (err, fields, files) => {
    console.log(fields.Resource_id); 
    Resource_id = fields.Resource_id;
  })

  form.on('file', (field, files) => {
    console.log("in");
    

    var oldpath = files.path;
    var newpath = './uploads/' + Math.floor(Math.random() * 100000) +files.name;
    var vFile = {
      "Intro_video" : newpath
    }
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
      console.log("Intro video uploaded");
      resourceTb.update(vFile, {
        where: { Resource_id: Resource_id }
      }).then(num => {
          if (num == 1) {
            res.send({
              status: true
            });
          } 
        })
        .catch(err => {
          console.log(err);
        });

    }); 


  }) 
  form.parse(req)
};
 

exports.getDomainLists = (req, res) => {
  if (!req.body.Company_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  domainTb.findAll()
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

exports.getJobRoleLists = (req, res) => {
  if (!req.body.Company_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  rolesTb.findAll()
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

exports.getTechnologyByParent = (req, res) => {
  if (!req.body.Company_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  technologyTb.findAll({
    where : {
      Technology_category_id :req.body.Technology_category_id
    }
  })
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