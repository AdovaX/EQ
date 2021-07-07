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
      LManager_email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      LManager_password: {
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