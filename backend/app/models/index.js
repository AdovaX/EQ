const dbConfig = require("../../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

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
db.interview = require("./interview.model.js")(sequelize, Sequelize);
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

  
 
db.resourceTb.hasMany(db.domainTb, {foreignKey: 'Resource_id'});  
db.domainTb.belongsTo(db.resourceTb, {foreignKey: 'Resource_id', targetKey: 'Resource_id'});
 
db.resourceTb.hasMany(db.technology, {foreignKey: 'Resource_id'});  
db.technology.belongsTo(db.resourceTb, {foreignKey: 'Resource_id', targetKey: 'Resource_id'});
 
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

db.techcategory.hasMany(db.technology, {foreignKey: 'Technology_category_id'});  
db.technology.belongsTo(db.techcategory, {foreignKey: 'Technology_category_id', targetKey: 'Technology_category_id'});
 
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

db.project.hasOne(db.requirement, {foreignKey: 'Project_id'});  
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