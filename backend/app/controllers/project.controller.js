const db = require("../models");
const companyTb = db.companyTb;   
const domainTb = db.domainTb;
const educationTb = db.educationTb;
const resourceTb = db.resourceTb;
const requirementTb = db.requirement;
const projectTb = db.project;
const technologyTb = db.technology;
const usersTb = db.user;
const Op = db.Sequelize.Op; 



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
    technologyTb.findAll()
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
  