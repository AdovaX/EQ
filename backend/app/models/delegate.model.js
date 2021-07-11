module.exports = (sequelize, Sequelize) => {
    const Delegate = sequelize.define("DelegateTbs", {
        Delegate_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Delegate_name: {
        type: Sequelize.STRING
      }, 
      Delegate_designation: {
        type: Sequelize.STRING
      },
      Delegate_phone: {
        type: Sequelize.STRING
      },
      Delegate_active: {
        type: Sequelize.INTEGER,
        defaultValue : 1
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
      Delegate_status: {
        type: Sequelize.ENUM,
        values:[ 'VERIFIED', 'NONVERIFIED'],
        defaultValue : 'VERIFIED'
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
      }
    });
  
    return Delegate;
  };