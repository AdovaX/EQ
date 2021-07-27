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
  
exports.getTechnology = (req, res) => { 
  techcategoryTb.findAll({  
      include: {
        model: technologyTb,
        required: true
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
  
  exports.getEducation = (req, res) => { 
      educationTb.findAll()
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
        rolesTb.findAll()
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

    
    
    




     res.send(requirement_data);
     

    };