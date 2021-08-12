module.exports = (sequelize, Sequelize) => {
    const Education = sequelize.define("EducationTbs", {
        Education_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      }, 
      Qualification: {
        type: Sequelize.STRING
      },  
    }); 
    return Education;
  }; 
