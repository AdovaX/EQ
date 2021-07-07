module.exports = (sequelize, Sequelize) => {
    const HManager = sequelize.define("HiringManagerTbs", {
        HManager_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      HManager_name: {
        type: Sequelize.STRING
      },
      HManager_email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      HManager_password: {
        type: Sequelize.STRING
      },
      HManager_designation: {
        type: Sequelize.STRING
      },
      HManager_phone: {
        type: Sequelize.STRING
      },
      HManager_active: {
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
      HManager_status: {
        type: Sequelize.ENUM,
        values:[ 'VERIFIED', 'NONVERIFIED'],
        defaultValue : 'VERIFIED'
      }
    });
  
    return HManager;
  };