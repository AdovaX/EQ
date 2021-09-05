const db = require("../models");
const resourceTb = db.resourceTb;
const companyTb = db.companyTb;   
const requirementTb = db.requirement;
const projectTb = db.project; 
const usersTb = db.user; 
const assignTb = db.assignTb;
const TimesheetTbs = db.TimesheetTbs;
var Sequelize = require("sequelize"); 
var nodemailer = require('nodemailer'); 

 
exports.getRequirementData = (req, res) => { 
  assignTb.findAll({ where:{
      Resource_id : req.body.Resource_id,  Approved_status:'Approved',
  },include:[{
      model:requirementTb, 
      include:{
        model:projectTb, 
        required:true,
      }
  }, 
   {
    model:resourceTb,
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
 
  exports.updateTimesheet = (req, res) => { 

    var timesheetdata={
      "Working_date":req.body.Working_date,
      "Working_hours":req.body.Working_hours,
      "Resource_id" : req.body.Resource_id,
      "Project_id" : req.body.Project_id,
      "Requirement_id":req.body.Requirement_id,
      "Comments" : req.body.Comments,
      "User_id":req.body.User_id 
    };

    upsert(timesheetdata).then(function(result){
      console.log(result)
      res.status(200).send({success: true});
  }); 
    function upsert(values) {
      return TimesheetTbs
          .findOne({ where: {"Resource_id" : req.body.Resource_id,"Working_date":req.body.Working_date} })
          .then(function(obj) {
              // update
              if(obj)
                  return obj.update(values);
              // insert
              return TimesheetTbs.create(values);
          })
  } 
    };

    exports.getTimesheetResource = (req, res) => {
      
      TimesheetTbs.findAll({ where: {Resource_id:req.body.Resource_id} })
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
    exports.timesheetOk = (req, res) => {
var timeok = {
  'Resource_approvel':'Approved',
}    
TimesheetTbs.update(timeok, {
        where: { Resource_id: req.body.Resource_id }
      }).then(num => {
          if (num) {
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