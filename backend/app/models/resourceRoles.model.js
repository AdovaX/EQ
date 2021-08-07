module.exports = (sequelize, Sequelize) => {
    const Domain = sequelize.define("Resource_rolesTbs", {
        RRole_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      RRole_name: {
        type: Sequelize.STRING
      } , 
      RRole_duration: {
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
  
    return Domain;
  };
    