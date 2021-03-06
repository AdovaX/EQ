module.exports = (sequelize, Sequelize) => {
    const SelectedTechnologiesTbs = sequelize.define("SelectedTechnologiesTbs", {
        Selected_tech_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Requirement_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { 
          model: 'RequirementsTbs',
          key: 'Requirement_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', 
      },
      Project_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { 
          model: 'ProjectsTbs',
          key: 'Project_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', 
      },
      User_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { 
          model: 'UsersTbs',
          key: 'User_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', 
      } ,
      Technology: {
        type: Sequelize.TEXT,  
      } ,
      Technology_experience: {
        type: Sequelize.TEXT,  
      } ,
      Technology_level: {
        type: Sequelize.TEXT,  
      } ,
      Technology_version: {
        type: Sequelize.TEXT,  
      } 
    });
  
    return SelectedTechnologiesTbs;
  };
    
