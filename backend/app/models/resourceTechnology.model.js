module.exports = (sequelize, Sequelize) => {
    const Technology = sequelize.define("Resource_technologiesTbs", {
        RTechnology_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      RTechnology_name: {
        type: Sequelize.STRING
      } , 
      RTechnology_duration: {
        type: Sequelize.STRING
      } ,
      RTechnology_level: {
        type: Sequelize.STRING
      } ,
      RTechnology_version: {
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
    