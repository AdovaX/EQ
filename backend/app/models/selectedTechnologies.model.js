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
      Technologies: {
        type: Sequelize.TEXT,  
      } 
    });
  
    return SelectedTechnologiesTbs;
  };
    
