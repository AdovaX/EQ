module.exports = (sequelize, Sequelize) => {
    const Education = sequelize.define("Mtech_Tbs", {
        Mtech_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      }, 
      Mtech_name: {
        type: Sequelize.STRING
      },  
    }); 
    return Education;
  }; 
