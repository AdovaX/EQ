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
var Sequelize = require("sequelize");



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
    };   
    
     
   async function addTechnologies(r_id,p_id){
     let t_list =  req.body.Technology_id; 
    let listOfTechnologies =[]; 
    t_list.forEach(element => {
      var cc ={
        "Technologies" : JSON.stringify(element['Technologies']),
        "User_id" : User_id,  
        "Requirement_id":r_id,
        "Project_id" : p_id
      }
      listOfTechnologies.push(cc); 
    }); 
      
    SelectedTechTb.bulkCreate(listOfTechnologies)
    .then(data => {
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
        "Domains" : JSON.stringify(element['Domains']),
        "User_id" : User_id,  
        "Requirement_id":r_id,
        "Project_id" : p_id
      }
      listOfDomains.push(cc); 
    });     
    SelectedDomainsTb.bulkCreate(listOfDomains)
    .then(data => {
      console.log("Domains entered " + data);
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
      var cc ={
        "Qualifications" : JSON.stringify(element['Education']),
        "User_id" : User_id,  
        "Requirement_id":r_id,
        "Project_id" : p_id
      }
      listOfCertification.push(cc); 
    }); 
    SelectedQualificationsTb.bulkCreate(listOfCertification)
    .then(data => {
      console.log("Qualifications entered " + data);
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
        "Roles" : JSON.stringify(element['Roles']),
        "User_id" : User_id,  
        "Requirement_id":r_id,
        "Project_id" : p_id
      }
      listOfRoles.push(cc); 
    }); 
    selectedRolesTb.bulkCreate(listOfRoles)
    .then(data => {
       console.log("Roles entered " + data);
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
    
    requirementTb.findAll({ where: {Project_id : Project_id , User_id:User_id},
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
      
      projectTb.findOne({ where: {Project_id : Project_id , User_id:User_id},
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
    });
      return data
    }
    requirement_data = await getRequirement_data();

    let maching_role_users =[];

    let R_role_list = JSON.parse(requirement_data.ProjectsTb.SelectedRolesTbs[0].Roles);
    var R_technology_list = JSON.parse(requirement_data.ProjectsTb.SelectedTechnologiesTbs[0].Technologies);
    var R_domin_list = JSON.parse(requirement_data.ProjectsTb.SelectedDomainsTbs[0].Domains);
    var R_education_list = JSON.parse(requirement_data.ProjectsTb.SelectedQualificationsTbs[0].Qualifications);
    
    async function maching_Role() {  
      for(const val of R_role_list) {
        var rol = await rolesTb.findAll({ where: {Role_name : val} })
        rol.forEach(el => {
          if(el.Resource_id != null){
            maching_role_users.push(el.Resource_id);  
          }
        });
    }  
    } 
    async function maching_Technology() {  
      for(const val of R_technology_list) {
        var tech = await technologyTb.findAll({ where: {Technology_name : val} })
        tech.forEach(el => {
          if(el.Resource_id != null){
            maching_role_users.push(el.Resource_id);  
          }
        }); 
    }  
    } 
    async function maching_Education() {  
      for(const val of R_education_list) {
        var edu = await educationTb.findAll({ where: {Qualification : val} })
        edu.forEach(el => {
          if(el.Resource_id != null){
            maching_role_users.push(el.Resource_id);  
          }
        });
    }  
    } 
    async function maching_Domain() {  
      for(const val of R_domin_list) {
        var domain = await domainTb.findAll({ where: {Domain : val} });
        domain.forEach(el => {
          if(el.Resource_id != null){
            maching_role_users.push(el.Resource_id);  
          }
        });
 
    }  
    } 

    await maching_Role();
    await maching_Technology();
    await maching_Education();
    await maching_Domain();

    console.log(maching_role_users); 

     res.send(requirement_data);
     

    };