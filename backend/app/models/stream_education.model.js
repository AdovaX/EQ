module.exports = (sequelize, Sequelize) => {
    const Education = sequelize.define("Stream_educationTbs", {
        Stream_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      }, 
      Stream_name: {
        type: Sequelize.STRING
      },  
    }); 
    return Education;
  }; 
