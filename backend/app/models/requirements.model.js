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
      Requirement_name: {
        type: Sequelize.STRING, 
      } ,
      Week_duration: {
        type: Sequelize.INTEGER
      } ,
      Week_must_time: {
        type: Sequelize.INTEGER
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
      Documents: {
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
      } ,
      User_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { 
          model: 'UsersTbs',
          key: 'User_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', 
      }
    });
  
    return Requirement;
  };
   
   

