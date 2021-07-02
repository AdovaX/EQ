module.exports = (sequelize, Sequelize) => {
    const CompanyTb = sequelize.define("CompanyTbs", {
        Company_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      C_short_name: {
        type: Sequelize.STRING
      },
      C_full_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Company_email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },
      Website: {
        type: Sequelize.STRING
      },
      No_employees: {
        type: Sequelize.INTEGER
      },
      Founded: {
        type: Sequelize.DATEONLY
      }, 
      About: {
        type: Sequelize.TEXT
      },
      Eq_rating: {
        type: Sequelize.INTEGER
      }
    });
  
    return CompanyTb;
  };
   
