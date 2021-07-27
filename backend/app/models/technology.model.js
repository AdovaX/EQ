module.exports = (sequelize, Sequelize) => {
    const Technology = sequelize.define("TechnologyTbs", {
        Technology_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Technology_name: {
        type: Sequelize.STRING
      },
      Technology_version: {
        type: Sequelize.STRING
      },
      Technology_experience: {
        type: Sequelize.STRING
      },
      Technology_level: {
        type: Sequelize.ENUM,
        values : ['BEGGINER', 'INTERMEDIATE','EXPERT'],
        defaultValue : 'EXPERT'
      }, 
      Technology_category_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { 
          model: 'TechnologyCategoryTbs',
          key: 'Technology_category_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', 
      } , 
      Resource_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { 
          model: 'ResourceTbs',
          key: 'Resource_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', 
      }   
    });
  
    return Technology;
  };    
   
   
 