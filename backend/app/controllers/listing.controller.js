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
const resourceRoleTbs = db.resourceRoleTbs;
const resourceDomainTbs = db.resourceDomainTbs;
const resourceTechnologyTbs = db.resourceTechnologyTbs;
const resourceEducationTbs = db.resourceEducationTbs;
const stream_educationTbs = db.stream_educationTbs;
const mtech_Tbs = db.mtech_Tbs;
const assignTb = db.assignTb; 
const requirementTb = db.requirement;
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
  var Resource_id_db="";
  
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
    Resource_salutation: fields.Resource_salutation,
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
    Available_from: fields.Available_from, 
    Resource_currency: fields.Resource_currency, 
    Available_to: fields.Available_to, 
    Company_id: fields.Company_id, 
    Resource_resume:newpath,
    Intro_video :newvideoPath,
    Created_by :fields.Created_by,
    Resource_location :fields.Resource_location,
  };
  console.log(resourceData);
  return await resourceTb.create(resourceData).then(data => {
    Resource_id_db = data.Resource_id;
    return data;
  }).catch(err =>{
    console.log(err); 
  }); 
} 



async function prepareTechnology(r_id) {

  var techologyArr = fields.Technology_List;
  var Resource_Techs =[];
  console.log(JSON.parse(techologyArr)); 
  for(var tech of JSON.parse(techologyArr)) { 
    var  techData = {
      RTechnology_name : tech.Technology, 
      RTechnology_version : tech.Technology_version,
      RTechnology_level : tech.Technology_level,
      RTechnology_duration : tech.Technology_experience, 
      Resource_id : r_id, 
    }
    Resource_Techs.push(techData);
 }
 return await Resource_Techs;
  } 


  async function prepareDomain(r_id) {
    var domainArr = fields.Domain_List;
    var Resource_Domains =[];
    console.log(JSON.parse(domainArr)); 

  for(var domains of JSON.parse(domainArr)) { 
    var  domainData = {
      RDomain : domains.Domain,
      RDomain_duration : domains.Domain_duration, 
      Resource_id : r_id, 
    }
    Resource_Domains.push(domainData);
  } 
  return await Resource_Domains;
    } 

    async function prepareRole(r_id) {
    var roleArr = fields.Role_List;
    var Resource_Roles =[];
    console.log(JSON.parse(roleArr)); 

  for(var role of JSON.parse(roleArr)) { 
    var  roleData = {
      RRole_name : role.Job_title,
      RRole_duration : role.Job_duration, 
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
    console.log(JSON.parse(eduArr)); 
    
    for(var edu of JSON.parse(eduArr)) { 
      var  eduData = {
        REducation : edu.Education,
        REducation_passyear : edu.Pass_year,  
        Resource_id : r_id, 
      }
      Education_lists.push(eduData);

    } 
  return await Education_lists;
    } 
 

  insertResource().then((data) =>{ 
    console.log("Resource added"); 
    console.log(data);
   return  prepareTechnology(Resource_id_db);

  })
  .then((data) =>{

    resourceTechnologyTbs.bulkCreate(data);
    console.log("Technology added");
    return data;  
  })
  .then((data) => {
    
    return  prepareDomain(Resource_id_db);
  
  })
  .then((data) =>{

    resourceDomainTbs.bulkCreate(data);
    console.log("Domain added");
    return data;
  
  })
  .then((data) =>{

    return prepareRole(Resource_id_db);

  })
  .then((data) =>{

    resourceRoleTbs.bulkCreate(data);
    console.log("Role added");
    return data;

  })
  .then((data) =>{
 
    return prepareEducation(Resource_id_db);

  })
  .then((data) =>{
    var result ="";
    resourceEducationTbs.bulkCreate(data);
    console.log("Education added"); 
   result = {
    status : "Success"
  }
   res.send(result);

  }).catch((err) =>{
    console.log(err);

   result = {
    status : "Failed"
  }
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

  domainTb.findAll({
    order:[
      ['Domain','ASC']
    ]
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

exports.getJobRoleLists = (req, res) => {
  if (!req.body.Company_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  rolesTb.findAll({
    order : [
      ['Role_name','ASC']
    ]
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
exports.getTechnologyLists = (req, res) => {
  if (!req.body.Company_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  } 
  techcategoryTb.findAll({
    include: {
      model: technologyTb ,
      required: true
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
exports.getEducationLists = (req, res) => {
  if (!req.body.Company_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  } 
  educationTb.findAll({
    order:[
      ['Qualification','ASC']
    ]
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
exports.getEduStreams = (req, res) => {
  if (!req.body.Company_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  } 
  console.log(req.body.Stream_category+"popop");
  stream_educationTbs.findAll({
    where:{
      Stream_category:req.body.Stream_category
    }
  },{
    order:[
      ['Stream_name','ASC']
    ]
  },)
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
exports.getEduMtech = (req, res) => {
  if (!req.body.Company_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  } 
  mtech_Tbs.findAll({
    order:[
      ['Mtech_name','ASC']
    ]
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

exports.toogleActive = (req, res) => { 
  let data = {
    Resource_active : req.body.Resource_active
  } 
  resourceTb.update(data, {
    where: { Resource_id: req.body.Resource_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Success"
        });
      } else {
        res.send({
          message: 'Failed'
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};
exports.updateFrom = (req, res) => { 
  let data = {
    Available_from : req.body.Available_from
  } 
  console.log(data);
  resourceTb.update(data, {
    where: { Resource_id: req.body.Resource_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Success"
        });
      } else {
        res.send({
          message: 'Failed'
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};
exports.updateTo = (req, res) => { 
  let data = {
    Available_to : req.body.Available_to
  } 
  resourceTb.update(data, {
    where: { Resource_id: req.body.Resource_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Success"
        });
      } else {
        res.send({
          message: 'Failed'
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

exports.getResourceData = (req, res) => {
  if (!req.body.Company_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  } 
  resourceTb.findOne({
     where:{
       Resource_id : req.body.Resource_id,
       Company_id : req.body.Company_id 
     },
       
    include: [{
    model: resourceTechnologyTbs,   
    required: false, 
    },{
    model: resourceEducationTbs, 
    required: false, 
    } ,{
    model: resourceDomainTbs, 
    required: false, 
    },{
    model: resourceRoleTbs, 
    required: false, 
    } 
  ],
    required: false,
     
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

exports.profilePhotoChange = async(req, res) => { 

  var form = new IncomingForm();  
  var newpath ="";
  form.on('file', (field, files) => {
    console.log("in");
    console.log(files);
    if (!files.path) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    } 
    var oldpath = files.path;
    newpath = './uploads/' + Math.floor(Math.random() * 100000) +files.name;
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
      console.log("Profile Photo updated");  
    });  

  }); 
  form.parse(req, (err, fields, files) => {
console.log(files);
  var proData = {
    "Resource_photo":newpath.substring(1)
  } 
  resourceTb.update(proData, {
    where: { Resource_id: fields.Resource_id }
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
        message: "Error updating   with id=" + id
      });
    });
  });
};


exports.editResource= async (req, res) => {

  var form = new IncomingForm(); 
  var newpath ="";
  var newvideoPath ="";
   
  form.on('file', (field, files) => {
    console.log("in");
    console.log(files);

    var oldpath = files.path;
    newpath = './uploads/' + Math.floor(Math.random() * 100000) +files.name;
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
      console.log("Resume updated");  
    });  

  }); 
  
    

  form.parse(req, (err, fields, files) => {
  
    if (!fields.Company_id) {
     res.status(400).send({
       message: "Content can not be empty!"
     });
     return;
   }  
   var passwordHash = 0;
   if(fields.Resource_password){
     passwordHash = bcrypt.hashSync(fields.Resource_password , 10);

   }
 


async function insertResource() {
 
  
  const resourceData = {
    Resource_name: fields.Resource_name,
    Resource_Experience: fields.Resource_Experience,
    Resource_Email: fields.Resource_Email,
    Resource_phone: fields.Resource_Phone,
    Resource_Designation: fields.Resource_Designation,
    Resource_summery: fields.Resource_summery, 
    Resource_stack: fields.Resource_stack, 
    Resource_status:fields.Resource_status,
    Is_remote: fields.Is_remote,
    Resource_rate: fields.Resource_rate,
    Availability_status: fields.Availability_status, 
    Available_from: fields.Available_from, 
    Available_to: fields.Available_to, 
    Company_id: fields.Company_id, 
    Resource_resume:newpath.substring(1),
    Intro_video :newvideoPath
  };
  if(passwordHash != 0){
     
    resourceData['Resource_Password']=passwordHash

  } 
  console.log(resourceData);
  return await resourceTb.update(resourceData,{
    where: { Resource_id: fields.Resource_id }
  }); 
} 



async function prepareTechnology(r_id) {
  await resourceTechnologyTbs.destroy({
    where : {
      Resource_id : fields.Resource_id
    }
  });
  var techologyArr = fields.Technology_List;
  var Resource_Techs =[];
  console.log(JSON.parse(techologyArr)); 
  for(var tech of JSON.parse(techologyArr)) { 
    var  techData = {
      RTechnology_name : tech.Technology, 
      RTechnology_version : tech.Technology_version,
      RTechnology_level : tech.Technology_level,
      RTechnology_duration : tech.Technology_experience, 
      Resource_id : r_id, 
    }
    Resource_Techs.push(techData);
 }
 return await Resource_Techs;
  } 


  async function prepareDomain(r_id) {
    await resourceDomainTbs.destroy({
      where : {
        Resource_id : fields.Resource_id
      }
    });
    var domainArr = fields.Domain_List;
    var Resource_Domains =[];
    console.log(JSON.parse(domainArr)); 

  for(var domains of JSON.parse(domainArr)) { 
    var  domainData = {
      RDomain : domains.Domain,
      RDomain_duration : domains.Domain_duration, 
      Resource_id : r_id, 
    }
    Resource_Domains.push(domainData);
  } 
  return await Resource_Domains;
    } 

    async function prepareRole(r_id) {
      await resourceRoleTbs.destroy({
        where : {
          Resource_id : fields.Resource_id
        }
      });
    var roleArr = fields.Role_List;
    var Resource_Roles =[];
    console.log(JSON.parse(roleArr)); 

  for(var role of JSON.parse(roleArr)) { 
    var  roleData = {
      RRole_name : role.Job_title,
      RRole_duration : role.Job_duration, 
      Company_id : fields.Company_id, 
      Resource_id : r_id, 
    }
    Resource_Roles.push(roleData);

  }  
  return await Resource_Roles;
    } 

    async function prepareEducation(r_id) {
      await resourceEducationTbs.destroy({
        where : {
          Resource_id : fields.Resource_id
        }
      });
    var eduArr = fields.Education_List;
    var Education_lists =[];
    console.log(JSON.parse(eduArr)); 
    
    for(var edu of JSON.parse(eduArr)) { 
      var  eduData = {
        REducation : edu.Education,
        REducation_passyear : edu.Pass_year,  
        Resource_id : r_id, 
      }
      Education_lists.push(eduData);

    } 
  return await Education_lists;
    } 
 

  insertResource().then((data) =>{ 
    console.log("Resource added"); 
   return  prepareTechnology(fields.Resource_id);

  })
  .then((data) =>{

    resourceTechnologyTbs.bulkCreate(data);
    console.log("Technology added");
    return data;  
  })
  .then((data) => {
    
    return  prepareDomain(fields.Resource_id);
  
  })
  .then((data) =>{

    resourceDomainTbs.bulkCreate(data);
    console.log("Domain added");
    return data;
  
  })
  .then((data) =>{

    return prepareRole(fields.Resource_id);

  })
  .then((data) =>{

    resourceRoleTbs.bulkCreate(data);
    console.log("Role added");
    return data;

  })
  .then((data) =>{
 
    return prepareEducation(fields.Resource_id);

  })
  .then((data) =>{
    resourceEducationTbs.bulkCreate(data);
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

  exports.resourceListing = async (req, res) => {
    
    let profilecount = 0;
    let completed = 0;
    await resourceTb.findAll({ where: {
      Company_id : req.body.Company_id, 
    } }) 
      .then(data =>{    
      let ResourceData =[];  

      data.forEach(element => { 
        profilecount = Object.keys(element['dataValues']).length;
        completed =0;
          for (var colName in element['dataValues']) { 
        if(element[colName]){
          completed++; 
        }
    }  
    completed = (completed/profilecount) * 100;

        var c = {
          "Resource_id" : element.Resource_id,
          "Company_id" : element.Company_id,
          "Resource_name" : element.Resource_name,
          "Resource_Experience" : element.Resource_Experience,
          "Resource_Email" : element.Resource_Email,
          "Resource_phone" : element.Resource_phone,
          "Resource_Designation" : element.Resource_Designation,
          "Resource_summery" : element.Resource_summery,
          "Resource_masked" : element.Resource_masked,
          "Resource_active" : element.Resource_active,
          "Resource_stack" : element.Resource_stack,
          "Resource_status" : element.Resource_status,
          "Is_remote" : element.Is_remote,
          "Resource_rate" : element.Resource_rate,
          "Available_from" : element.Available_from,
          "Available_to" : element.Available_to,
          "Availability_status" : element.Availability_status,
          "Resource_resume" : element.Resource_resume,
          "Resource_photo" : element.Resource_photo,
          "Intro_video" : element.Intro_video,
          "createdAt" : element.createdAt,
          "updatedAt" : element.updatedAt,
          "completed" : completed
        }
        ResourceData.push(c); 
      }); 
        res.send(ResourceData);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };


  exports.resourceRequests = (req, res) => {
    if (!req.body.Company_id) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    } 
  
    assignTb.findAll({ where:{Approved_status:'Pending'}, 
      include:[{
      model:resourceTb,
      required:true,
      where:{
        Created_by:req.body.Created_by, 
      }
    },
   {
     model:requirementTb,
     required:true,
     include: {
       model: companyTb ,
       required: true
     }
   }]  })
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

  exports.approveResources = async (req, res) => {
    
    var approveData = {
      "Approved_status" : 'Approved',
      "Approved_by" :req.body.Approved_by
    }
  console.log(req.body);
    assignTb.update(approveData, {
      where: { 
        Resource_id : req.body.Resource_id,Requirement_id:req.body.Requirement_id
       }
    }).then(num => {
      console.log(num);
        if (num) {
          updateResourceStatus();
        } else {
          res.send({
            Status: false
          });
        }
      }).catch(err => {
        console.log(err);
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
      async function updateResourceStatus(){
        var resourceStat={
          "Resource_status":'SELECTED'
        }

        resourceTb.update(resourceStat, {
          where: { 
            Resource_id : req.body.Resource_id
           }
        }).then(num => {
          console.log(num);
            if (num) {
              res.send({
                Status: true
              });
            } else {
              res.send({
                Status: false
              });
            }
          }).catch(err => {
            console.log(err);
            res.status(500).send({
              message: "Error updating Tutorial with id=" + id
            });
          });


      }
  };

  exports.listofApprovedResources = (req, res) => { 
  
    assignTb.findAll({ where: {Approved_status:'Approved' , Approved_by:req.body.Approved_by},
  include:[
    {model:resourceTb,
    required:true
  },
  {
    model:requirementTb,
    required:true,
    include: {
      model: companyTb ,
      required: true
    }
  }
  ] })
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