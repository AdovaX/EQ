const db = require("../models");
const spocTb = db.spocTb;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.Spoc_name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Tutorial
    const spocData = {
      Spoc_name: req.body.Spoc_name,
      Spoc_email: req.body.Spoc_email,
      Spoc_designation: req.body.Spoc_designation,
      Spoc_phone: req.body.Spoc_phone,
      Company_id: req.body.Company_id, 
    };
  
    // Save Tutorial in the database
    spocTb.create(spocData)
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
