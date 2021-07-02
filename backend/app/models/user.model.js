 module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("UsersTbs", {
        User_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      User_roles_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { 
          model: 'UserRolesTbs',
          key: 'User_roles_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      User_email: {
        type: Sequelize.STRING
      },
      User_phone: {
        type: Sequelize.STRING
      },
      User_password: {
        type: Sequelize.STRING
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
      },
      User_dob: {
        type: Sequelize.DATEONLY
      },
    });
  
    return User;
  };    
   
    
   