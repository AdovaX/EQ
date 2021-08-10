module.exports = (sequelize, Sequelize) => {
    const Technology = sequelize.define("Resource_educationTbs", {
        REducation_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      REducation: {
        type: Sequelize.STRING
      } , 
      REducation_passyear: {
        type: Sequelize.STRING
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
    