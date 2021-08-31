const db = require("../models");
const resourceTb = db.resourceTb;
const companyTb = db.companyTb;   
const requirementTb = db.requirement;
const projectTb = db.project; 
const usersTb = db.user; 
const assignTb = db.assignTb;
var Sequelize = require("sequelize"); 
var nodemailer = require('nodemailer'); 

 
  exports.getRequirementData = (req, res) => { 
    assignTb.findAll({ where:{
        Resource_id : req.body.Resource_id
    },include:[{
        model:requirementTb,
        required:true,
    }]}).then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message: err  
          });
        });
    };