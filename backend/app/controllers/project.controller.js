const db = require("../models");
const companyTb = db.companyTb;   
const domainTb = db.domainTb;
const educationTb = db.educationTb;
const resourceTb = db.resourceTb;
const requirementTb = db.requirement;
const projectTb = db.project;
const technologyTb = db.technology;
const rolesTb = db.roles;
const usersTb = db.user;
const Op = db.Sequelize.Op; 
const SelectedDomainsTb = db.SelectedDomains;
const SelectedQualificationsTb = db.SelectedQualifications;
const SelectedTechTb = db.SelectedTech;
const techcategoryTb = db.techcategory;
const selectedRolesTb = db.SelectedRoles;
const resourceRoleTbs = db.resourceRoleTbs;
const resourceDomainTbs = db.resourceDomainTbs;
const resourceTechnologyTbs = db.resourceTechnologyTbs;
const resourceEducationTbs = db.resourceEducationTbs;
const BookmarkTbs = db.BookmarkTbs;
const interviewTb = db.interviewTb;
const userrolesTb = db.userroles;
const assignTb = db.assignTb;
const TimesheetTbs = db.TimesheetTbs;
var Sequelize = require("sequelize"); 
var nodemailer = require('nodemailer'); 

const moment = require('moment');
moment.suppressDeprecationWarnings = true;


