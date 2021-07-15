const db = require("../models");
const companyTb = db.companyTb;   
const HManagerTb = db.HManagerTb;
const delegateTb = db.delegateTb;
const resourceTb = db.resourceTb;
const requirementTb = db.requirement;
const projectTb = db.project;
const usersTb = db.user;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');


exports.updateProfile = async (req, res) => {
    if (!req.body.HManager_id) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      } 
  
  const profileData = {
    HManager_name: req.body.HManager_name, 
    HManager_designation: req.body.HManager_designation, 
    HManager_phone: req.body.HManager_phone 
    }; 
    const userData ={ 
      User_email: req.body.User_email,  
      } 
      console.log(req.body);
      async function updateHManager() { 
          return await HManagerTb.update(profileData, {
            where: { HManager_id: req.body.HManager_id }
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
    const isUpdatedHManager= await updateHManager();
    const isHManagerMailUpdated =await userMailUpdate();

    if(isUpdatedHManager == true && isHManagerMailUpdated == true){
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
         model: HManagerTb,
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

  exports.getResources_all= async (req, res) => {
    if (req.body.User_id < 0) {
     res.status(400).send({
       message: "Content can not be empty!!"
     });
     return;
   }  
   async function getCompanyData() {
    return await resourceTb.findAll({
      where: {
        Resource_active: '1'
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

  exports.searchByKeywords = (req, res) => {
    if (req.body.HManager_id < 0 || req.body.Delegate_id < 0) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }  
    const title = req.body.title;
   
    resourceTb.findAll({ where: 
      {
        [Op.or]: [{
          Resource_name: {
                    [Op.like]: `%${title}%`
                }
            },
            {
              Resource_Designation: {
                    [Op.like]: `%${title}%`
                }
            } 
        ],
        [Op.and]: [ 
            {
              Resource_active: 1
            }
        ]
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
  exports.createProject = async (req, res) => {
    if (!req.body.Project_name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
   
    const projectData = {
      Project_name: req.body.Project_name,
      Project_location: req.body.Project_location,
      Start_date: req.body.Start_date,
      End_date: req.body.End_date,
      Description: req.body.Description,
      Created_by: req.body.User_id,
      Company_id: req.body.Company_id,
      Status: req.body.Status,
      Need_remote:req.body.Need_remote
    };
   async function projectCreation(){
    projectTb.create(projectData)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
   }
   const isCreated = projectCreation();
   
  };
  exports.listofProjects = (req, res) => {
    const Company_id = req.body.Company_id;
   
    projectTb.findAll({ where: {Company_id :Company_id , Status:'ACTIVE' },
    include: {
      model: companyTb ,
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
   

  exports.createAssignment = async (req, res) => {
    if (!req.body.Requirement_name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
   
    const requirementData =  
      {
        "Company_id" : req.body.Company_id,
        "Project_id" : req.body.Project_id,
        "Requirement_name" :req.body.Requirement_name,
        "Week_duration" :req.body.Week_duration,
        "Week_must_time" : req.body.Week_must_time,
        "Technology_id" : req.body.Technology_id,
        "Domain_id" : req.body.Domain_id,
        "Roles_id" : req.body.Roles_id,
        "Certification" : req.body.Certification,
        "Hours_per_week":req.body.Hours_per_week,
        "Hours_per_month":req.body.Hours_per_month,
        "Hours_per_day" : req.body.Hours_per_day,
        "No_of_resources" : req.body.No_of_resources, 
        "Requirements_description": req.body.Requirements_description
    
    
    };  


   async function assignmentCreation(){
    requirementTb.create(requirementData)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
   }
   const isCreated = assignmentCreation();
   
  };

 exports.searchProjectById = (req, res) => {
    const Project_id = req.body.Project_id;
  
    projectTb.findByPk(Project_id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
  };
  
  