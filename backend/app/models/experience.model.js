module.exports = (sequelize, Sequelize) => {
    const Experince = sequelize.define("ExperinceTbs", {
        Experience_id: {
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
      Company_name: {
        type: Sequelize.INTEGER
      },
      Year_of_joining: {
        type: Sequelize.INTEGER
      },
      Roles_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { 
          model: 'RolesTbs',
          key: 'Roles_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      } 
    });
  
    return Experince;
  };
  