module.exports = (sequelize, Sequelize) => {
    const Domain = sequelize.define("DomainTbs", {
        Domain_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Domain: {
        type: Sequelize.STRING
      } , 
      Domain_duration: {
        type: Sequelize.STRING
      } , 
      Resource_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { 
          model: 'ResourceTbs',
          key: 'Resource_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', 
      } 
    });
  
    return Domain;
  };
    