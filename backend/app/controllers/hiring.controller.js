const db = require("../models");
const companyTb = db.companyTb;   
const HManagerTb = db.HManagerTb;
const delegateTb = db.delegateTb;
const resourceTb = db.resourceTb;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');


exports.updateProfile = (req, res) => {
    if (!req.body.HManager_id) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      } 
  
  const profileData = {
    HManager_name: req.body.HManager_name,
    HManager_email: req.body.HManager_email,  
    HManager_designation: req.body.HManager_designation, 
    HManager_phone: req.body.HManager_phone 
    }; 
   
    HManagerTb.update(profileData, {
      where: { HManager_id: req.body.HManager_id }
    }).then(num => {
        if (num == 1) {
          res.send({
            status: "true"
          });
        } else {
          res.send({
            status: "false"
          });
        }
      }).catch(err => {
        res.status(500).send({
          message: err
        });
      });
  };


  exports.getMyCompany= async (req, res) => {
    if (!req.body.HManager_id) {
     res.status(400).send({
       message: "Content can not be empty!"
     });
     return;
   }  
   async function getCompanyData() {
    return await HManagerTb.findAll({
      where: {
        HManager_id: req.body.HManager_id
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

  exports.getResources_all= async (req, res) => {
    if (!req.body.HManager_id) {
     res.status(400).send({
       message: "Content can not be empty!"
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
    if (!req.body.HManager_id) {
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