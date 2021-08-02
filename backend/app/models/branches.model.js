module.exports = (sequelize, Sequelize) => {
    const BranchesTb = sequelize.define("BranchesTb", {
        Branches_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      }, 
      Company_city: {
        type: Sequelize.STRING
      },
      Company_city_address: {
        type: Sequelize.STRING
      },
      Company_gmap: {
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
  
    return BranchesTb;
  };
    
