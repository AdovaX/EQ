module.exports = (sequelize, Sequelize) => {
    const ResourceSkill = sequelize.define("ResourceSkillTbs", {
        Resource_skill_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Resource_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { 
          model: 'ResourceTbs',
          key: 'Resource_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      Technology_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { 
          model: 'TechnologyTbs',
          key: 'Technology_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    });
  
    return ResourceSkill;
  };
  

