module.exports = (sequelize, Sequelize) => {
    const CompanyTb = sequelize.define("CompanyTbs", {
        Company_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      C_short_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      C_full_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Company_email: {
        type: Sequelize.STRING,
        unique: true
      },
      Website: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
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
      Company_logo: {
        type: Sequelize.TEXT
      },
      Eq_rating: {
        type: Sequelize.INTEGER
      },
      Enable_masking: {
        type: Sequelize.INTEGER
      },
      Freelancers: {
        type: Sequelize.INTEGER
      },
      Tiers_maching: {
        type: Sequelize.STRING
      },
      Company_tier: {
        type: Sequelize.INTEGER,
        defaultValue:5
      }
    });
  
    return CompanyTb;
  };
   
