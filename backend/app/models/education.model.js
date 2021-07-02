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
          model: 'UsersTbs',
          key: 'User_id'
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
      Institude_name: {
        type: Sequelize.STRING
      },
      Technology_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { 
          model: 'TechnologyTbs',
          key: 'Technology_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      Expertaise_level: {
        type: Sequelize.INTEGER
      },
      Domain_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { 
          model: 'DomainTbs',
          key: 'Domain_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }, 
      Category: {
        type: Sequelize.ENUM,
        values : ['Degree' , 'Master' , 'Certificate'],
        defaultValue : 'Degree'
      }
    });
  
    return Education;
  }; 
