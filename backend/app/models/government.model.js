module.exports = (sequelize, Sequelize) => {
    const Government = sequelize.define("GovermentTbs", {
        Government_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      }, 
      Company_TAN: {
        type: Sequelize.STRING
      },
      Company_CIN: {
        type: Sequelize.STRING
      },
      Company_PAN: {
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
      } , 
      User_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { 
          model: 'UsersTbs',
          key: 'User_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', 
      } ,   
    });
  
    return Government;
  };
    
