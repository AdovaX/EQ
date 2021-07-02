module.exports = (sequelize, Sequelize) => {
    const Tier = sequelize.define("TierTbs", {
        Tier_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Tier_level: {
        type: Sequelize.INTEGER
      },
      Tier_title: {
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
  
    return Tier;
  };    
   
    
