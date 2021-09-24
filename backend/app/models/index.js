var os = require("os"); 
HOST = os.hostname();   
var dbConfig = require("../../config/db.configPROD");
if(HOST == 'MacBook-Air.local'){
  dbConfig = require("../../config/db.config");
} 

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  //logging: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.spocTb    = require("./spoc.model.js")(sequelize, Sequelize);
db.companyTb = require("./company.model.js")(sequelize, Sequelize);
db.resourceTb = require("./resource.model.js")(sequelize, Sequelize);
db.assignTb = require("./assign.model.js")(sequelize, Sequelize);
db.bankdetailsTb = require("./bankdetails.model.js")(sequelize, Sequelize);
db.contractownerTb = require("./contractowner.model.js")(sequelize, Sequelize);
db.documentsTb = require("./documents.model.js")(sequelize, Sequelize);
db.domainTb = require("./domain.model.js")(sequelize, Sequelize);
db.educationTb = require("./education.model.js")(sequelize, Sequelize);
db.experinceTb = require("./experience.model.js")(sequelize, Sequelize);
db.interviewTb = require("./interview.model.js")(sequelize, Sequelize);
db.locations = require("./locations.model.js")(sequelize, Sequelize);
db.negotiation = require("./negotiation.model.js")(sequelize, Sequelize);
db.payment = require("./payment.model.js")(sequelize, Sequelize);
db.project = require("./project.model.js")(sequelize, Sequelize);
db.requirement = require("./requirements.model.js")(sequelize, Sequelize);
db.roles = require("./roles.model.js")(sequelize, Sequelize);
db.support = require("./support.model.js")(sequelize, Sequelize);
db.techcategory = require("./technologycategory.model.js")(sequelize, Sequelize);
db.technology = require("./technology.model.js")(sequelize, Sequelize);
db.tier = require("./tier.model.js")(sequelize, Sequelize);
db.userroles = require("./userroles.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.resourceSkill = require("./resourceskill.model.js")(sequelize, Sequelize);
db.auditTrailTb = require("./audittrail.model")(sequelize, Sequelize);
db.delegateTb = require("./delegate.model")(sequelize, Sequelize);
db.LManagerTb = require("./listingmanager.model")(sequelize, Sequelize);
db.HManagerTb = require("./Hiringmanager.model")(sequelize, Sequelize);
db.SelectedTech = require("./selectedTechnologies.model")(sequelize, Sequelize);
db.SelectedDomains = require("./selectedDomains.model")(sequelize, Sequelize);
db.SelectedQualifications = require("./selectedQualifications.model")(sequelize, Sequelize);
db.SelectedRoles = require("./selectedRoles.model")(sequelize, Sequelize);
db.BranchesTb = require("./branches.model")(sequelize, Sequelize);
db.GovermentTbs = require("./government.model")(sequelize, Sequelize);
db.resourceDomainTbs = require("./resourceDomain.model")(sequelize, Sequelize);
db.resourceRoleTbs = require("./resourceRoles.model")(sequelize, Sequelize);
db.resourceTechnologyTbs = require("./resourceTechnology.model")(sequelize, Sequelize);
db.resourceEducationTbs = require("./resourceEducation.model")(sequelize, Sequelize);
db.stream_educationTbs = require("./stream_education.model")(sequelize, Sequelize);
db.mtech_Tbs = require("./mtech.model")(sequelize, Sequelize);
db.TimesheetTbs = require("./timesheet.model")(sequelize, Sequelize);
db.BookmarkTbs = require("./bookmark.model")(sequelize, Sequelize);
db.ChatTbs = require("./chat.model")(sequelize, Sequelize);

  
  
 
db.requirement.hasMany(db.ChatTbs, {foreignKey: 'Requirement_id'});  
db.ChatTbs.belongsTo(db.requirement, {foreignKey: 'Requirement_id', targetKey: 'Requirement_id'});
 
db.user.hasMany(db.ChatTbs, {foreignKey: 'Reciver_id'});  
db.ChatTbs.belongsTo(db.user, {foreignKey: 'Reciver_id', targetKey: 'User_id'});

db.user.hasMany(db.ChatTbs, {foreignKey: 'Sender_id'});  
db.ChatTbs.belongsTo(db.user, {foreignKey: 'Sender_id', targetKey: 'User_id'});
 
db.user.hasMany(db.TimesheetTbs, {foreignKey: 'User_id'});  
db.TimesheetTbs.belongsTo(db.user, {foreignKey: 'User_id', targetKey: 'User_id'});
 
db.project.hasMany(db.TimesheetTbs, {foreignKey: 'Project_id'});  
db.TimesheetTbs.belongsTo(db.project, {foreignKey: 'Project_id', targetKey: 'Project_id'});
 
db.requirement.hasMany(db.TimesheetTbs, {foreignKey: 'Requirement_id'});  
db.TimesheetTbs.belongsTo(db.requirement, {foreignKey: 'Requirement_id', targetKey: 'Requirement_id'});
 
db.resourceTb.hasMany(db.TimesheetTbs, {foreignKey: 'Resource_id'});  
db.TimesheetTbs.belongsTo(db.resourceTb, {foreignKey: 'Resource_id', targetKey: 'Resource_id'});
 
db.requirement.hasMany(db.interviewTb, {foreignKey: 'Requirement_id'});  
db.interviewTb.belongsTo(db.requirement, {foreignKey: 'Requirement_id', targetKey: 'Requirement_id'});
 
db.requirement.hasMany(db.assignTb, {foreignKey: 'Requirement_id'});  
db.assignTb.belongsTo(db.requirement, {foreignKey: 'Requirement_id', targetKey: 'Requirement_id'});
  
db.resourceTb.hasMany(db.assignTb, {foreignKey: 'Resource_id'});  
db.assignTb.belongsTo(db.resourceTb, {foreignKey: 'Resource_id', targetKey: 'Resource_id'});
  
db.resourceTb.hasMany(db.interviewTb, {foreignKey: 'Resource_id'});  
db.interviewTb.belongsTo(db.resourceTb, {foreignKey: 'Resource_id', targetKey: 'Resource_id'});
 
db.userroles.hasMany(db.user, {foreignKey: 'User_roles_id'});  
db.user.belongsTo(db.userroles, {foreignKey: 'User_roles_id', targetKey: 'User_roles_id'});
 
db.requirement.hasMany(db.BookmarkTbs, {foreignKey: 'Requirement_id'});  
db.BookmarkTbs.belongsTo(db.requirement, {foreignKey: 'Requirement_id', targetKey: 'Requirement_id'});

db.resourceTb.hasMany(db.BookmarkTbs, {foreignKey: 'Resource_id'});  
db.BookmarkTbs.belongsTo(db.resourceTb, {foreignKey: 'Resource_id', targetKey: 'Resource_id'});
 
db.resourceTb.hasMany(db.resourceEducationTbs, {foreignKey: 'Resource_id'});  
db.resourceEducationTbs.belongsTo(db.resourceTb, {foreignKey: 'Resource_id', targetKey: 'Resource_id'});
 
db.resourceTb.hasMany(db.resourceTechnologyTbs, {foreignKey: 'Resource_id'});  
db.resourceTechnologyTbs.belongsTo(db.resourceTb, {foreignKey: 'Resource_id', targetKey: 'Resource_id'});
 
db.resourceTb.hasMany(db.resourceRoleTbs, {foreignKey: 'Resource_id'});  
db.resourceRoleTbs.belongsTo(db.resourceTb, {foreignKey: 'Resource_id', targetKey: 'Resource_id'});
 
db.resourceTb.hasMany(db.resourceDomainTbs, {foreignKey: 'Resource_id'});  
db.resourceDomainTbs.belongsTo(db.resourceTb, {foreignKey: 'Resource_id', targetKey: 'Resource_id'});
 
db.techcategory.hasMany(db.technology, {foreignKey: 'Technology_category_id'});  
db.technology.belongsTo(db.techcategory, {foreignKey: 'Technology_category_id', targetKey: 'Technology_category_id'});
 
db.project.hasMany(db.SelectedQualifications, {foreignKey: 'Project_id'});  
db.SelectedQualifications.belongsTo(db.project, {foreignKey: 'Project_id', targetKey: 'Project_id'});
 
db.project.hasMany(db.SelectedTech, {foreignKey: 'Project_id'});  
db.SelectedTech.belongsTo(db.project, {foreignKey: 'Project_id', targetKey: 'Project_id'});
 
db.project.hasMany(db.SelectedRoles, {foreignKey: 'Project_id'});  
db.SelectedRoles.belongsTo(db.project, {foreignKey: 'Project_id', targetKey: 'Project_id'});
 
db.project.hasMany(db.SelectedDomains, {foreignKey: 'Project_id'});  
db.SelectedDomains.belongsTo(db.project, {foreignKey: 'Project_id', targetKey: 'Project_id'});
 
db.requirement.hasMany(db.SelectedRoles, {foreignKey: 'Requirement_id'});  
db.SelectedRoles.belongsTo(db.requirement, {foreignKey: 'Requirement_id', targetKey: 'Requirement_id'});
 
 
db.companyTb.hasOne(db.contractownerTb, {foreignKey: 'Company_id'});  
db.contractownerTb.belongsTo(db.companyTb, {foreignKey: 'Company_id', targetKey: 'Company_id'});


db.companyTb.hasOne(db.delegateTb, {foreignKey: 'Company_id'}); 
db.delegateTb.belongsTo(db.companyTb, {foreignKey: 'Company_id', targetKey: 'Company_id'});


db.companyTb.hasOne(db.spocTb, {foreignKey: 'Company_id'}); 
db.spocTb.belongsTo(db.companyTb, {foreignKey: 'Company_id', targetKey: 'Company_id'});

db.companyTb.hasOne(db.LManagerTb, {foreignKey: 'Company_id'}); 
db.LManagerTb.belongsTo(db.companyTb, {foreignKey: 'Company_id', targetKey: 'Company_id'});

db.companyTb.hasOne(db.HManagerTb, {foreignKey: 'Company_id'}); 
db.HManagerTb.belongsTo(db.companyTb, {foreignKey: 'Company_id', targetKey: 'Company_id'});

db.companyTb.hasOne(db.resourceTb, {foreignKey: 'Company_id'}); 
db.resourceTb.belongsTo(db.companyTb, {foreignKey: 'Company_id', targetKey: 'Company_id'});

db.companyTb.hasOne(db.user, {foreignKey: 'Company_id'}); 
db.user.belongsTo(db.companyTb, {foreignKey: 'Company_id', targetKey: 'Company_id'});

db.user.hasOne(db.delegateTb, {foreignKey: 'User_id'}); 
db.delegateTb.belongsTo(db.user, {foreignKey: 'User_id', targetKey: 'User_id'});

db.user.hasOne(db.contractownerTb, {foreignKey: 'User_id'}); 
db.contractownerTb.belongsTo(db.user, {foreignKey: 'User_id', targetKey: 'User_id'});

db.user.hasOne(db.spocTb, {foreignKey: 'User_id'}); 
db.spocTb.belongsTo(db.user, {foreignKey: 'User_id', targetKey: 'User_id'});

db.user.hasOne(db.LManagerTb, {foreignKey: 'User_id'}); 
db.LManagerTb.belongsTo(db.user, {foreignKey: 'User_id', targetKey: 'User_id'});

db.user.hasOne(db.HManagerTb, {foreignKey: 'User_id'}); 
db.HManagerTb.belongsTo(db.user, {foreignKey: 'User_id', targetKey: 'User_id'});

db.user.hasOne(db.project, {foreignKey: 'User_id'}); 
db.project.belongsTo(db.user, {foreignKey: 'User_id', targetKey: 'User_id'});


db.companyTb.hasOne(db.project, {foreignKey: 'Company_id'});  
db.project.belongsTo(db.companyTb, {foreignKey: 'Company_id', targetKey: 'Company_id'});

db.companyTb.hasOne(db.requirement, {foreignKey: 'Company_id'});  
db.requirement.belongsTo(db.companyTb, {foreignKey: 'Company_id', targetKey: 'Company_id'});

db.project.hasMany(db.requirement, {foreignKey: 'Project_id'});  
db.requirement.belongsTo(db.project, {foreignKey: 'Project_id', targetKey: 'Project_id'});

db.requirement.hasOne(db.SelectedTech, {foreignKey: 'Requirement_id'});  
db.SelectedTech.belongsTo(db.requirement, {foreignKey: 'Requirement_id', targetKey: 'Requirement_id'});

db.user.hasOne(db.requirement, {foreignKey: 'User_id'});  
db.SelectedTech.belongsTo(db.user, {foreignKey: 'User_id', targetKey: 'User_id'});



db.requirement.hasOne(db.SelectedTech, {foreignKey: 'Requirement_id'});  
db.SelectedTech.belongsTo(db.requirement, {foreignKey: 'Requirement_id', targetKey: 'Requirement_id'});

db.user.hasOne(db.requirement, {foreignKey: 'User_id'});  
db.requirement.belongsTo(db.user, {foreignKey: 'User_id', targetKey: 'User_id'});

db.user.hasOne(db.requirement, {foreignKey: 'User_id'});  
db.SelectedTech.belongsTo(db.user, {foreignKey: 'User_id', targetKey: 'User_id'});



db.requirement.hasOne(db.SelectedDomains, {foreignKey: 'Requirement_id'});  
db.SelectedDomains.belongsTo(db.requirement, {foreignKey: 'Requirement_id', targetKey: 'Requirement_id'});

db.user.hasOne(db.SelectedDomains, {foreignKey: 'User_id'});  
db.SelectedDomains.belongsTo(db.user, {foreignKey: 'User_id', targetKey: 'User_id'});



db.requirement.hasOne(db.SelectedQualifications, {foreignKey: 'Requirement_id'});  
db.SelectedQualifications.belongsTo(db.requirement, {foreignKey: 'Requirement_id', targetKey: 'Requirement_id'});

db.user.hasOne(db.SelectedQualifications, {foreignKey: 'User_id'});  
db.SelectedQualifications.belongsTo(db.user, {foreignKey: 'User_id', targetKey: 'User_id'});


module.exports = db;