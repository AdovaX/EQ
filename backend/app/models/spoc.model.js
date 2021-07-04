module.exports = (sequelize, Sequelize) => {
    const Spoc = sequelize.define("SpocTbs", {
        Spoc_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Spoc_name: {
        type: Sequelize.STRING
      },
      Spoc_email: {
        type: Sequelize.STRING
      },
      Spoc_designation: {
        type: Sequelize.STRING
      },
      Spoc_phone: {
        type: Sequelize.STRING
      },
      Spoc_active: {
        type: Sequelize.INTEGER,
        defaultValue : 1
      },
      Company_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { 
          model: 'CompanyTbs',
          key: 'Company_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', 
      },
      Spoc_status: {
        type: Sequelize.ENUM,
        values:['VERIFIED', 'NONVERIFIED'],
        defaultValue : 'NONVERIFIED'
      }
    });
  
    return Spoc;
  };