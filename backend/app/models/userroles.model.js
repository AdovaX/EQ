module.exports = (sequelize, Sequelize) => {
    const UserRoles = sequelize.define("UserRolesTbs", {
        User_roles_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      User_roles: {
        type: Sequelize.ENUM,
        values : ['1', '2', '3', '4', '5', '6', '7', '8'],
        defaultValue : '1'
      },
      User_role_description: {
        type: Sequelize.STRING
      } 
    });
  
    return UserRoles;
  };    
   
 
