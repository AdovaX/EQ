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
      Delegate_email: {
        type: Sequelize.STRING
      },
      Delegate_password: {
        type: Sequelize.STRING
      },
      Delegate_designation: {
        type: Sequelize.STRING
      },
      Delegate_phone: {
        type: Sequelize.STRING
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
        values:['PENDING', 'VERIFIED', 'NONVERIFIED'],
        defaultValue : 'PENDING'
      }
    });
  
    return Delegate;
  };