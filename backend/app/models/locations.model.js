module.exports = (sequelize, Sequelize) => {
    const Locations = sequelize.define("LocationsTbs", {
        Locations_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Locations_name: {
        type: Sequelize.STRING
      },
      Location_country: {
        type: Sequelize.STRING
      },
      Location_pincode: {
        type: Sequelize.INTEGER 
      },
      Location_state: {
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
      Resource_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { 
          model: 'ResourceTbs',
          key: 'Resource_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', 
      } 
    });
  
    return Locations;
  };
   
   
