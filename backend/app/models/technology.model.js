module.exports = (sequelize, Sequelize) => {
    const Technology = sequelize.define("TechnologyTbs", {
        Technology_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Technology_name: {
        type: Sequelize.STRING
      },
      Technology_category_id: {
        type: Sequelize.STRING
      }   
    });
  
    return Technology;
  };    
   
   
 