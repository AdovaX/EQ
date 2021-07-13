
const db = require("./app/models");
//{force: true}
db.sequelize.sync({force: true}).then(function(){
    console.log("Creating Roles");
    db.userroles.create({
      User_roles: '1',
      User_role_description: 'Admin'
    }); 
    db.userroles.create({
      User_roles: '2',
      User_role_description: 'Contractor'
    }); 
    db.userroles.create({
      User_roles: '3',
      User_role_description: 'Deligate'
    }); 
    db.userroles.create({
      User_roles: '4',
      User_role_description: 'Spoc'
    }); 
    db.userroles.create({
      User_roles: '5',
      User_role_description: 'Listing'
    }); 
    db.userroles.create({
      User_roles: '6',
      User_role_description: 'Hiring'
    }); 
    db.userroles.create({
      User_roles: '7',
      User_role_description: 'Resource'
    }); 
  });