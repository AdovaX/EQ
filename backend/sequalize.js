
const db = require("./app/models");
//{force: true}
db.sequelize.sync().then(function(){
    // console.log("Creating Roles");
    // db.userroles.create({
    //   User_roles: '1',
    //   User_role_description: 'Admin'
    // }); 
    // db.userroles.create({
    //   User_roles: '2',
    //   User_role_description: 'Contractor'
    // }); 
    // db.userroles.create({
    //   User_roles: '3',
    //   User_role_description: 'Deligate'
    // }); 
    // db.userroles.create({
    //   User_roles: '4',
    //   User_role_description: 'SPOC'
    // }); 
    // db.userroles.create({
    //   User_roles: '5',
    //   User_role_description: 'Listing'
    // }); 
    // db.userroles.create({
    //   User_roles: '6',
    //   User_role_description: 'Hiring'
    // }); 
    // db.userroles.create({
    //   User_roles: '7',
    //   User_role_description: 'Resource'
    // });    // console.log("Creating Roles");

    // db.TechnologyCategoryTbs.create({
    //   Technology_category_id: '1',
    //   Technology_category: 'Web Development'
    // }); 
    // db.TechnologyCategoryTbs.create({
    //   Technology_category_id: '2',
    //   Technology_category: 'DevOps'
    // }); 
    // db.TechnologyCategoryTbs.create({
    //   Technology_category_id: '3',
    //   Technology_category: 'Testing'
    // }); 
    // db.TechnologyCategoryTbs.create({
    //   Technology_category_id: '4',
    //   Technology_category: 'Amazon AWS'
    // });  

  });