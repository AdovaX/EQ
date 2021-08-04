module.exports = (sequelize, Sequelize) => {
    const Education = sequelize.define("EducationTbs", {
        Education_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
      },
      Qualification: {
        type: Sequelize.STRING
      },
      Pass_year: {
        type: Sequelize.DATEONLY
      }, 
    });
  
    return Education;
  }; 