exports.getDomains = (req, res) => { 
    domainTb.findAll()
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
  
exports.getTechnology = async (req, res) => { 
  var sql = " select distinct tech.Technology_name ,tech.Technology_version , cat.Technology_category from TechnologyCategoryTbs cat inner join TechnologyTbs tech on tech.Technology_category_id = cat.Technology_category_id"
  db.sequelize.query(sql).then(data => {
let uniqueCategory =[]; 
for(var item of data[0]){ 
  var cat = item.Technology_category;
  if(uniqueCategory.indexOf(cat) === -1) {
     uniqueCategory.push(cat); 
  } 
  } 
  let t1=[];
  let t2=[];
  for(var cat of uniqueCategory){ 
     
    for(var tech of data[0]){ 
      if(cat == tech.Technology_category){
        var d = {
          "Technologys" : tech.Technology_name,
          "Technology_version" : tech.Technology_version
        }
         t2.push(d);
      }
    }
    var c = {
      "Technology_category" : cat,
      "Technologies" : t2
    }
    t2 =[];
    t1.push(c);
    c=[]
  }
     res.send(t1);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };
  
  exports.getEducation = (req, res) => { 
      educationTb.findAll(
        {attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('Qualification')), 'Qualification'],
      ],})
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
  
    exports.getRoles = (req, res) => { 
        rolesTb.findAll(
          {attributes: [
          [Sequelize.fn('DISTINCT', Sequelize.col('Role_name')), 'Role_name'],
        ],})
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
  


  exports.createAssignment = async (req, res) => {
    if (!req.body.Requirement_name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    const User_id = req.body.User_id;
    const project_id = req.body.ProjectId;
   
    const requirementData =  
      {
        "Company_id" : req.body.Company_id,
        "Project_id" : req.body.ProjectId,
        "User_id" : req.body.User_id,
        "Requirement_name" :req.body.Requirement_name,
        "Week_duration" :req.body.Week_duration,
        "Week_must_time" : req.body.Week_must_time,
        "Roles_id" : 1,
        "Hours_per_week":req.body.Hours_per_week,
        "Hours_per_month":req.body.Hours_per_month,
        "Hours_per_day" : req.body.Hours_per_day,
        "No_of_resources" : req.body.No_of_resources, 
        "Requirements_description": req.body.Requirements_description,  
        "Requirement_start": req.body.Start_date,  
        "Requirement_end": req.body.End_date,  
    };   
    
     
   async function addTechnologies(r_id,p_id){
     let t_list =  req.body.Technology_id; 
    let listOfTechnologies =[]; 
    t_list.forEach(element => {
      var cc ={
        "Technology" :  element['Technology'] ,
        "Technology_experience" :  element['Technology_experience'] ,
        "Technology_level" :  element['Technology_level'] ,
        "Technology_version" :  element['Technology_version'] ,
        "User_id" : User_id,  
        "Requirement_id":r_id,
        "Project_id" : p_id
      }
      listOfTechnologies.push(cc); 
    }); 
      
    SelectedTechTb.bulkCreate(listOfTechnologies)
    .then(data => {
      console.log("Tech entered " + listOfTechnologies);
       return true;
    })
    .catch(err => {
      
      console.log(err);
    });
   }
   async function addDomains(r_id,p_id){

    let d_list =  req.body.Domain_id; 
    let listOfDomains =[]; 
    d_list.forEach(element => {
      var cc ={
        "Domains" :  element['Domain'] ,
        "Domain_duration" :  element['Domain_duration'] ,
        "User_id" : User_id,  
        "Requirement_id":r_id,
        "Project_id" : p_id
      } 
      listOfDomains.push(cc); 
    });     
    SelectedDomainsTb.bulkCreate(listOfDomains)
    .then(data => {
      console.log("Domains entered " + listOfDomains);
      return true;
    })
    .catch(err => {
      console.log(err);
    });
   }
   async function addEducations(r_id,p_id){
     let e_list =  req.body.Certification; 
    let listOfCertification =[]; 
    console.log(req.body.Certification);
    e_list.forEach(element => {
      console.log("Pass Year :" + element['Pass_year']);
      var cc ={
        "Qualifications" :  element['Education'] ,
        "Pass_year" :  element['Pass_year'] ,
        "User_id" : User_id,  
        "Requirement_id":r_id,
        "Project_id" : p_id
      }
      listOfCertification.push(cc); 
    }); 
    SelectedQualificationsTb.bulkCreate(listOfCertification)
    .then(data => {
      console.log("Qualifications entered " + listOfCertification);
    })
    .catch(err => {
     
      console.log(err);
    });
   }
   async function addRoles(r_id,p_id){
     let r_list =  req.body.Roles_id; 
    let listOfRoles =[]; 
    console.log(req.body.Roles_id);
    r_list.forEach(element => {
      var cc ={
        "Roles" :  element['Job_title'] ,
        "Job_duration" :  element['Job_duration'] ,
        "User_id" : User_id,  
        "Requirement_id":r_id,
        "Project_id" : p_id
      }
      listOfRoles.push(cc); 
    }); 
    selectedRolesTb.bulkCreate(listOfRoles)
    .then(data => {
       console.log("Roles entered " + listOfRoles);
    })
    .catch(err => {
     
      console.log(err);
    });
   }
   
    
 
const addRequirement = new Promise((resolve, reject) => {
  requirementTb.create(requirementData)
  .then(data => { 
    if (data) {
      return resolve(data.Requirement_id);
  } else {
      var reason = new Error('Your friend is not Ready');
      return reject(reason);
  }

  })
  .catch(err => {
   
   console.log(err);
  });
    
});
const isAddedRequirement = async() => {
    const result = await addRequirement;
    return result;
}
isAddedRequirement()
    .then(result => {
        addTechnologies(result ,project_id);
        addDomains(result,project_id);
        addEducations(result,project_id);
        addRoles(result,project_id)
        var result ={
          "status" : true
        }
      res.send(result);
    })
    .catch(err => {
        console.error(err);
        res.send(err);
    })
   
  };
  
  exports.getAssignmentsById = (req, res) => {
    const Project_id = req.body.Project_id; 
    const User_id = req.body.User_id; 
    const Company_id = req.body.Company_id; 
    
    requirementTb.findAll({ where: {Project_id : Project_id , Company_id:Company_id},
      include: {
        model: projectTb ,
        include: {
          model: usersTb ,
          required: true
        }
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

    exports.getProjectById = (req, res) => {
      const Project_id = req.body.Project_id; 
      const User_id = req.body.User_id; 
      
      projectTb.findOne({ where: {Project_id : Project_id },
        include: {
          model: requirementTb ,
          include: {
            model: usersTb ,
            required: true
          }
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

exports.projectMatching =async (req, res) => {
    if (!req.body.Requirement_id) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    const requirement_id = req.body.Requirement_id; 
    var resource_List = [];
    let requirement_data = "";
 
     async function getRequirement_data() {
      let data = await requirementTb.findOne({
        where: {
          Requirement_id : requirement_id
        },
        include: [{
          model: projectTb,
          include: [{
              model: selectedRolesTb,   
              required: false, 
          },{
            model: SelectedDomainsTb, 
            required: false, 
        },{
          model: SelectedTechTb, 
          required: false, 
      },{
        model: SelectedQualificationsTb, 
        required: false, 
    }],
          required: false,
        
      }]
    }).then(data =>{  
      return data
    }).catch(err =>{
      return err
    }); 
    return data
    }
    requirement_data = await getRequirement_data();
    let requirement_start = requirement_data.Requirement_start; 
     

    let maching_role_users =[]; 
    let R_maching = []; 
    let number_of_requirements =0;
    let matching = 0;
    const roleMatching = 10;
    const educationMatching = 10;
    const technologyMatching = 50;
    const domainMatching =10;
    const availabilityMatching =15;
    const isVideoMatching =5; 
  
    async function maching_Role(){
      if(Object.keys(requirement_data.ProjectsTb['SelectedRolesTbs']).length > 0){
        let totalRoles =0; 
       let R_role_list =  requirement_data.ProjectsTb['SelectedRolesTbs'] ;
       for(const val of R_role_list) { 
         
        var rol = await resourceRoleTbs.findAll({ where: {
          RRole_name : val['Roles'], 
        } })
        totalRoles = Object.keys(requirement_data.ProjectsTb['SelectedRolesTbs']).length; 
        let matchingPercentage = roleMatching / totalRoles; 
        matchingPercentage = matchingPercentage/2; //role,expt
        console.log("Role divion by " + matchingPercentage);
        rol.forEach(el => {
          var p = 0;
          if(el.Resource_id != null){  
            if(el.RRole_duration >= val['Job_duration']){
              p++;
              console.log("Role duration matched "+p); 
            } 
            if(el.RRole_name == val['Roles']){
              p++;
              console.log("Role name matched "+p); 
            }
          maching_role_users.push(el.Resource_id);  
          var c = {
            "Resource_id" : el.Resource_id,
            "Rolemaching" : (matchingPercentage*p)
          }
          R_maching.push(c); 
         }
        });
         
     } 
     console.log("Role machers : "+ maching_role_users);  
       }
     }
     async function maching_Technology(){
     if(Object.keys(requirement_data.ProjectsTb['SelectedTechnologiesTbs']).length > 0){
       
      totalTechs = Object.keys(requirement_data.ProjectsTb['SelectedTechnologiesTbs']).length; 
      let matchingPercentage = technologyMatching / totalTechs;
      matchingPercentage = matchingPercentage/3; //expt,level,version
      console.log("Tech division by:" +matchingPercentage);

      let R_technology_list =  requirement_data.ProjectsTb['SelectedTechnologiesTbs'] ;
      for(const val of R_technology_list) { 
       number_of_requirements++;
       var rol = await resourceTechnologyTbs.findAll({ where: {
        RTechnology_name : val['Technology'] 
        } }); 
       rol.forEach(el => {
        var p = 0;
         if(el.Resource_id != null){
          if(el.RTechnology_duration == val['Technology_experience'])
          {
            p++;
            console.log("Technology experience matched."+p);
          }
          if(el.RTechnology_level == val['Technology_level'])
          {
            p++;
            console.log("Technology level matched."+p);
          }
          if(el.RTechnology_version == val['Technology_version'])
          {
            p++;
            console.log("Technology version matched."+p);
          }
          var c = {
            "Resource_id" : el.Resource_id,
            "Technologymaching" : (matchingPercentage*p)
          }
          R_maching.push(c); 
          maching_role_users.push(el.Resource_id);  
         }
       });
    } 
    console.log("Tech machers : "+maching_role_users); 
      }
    }
    async function maching_Education(){
    if(Object.keys(requirement_data.ProjectsTb['SelectedQualificationsTbs']).length > 0){
     let R_technology_list =  requirement_data.ProjectsTb['SelectedQualificationsTbs'] ;
     let totalEdu =Object.keys(requirement_data.ProjectsTb['SelectedQualificationsTbs']).length; 
     for(const val of R_technology_list) { 
      number_of_requirements++;
      var rol = await resourceEducationTbs.findAll({ where: {
        REducation : val['Qualifications'] 
      } });

      let matchingPercentage = educationMatching / totalEdu; 
      matchingPercentage = matchingPercentage; //Education
      console.log("Education divion by " + matchingPercentage);

      rol.forEach(el => {
        var p =0;
        if(el.Resource_id != null){  
         if(el.REducation == val['Qualifications']){
           p++;
           console.log("Education "+p);
          }
        var c = {
          "Resource_id" : el.Resource_id,
          "Educationmaching" : (matchingPercentage*p)
        }
        R_maching.push(c); 
        maching_role_users.push(el.Resource_id); 
      } 
      });
   } 
   console.log("Education machers : "+maching_role_users); 
     }
   }
   async function maching_Domain(){
   if(Object.keys(requirement_data.ProjectsTb['SelectedDomainsTbs']).length > 0){
    let R_technology_list =  requirement_data.ProjectsTb['SelectedDomainsTbs'] ;
    let totalDomain =Object.keys(requirement_data.ProjectsTb['SelectedDomainsTbs']).length; 
    for(const val of R_technology_list) { 
     number_of_requirements++;
     var rol = await resourceDomainTbs.findAll({ where: {
       RDomain : val['Domains'] 
      } });

      let matchingPercentage = domainMatching / totalDomain; 
      matchingPercentage = matchingPercentage/2; //Domain,expt
      console.log("Domain divion by " + matchingPercentage);

     rol.forEach(el => {
        var p =0;
       if(el.Resource_id != null){ 
        if(el.RDomain == val['Domains']){
          p++;
          console.log("Domain mached"+p);
         }
         if(el.RDomain_duration >= val['Domain_duration']){
           p++;
           console.log("Domain duration mached"+p);
          }

        var c = {
          "Resource_id" : el.Resource_id,
          "Domainmaching" : (matchingPercentage*p)
        }
        R_maching.push(c); 
        maching_role_users.push(el.Resource_id); 
       }
     });
  } 
  console.log("Domains machers : "+maching_role_users); 
    }
  }
   

  
  async function resourceAvailability(){ 
    console.log("Total machers : "+ maching_role_users); 
       let finalResource=[];
      for(const val of maching_role_users) {  
       var rol = await resourceTb.findAll({ where: {Resource_id : val,
         Available_from:{
           [Op.lte]: requirement_start,  
         }, Resource_status:{
          [Op.ne]: 'SELECTED',  
        }
       } }); 
       rol.forEach(el => { 
         if(el.Resource_id!= null && finalResource.includes(el.Resource_id)==false){  

        var c = {
          "Resource_id" : el.Resource_id,
          "Availabilitymaching" : availabilityMatching
        }
        R_maching.push(c);  
        if(el.Intro_video != ''){ 
          var c = {
            "Resource_id" : el.Resource_id,
            "Videomaching" : isVideoMatching
          }
          R_maching.push(c); 
          
        } 
          finalResource.push(el.Resource_id);
        }
      });
    } 
    maching_role_users=[];
    maching_role_users = finalResource;
    console.log("Available machers : "+ maching_role_users); 
     } 
     async function matchingResourceData(){ 
       let resourceLists=[];
      
        for(const element of resourceList) {   
         var rol = await resourceTb.findAll({ where: {Resource_id : element.Resource_id, 
         } , include: {
          model: companyTb ,
          required: true
        }}); 
         rol.forEach(el => {   
           var c = {
            "Resource_id" : el.Resource_id,
            "Resource_name" : el.Resource_name,
            "Resource_rate" : el.Resource_rate,
            "Resource_status" : el.Resource_status,
            "Available_from" : el.Available_from,
            "Resource_photo" : el.Resource_photo,
            "Available_to" : el.Available_to,
            "Created_by" : el.Created_by,
             "RoleMatching" :element.RoleMatching,
             "DomainMatching" : element.DomainMatching,
             "TechnologyMatching" : element.TechnologyMatching,
             "EducationMatching" : element.EducationMatching,
             "Availabilitymaching" : element.Availabilitymaching,
             "Videomaching" : element.Videomaching,
             "Matching":element.Matching,
             "CompanyTb" :el.CompanyTb,
             "Requirement_id":requirement_id
           }
            resourceLists.push(c); 
            console.log(c);
        });
          
      }  
      return resourceLists;
       } 
       
async function arrangeResource(){
   let people=[];
const groupBy = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});
var groupByBrand = groupBy('Resource_id');
let datas = groupByBrand(R_maching) ;
let meData=[];

 
for (const [key, value] of Object.entries(datas)) {
  value.forEach(element => { 
    people.push(element);

  });
}
var roleMach = 0;
var domainMach = 0;
var techMach = 0;
var eduMach = 0;
var availMach=0;
var videoMach=0;

    for(var id of maching_role_users){
      people.forEach(element => {  
    if(id == element.Resource_id){ 
      if(element.Rolemaching >=0){
        roleMach+=element.Rolemaching;  
      }
      if(element.Domainmaching >=0){
        domainMach+=element.Domainmaching;  
      } 
      if(element.Technologymaching >=0){
        techMach+=element.Technologymaching;  
      } 
      if(element.Educationmaching >=0){
        eduMach+=element.Educationmaching;  
      }
      if(element.Availabilitymaching >=0){
        availMach+=element.Availabilitymaching;  
      } 
      if(element.Videomaching >=0){
        videoMach+=element.Videomaching;  
      } 
    } 

  });
  var c = {
    "Resource_id" : id,
    "RoleMatching" : roleMach,
    "DomainMatching" : domainMach,
    "TechnologyMatching" : techMach,
    "EducationMatching" : eduMach,
    "Availabilitymaching" : availMach,
    "Videomaching" : videoMach,
    "Matching":Math.round((domainMach+techMach+eduMach+availMach+videoMach))
  }
  meData.push(c);
  roleMach=0;
  domainMach=0;
  techMach=0;
  eduMach=0;
  availMach=0;
  videoMach=0;
  }
  
 return meData;
    } 
    await maching_Role();
    await maching_Technology();
    await maching_Education();
    await maching_Domain();
    await resourceAvailability(); 
    let resourceList = await arrangeResource();
    let rData = await matchingResourceData(); 
    res.send(rData); 
    };



exports.updateProjectStatus = (req, res) => {
  var dataUpdate= {
    "Status" : req.body.Status
  }
  projectTb.update(dataUpdate, {
    where: { Project_id: req.body.Project_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          status: 1
        });
      } else {
        res.send({
          status: 0
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};
exports.updateStart = (req, res) => {
  var dataUpdate= {
    "Start_date" : req.body.Start_date
  }
  projectTb.update(dataUpdate, {
    where: { Project_id: req.body.Project_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          status: 1
        });
      } else {
        res.send({
          status: 0
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};
exports.updateEnd = (req, res) => {
  var dataUpdate= {
    "End_date" : req.body.End_date
  }
  projectTb.update(dataUpdate, {
    where: { Project_id: req.body.Project_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          status: 1
        });
      } else {
        res.send({
          status: 0
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

exports.getRequirementData = (req, res) => {
  var dataUpdate= {
    "End_date" : req.body.End_date
  }
  projectTb.update(dataUpdate, {
    where: { Project_id: req.body.Project_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          status: 1
        });
      } else {
        res.send({
          status: 0
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

exports.addBookmark = (req, res) => {
  if (!req.body.Company_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  var bookmarkdata= {
    "Requirement_id" : req.body.Requirement_id,
    "Resource_id" : req.body.Resource_id,
    "User_id" : req.body.User_id, 
  }
  BookmarkTbs.create(bookmarkdata)
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
exports.getBookmark =async (req, res) => {
  if (!req.body.Company_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  let bookmarkLists=[];
 
  BookmarkTbs.findAll({ where: {
    User_id : req.body.User_id
  }, include: {
    model: resourceTb ,
    required: false
  }  })
  .then(data => {

    for(var val of data){ 
bookmarkLists.push(val['dataValues'].ResourceTb.Resource_id);
    }
 
let bookmarks = bookmarkLists.filter((c, index) => {
  return bookmarkLists.indexOf(c) == index;
});
getLists(bookmarks); 
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  }); 
async function getLists(bookmarks){ 
      var lists = await resourceTb.findAll({where: {Resource_id: {
        [Op.in]: bookmarks,
      }}}); 
res.send(lists); 
  }

};

exports.removeBookmark = (req, res) => {
  if (!req.body.Company_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
 
  BookmarkTbs.destroy({
    where: {  Resource_id:req.body.Resource_id,User_id: req.body.User_id }
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
        message: "Could not delete Tutorial with id=" + id
      });
    });
}; 

exports.setInterview   = (req, res) => {
  if (!req.body.Company_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  var bookmarkdata= {
    "Requirement_id" : req.body.Requirement_id,
    "Resource_id" : req.body.Resource_id,
    "User_id" : req.body.User_id, 
    "Interview_date" : req.body.Interview_date, 
    "Company_id" : req.body.Company_id, 
  }
  BookmarkTbs.create(bookmarkdata)
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
exports.mailInterview = async (req, res) => {
  if (!req.body.Company_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  let Email_ids =[];
async function getMailIds(){
  var R_mail_id = await resourceTb.findOne({ where: {Resource_id : req.body.Resource_id, 
  } }); 
  var m1 = {
    "Role" : "Resource",
    "Mail" : R_mail_id.Resource_Email, 
  }
  Email_ids.push(m1); 

  var Hiring_mail_id = await usersTb.findOne({ where: {User_id : req.body.User_id, 
  } }); 
  var m2 = {
    "Role" : "Hiring",
    "Mail" : Hiring_mail_id.User_email
  }
   Email_ids.push(m2); 

   var Listing_mail_id = await usersTb.findOne({ where: {User_id : R_mail_id.Created_by
   } 
   }); 
     
    var m3 = {
      "Role" : "Listing",
      "Mail" : Listing_mail_id.User_email
    }
     Email_ids.push(m3); 
    
   
   mail_Interview(Email_ids);
   var c = {
     "Status":true
   }
   res.send(c);
}
  var interviewData= {
    "Requirement_id" : req.body.Requirement_id, 
    "User_id" : req.body.User_id, 
    "Interview_date" : req.body.interviewDate, 
    "Interview_time" : req.body.interviewTime, 
    "Company_id" : req.body.Company_id, 
    "Interview_body":req.body.bodymail,
    "Interview_status":'INTERVIEWING'
  }
  await interviewTb.update(interviewData, {
    where: { Resource_id: req.body.Resource_id }
  }).then(num => {
      if (num == 1) {
        getMailIds(); 
        updateResourceInterv();
      } else {
        res.send({
          message: `Cannot update  Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });

async function updateResourceInterv(){
  var istatus ={
    'Resource_status':'INTERVIEWING'
  }
  await resourceTb.update(istatus, {
    where: { Resource_id: req.body.Resource_id }
  });
}  

async function mail_Interview(Email){
  console.log("Sending interview invitations");   
  const myEmail = "admin@expertsq.com";
  const emailPass = "Sunshine@2021";
  var to_mail ="";
  var cc_mail =[];
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: myEmail,
      pass: emailPass
    }
  });

  Email.forEach(element => { 
    
    if(element.Role == 'Listing'){
      to_mail = element.Mail
    }else{
      cc_mail.push(element.Mail);
    }  
  });
  var mailOptions = {
    from: myEmail,
    to: to_mail,
    cc:cc_mail,
    subject: 'INTERVIEW CALL LATTER',
    html: req.body.bodymail
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response + " || " + resource_mail);
    }
  });
 
}
};
exports.getInterviewResources = (req, res) => {
  if (!req.body.Company_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  interviewTb.findAll({ where: {
    User_id : req.body.User_id,
    Interviewed : 'NO',
    Interview_status : 'INTERVIEWING'
  } ,
  include:{
    model:resourceTb,
    required:false

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
exports.changeInterviewStatus = async (req, res) => {
  if (!req.body.Company_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  var interviewStatus = {
    "Interview_status" : req.body.Interview_status,
    "Reason" : req.body.Reason
  }
console.log(interviewStatus);
  await interviewTb.update(interviewStatus, {
    where: { Resource_id: req.body.Resource_id, Requirement_id:req.body.Requirement_id }
  })
    .then(num => {
      if (num == 1) {
        if(req.body.Interview_status == 'SELECTED'){
          assignResources();
        }else{
          resourceAvailable();
        res.send({
          Status: true
        });
      }
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
    async function resourceAvailable(){
      var interviewStatus = {
        "Resource_status" : 'AVAILABLE'
      }
      await resourceTb.update(interviewStatus, {
        where: { Resource_id: req.body.Resource_id}
      });
    }

    async function assignResources(){

      var assignData = {
        "Requirement_id":req.body.Requirement_id,
        "Resource_id" : req.body.Resource_id, 
        "User_id":req.body.User_id,

      } 
      assignTb.create(assignData)
      .then(data => {
        res.send({
          Status: true
        });
      })
      .catch(err => {
        res.status(500).send({
          Status: false
        });
      });
    } 
};

// Create and Save a new Tutorial
exports.shortListResource = async (req, res) => {
  // Validate request
  if (!req.body.Resource_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
 
  
async function checkExis(){
  return await interviewTb.count({ where: {Requirement_id : req.body.Requirement_id,
    Resource_id: req.body.Resource_id,Company_id: req.body.Company_id,User_id: req.body.User_id,Interview_status:'SHORTLISTED'
  } 
  });
}
if(checkExis()>0){
  var c = {
    Status:false
  }
res.send(c);
}else{
  interviewTb.findOrCreate({
    where: { 
      Requirement_id: req.body.Requirement_id,
      Resource_id: req.body.Resource_id,
      Company_id:req.body.Company_id,
      User_id: req.body.User_id,
      Interview_status:'SHORTLISTED'
    },
    defaults: { 
      Requirement_id: req.body.Requirement_id,
      Resource_id: req.body.Resource_id,
      Company_id:req.body.Company_id,
      User_id: req.body.User_id,
      Interview_status:'SHORTLISTED'
    }
}).then(function(data){//run your calllback here
    console.log("callback!!");
    if(data[1]){
console.log('Created');
 updateResourceInterview();
    }else{
      console.log('Exists');
    }
    res.send(data);
}).catch(function(err){
  console.log(err)
}) 
} 
async function updateResourceInterview(){
  var istatus ={
    'Resource_status':'SHORTLISTED'
  }
  await resourceTb.update(istatus, {
    where: { Resource_id: req.body.Resource_id }
  });
}
};
exports.getShortListResource = (req, res) => {
  if (!req.body.Company_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  interviewTb.findAll({ where: {Company_id:req.body.Company_id,
  User_id:req.body.User_id , Interview_status:'SHORTLISTED'},include:[{
    model:resourceTb,
    required:true,
  },
  {
    model:requirementTb,
    required:true,
  }
]})
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
exports.getapprovedResources = (req, res) => {
  if (!req.body.Company_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  assignTb.findAll({ where: {
  User_id:req.body.User_id},include:[{
    model:resourceTb,
    required:true,
  },{
    model:requirementTb,
    required:true,
  } 
]})
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

exports.getTimesheet = async (req, res) => {
  if (!req.body.Company_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  var Resource_lists=[];

  async function getResources(saturday){
  return await TimesheetTbs.findAll({ where: {
      User_id:req.body.User_id , Resource_approvel:'Approved'},}).then(data => {
       data.forEach(element => { 
         Resource_lists.push(element.Resource_id);
       });
          return Array.from(new Set(Resource_lists));
        })
        .catch(err => {
         console.log(err);
        });
         
  }

  async function timesheet(resource_list,saturday){
    let timesheetData = [];
    let sums = 0;
    for(var val of resource_list){
      
      sums = await TimesheetTbs.sum('Working_hours', { where: { Resource_id:  val,Working_date:{
        [Op.gte]:saturday
      } } }).then(sum => { 
        var c = {
          'Resource_id' : val,
          'Hours' : sum
        }
        timesheetData.push(c); 
      })
    }   
    sums = 0;
    return timesheetData;
  }


  async function getLatestSaturday() {
    let currentDateObj = new Date();
    currentDateObj.setDate(currentDateObj.getDate() - (currentDateObj.getDay() + 1) % 7);
    currentDateObj = currentDateObj.toLocaleDateString("zh-Hans-CN");
    return currentDateObj;
  }

  async function gatherResourceDatas(timesheetDatas){
let resource = [];
    for(var val of timesheetDatas){
      console.log(val.Resource_id);
     await resourceTb.findAll({ where: {Resource_id : val.Resource_id },
        include: {
          model:assignTb,
          include: {
            model:requirementTb,
            required: true,
            include: {
              model:TimesheetTbs,
              required: true,
            }
          }
        }  
       }
      )
      .then(data => {  
        var c = {
          'Resource_id' :data[0].Resource_id, 
          'Total_hours' :val.Hours,
          'Resource_name' :data[0].Resource_name,
          'Resource_Email' :data[0].Resource_Email,
          'Resource_Designation' :data[0].Resource_Designation,
          'Resource_rate' :data[0].Resource_rate,
          'Resource_currency' :data[0].Resource_currency,
          'AssignTbs' :data[0].AssignTbs, 
          'RequirementsTbs' :data[0].AssignTbs.RequirementsTbs, 

        }
        resource.push(c);
      })
      .catch(err => {
       console.log(err);
      }); 
    }
    res.send(resource); 

  }

 let saturday = await getLatestSaturday(); 
 let uniqueResources =  await getResources(saturday);
 let timesheetDatas = await timesheet(uniqueResources,saturday);
 let finalData = gatherResourceDatas(timesheetDatas);
   
  
};
exports.approveTimesheet = (req, res) => {
  var approvedata = {
    "Status" : "Approved"
  }

  TimesheetTbs.update(approvedata, {
    where: { User_id: req.body.User_id, Resource_id:req.body.Resource_id }
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

exports.rejectTimesheet = (req, res) => {
  var rejectiondata = {
    "Status" : "Rejected",
    "Rejection_reson":req.body.Rejection_reson
  }
console.log(rejectiondata)
  TimesheetTbs.update(rejectiondata, {
    where: { User_id: req.body.User_id, Resource_id:req.body.Resource_id }
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