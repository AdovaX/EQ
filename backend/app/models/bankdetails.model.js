module.exports = (sequelize, Sequelize) => {
    const Bank = sequelize.define("BankDetailsTbs", {
        Bank_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Bank_name: {
        type: Sequelize.STRING
      },
      Bank_branch: {
        type: Sequelize.STRING
      },
      Bank_accountNumber: {
        type: Sequelize.STRING
      },
      Bank_address: {
        type: Sequelize.STRING
      },
      Bank_IFSC: {
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
    });
  
    return Bank;
  };
  