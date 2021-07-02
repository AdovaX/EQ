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
      Branch: {
        type: Sequelize.STRING
      },
      Bank_Address: {
        type: Sequelize.STRING
      },
      Account_number: {
        type: Sequelize.STRING
      },
      IFSC: {
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
      Spoc_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { 
          model: 'SpocTbs',
          key: 'Spoc_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
       } 
    });
  
    return Bank;
  };
  