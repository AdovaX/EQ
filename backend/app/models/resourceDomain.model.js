module.exports = (sequelize, Sequelize) => {
    const Domain = sequelize.define("Resource_domainTbs", {
        RDomain_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      RDomain: {
        type: Sequelize.STRING
      } , 
      RDomain_duration: {
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
    