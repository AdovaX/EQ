module.exports = (sequelize, Sequelize) => {
    const SelectedDomainsTbs = sequelize.define("SelectedDomainsTbs", {
        Selected_domains_id: {
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
      Domains: {
        type: Sequelize.TEXT,  
      },
      Domain_duration: {
        type: Sequelize.TEXT,  
      } 
    });
  
    return SelectedDomainsTbs;
  };
    
