const db = require("../models");
const bcrypt = require('bcrypt');
const companyTb = db.companyTb;  
const usersTb = db.user; 
const Op = db.Sequelize.Op;

 

exports.mainLogin =  async(req, res) => {
    var email = req.body.User_email;
    var role = req.body.User_role;
    var password = req.body.User_password;

usersTb.findAll({where : {User_email:email , User_roles_id : role},include: {
    model: companyTb ,
    required: true
  }})
.then(data => {
    if(!data[0]){
        var respos = {
            "status" : "false"
        } 
        res.send(respos); 
    } 
    if(bcrypt.compareSync(password, data[0].User_password)){  
    res.send(data);
    }else{
    var respos = {
        "status" : "false"
    }
    res.send(respos);
    }
   
})
.catch(err => {
    res.send(err);

}); 
    };   