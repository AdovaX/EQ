module.exports = (sequelize, Sequelize) => {
    const LManager = sequelize.define("ListingManagerTbs", {
        LManager_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      LManager_name: {
        type: Sequelize.STRING
      }, 
      LManager_designation: {
        type: Sequelize.STRING
      },
      LManager_phone: {
        type: Sequelize.STRING
      },
      LManager_active: {
        type: Sequelize.INTEGER,
        defaultValue : 1
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
      User_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { 
          model: 'UsersTbs',
          key: 'User_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', 
      },
      Company_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { 
          model: 'CompanyTbs',
          key: 'Company_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', 
      },
      LManager_status: {
        type: Sequelize.ENUM,
        values:[ 'VERIFIED', 'NONVERIFIED'],
        defaultValue : 'VERIFIED'
      }
    });
  
    return LManager;
  };