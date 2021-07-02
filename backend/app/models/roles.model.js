module.exports = (sequelize, Sequelize) => {
    const Roles = sequelize.define("RolesTbs", {
        Roles_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Role_name: {
        type: Sequelize.STRING
      },
      Role_duration: {
        type: Sequelize.INTEGER
      }, 
      Company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { 
          model: 'CompanyTbs',
          key: 'Company_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      } , 
      Resource_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { 
          model: 'ResourceTbs',
          key: 'Resource_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      } 
    });
  
    return Roles;
  };    
   
