module.exports = (sequelize, Sequelize) => {
    const Roles = sequelize.define("RolesTbs", {
        Roles_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Role_name: {
        type: Sequelize.STRING
      }  
    });
  
    return Roles;
  };    
   
