module.exports = (sequelize, Sequelize) => {
    const Contractor = sequelize.define("ContractOwnerTbs", {
        Contractor_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Contractor_firstName: {
        type: Sequelize.STRING
      },
      Contractor_secondName: {
        type: Sequelize.STRING
      },
      Contractor_email: {
        type: Sequelize.STRING
      },
      Contractor_password: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      Contract_designation: {
        type: Sequelize.STRING
      },
      Contract_phone: {
        type: Sequelize.STRING
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
      User_roles_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { 
          model: 'UserRolesTbs',
          key: 'User_roles_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', 
      }
    });
  
    return Contractor;
  };
   
