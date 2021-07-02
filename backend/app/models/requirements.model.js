module.exports = (sequelize, Sequelize) => {
    const Requirement = sequelize.define("RequirementsTbs", {
        Requirement_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Company_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { 
          model: 'CompanyTbs',
          key: 'Company_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', 
      },
      Week_duration: {
        type: Sequelize.INTEGER
      } ,
      Week_must_time: {
        type: Sequelize.INTEGER
      } ,
      Technology_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { 
          model: 'TechnologyTbs',
          key: 'Technology_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', 
      } ,
      Domain_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { 
          model: 'DomainTbs',
          key: 'Domain_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',  
      } ,
      Roles_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { 
          model: 'RolesTbs',
          key: 'Roles_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', 
      } ,
      Certification: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { 
          model: 'EducationTbs',
          key: 'Education_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', 
      } ,
      Hours_per_week: {
        type: Sequelize.INTEGER, 
      } ,
      Hours_per_month: {
        type: Sequelize.INTEGER, 
      } ,
      Hours_per_day: {
        type: Sequelize.INTEGER, 
      } ,
      No_of_resources: {
        type: Sequelize.INTEGER, 
      } ,
      Documnets: {
        type: Sequelize.STRING, 
      } ,
      Project_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { 
          model: 'ProjectsTbs',
          key: 'Project_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      } ,
      Requirements_description: {
        type: Sequelize.TEXT, 
      } 
    });
  
    return Requirement;
  };
   
   

